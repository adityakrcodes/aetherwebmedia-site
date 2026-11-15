import { leadForm } from "@/lib/site";
import type { FieldType, LeadData, LeadField, LeadOption } from "./fields";

/**
 * The enquiry form as the workspace publishes it (GET on the form's URL): its
 * fields, mode and the chat's words. Read at runtime, so the form is edited in
 * the workspace's builder and the site follows without a deploy.
 */
export type LeadChatConfig = {
  slug: string;
  title: string;
  subtitle: string;
  mode: "classic" | "agentic" | "both";
  agent: { name: string; avatar: string; welcomeMessage: string; completionMessage: string };
  output: {
    successTitle: string;
    successSubtitle: string;
    showSummary: boolean;
    nextSteps: string[];
    ctaLabel: string | null;
    ctaUrl: string | null;
  };
  fields: LeadField[];
  leadsUrl: string;
};

const FIELD_TYPES: readonly FieldType[] = [
  "text", "email", "tel", "url", "number", "date", "textarea", "select", "radio", "checkboxes", "checkbox",
];

type Raw = Record<string, unknown>;
const str = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);
const obj = (value: unknown): Raw => (value && typeof value === "object" ? (value as Raw) : {});

function readOptions(field: Raw): LeadOption[] | undefined {
  // `choices` carries label/value pairs; older responses only had `options` as labels.
  const list = Array.isArray(field.choices) ? field.choices : Array.isArray(field.options) ? field.options : null;
  if (!list) return undefined;
  return list
    .map((option) =>
      typeof option === "string"
        ? { label: option, value: option }
        : { label: str(obj(option).label), value: str(obj(option).value) || str(obj(option).label) },
    )
    .filter((option) => option.label);
}

function readField(value: unknown): LeadField | null {
  const field = obj(value);
  const type = str(field.type) as FieldType;
  const key = str(field.key);
  if (!key || !FIELD_TYPES.includes(type)) return null;
  const validation = obj(field.validation);
  return {
    key,
    label: str(field.label, key),
    type,
    required: field.required === true,
    placeholder: str(field.placeholder) || undefined,
    helpText: str(field.helpText) || undefined,
    options: readOptions(field),
    agentQuestion: str(field.agentQuestion) || undefined,
    allowSkip: typeof field.allowSkip === "boolean" ? field.allowSkip : undefined,
    validation: field.validation
      ? {
          minLength: typeof validation.minLength === "number" ? validation.minLength : undefined,
          maxLength: typeof validation.maxLength === "number" ? validation.maxLength : undefined,
          pattern: str(validation.pattern) || undefined,
          errorMessage: str(validation.errorMessage) || undefined,
        }
      : undefined,
  };
}

/** The published form, read defensively: a field the site can't render is left out rather than breaking the chat. */
export function readConfig(body: unknown): LeadChatConfig {
  const raw = obj(body);
  const settings = obj(raw.settings);
  const agent = obj(raw.agent);
  const output = obj(raw.output);
  const name = str(agent.name, "Assistant");
  const mode = str(raw.mode);
  return {
    slug: str(raw.slug),
    title: str(settings.title, leadForm.title),
    subtitle: str(settings.description, leadForm.description),
    mode: mode === "agentic" || mode === "both" ? mode : "classic",
    agent: {
      name,
      avatar: str(agent.avatar) || name.charAt(0).toUpperCase(),
      welcomeMessage: str(agent.welcomeMessage),
      completionMessage: str(agent.completionMessage, "All done — your details are in."),
    },
    output: {
      successTitle: str(output.successTitle, "Enquiry sent."),
      successSubtitle: str(output.successSubtitle, leadForm.success),
      showSummary: output.showSummary !== false,
      nextSteps: Array.isArray(output.nextSteps) ? output.nextSteps.filter((s): s is string => typeof s === "string") : [],
      ctaLabel: str(output.ctaLabel) || null,
      ctaUrl: /^https?:\/\//i.test(str(output.ctaUrl)) ? str(output.ctaUrl) : null,
    },
    fields: (Array.isArray(raw.fields) ? raw.fields : []).map(readField).filter((f): f is LeadField => f !== null),
    leadsUrl: str(raw.leadsUrl) || new URL("/api/public/leads", leadForm.url).href,
  };
}

let pending: Promise<LeadChatConfig> | null = null;

/** Fetched once per page load and shared. A failure is forgotten, so the next open tries again. */
export function loadLeadConfig() {
  pending ??= fetch(leadForm.url, { headers: { accept: "application/json" } })
    .then((res) => {
      if (!res.ok) throw new Error(`lead form config: ${res.status}`);
      return res.json();
    })
    .then(readConfig)
    .catch((error) => {
      pending = null;
      throw error;
    });
  return pending;
}

export type SubmitOutcome = { ok: true } | { ok: false; field?: string; message?: string };

export async function submitLead(config: LeadChatConfig, data: LeadData): Promise<SubmitOutcome> {
  const res = await fetch(config.leadsUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ slug: config.slug, data, source: "agentic", _page: location.href }),
  });
  if (res.ok) return { ok: true };
  if (res.status === 429) return { ok: false, message: "Too many submissions from here. Try again in a few minutes." };
  const body = (await res.json().catch(() => null)) as { field?: string | null; message?: string; error?: string } | null;
  return { ok: false, field: body?.field ?? undefined, message: body?.message ?? body?.error };
}

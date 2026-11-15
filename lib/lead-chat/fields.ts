/**
 * A workspace lead form's fields, as its public API describes them, and the checks
 * the server runs on each answer. Ported from the workspace (aether-admin
 * `lib/validation/lead-forms.ts`) without zod, so the chat refuses what the API
 * would refuse before anything is sent. The server still checks everything; a
 * 400 from it sends the chat back to the field at fault.
 */

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "radio"
  | "checkboxes"
  | "checkbox";

export type LeadOption = { label: string; value: string };

export type LeadField = {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: LeadOption[];
  agentQuestion?: string;
  allowSkip?: boolean;
  validation?: { minLength?: number; maxLength?: number; pattern?: string; errorMessage?: string };
};

/** A stored answer: a string, or a list of option values for a multi-select. */
export type LeadAnswer = string | string[];
export type LeadData = Record<string, LeadAnswer>;

const TEXT_RULE_TYPES: readonly FieldType[] = ["text", "email", "tel", "url", "number", "textarea"];
export const CHOICE_TYPES: readonly FieldType[] = ["select", "radio", "checkboxes"];

export const fieldOptions = (field: Pick<LeadField, "options">): LeadOption[] => field.options ?? [];

/** The question the chat asks for a field. */
export const agentQuestionFor = (field: Pick<LeadField, "agentQuestion" | "label">) => field.agentQuestion || field.label;

/** Any optional field can be passed on, as on the classic form. */
export const canSkip = (field: Pick<LeadField, "required">) => !field.required;

/** Whether the chat tells people they can type "skip". On unless turned off. */
export const offersSkip = (field: Pick<LeadField, "required" | "allowSkip">) => !field.required && field.allowSkip !== false;

/** Fills `{{formName}}` in a message. */
export const fillTemplate = (message: string, vars: { formName: string }) =>
  message.replace(/\{\{\s*formName\s*\}\}/g, vars.formName);

/** An answer as a person reads it: option labels rather than values, a list joined. */
export function displayAnswer(field: LeadField | undefined, value: LeadAnswer | undefined): string {
  if (value === undefined) return "";
  const options = field ? fieldOptions(field) : [];
  const label = (item: string) => options.find((option) => option.value === item)?.label ?? item;
  return Array.isArray(value) ? value.map(label).join(", ") : label(value);
}

export type AnswerCheck = { ok: true; value: LeadAnswer | undefined } | { ok: false; message: string };

const TICKED = new Set(["on", "yes", "true", "1"]);
const PHONE = /^\+?[\d\s().\-/]{6,30}$/;
const EMAIL = /^[^\s@"<>(),;:]+@[^\s@"<>(),;:]+\.[^\s@"<>(),;:.]{2,}$/i;
const NUMBER = /^-?\d+(?:[.,]\d+)?$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const matchOption = (options: LeadOption[], sent: string) =>
  options.find((option) => option.value === sent) ?? options.find((option) => option.label === sent);

const fail = (message: string): AnswerCheck => ({ ok: false, message });

/** One answer checked the way the server checks it. `value` is undefined when it was left empty (allowed if optional). */
export function validateAnswer(field: LeadField, raw: unknown): AnswerCheck {
  const options = fieldOptions(field);
  const missing = `${field.label} is required`;
  const custom = field.validation?.errorMessage || undefined;

  if (field.type === "checkboxes") {
    const sent = raw === undefined || raw === "" ? [] : Array.isArray(raw) ? raw : [raw];
    const values: string[] = [];
    for (const item of sent) {
      const option = typeof item === "string" ? matchOption(options, item.trim()) : undefined;
      if (!option) return fail("Choose from the listed options");
      if (!values.includes(option.value)) values.push(option.value);
    }
    if (field.required && !values.length) return fail("Choose at least one option");
    return { ok: true, value: values.length ? values : undefined };
  }

  if (field.type === "checkbox") {
    const ticked = raw === true || (typeof raw === "string" && TICKED.has(raw.toLowerCase()));
    if (ticked) return { ok: true, value: "Yes" };
    return field.required ? fail(`Tick “${field.label}” to continue`) : { ok: true, value: undefined };
  }

  if (raw !== undefined && typeof raw !== "string") return fail(missing);
  let value = (raw ?? "").trim();

  if (field.type === "select" || field.type === "radio") {
    if (!value) return field.required ? fail(`Choose ${field.label.toLowerCase()}`) : { ok: true, value: undefined };
    const option = matchOption(options, value);
    return option ? { ok: true, value: option.value } : fail("Choose one of the listed options");
  }

  if (!value) return field.required ? fail(missing) : { ok: true, value: undefined };

  switch (field.type) {
    case "email":
      if (value.length > 200 || !EMAIL.test(value)) return fail(custom ?? "Enter a valid email");
      break;
    case "tel":
      if (value.length > 40 || !PHONE.test(value) || (value.match(/\d/g)?.length ?? 0) < 6) {
        return fail(custom ?? "Enter a valid phone number");
      }
      break;
    case "url": {
      if (value.length > 500) return fail(custom ?? "Enter a valid link");
      if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
      try {
        const url = new URL(value);
        if (!/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) return fail(custom ?? "Enter a valid link");
      } catch {
        return fail(custom ?? "Enter a valid link");
      }
      break;
    }
    case "number":
      if (value.length > 30 || !NUMBER.test(value)) return fail(custom ?? "Enter a number");
      break;
    case "date":
      if (!DATE.test(value)) return fail("Enter a date");
      break;
    default: {
      const max = field.type === "textarea" ? 4000 : 200;
      if (value.length > max) return fail(`Keep it under ${max} characters`);
    }
  }

  if (TEXT_RULE_TYPES.includes(field.type)) {
    const { minLength, maxLength, pattern } = field.validation ?? {};
    if (minLength !== undefined && value.length < minLength) return fail(custom ?? `Use at least ${minLength} characters`);
    if (maxLength !== undefined && value.length > maxLength) return fail(custom ?? `Use at most ${maxLength} characters`);
    if (pattern) {
      try {
        if (!new RegExp(pattern).test(value)) return fail(custom ?? `${field.label} isn't in the expected format`);
      } catch {
        // A pattern the browser can't compile is left to the server.
      }
    }
  }

  return { ok: true, value };
}

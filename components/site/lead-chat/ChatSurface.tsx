"use client";

import { Component, useCallback, useEffect, useState } from "react";
import { IconListCheck, IconMessages } from "@tabler/icons-react";
import LeadChat from "./LeadChat";
import { useAgenticForm } from "./useAgenticForm";
import { loadLeadConfig, submitLead, type LeadChatConfig } from "@/lib/lead-chat/config";
import type { LeadData } from "@/lib/lead-chat/fields";

/** Shared by the enquiry modal (LeadDialog) and the inline form at the end of each page (LeadInline). */

export type ConfigState = { status: "loading" } | { status: "ready"; config: LeadChatConfig } | { status: "failed" };

/**
 * The workspace form's config. One fetch per page load, shared by every caller,
 * started once the page is idle so a click rarely waits for it.
 */
export function useLeadConfig() {
  const [state, setState] = useState<ConfigState>({ status: "loading" });

  const load = useCallback(() => {
    setState((s) => (s.status === "ready" ? s : { status: "loading" }));
    loadLeadConfig().then(
      (config) => setState({ status: "ready", config }),
      () => setState((s) => (s.status === "ready" ? s : { status: "failed" })),
    );
  }, []);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(load);
    return () => cancel(handle);
  }, [load]);

  return [state, load, setState] as const;
}

/** Whether a config asks for the chat (agentic or both, with something to ask). */
export const wantsChat = (config: LeadChatConfig | null): config is LeadChatConfig =>
  !!config && config.mode !== "classic" && config.fields.length > 0;

/** The first multi-select offering `service`, so a service page's button arrives with it ticked. */
function presetFor(config: LeadChatConfig, service: string) {
  for (const field of config.fields) {
    if (field.type !== "checkboxes") continue;
    const option = field.options?.find((o) => o.value === service || o.label === service);
    if (option) return { key: field.key, value: option.value };
  }
  return null;
}

/** One conversation: the chat's state, the submission, the service preset and the analytics event. */
export function ChatSurface({
  config,
  service,
  titleId,
  inputRef,
  onClose,
  onDone,
  headerExtra,
}: {
  config: LeadChatConfig;
  service?: string;
  titleId: string;
  inputRef: React.RefObject<HTMLInputElement & HTMLTextAreaElement | null>;
  onClose?: () => void;
  onDone?: () => void;
  headerExtra?: React.ReactNode;
}) {
  const submit = useCallback(
    async (data: LeadData) => {
      const outcome = await submitLead(config, data);
      if (outcome.ok) {
        const services = Object.values(data).find((value): value is string[] => Array.isArray(value));
        (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.("event", "generate_lead", {
          form: "lead-chat",
          services: services?.join(", ") ?? "",
        });
      }
      return outcome;
    },
    [config],
  );
  const form = useAgenticForm(config, { submit });
  const { preset, phase } = form;

  useEffect(() => {
    const target = service ? presetFor(config, service) : null;
    if (target) preset(target.key, [target.value]);
  }, [config, service, preset]);

  useEffect(() => {
    if (phase === "done") onDone?.();
  }, [phase, onDone]);

  return <LeadChat config={config} form={form} titleId={titleId} inputRef={inputRef} onClose={onClose} headerExtra={headerExtra} />;
}

export function ModeSwitch({ view, onChange }: { view: "agentic" | "classic"; onChange: (view: "agentic" | "classic") => void }) {
  const toChat = view === "classic";
  const Icon = toChat ? IconMessages : IconListCheck;
  const label = toChat ? "Answer in a chat instead" : "Fill in a form instead";
  return (
    <button
      type="button"
      onClick={() => onChange(toChat ? "agentic" : "classic")}
      aria-label={label}
      title={label}
      className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm text-ember-2 ring-1 ring-inset ring-ember-line transition-colors hover:bg-white/8 hover:text-ember"
    >
      <Icon size={16} stroke={1.75} aria-hidden />
      <span className="hidden sm:inline">{toChat ? "Chat" : "Form"}</span>
    </button>
  );
}

/** If the chat throws while rendering, show the classic form rather than a broken one. */
export class ChatBoundary extends Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[lead-chat] chat failed; showing the classic form", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IconArrowUp, IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { PHRASES, PROGRESS_STEPS, type ChatMessage, type SummaryRow } from "@/lib/lead-chat/agentic";
import { fieldOptions, offersSkip, type FieldType, type LeadField } from "@/lib/lead-chat/fields";
import type { LeadChatConfig } from "@/lib/lead-chat/config";
import { cn } from "@/lib/utils";
import type { AgenticForm } from "./useAgenticForm";

/**
 * The agentic enquiry chat, ported from the workspace's hosted form and dressed for
 * the site's dark stages: a pinned bar with the title, progress and the answers so
 * far (each editable), the conversation, and an input pinned to the bottom.
 * Everything field-specific comes from `config`; this never names a field.
 *
 * The input is always a plain text box so the commands ("skip", "go back",
 * "edit …") can be typed at any question; inputMode picks the keyboard.
 * Motion is CSS only (transform and opacity), and off under reduced motion.
 */

const INPUT_MODE: Partial<Record<FieldType, React.HTMLAttributes<HTMLInputElement>["inputMode"]>> = {
  email: "email",
  tel: "tel",
  url: "url",
  number: "decimal",
};
const AUTOCOMPLETE: Partial<Record<FieldType, string>> = { email: "email", tel: "tel", url: "url" };

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Messages that show without a typing pause: what the person sent, and the live progress list. */
const instant = (message: ChatMessage) => message.role === "user" || message.kind === "progress";

function typingDelay(message: ChatMessage, continuing: boolean) {
  const length = message.kind === "text" || message.kind === "question" ? message.text.length : 60;
  const cap = message.kind === "summary" || message.kind === "success" ? 650 : 900;
  return Math.min((continuing ? 240 : 420) + length * (continuing ? 4 : 7), cap);
}

/**
 * The part of the conversation shown so far: the reducer answers instantly, this
 * paces it behind a typing indicator, one agent message at a time. Ids only grow
 * (even across "start over"), so "shown" is every message up to an id.
 */
function useRevealedMessages(messages: ChatMessage[]) {
  const [reduced] = useState(reducedMotion);
  const [upTo, setUpTo] = useState(0);

  let visibleUpTo = upTo;
  for (const message of messages) {
    if (message.id <= visibleUpTo) continue;
    if (!instant(message)) break;
    visibleUpTo = message.id;
  }
  const nextIndex = messages.findIndex((message) => message.id > visibleUpTo);
  const next = nextIndex === -1 ? undefined : messages[nextIndex];
  const continuing = nextIndex > 0 && messages[nextIndex - 1].role === "agent" && messages[nextIndex - 1].id <= visibleUpTo;

  useEffect(() => {
    if (!next || reduced) return;
    const timer = setTimeout(() => setUpTo(next.id), typingDelay(next, continuing));
    return () => clearTimeout(timer);
  }, [next, continuing, reduced]);

  if (reduced) return { shown: messages, typing: false };
  return { shown: messages.filter((message) => message.id <= visibleUpTo), typing: Boolean(next) };
}

const lastIdOf = (messages: ChatMessage[], kind: ChatMessage["kind"]) => {
  for (let i = messages.length - 1; i >= 0; i--) if (messages[i].kind === kind) return messages[i].id;
  return undefined;
};

const ring = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember";
const solidBtn = cn(
  "inline-flex h-10 items-center rounded-full bg-ember px-5 text-sm font-medium text-furnace transition-[transform,background-color] duration-300 ease-expo hover:bg-white active:scale-[0.97]",
  ring,
);
const ghostBtn = cn(
  "inline-flex h-10 items-center rounded-full px-5 text-sm font-medium text-ember ring-1 ring-inset ring-ember-line transition-[transform,background-color] duration-300 ease-expo hover:bg-white/8 active:scale-[0.97]",
  ring,
);
const chipBase = cn(
  "inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-sm ring-1 ring-inset transition-[transform,background-color,color] duration-200 active:scale-[0.96]",
  ring,
);
const chipOff = "text-ember-2 ring-ember-line hover:text-ember hover:ring-white/25";
const chipOn = "bg-ember text-furnace ring-ember";
const bubble = "w-fit max-w-full rounded-3xl rounded-bl-lg bg-furnace-2 px-4 py-3 text-[0.95rem] leading-relaxed ring-1 ring-inset ring-ember-line";

export default function LeadChat({
  config,
  form,
  titleId,
  onClose,
  headerExtra,
  inputRef,
}: {
  config: LeadChatConfig;
  form: AgenticForm;
  titleId: string;
  onClose?: () => void;
  headerExtra?: React.ReactNode;
  inputRef: React.RefObject<HTMLInputElement & HTMLTextAreaElement | null>;
}) {
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const field = form.currentField;
  const multiline = field?.type === "textarea";
  const closed = form.phase === "submitting" || form.phase === "done";
  const { shown, typing } = useRevealedMessages(form.messages);

  // Follow the conversation as it grows, including the progress steps ticking off.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: reducedMotion() ? "auto" : "smooth" });
  }, [shown.length, typing, form.progressStep]);

  // Keep focus in the input once someone is typing answers (a phone keeps its keyboard down until then).
  const typedLast = useRef(false);
  useEffect(() => {
    if (!closed && typedLast.current) inputRef.current?.focus({ preventScroll: true });
  }, [shown.length, closed, inputRef]);

  // A long answer grows the box up to a few lines, then scrolls inside it.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input || !multiline) return;
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
  }, [draft, multiline, inputRef]);

  function send() {
    const text = draft.trim();
    if (!text || closed) return;
    typedLast.current = true;
    form.sendMessage(text);
    setDraft("");
  }

  // Controls are live on the newest question or summary.
  const liveId =
    form.phase === "asking"
      ? lastIdOf(form.messages, "question")
      : form.phase === "review"
        ? lastIdOf(form.messages, "summary")
        : undefined;

  const placeholder =
    form.phase === "review"
      ? "Type “looks good”, or what to change"
      : field?.placeholder || (multiline ? "Type your answer…" : "Type your answer");
  const { answered, total } = form.progress;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="shrink-0 border-b border-ember-line px-5 pb-4 pt-5 sm:px-7 sm:pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id={titleId} className="text-[clamp(1.35rem,3.4vw,1.75rem)] font-medium leading-tight tracking-[-0.04em]">
              {config.title}
            </h2>
            <p className="mt-1 text-xs tabular-nums text-ember-3" aria-live="polite">
              <span key={answered} className="chat-pop inline-block">
                {answered}
              </span>{" "}
              of {total} answered
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {headerExtra}
            {onClose && (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="grid size-11 place-items-center rounded-full text-ember-2 ring-1 ring-inset ring-ember-line transition-colors hover:bg-white/8 hover:text-ember"
              >
                <IconX size={18} stroke={1.75} />
              </button>
            )}
          </div>
        </div>
        <div
          className="mt-3 h-1 overflow-hidden rounded-full bg-furnace-3"
          role="progressbar"
          aria-label="Questions answered"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={answered}
        >
          <div
            className="h-full origin-left rounded-full bg-ember transition-transform duration-700 ease-expo"
            style={{ transform: `scaleX(${total ? answered / total : 0})` }}
          />
        </div>
        {form.pills.length > 0 && (
          <ul className="mt-3 flex max-h-[4.75rem] flex-wrap gap-1.5 overflow-y-auto" aria-label="Your answers">
            {form.pills.map((pill) => (
              <li key={pill.key} className="chat-pop flex max-w-full">
                <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-furnace-2 py-0.5 pl-3 pr-0.5 text-xs ring-1 ring-inset ring-ember-line">
                  <span className="min-w-0 truncate">
                    <span className="text-ember-3">{pill.label}:</span>{" "}
                    {/* Re-keyed on change, so a corrected answer pops and is noticed. */}
                    <span key={pill.value} className="chat-pop inline-block text-ember">
                      {pill.value}
                    </span>
                  </span>
                  {!closed && (
                    <button
                      type="button"
                      onClick={() => form.editField(pill.key)}
                      aria-label={`Edit ${pill.label}`}
                      title={`Edit ${pill.label}`}
                      className="grid size-7 shrink-0 place-items-center rounded-full text-ember-3 transition-colors hover:bg-white/10 hover:text-ember"
                    >
                      <IconPencil size={12} stroke={2} aria-hidden />
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </header>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-label="Conversation"
        aria-busy={typing}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-6 sm:px-7"
      >
        {shown.map((message, index) => (
          <MessageView
            key={message.id}
            message={message}
            config={config}
            form={form}
            live={message.id === liveId}
            // The avatar marks the start of each run of agent messages.
            showAvatar={message.role === "agent" && shown[index - 1]?.role !== "agent"}
            onClose={onClose}
          />
        ))}
        {typing && (
          <div className="chat-msg flex items-end gap-2.5" role="status" aria-label={`${config.agent.name} is typing`}>
            {shown[shown.length - 1]?.role === "agent" ? <span aria-hidden className="w-8 shrink-0" /> : <Avatar config={config} />}
            <div className="flex h-11 items-center gap-1 rounded-3xl rounded-bl-lg bg-furnace-2 px-4 ring-1 ring-inset ring-ember-line">
              {[0, 1, 2].map((dot) => (
                <span key={dot} aria-hidden className="chat-dot size-1.5 rounded-full bg-ember-2" style={{ "--i": dot } as React.CSSProperties} />
              ))}
            </div>
          </div>
        )}
      </div>

      {!closed && (
        <form
          className="shrink-0 border-t border-ember-line px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-6"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <div className="flex items-end gap-2">
            {multiline ? (
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  // Enter sends; Shift+Enter starts a new line.
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={placeholder}
                aria-label={field ? field.label : "Your message"}
                enterKeyHint="send"
                className="max-h-40 min-h-12 flex-1 resize-none rounded-3xl bg-furnace-2 px-5 py-3 text-base leading-6 text-ember ring-1 ring-inset ring-ember-line placeholder:text-ember-3 hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              />
            ) : (
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                aria-label={field ? field.label : "Your message"}
                inputMode={field ? INPUT_MODE[field.type] : undefined}
                autoComplete={field ? (AUTOCOMPLETE[field.type] ?? "off") : "off"}
                autoCapitalize={field && INPUT_MODE[field.type] ? "none" : "sentences"}
                enterKeyHint="send"
                // 16px, or iOS zooms the page when the input is focused.
                className="h-12 min-w-0 flex-1 rounded-full bg-furnace-2 px-5 text-base text-ember ring-1 ring-inset ring-ember-line placeholder:text-ember-3 hover:ring-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              />
            )}
            <button
              type="submit"
              aria-label="Send"
              disabled={!draft.trim()}
              className="group grid size-12 shrink-0 place-items-center rounded-full bg-ember text-furnace transition-[transform,opacity,background-color] duration-300 ease-expo hover:bg-white active:scale-90 disabled:scale-95 disabled:opacity-40"
            >
              <IconArrowUp size={18} stroke={2.25} aria-hidden className="transition-transform duration-200 group-enabled:group-hover:-translate-y-0.5" />
            </button>
          </div>
          <p className="mt-2 min-h-4 px-5 text-xs text-ember-3">
            {field && offersSkip(field) ? "Type “skip” to skip this one." : multiline ? "Shift + Enter for a new line." : ""}
          </p>
        </form>
      )}
    </div>
  );
}

function Avatar({ config }: { config: LeadChatConfig }) {
  return (
    <span
      aria-hidden
      title={config.agent.name}
      className="grid size-8 shrink-0 place-items-center rounded-full bg-furnace-3 text-xs font-semibold text-ember ring-1 ring-inset ring-ember-line"
    >
      {config.agent.avatar}
    </span>
  );
}

function AgentRow({ config, first, children }: { config: LeadChatConfig; first: boolean; children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-2.5 pr-4 sm:pr-12">
      {first ? <Avatar config={config} /> : <span aria-hidden className="w-8 shrink-0" />}
      <div className="min-w-0 flex-1 space-y-2.5">{children}</div>
    </div>
  );
}

type MessageProps = {
  message: ChatMessage;
  config: LeadChatConfig;
  form: AgenticForm;
  live: boolean;
  showAvatar: boolean;
  onClose?: () => void;
};

function MessageView(props: MessageProps) {
  const { message } = props;
  const shake = message.role === "agent" && message.kind === "text" && message.tone === "error";
  return (
    <div className="chat-msg" data-side={message.role} data-shake={shake || undefined}>
      <MessageBody {...props} />
    </div>
  );
}

function MessageBody({ message, config, form, live, showAvatar, onClose }: MessageProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end pl-12 sm:pl-20">
        <p className="whitespace-pre-wrap break-words rounded-3xl rounded-br-lg bg-ember px-4 py-3 text-[0.95rem] leading-relaxed text-furnace">
          <span className="sr-only">You: </span>
          {message.text}
        </p>
      </div>
    );
  }

  const agentLabel = <span className="sr-only">{config.agent.name}: </span>;

  switch (message.kind) {
    case "text":
      return (
        <AgentRow config={config} first={showAvatar}>
          <p className={cn(bubble, "whitespace-pre-line", message.tone === "error" && "ring-ember/60")}>
            {agentLabel}
            {message.text}
          </p>
        </AgentRow>
      );

    case "question": {
      const field = config.fields.find((item) => item.key === message.fieldKey);
      return (
        <AgentRow config={config} first={showAvatar}>
          <div className={bubble}>
            {agentLabel}
            <p className="font-medium">{message.text}</p>
            {field?.helpText && <p className="mt-1 text-sm text-ember-2">{field.helpText}</p>}
            {message.current && (
              <p className="mt-1 text-sm text-ember-3">
                Currently: <span className="text-ember">{message.current}</span>
              </p>
            )}
          </div>
          {live && field && <InlineControls field={field} form={form} />}
        </AgentRow>
      );
    }

    case "summary":
      return (
        <AgentRow config={config} first={showAvatar}>
          <div className="w-full rounded-3xl rounded-bl-lg bg-furnace-2 p-5 text-[0.95rem] ring-1 ring-inset ring-ember-line">
            {agentLabel}
            <p className="font-medium">{PHRASES.summaryTitle}</p>
            <SummaryList rows={message.rows} onEdit={live ? form.editField : undefined} />
            {live && (
              <div className="chat-pop mt-4 flex flex-wrap gap-2" style={{ "--i": message.rows.length } as React.CSSProperties}>
                <button type="button" onClick={form.confirm} className={solidBtn}>
                  Looks good
                </button>
                <button type="button" onClick={form.requestEdit} className={ghostBtn}>
                  Make an edit
                </button>
              </div>
            )}
          </div>
        </AgentRow>
      );

    case "progress":
      return (
        <AgentRow config={config} first={showAvatar}>
          <div className={cn(bubble, "min-w-60")}>
            <p className="sr-only">Sending your details</p>
            <ol className="space-y-2 text-sm">
              {PROGRESS_STEPS.map((step, index) => {
                const done = index < form.progressStep;
                const running = !done && index === form.progressStep && form.phase === "submitting";
                return (
                  <li key={step} className={cn("flex items-center gap-2.5", done || running ? "text-ember" : "text-ember-3")}>
                    <span className="grid size-5 shrink-0 place-items-center">
                      {done ? (
                        <span className="chat-pop grid size-5 place-items-center rounded-full bg-ember text-furnace">
                          <IconCheck size={12} stroke={3} aria-hidden />
                        </span>
                      ) : running ? (
                        <span aria-hidden className="chat-spin size-4 rounded-full border-2 border-ember-line border-t-ember" />
                      ) : (
                        <span aria-hidden className="size-1.5 rounded-full bg-ember-3" />
                      )}
                    </span>
                    {step}
                    <span className="sr-only">{done ? " (done)" : running ? " (in progress)" : ""}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </AgentRow>
      );

    case "success":
      return (
        <AgentRow config={config} first={showAvatar}>
          <SuccessCard config={config} rows={message.rows} onClose={onClose} />
        </AgentRow>
      );
  }
}

function SummaryList({ rows, onEdit }: { rows: SummaryRow[]; onEdit?: (key: string) => void }) {
  return (
    <dl className="mt-3 divide-y divide-ember-line">
      {rows.map((row, index) => (
        <div
          key={row.key}
          className={cn("flex items-start gap-2 py-2.5", onEdit && "chat-pop")}
          style={{ "--i": index } as React.CSSProperties}
        >
          <div className="min-w-0 flex-1">
            <dt className="text-xs text-ember-3">{row.label}</dt>
            <dd className={cn("mt-0.5 whitespace-pre-line break-words", row.skipped && "italic text-ember-3")}>
              {row.skipped ? "Skipped" : row.value}
            </dd>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(row.key)}
              aria-label={`Edit ${row.label}`}
              title={`Edit ${row.label}`}
              className="-mr-1 grid size-9 shrink-0 place-items-center rounded-full text-ember-3 transition-colors hover:bg-white/8 hover:text-ember"
            >
              <IconPencil size={14} stroke={2} aria-hidden />
            </button>
          )}
        </div>
      ))}
    </dl>
  );
}

function SuccessCard({ config, rows, onClose }: { config: LeadChatConfig; rows: SummaryRow[]; onClose?: () => void }) {
  const { output } = config;
  const answered = rows.filter((row) => !row.skipped);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), []);
  let step = 0;
  const next = () => ({ "--i": step++ * 2 + 2 }) as React.CSSProperties;

  return (
    <div role="status" className="chat-msg w-full rounded-3xl rounded-bl-lg bg-furnace-2 p-5 ring-1 ring-inset ring-white/20 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="relative grid size-10 shrink-0 place-items-center">
          <span aria-hidden className="chat-ripple absolute inset-0 rounded-full bg-ember" />
          <span className="chat-pop relative grid size-10 place-items-center rounded-full bg-ember text-furnace">
            <IconCheck size={20} stroke={2.5} aria-hidden />
          </span>
        </span>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="chat-pop text-xl font-medium tracking-[-0.035em] focus:outline-none sm:text-2xl"
          style={next()}
        >
          {output.successTitle}
        </h3>
      </div>
      <p className="chat-pop mt-3 leading-relaxed text-ember-2" style={next()}>
        {output.successSubtitle}
      </p>

      {output.showSummary && answered.length > 0 && (
        <div className="chat-pop mt-4 rounded-2xl bg-furnace px-4 py-1 text-[0.95rem] ring-1 ring-inset ring-ember-line" style={next()}>
          <SummaryList rows={answered} />
        </div>
      )}

      {output.nextSteps.length > 0 && (
        <div className="chat-pop mt-5" style={next()}>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-ember-3">What happens next</p>
          <ol className="mt-2.5 space-y-2 text-[0.95rem]">
            {output.nextSteps.map((text, index) => (
              <li key={index} className="flex gap-2.5">
                <span className="grid size-6 shrink-0 place-items-center rounded-full text-xs font-medium ring-1 ring-inset ring-white/20">
                  {index + 1}
                </span>
                <span className="pt-0.5">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="chat-pop mt-6 flex flex-wrap gap-2" style={next()}>
        {output.ctaLabel && output.ctaUrl && (
          <a href={output.ctaUrl} target="_blank" rel="noreferrer" className={solidBtn}>
            {output.ctaLabel}
          </a>
        )}
        {onClose && (
          <button type="button" onClick={onClose} className={output.ctaLabel && output.ctaUrl ? ghostBtn : solidBtn}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}

/** Tap targets for the question being asked: options, chips with Done, a date picker or a tick. */
function InlineControls({ field, form }: { field: LeadField; form: AgenticForm }) {
  const options = fieldOptions(field);
  const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

  if (field.type === "select" || field.type === "radio") {
    return (
      <div role="group" aria-label={field.label} className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            onClick={() => form.selectOption(option.value)}
            className={cn(chipBase, chipOff, "chat-pop")}
            style={stagger(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  if (field.type === "checkboxes") {
    return (
      <div role="group" aria-label={field.label} className="flex flex-wrap items-center gap-2">
        {options.map((option, index) => {
          const on = form.picks.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={on}
              onClick={() => form.toggleOption(option.value)}
              className={cn(chipBase, on ? chipOn : chipOff, "chat-pop")}
              style={stagger(index)}
            >
              {on && <IconCheck size={14} stroke={2.5} aria-hidden className="-ml-0.5" />}
              {option.label}
            </button>
          );
        })}
        <button type="button" onClick={form.doneChoosing} className={cn(solidBtn, "chat-pop tabular-nums")} style={stagger(options.length)}>
          Done{form.picks.length ? ` (${form.picks.length})` : ""}
        </button>
      </div>
    );
  }

  if (field.type === "date") return <DatePick field={field} form={form} />;

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => form.sendMessage("yes")} className={cn(chipBase, chipOff, "chat-pop")}>
          Yes
        </button>
        {!field.required && (
          <button type="button" onClick={() => form.sendMessage("skip")} className={cn(chipBase, chipOff, "chat-pop")} style={stagger(1)}>
            Skip
          </button>
        )}
      </div>
    );
  }

  return null;
}

function DatePick({ field, form }: { field: LeadField; form: AgenticForm }) {
  const [value, setValue] = useState("");
  return (
    <form
      className="chat-pop flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value) form.sendMessage(value);
      }}
    >
      <input
        type="date"
        aria-label={field.label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 rounded-full bg-furnace-2 px-4 text-sm text-ember ring-1 ring-inset ring-ember-line [color-scheme:dark] focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
      />
      <button type="submit" disabled={!value} className={cn(solidBtn, "disabled:opacity-40")}>
        Use this date
      </button>
    </form>
  );
}

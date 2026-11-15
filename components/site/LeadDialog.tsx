"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";
import LeadForm from "./LeadForm";
import { ChatBoundary, ChatSurface, ModeSwitch, useLeadConfig, wantsChat } from "./lead-chat/ChatSurface";
import { leadForm } from "@/lib/site";
import { cn } from "@/lib/utils";

/** How long an open dialog waits for the form's config before showing the classic form instead. */
const CONFIG_TIMEOUT_MS = 4000;

/**
 * The enquiry form in a modal, opened by any link with `data-lead` (its value, if any, pre-selects a service).
 * Those links point at the inline form (`#enquire`), which is where they go without JavaScript.
 *
 * The form's mode comes from the workspace (classic, agentic or both), so it is switched there without a deploy.
 * Agentic shows the chat; the classic form is the fallback when the config can't be read, the form has no
 * fields, or the chat fails to render. It stays mounted so a half-filled form or chat survives closing.
 */
export default function LeadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [service, setService] = useState<string>();
  const [config, load, setConfig] = useLeadConfig();
  const [view, setView] = useState<"agentic" | "classic">("agentic");
  // Bumped to start a fresh chat when the dialog reopens after a lead was sent.
  const [chatKey, setChatKey] = useState(0);
  const chatDone = useRef(false);
  const statusRef = useRef(config.status);
  useEffect(() => {
    statusRef.current = config.status;
  }, [config.status]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-lead]");
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (link.dataset.lead) setService(link.dataset.lead);
      if (chatDone.current) {
        chatDone.current = false;
        setChatKey((k) => k + 1);
      }
      if (statusRef.current === "failed") load();
      ref.current?.showModal();
      // On a desktop pointer the chat's input takes focus; a phone keeps its keyboard down until someone taps.
      if (window.matchMedia("(pointer: fine)").matches) {
        requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [load]);

  // Don't keep an open dialog waiting on a slow config: fall back to the classic form.
  useEffect(() => {
    if (config.status !== "loading") return;
    const timer = window.setTimeout(() => {
      if (ref.current?.open) setConfig((c) => (c.status === "loading" ? { status: "failed" } : c));
    }, CONFIG_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [config.status, setConfig]);

  // On iOS the keyboard covers the page instead of resizing it; sizing to the visual viewport keeps the input in view.
  useEffect(() => {
    const viewport = window.visualViewport;
    const dialog = ref.current;
    if (!viewport || !dialog) return;
    const update = () => dialog.style.setProperty("--vvh", `${viewport.height}px`);
    update();
    viewport.addEventListener("resize", update);
    return () => viewport.removeEventListener("resize", update);
  }, []);

  const close = useCallback(() => ref.current?.close(), []);

  // A click on the backdrop closes it. Both ends of the click must be outside, so selecting text never does.
  const downOutside = useRef(false);
  const outside = (e: React.PointerEvent | React.MouseEvent) => e.target === e.currentTarget;

  const ready = config.status === "ready" ? config.config : null;
  const agentic = wantsChat(ready);
  const canSwitch = ready?.mode === "both" && ready.fields.length > 0;
  const showChat = agentic && view === "agentic";

  const classic = (
    <div className="relative p-6 pt-7 sm:p-10">
      <div className="absolute right-3 top-3 flex items-center gap-1.5 sm:right-5 sm:top-5">
        {canSwitch && <ModeSwitch view="classic" onChange={setView} />}
        <CloseButton onClick={close} />
      </div>
      <LeadForm
        service={service}
        onDone={close}
        className="mt-8"
        header={
          <div className={cn(canSwitch ? "pr-28" : "pr-12")}>
            <h2 id={titleId} className="text-[clamp(1.9rem,4.5vw,2.75rem)] font-medium leading-[1] tracking-[-0.045em]">
              {ready?.title ?? leadForm.title}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ember-2">{ready?.subtitle ?? leadForm.description}</p>
          </div>
        }
      />
    </div>
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onPointerDown={(e) => (downOutside.current = outside(e))}
      onClick={(e) => downOutside.current && outside(e) && close()}
      className={cn(
        "lead-dialog m-auto w-[min(44rem,calc(100%-1rem))] overscroll-contain rounded-stage bg-furnace p-0 text-ember ring-1 ring-inset ring-ember-line backdrop:bg-black/70",
        // The chat scrolls inside itself, so it gets a fixed height; the classic form scrolls the dialog.
        showChat || config.status === "loading"
          ? "h-[min(46rem,calc(var(--vvh,100dvh)-1rem))] max-h-none overflow-hidden"
          : "max-h-[calc(100dvh-1rem)] overflow-y-auto",
      )}
    >
      {config.status === "loading" ? (
        <div className="relative grid h-full place-items-center">
          <h2 id={titleId} className="sr-only">
            {leadForm.title}
          </h2>
          <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
            <CloseButton onClick={close} />
          </div>
          <div role="status" aria-label="Loading" className="flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <span key={dot} aria-hidden className="chat-dot size-2 rounded-full bg-ember-2" style={{ "--i": dot } as React.CSSProperties} />
            ))}
          </div>
        </div>
      ) : showChat && ready ? (
        <ChatBoundary fallback={classic}>
          <ChatSurface
            key={chatKey}
            config={ready}
            service={service}
            titleId={titleId}
            inputRef={inputRef}
            onClose={close}
            onDone={() => (chatDone.current = true)}
            headerExtra={canSwitch ? <ModeSwitch view="agentic" onChange={setView} /> : undefined}
          />
        </ChatBoundary>
      ) : (
        classic
      )}
    </dialog>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full text-ember-2 ring-1 ring-inset ring-ember-line transition-colors hover:bg-white/8 hover:text-ember"
    >
      <IconX size={18} stroke={1.75} />
    </button>
  );
}

"use client";

import { useId, useRef, useState } from "react";
import LeadForm from "./LeadForm";
import { ChatBoundary, ChatSurface, ModeSwitch, useLeadConfig, wantsChat } from "./lead-chat/ChatSurface";
import { cn } from "@/lib/utils";

/**
 * The enquiry form inline in the closing stage (`#enquire`), in the workspace form's mode.
 *
 * The classic form is what the server renders, so it is there without JavaScript and while the config loads.
 * Once the config says agentic, it becomes the chat, unless someone has already started typing into the
 * classic form, which is never swapped out from under them.
 */
export default function LeadInline({ service, className }: { service?: string; className?: string }) {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [config] = useLeadConfig();
  const [view, setView] = useState<"agentic" | "classic">("agentic");
  const [touched, setTouched] = useState(false);

  const ready = config.status === "ready" ? config.config : null;
  const canSwitch = ready?.mode === "both" && ready.fields.length > 0;
  const showChat = wantsChat(ready) && view === "agentic" && !touched;

  const classic = (
    <div className={cn("relative rounded-card bg-furnace/95 p-6 ring-1 ring-inset ring-ember-line sm:p-8 lg:p-10", className)}>
      {canSwitch && (
        <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
          <ModeSwitch
            view="classic"
            onChange={(next) => {
              setTouched(false);
              setView(next);
            }}
          />
        </div>
      )}
      <div onFocusCapture={() => setTouched(true)}>
        <LeadForm service={service} className={cn(canSwitch && "pt-10")} />
      </div>
    </div>
  );

  if (!showChat || !ready) return classic;

  return (
    <ChatBoundary fallback={classic}>
      <div
        className={cn(
          "chat-msg h-[min(40rem,calc(100dvh-6rem))] overflow-hidden rounded-card bg-furnace/95 ring-1 ring-inset ring-ember-line",
          className,
        )}
      >
        <ChatSurface
          config={ready}
          service={service}
          titleId={titleId}
          inputRef={inputRef}
          headerExtra={canSwitch ? <ModeSwitch view="agentic" onChange={setView} /> : undefined}
        />
      </div>
    </ChatBoundary>
  );
}

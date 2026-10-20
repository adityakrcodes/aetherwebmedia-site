"use client";

import { useEffect, useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";
import LeadForm from "./LeadForm";
import { leadForm } from "@/lib/site";

/**
 * The enquiry form in a modal, opened by any link with `data-lead` (its value, if any, pre-selects a service).
 * Those links point at the inline form (`#enquire`), which is where they go without JavaScript.
 * It stays mounted so a half-filled form survives closing, and so ClientEffects sees its `data-anim` pill.
 */
export default function LeadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState<string>();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-lead]");
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (link.dataset.lead) setService(link.dataset.lead);
      ref.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // A click on the backdrop closes it. Both ends of the click must be outside, so selecting text never does.
  const downOutside = useRef(false);
  const outside = (e: React.PointerEvent | React.MouseEvent) => e.target === e.currentTarget;

  return (
    <dialog
      ref={ref}
      aria-label={leadForm.title}
      onPointerDown={(e) => (downOutside.current = outside(e))}
      onClick={(e) => downOutside.current && outside(e) && ref.current?.close()}
      className="lead-dialog m-auto max-h-[calc(100dvh-1rem)] w-[min(44rem,calc(100%-1rem))] overflow-y-auto overscroll-contain rounded-stage bg-furnace p-0 text-ember ring-1 ring-inset ring-ember-line backdrop:bg-black/70"
    >
      <div className="relative p-6 pt-7 sm:p-10">
        <button
          type="button"
          aria-label="Close"
          onClick={() => ref.current?.close()}
          className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-ember-2 ring-1 ring-inset ring-ember-line transition-colors hover:bg-white/8 hover:text-ember sm:right-5 sm:top-5"
        >
          <IconX size={18} stroke={1.75} />
        </button>
        <LeadForm
          service={service}
          onDone={() => ref.current?.close()}
          className="mt-8"
          header={
            <div className="pr-12">
              <h2 className="text-[clamp(1.9rem,4.5vw,2.75rem)] font-medium leading-[1] tracking-[-0.045em]">
                {leadForm.title}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-ember-2">{leadForm.description}</p>
            </div>
          }
        />
      </div>
    </dialog>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const CAL_NAMESPACE = "schedule-a-call";

type CalApi = (action: string, payload?: unknown) => void;
let calPromise: Promise<CalApi> | null = null;

// Cal.com is only fetched when someone shows intent (hover, focus or click on a booking link).
function loadCal() {
  calPromise ??= import("@calcom/embed-react").then(async ({ getCalApi }) => {
    const cal = (await getCalApi({ namespace: CAL_NAMESPACE })) as unknown as CalApi;
    cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    return cal;
  });
  return calPromise;
}

/** Sets `data-<flag>` on every element matching `selector` the first time it enters the viewport. Returns a cleanup. */
function onceInView(selector: string, flag: string, options: IntersectionObserverInit) {
  const els = document.querySelectorAll<HTMLElement>(`${selector}:not([data-${flag}])`);
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => (el.dataset[flag] = ""));
    return () => {};
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      (entry.target as HTMLElement).dataset[flag] = "";
      io.unobserve(entry.target);
    }
  }, options);
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/**
 * Site-wide behaviour that needs the browser:
 * - any link with `data-cal="team/event"` opens the Cal.com booking modal (falls back to the plain link)
 * - any element with `data-reveal` fades up when it scrolls into view
 * - any element with `data-play` gets `data-playing` once it is well in view, to start a one-shot CSS sequence
 * - any element with `data-anim` only runs its CSS animations while it is on screen
 */
export default function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const target = (e: Event) => (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[data-cal]");

    const onClick = (e: MouseEvent) => {
      const link = target(e);
      if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const calLink = link.dataset.cal;
      loadCal()
        .then((cal) => cal("modal", { calLink, config: { layout: "month_view" } }))
        .catch(() => window.open(link.href, "_blank", "noopener"));
    };
    const warm = (e: Event) => {
      if (target(e)) loadCal().catch(() => {});
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("focusin", warm);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("focusin", warm);
    };
  }, []);

  useEffect(() => {
    const reveal = onceInView("[data-reveal]", "in", { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    // Sequences start later than reveals, once the element is well inside the viewport, so they are seen.
    const play = onceInView("[data-play]", "playing", { rootMargin: "0px 0px -30% 0px" });
    return () => {
      reveal();
      play();
    };
  }, [pathname]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-anim]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => (el.dataset.on = ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.dataset.on = "";
          else delete el.dataset.on;
        }
      },
      { rootMargin: "120px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

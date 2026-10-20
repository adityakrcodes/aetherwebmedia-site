"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
 * Site-wide behaviour that needs the browser (links with `data-lead` are handled by LeadDialog):
 * - any element with `data-reveal` fades up when it scrolls into view
 * - any element with `data-play` gets `data-playing` once it is well in view, to start a one-shot CSS sequence
 * - any element with `data-anim` only runs its CSS animations while it is on screen
 */
export default function ClientEffects() {
  const pathname = usePathname();

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

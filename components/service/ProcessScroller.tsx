"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Step = { title: string; body: string; deliverable: string; when: string };

const StepContext = createContext({ active: 0, count: 1 });

/** Current process step for the service visual. */
export const useStep = () => useContext(StepContext);

/**
 * A pinned visual that changes as the reader scrolls through the steps beside it.
 * The visual (a client component) reads the active step from context, so each service
 * page only ships the code for its own visual.
 */
export default function ProcessScroller({
  steps,
  visual,
  title,
}: {
  steps: Step[];
  visual: React.ReactNode;
  title: string;
}) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-step]");
    if (!items?.length) return;
    // A thin reading line just below the middle of the viewport. Any crossing triggers a recount,
    // so fast scrolls and anchor jumps that skip a whole step still land on the right one.
    // On phones the visual is pinned on top, so the line sits lower, under the panel.
    const at = window.matchMedia("(min-width: 1024px)").matches ? 0.58 : 0.8;
    const recount = () => {
      const line = window.innerHeight * at;
      let next = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) next = i;
      });
      setActive(next);
    };
    const pct = Math.round(at * 100);
    const io = new IntersectionObserver(recount, { rootMargin: `-${pct}% 0px -${99 - pct}% 0px` });
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-step="${i}"]`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.45;
    window.scrollTo({ top: y });
  };

  return (
    <StepContext.Provider value={{ active, count: steps.length }}>
      <div className="relative lg:grid lg:grid-cols-12 lg:gap-12">
        {/* On mobile the whole wrapper sticks; on desktop the inner panel does. */}
        <div className="sticky top-0 z-10 -mx-4 bg-paper px-4 pb-4 pt-[4.75rem] sm:-mx-6 sm:px-6 lg:static lg:order-2 lg:col-span-7 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0">
          <div className="lg:sticky lg:top-24">
            <div className="relative h-[46dvh] min-h-[19rem] overflow-hidden rounded-card bg-furnace text-ember shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] ring-1 ring-inset ring-ember-line lg:h-[min(calc(100dvh-8rem),40rem)]">
              <div className="dot-grid absolute inset-0 text-ember opacity-60" aria-hidden />
              <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between gap-4 sm:inset-x-6 sm:top-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember-2" aria-live="polite">
                  {String(active + 1).padStart(2, "0")} {steps[active].title}
                </p>
                <div className="flex gap-1" role="group" aria-label={`${title} steps`}>
                  {steps.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to step ${i + 1}: ${s.title}`}
                      aria-current={i === active ? "step" : undefined}
                      className="group grid size-6 place-items-center"
                    >
                      <span
                        className={cn(
                          "block h-1 rounded-full transition-all duration-500 ease-expo",
                          i === active ? "w-6 bg-ember" : i < active ? "w-2.5 bg-ember-2" : "w-2.5 bg-ember-3/60 group-hover:bg-ember-2",
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
              {visual}
            </div>
          </div>
        </div>

        {/* Inactive steps dim by color rather than opacity, so they stay readable. */}
        <ol ref={listRef} className="lg:order-1 lg:col-span-5">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-step={i}
              data-active={i === active}
              className="group flex min-h-[62dvh] flex-col justify-start py-6 lg:min-h-[78dvh] lg:justify-center lg:py-10"
            >
              <div className="flex items-center gap-3 text-sm text-ink-2">
                <span className="grid size-8 place-items-center rounded-full font-mono text-xs ring-1 ring-line transition-colors duration-500 group-data-[active=true]:bg-ink group-data-[active=true]:text-paper group-data-[active=true]:ring-ink">
                  {i + 1}
                </span>
                {s.when}
              </div>
              <h3 className="mt-5 text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1] tracking-[-0.045em] text-ink-3 transition-colors duration-500 group-data-[active=true]:text-ink">
                {s.title}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-3 transition-colors duration-500 group-data-[active=true]:text-ink-2">
                {s.body}
              </p>
              <p className="mt-6 inline-flex w-max items-center gap-2 rounded-full bg-paper-2 px-4 py-2 text-sm">
                <span className="text-ink-2">You get</span>
                <span className="font-medium">{s.deliverable}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </StepContext.Provider>
  );
}

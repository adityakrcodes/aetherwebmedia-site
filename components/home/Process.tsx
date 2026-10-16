import { Mark } from "@/components/brand/Mark";

const steps = [
  { title: "Free scoping call", body: "Thirty minutes on your goals, your users and your budget. No pitch deck required." },
  { title: "Written proposal", body: "Scope, timeline and price in writing before any work starts, so there are no surprises." },
  { title: "Design and build", body: "A preview link every week. You see real progress and steer while changes are cheap." },
  { title: "Launch and support", body: "We go live, train your team and stay on for fixes and improvements." },
];

/** Four steps joined by a fuse that burns left to right as the section scrolls into view. */
export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="container-x pb-28 md:pb-40">
      <h2
        id="process-heading"
        data-reveal
        className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
      >
        From first call to launch, <span className="text-ink-3">in four moves.</span>
      </h2>

      <div className="relative mt-16">
        {/* fuse (desktop) */}
        <div aria-hidden className="absolute inset-x-0 top-[1.1rem] hidden h-px bg-line md:block">
          <div className="fuse-burn h-px w-full bg-ink" />
          <span className="fuse-head absolute -top-[1.05rem] left-full -ml-2.5 hidden md:block">
            <Mark className="h-8 drop-shadow-[0_0_10px_rgb(255_255_255/0.9)]" />
          </span>
        </div>

        <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ "--d": i } as React.CSSProperties} className="relative pl-12 md:pl-0">
              {/* fuse (mobile) */}
              <span aria-hidden className="absolute bottom-[-3rem] left-[1.05rem] top-9 w-px bg-line md:hidden" />
              <span className="absolute left-0 top-0 grid size-9 place-items-center rounded-full bg-paper font-mono text-xs ring-1 ring-line md:relative">
                {i + 1}
              </span>
              <h3 className="text-xl font-medium tracking-[-0.03em] md:mt-8">{s.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-ink-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

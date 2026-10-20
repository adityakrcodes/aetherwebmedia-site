import { IconCheck, IconX } from "@tabler/icons-react";
import { StartProject } from "@/components/ui/Button";

const fit = [
  "You need a site or product that brings in customers, not just one that looks good.",
  "You want one team to plan, design and build it, start to finish.",
  "You have an MVP to launch and want real users in weeks, not quarters.",
  "You'd rather see a working preview every week than sit through status meetings.",
  "You want to own the code, designs and accounts outright.",
];

const notFit = [
  "You want the cheapest template that can go live by Friday.",
  "You want layers of account managers between you and the people doing the work.",
  "You want work to start before the scope is agreed in writing.",
];

/** Who the studio is for, and who it isn't. Saves both sides a call that goes nowhere. */
export default function Fit() {
  return (
    <section id="fit" aria-labelledby="fit-heading" className="container-x pb-28 md:pb-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2
              id="fit-heading"
              data-reveal
              className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
            >
              Who we're for, <span className="text-ink-3">and who we're not.</span>
            </h2>
            <p data-reveal style={{ "--d": 1 } as React.CSSProperties} className="mt-6 max-w-sm leading-relaxed text-ink-2">
              We'd rather tell you now than three weeks into a project. If the first list sounds like you, we should
              talk.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
          <article
            data-reveal
            className="flex flex-col rounded-card bg-furnace p-6 text-ember ring-1 ring-inset ring-ember-line sm:p-8"
          >
            <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">A good fit if</h3>
            <ul className="mt-6 space-y-4">
              {fit.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ember text-furnace">
                    <IconCheck size={14} stroke={2.25} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <StartProject tone="ember" />
            </div>
          </article>

          <article
            data-reveal
            style={{ "--d": 1 } as React.CSSProperties}
            className="flex flex-col rounded-card bg-paper-2 p-6 sm:mt-24 sm:p-8"
          >
            <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">Probably not if</h3>
            <ul className="mt-6 space-y-4">
              {notFit.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed text-ink-2">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ring-1 ring-inset ring-line">
                    <IconX size={14} stroke={2} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

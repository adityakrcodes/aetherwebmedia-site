import Link from "next/link";
import { IconArrowUpRight, IconCheck } from "@tabler/icons-react";
import type { Service } from "@/lib/services";
import { services } from "@/lib/services";
import { Stage, GiantWord } from "@/components/site/Stage";
import { StartProject, GhostLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export function ServiceHero({ s }: { s: Service }) {
  return (
    <Stage spread="wide" reach={0.5} className="min-h-[calc(100dvh-1rem)] sm:min-h-[calc(100dvh-1.5rem)]" labelledBy="service-heading">
      <div className="flex min-h-[calc(100dvh-1rem)] flex-col sm:min-h-[calc(100dvh-1.5rem)]">
        <div className="container-x relative z-10 grid flex-1 grid-cols-1 gap-10 pt-28 sm:pt-32 lg:grid-cols-12 lg:pt-36">
          <div className="lg:col-span-8">
            <nav aria-label="Breadcrumb" className="rise text-sm text-ember-2">
              <Link href="/services" className="hover:text-ember">
                Services
              </Link>
              <span className="px-2 text-ember-3">/</span>
              <span className="text-ember">{s.name}</span>
            </nav>
            <h1
              id="service-heading"
              className="rise mt-6 text-[clamp(2.6rem,5.8vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em]"
              style={{ "--d": 1 } as React.CSSProperties}
            >
              {s.headline[0]} <span className="text-ember-3">{s.headline[1]}</span>
            </h1>
            <p className="rise mt-7 max-w-lg text-lg leading-relaxed text-ember-2" style={{ "--d": 2 } as React.CSSProperties}>
              {s.intro}
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": 3 } as React.CSSProperties}>
              <StartProject tone="ember" service={s.name} />
              <GhostLink href="#process" tone="ember">
                How we work
              </GhostLink>
            </div>
          </div>

          <dl
            className="rise grid h-max grid-cols-3 gap-px self-start overflow-hidden rounded-card bg-ember-line ring-1 ring-ember-line lg:col-span-4 lg:mt-12 lg:grid-cols-1"
            style={{ "--d": 4 } as React.CSSProperties}
          >
            {s.facts.map((f) => (
              <div key={f.label} className="bg-furnace/90 p-4 sm:p-5">
                <dt className="text-xs text-ember-3 sm:text-sm">{f.label}</dt>
                <dd className="mt-1 text-lg font-medium tracking-[-0.03em] sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <GiantWord word={s.word} className="mt-10" />
      </div>
    </Stage>
  );
}

export function Builds({ s }: { s: Service }) {
  if (!s.builds) return null;
  return (
    <section aria-labelledby="builds-heading" className="container-x py-28 md:py-40">
      <h2 id="builds-heading" data-reveal className="max-w-5xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]">
        What we build. <span className="text-ink-3">Pick one, or a mix.</span>
      </h2>
      <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {s.builds.map((b, i) => (
          <li
            key={b.title}
            data-reveal
            style={{ "--d": i % 3 } as React.CSSProperties}
            className="group flex min-h-56 flex-col justify-between rounded-card bg-paper-2 p-6 transition-colors duration-500 ease-expo hover:bg-furnace hover:text-ember sm:p-7"
          >
            <span className="grid size-12 place-items-center rounded-full ring-1 ring-line transition-colors group-hover:ring-ember-line">
              <Icon name={b.icon} />
            </span>
            <div className="mt-10">
              <h3 className="text-xl font-medium tracking-[-0.03em]">{b.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2 transition-colors group-hover:text-ember-2">{b.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Outcomes({ s }: { s: Service }) {
  return (
    <section aria-labelledby="outcomes-heading" className={cn("container-x pb-28 md:pb-40", !s.builds && "pt-28 md:pt-40")}>
      <div className="grid gap-12 lg:grid-cols-12">
        <h2
          id="outcomes-heading"
          data-reveal
          className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em] lg:col-span-4"
        >
          What you can <span className="text-ink-3">count on.</span>
        </h2>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {s.outcomes.map((o, i) => (
            <li key={o.title} data-reveal style={{ "--d": i % 2 } as React.CSSProperties} className="flex gap-5 border-t border-line py-7">
              <Icon name={o.icon} size={24} className="mt-0.5 shrink-0" />
              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{o.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-2">{o.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Included({ s }: { s: Service }) {
  return (
    <section aria-labelledby="included-heading" className="container-x py-28 md:py-40">
      <div className="rounded-stage bg-paper-2 p-6 sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="included-heading" data-reveal className="text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.045em]">
              Included in every project.
            </h2>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {s.included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-paper">
                    <IconCheck size={12} stroke={3} />
                  </span>
                  <span className="text-ink-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm text-ink-2">Tools and stack we use</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <li key={t} className="rounded-full bg-paper px-4 py-2 text-sm ring-1 ring-line">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-2">
              We pick tools for your problem and your team, not for our portfolio. Prefer something else? Tell us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Plans({ s }: { s: Service }) {
  return (
    <section id="packages" aria-labelledby="plans-heading" className="container-x pb-28 md:pb-40">
      <h2 id="plans-heading" data-reveal className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]">
        {s.plans ? (
          <>
            Packages that start <span className="text-ink-3">where you are.</span>
          </>
        ) : (
          <>
            Shaped to <span className="text-ink-3">your scope.</span>
          </>
        )}
      </h2>

      {s.plans ? (
        <>
          <ul className="mt-14 grid gap-3 lg:grid-cols-3">
            {s.plans.map((p, i) => (
              <li
                key={p.name}
                data-reveal
                style={{ "--d": i } as React.CSSProperties}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-card p-7 sm:p-8",
                  p.featured ? "bg-furnace text-ember lg:-my-4 lg:py-12" : "bg-paper-2",
                )}
              >
                {p.featured && (
                  <div aria-hidden data-anim className="streaks opacity-25">
                    <i />
                    <i />
                    <i />
                  </div>
                )}
                <div className="relative flex items-center justify-between gap-4">
                  <h3 className="text-xl font-medium tracking-[-0.03em]">{p.name}</h3>
                  {p.featured && <span className="chip chip-muted text-ember-2">Most chosen</span>}
                </div>
                <p className={cn("relative mt-3 leading-relaxed", p.featured ? "text-ember-2" : "text-ink-2")}>{p.summary}</p>
                <ul className={cn("relative mt-8 space-y-3 border-t pt-8", p.featured ? "border-ember-line" : "border-line")}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.95rem]">
                      <Mark className="mt-1 h-3.5" />
                      <span className={p.featured ? "text-ember-2" : "text-ink-2"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <p className={cn("relative mt-8 text-sm", p.featured ? "text-ember-3" : "text-ink-3")}>Best for: {p.bestFor}</p>
                <div className="relative mt-6 pt-2">
                  <StartProject tone={p.featured ? "ember" : "ink"} service={s.name} className="w-full justify-start" />
                </div>
              </li>
            ))}
          </ul>
          <p data-reveal className="mt-10 text-center text-sm text-ink-2">
            Every package is tailored after a free call. Your proposal sets out the exact scope and timeline before anything begins.
          </p>
        </>
      ) : (
        s.quote && (
          <div data-reveal className="mt-14 grid gap-10 rounded-card bg-furnace p-7 text-ember sm:p-10 lg:grid-cols-2 lg:p-14">
            <div>
              <p className="text-3xl font-medium tracking-[-0.04em]">{s.quote.title}</p>
              <p className="mt-4 max-w-md leading-relaxed text-ember-2">{s.quote.body}</p>
              <div className="mt-8">
                <StartProject tone="ember" service={s.name} />
              </div>
            </div>
            <div>
              <p className="text-sm text-ember-3">Common projects</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.quote.examples.map((e) => (
                  <li key={e} className="rounded-full px-4 py-2 text-sm ring-1 ring-ember-line">
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </section>
  );
}

export function OtherServices({ current }: { current: string }) {
  const others = services.filter((s) => s.slug !== current);
  return (
    <section aria-labelledby="others-heading" className="container-x pb-28 md:pb-36">
      <h2 id="others-heading" className="text-sm text-ink-2">
        More from {site.short}
      </h2>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group flex h-full items-center justify-between gap-3 rounded-full bg-paper-2 py-2 pl-5 pr-2 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              <span className="text-[0.95rem] font-medium">{s.name}</span>
              <span className="grid size-9 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 ease-expo group-hover:rotate-45">
                <IconArrowUpRight size={16} stroke={1.75} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

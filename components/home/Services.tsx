import Link from "next/link";
import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { services } from "@/lib/services";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils";

const core = services.filter((s) => s.featured);
const more = services.filter((s) => !s.featured);

/** Visual treatment for each of the four supporting services, after the Kinetic staggered cards. */
const moreStyles: Record<string, { card: string; offset: string; art: React.ReactNode }> = {
  "app-development": {
    card: "bg-furnace text-ember",
    offset: "lg:mt-0",
    art: (
      <Image
        src="/images/work/wander-app.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 25vw, 90vw"
        className="object-cover opacity-55 grayscale transition-transform duration-700 ease-expo group-hover:scale-105"
      />
    ),
  },
  "ui-ux-design": {
    card: "bg-furnace-2 text-ember",
    offset: "lg:mt-20",
    art: (
      <div className="streaks">
        <i />
        <i />
        <i />
      </div>
    ),
  },
  branding: {
    card: "bg-paper-3 text-ink",
    offset: "lg:mt-8",
    art: (
      <Mark className="absolute -right-6 -top-4 h-56 opacity-[0.09] transition-transform duration-700 ease-expo group-hover:-translate-y-2" />
    ),
  },
  "growth-marketing": {
    card: "bg-paper-2 text-ink",
    offset: "lg:mt-28",
    art: (
      <svg viewBox="0 0 200 120" aria-hidden className="absolute inset-x-6 top-14 w-[calc(100%-3rem)] opacity-25">
        <path d="M0 110 C 40 104, 60 96, 90 78 S 140 40, 200 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="200" cy="8" r="4" fill="currentColor" />
      </svg>
    ),
  },
};

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="container-x pb-28 md:pb-40">
      <h2
        id="services-heading"
        data-reveal
        className="max-w-5xl text-[clamp(2.4rem,5.4vw,5rem)] font-medium leading-[0.98] tracking-[-0.05em]"
      >
        Two things we do best. <span className="text-ink-3">Four that make them better.</span>
      </h2>

      {/* Core services: web and software get the big cards. */}
      <div className="mt-14 grid gap-3 lg:grid-cols-12">
        {core.map((s, i) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            data-reveal
            style={{ "--d": i } as React.CSSProperties}
            className={cn(
              "group relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-card p-6 sm:p-8 lg:min-h-[34rem]",
              i === 0 ? "bg-furnace text-ember lg:col-span-7" : "bg-furnace-2 text-ember lg:col-span-5",
            )}
          >
            {i === 0 ? (
              <div aria-hidden className="absolute inset-x-6 top-20 -z-10 h-[62%] sm:inset-x-8 lg:top-24">
                {["maestro", "abnb", "apex"].map((w, k) => (
                  <div
                    key={w}
                    className="absolute left-1/2 top-0 aspect-[16/10] w-[78%] overflow-hidden rounded-xl ring-1 ring-white/10 transition-transform duration-700 ease-expo"
                    style={{
                      transform: `translateX(-50%) translateY(${k * 9}%) rotate(${(k - 1) * 4}deg) scale(${0.88 + k * 0.06})`,
                      zIndex: k,
                    }}
                  >
                    <Image
                      src={`/images/work/${w}.webp`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 80vw"
                      className="object-cover object-top grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                    />
                  </div>
                ))}
                <div className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-furnace to-transparent" />
              </div>
            ) : (
              <div aria-hidden className="absolute inset-0 -z-10">
                <div className="streaks opacity-70">
                  <i />
                  <i />
                  <i />
                </div>
                <pre className="absolute right-6 top-20 font-mono text-[11px] leading-5 text-ember-3 sm:right-8">
                  {`git commit -m "auth: roles"\ngit commit -m "billing: stripe"\ngit commit -m "dashboard: v1"\ngit tag v1.0.0`}
                </pre>
              </div>
            )}

            <span className="chip chip-muted w-max text-ember-2">{s.category}</span>

            <div className="relative z-20 flex items-end justify-between gap-6">
              <div>
                <h3 className="flex items-center gap-2.5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  <Mark className="h-6" />
                  {s.name}
                </h3>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ember-2">{s.summary}</p>
              </div>
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ember text-furnace transition-transform duration-500 ease-expo group-hover:rotate-45">
                <IconArrowUpRight size={20} stroke={1.75} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Supporting services, staggered. */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {more.map((s, i) => {
          const style = moreStyles[s.slug];
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
              className={cn(
                "group relative isolate flex min-h-[22rem] flex-col justify-between overflow-hidden rounded-card p-6",
                style.card,
                style.offset,
              )}
            >
              <div aria-hidden className="absolute inset-0 -z-10">
                {style.art}
              </div>
              <span className="chip chip-muted w-max">{s.category}</span>
              <div>
                <Mark className="h-4" />
                <h3 className="mt-3 text-xl font-medium leading-tight tracking-[-0.03em]">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{s.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { services } from "@/lib/services";
import { Stage } from "@/components/site/Stage";
import { Mark } from "@/components/brand/Mark";
import { CtaStage } from "@/components/site/Stage";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, software and SaaS development, mobile apps, UI/UX design, branding and SEO. One studio, from first idea to growth.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <>
      <Stage spread="center" reach={0.55} labelledBy="services-index-heading">
        <div className="container-x pb-40 pt-32 sm:pt-40 lg:pb-56">
          <h1
            id="services-index-heading"
            className="rise max-w-5xl text-[clamp(2.75rem,7vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.05em]"
          >
            Everything it takes <span className="text-ember-3">to launch and grow online.</span>
          </h1>
          <p className="rise mt-7 max-w-lg text-lg text-ember-2" style={{ "--d": 1 } as React.CSSProperties}>
            Websites and software are our core. Design, branding and marketing make them work harder.
          </p>
        </div>
      </Stage>

      <section aria-label="All services" className="container-x py-24 md:py-32">
        <ul>
          {services.map((s, i) => (
            <li key={s.slug} data-reveal style={{ "--d": i % 3 } as React.CSSProperties} className="border-b border-line first:border-t">
              <Link
                href={`/services/${s.slug}`}
                className="group -mx-4 grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 rounded-card px-4 py-8 transition-colors duration-300 ease-expo hover:bg-furnace hover:text-ember sm:-mx-6 sm:px-6 md:grid-cols-[3rem_1.2fr_1.5fr_auto] md:py-10"
              >
                <span className="font-mono text-sm text-ink-3 group-hover:text-ember-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-3 text-3xl font-medium tracking-[-0.04em] md:text-5xl">
                  {s.featured && <Mark className="h-6 md:h-8" />}
                  {s.name}
                </span>
                <span
                  className={cn(
                    "col-span-3 col-start-1 text-ink-2 group-hover:text-ember-2 md:col-span-1 md:col-start-auto",
                  )}
                >
                  {s.summary}
                </span>
                <span className="col-start-3 row-start-1 grid size-12 place-items-center rounded-full ring-1 ring-line transition-transform duration-500 ease-expo group-hover:rotate-45 group-hover:ring-ember-line md:col-start-auto md:row-start-auto">
                  <IconArrowUpRight size={20} stroke={1.75} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaStage />
    </>
  );
}

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const rows = [
  { name: "Websites", body: "Landing pages, marketing sites and online stores.", price: "$500", href: "/services/web-development" },
  { name: "Software and SaaS", body: "MVPs, internal tools and custom platforms.", price: "$1,000", href: "/services/software-development" },
  { name: "Mobile apps", body: "iOS and Android from a single codebase.", price: "$1,000", href: "/services/app-development" },
  { name: "Design, brand and marketing", body: "Scoped to your goals after a short call.", price: null, href: "/services/ui-ux-design" },
];

/** Starting prices as full-width rows that invert on hover. */
export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="container-x pb-28 md:pb-40">
      <h2
        id="pricing-heading"
        data-reveal
        className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
      >
        Clear starting prices.
      </h2>
      <p data-reveal className="mt-5 max-w-lg text-lg text-ink-2">
        Every project gets a written quote after a free call. These are the floors, not the fine print.
      </p>

      <ul className="mt-12 border-t border-line">
        {rows.map((r, i) => (
          <li key={r.name} data-reveal style={{ "--d": i } as React.CSSProperties} className="border-b border-line">
            <Link
              href={r.href}
              className="group -mx-4 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 rounded-card px-4 py-7 transition-colors duration-300 ease-expo hover:bg-furnace hover:text-ember sm:-mx-6 sm:px-6 md:grid-cols-[1.1fr_1.4fr_auto_auto] md:py-9"
            >
              <span className="col-start-1 row-start-1 text-2xl font-medium tracking-[-0.035em] md:col-auto md:row-auto md:text-3xl">{r.name}</span>
              <span className="col-span-2 row-start-2 text-ink-2 transition-colors group-hover:text-ember-2 md:col-span-1 md:row-start-auto">
                {r.body}
              </span>
              <span className="col-start-2 row-start-1 text-right md:col-auto md:row-auto">
                {r.price ? (
                  <>
                    <span className="block text-xs text-ink-3 group-hover:text-ember-3">from</span>
                    <span className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">{r.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-medium">Custom quote</span>
                )}
              </span>
              <span className="hidden size-11 place-items-center rounded-full ring-1 ring-line transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:ring-ember-line md:grid">
                <IconArrowRight size={18} stroke={1.75} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

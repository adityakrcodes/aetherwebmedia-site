import Image from "next/image";
import {
  IconBrandFigma,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandNotion,
  IconBrandOpenai,
  IconBrandWebflow,
  IconBrandSlack,
  IconBrandStripe,
  IconBrandVercel,
  IconBrandWordpress,
  IconPointerFilled,
} from "@tabler/icons-react";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils";

const BARS = [22, 30, 26, 38, 34, 46, 40, 52, 47, 58, 54, 66, 61, 72, 69, 80, 76, 88];

function Card({
  title,
  body,
  children,
  className,
  d = 0,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  d?: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--d": d } as React.CSSProperties}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-card bg-furnace p-6 text-ember ring-1 ring-inset ring-ember-line sm:p-8",
        className,
      )}
    >
      {children}
      <div className="mt-auto pt-8">
        <h3 className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">{title}</h3>
        <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-ember-2">{body}</p>
      </div>
    </article>
  );
}

export default function WhatYouGet() {
  return (
    <section aria-labelledby="get-heading" className="container-x pb-28 md:pb-40">
      <h2
        id="get-heading"
        data-reveal
        className="mx-auto max-w-3xl text-center text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
      >
        What you get <span className="text-ink-3">when you work with us.</span>
      </h2>

      <div data-anim className="mt-14 grid gap-3 md:grid-cols-6">
        {/* Built to convert: growth bars */}
        <Card
          className="md:col-span-3 lg:col-span-2"
          title="Built to convert"
          body="Every page is structured around one goal: getting the visitor to take the next step."
        >
          <div aria-hidden className="rounded-2xl bg-furnace-2 p-5 ring-1 ring-ember-line">
            <p className="text-sm text-ember-2">Inquiries</p>
            <div className="grow-bars mt-4 flex h-28 items-end gap-[5px]">
              {BARS.map((h, i) => (
                <i
                  key={i}
                  className={cn("w-full rounded-full", i > 13 ? "bg-ember" : "bg-ember-3")}
                  style={{ height: `${h}%`, "--i": i } as React.CSSProperties}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-between font-mono text-[10px] text-ember-3">
              <span>Launch</span>
              <span>Month 2</span>
              <span>Today</span>
            </div>
          </div>
        </Card>

        {/* Weekly previews: notification stack */}
        <Card
          className="md:col-span-3 lg:col-span-2"
          d={1}
          title="A preview link every week"
          body="You see real progress and steer early, instead of waiting for a big reveal at the end."
        >
          <div aria-hidden className="notif-stack relative mx-auto h-[10.5rem] w-full max-w-xs">
            {[
              { title: "Homepage v3 is ready", meta: "Preview, today 11:50" },
              { title: "Checkout flow shipped", meta: "Preview, Friday 16:20" },
              { title: "Speed pass complete", meta: "Preview, Monday 10:05" },
            ].map((n, i) => (
              <div
                key={n.title}
                className="notif absolute inset-x-0 top-6 flex items-center gap-4 rounded-2xl bg-furnace-2 p-3.5 ring-1 ring-ember-line"
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-furnace ring-1 ring-ember-line">
                  <Mark className="h-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ember-2">
                    <span className="size-1.5 rounded-full bg-ember" />
                    New
                  </span>
                  <span className="block truncate text-[0.95rem] font-medium">{n.title}</span>
                  <span className="block text-xs text-ember-3">{n.meta}</span>
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Scales: line with a travelling ember */}
        <Card
          className="md:col-span-6 lg:col-span-2"
          d={2}
          title="Scales as you grow"
          body="Clean, typed code and solid hosting that keep up with your traffic and your team."
        >
          <div aria-hidden className="relative h-44 [container-type:size]">
            <div className="absolute inset-x-0 top-1/2 flex justify-between font-mono text-[11px] text-ember-3/60">
              {["10", "100", "1k", "10k", "100k"].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
            {/* The curve's 300x170 box, fitted like the SVG's default "meet", so the comet can move across it in % */}
            <div className="absolute left-1/2 top-1/2 h-[min(100cqh,100cqw*170/300)] w-[min(100cqw,100cqh*300/170)] -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 300 170" className="absolute inset-0 h-full w-full overflow-visible">
                <path
                  d="M8 162 C 70 150, 96 140, 128 118 S 168 96, 196 74 S 250 30, 292 6"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="comet absolute inset-0">
                <i />
              </span>
            </div>
          </div>
        </Card>

        {/* Integrations */}
        <Card
          className="md:col-span-6 lg:col-span-3"
          d={0}
          title="Fits the tools you already use"
          body="Payments, CRMs, CMSs, chat and AI services, connected properly."
        >
          <ul aria-label="Tools we integrate with" className="flex max-w-md flex-wrap gap-2.5 sm:gap-3">
            {[
              { Icon: IconBrandStripe, label: "Stripe" },
              { Icon: IconBrandWebflow, label: "Shopify" },
              { Icon: IconBrandFigma, label: "Figma" },
              { Icon: IconBrandNotion, label: "Notion" },
              { Icon: IconBrandSlack, label: "Slack" },
              { Icon: IconBrandGithub, label: "GitHub" },
              { Icon: IconBrandWordpress, label: "WordPress" },
              { Icon: IconBrandGoogle, label: "Google" },
              { Icon: IconBrandOpenai, label: "OpenAI" },
              { Icon: IconBrandVercel, label: "Vercel" },
            ].map(({ Icon, label }, i) => (
              <li
                key={label}
                title={label}
                className="grid size-14 place-items-center rounded-full bg-furnace-2 sm:size-16 ring-1 ring-ember-line transition-transform duration-500 ease-expo hover:-translate-y-1"
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                <Icon size={26} stroke={1.5} aria-label={label} />
              </li>
            ))}
          </ul>
        </Card>

        {/* Direct line to the founders */}
        <Card
          className="md:col-span-6 lg:col-span-3"
          d={1}
          title="A direct line to the builders"
          body="You talk to the founders who design and write your code. No account managers in between."
        >
          <div aria-hidden className="relative flex h-32 items-center">
            <div className="flex -space-x-4">
              {[
                { src: "/images/team/aditya.webp", ring: "ring-ember" },
                { src: "/images/team/nikhil.webp", ring: "ring-ember-2" },
              ].map((p) => (
                <span key={p.src} className={cn("relative size-24 overflow-hidden rounded-full ring-2 ring-offset-4 ring-offset-furnace", p.ring)}>
                  <Image src={p.src} alt="" fill sizes="96px" className="object-cover grayscale" />
                </span>
              ))}
              <span className="size-24 rounded-full border border-dashed border-ember-3/60" />
            </div>
            <div className="cursor-tag absolute left-[9.5rem] top-[4.4rem] flex items-start gap-0.5">
              <IconPointerFilled size={18} className="-rotate-12 text-ember" />
              <span className="mt-4 rounded-full bg-ember px-2.5 py-1 text-xs font-medium text-furnace">Aditya</span>
            </div>
          </div>
        </Card>
      </div>

      <ul data-reveal className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
        {[
          "Free scoping call",
          "Written proposal",
          "You own the code",
          "SEO-ready from day one",
          "NDA on request",
          "Post-launch support",
          "Docs and handover",
        ].map((c) => (
          <li key={c} className="flex items-center gap-2 rounded-full bg-paper-2 px-4 py-2.5 text-sm text-ink-2">
            <Mark className="h-3.5 text-ink" />
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}

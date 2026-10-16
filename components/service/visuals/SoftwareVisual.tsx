"use client";

import { IconBrandStripe, IconCheck, IconLock, IconMail, IconChartLine } from "@tabler/icons-react";
import { useStep } from "../ProcessScroller";
import { Canvas, Layer } from "./shared";
import { cn } from "@/lib/utils";

const NODES = ["spec", "schema", "sprints", "connect", "tests", "v1.0.0"];
const Y = (i: number) => 24 + i * 62;

/** Software: a commit graph that grows with each step, next to the artifact that step produces. */
export default function SoftwareVisual() {
  const { active: a } = useStep();
  const progress = Y(a) - Y(0);

  return (
    <Canvas className="grid grid-cols-1 gap-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      {/* commit graph */}
      <svg viewBox="0 0 150 360" className="hidden h-full w-full text-ember sm:block" preserveAspectRatio="xMinYMid meet">
        <line x1="60" y1={Y(0)} x2="60" y2={Y(5)} stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
        <line
          x1="60"
          y1={Y(0)}
          x2="60"
          y2={Y(5)}
          stroke="currentColor"
          strokeWidth="2"
          pathLength={Y(5) - Y(0)}
          strokeDasharray={Y(5) - Y(0)}
          className="transition-[stroke-dashoffset] duration-700 ease-expo"
          style={{ strokeDashoffset: Y(5) - Y(0) - progress }}
        />
        {/* feature branch during sprints and integrations */}
        <path
          d={`M60 ${Y(2)} C 22 ${Y(2) + 10}, 22 ${Y(2) + 20}, 22 ${Y(2) + 40} V ${Y(4) - 40} C 22 ${Y(4) - 20}, 22 ${Y(4) - 10}, 60 ${Y(4)}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className={cn("transition-opacity duration-700", a >= 2 ? "opacity-60" : "opacity-0")}
        />
        {[Y(2) + 50, Y(3), Y(3) + 34].map((y, i) => (
          <circle
            key={y}
            cx="22"
            cy={y}
            r="4"
            fill="currentColor"
            className="transition-opacity duration-500"
            style={{ opacity: a >= 2 + (i > 0 ? 1 : 0) ? 0.7 : 0, transitionDelay: `${i * 150}ms` }}
          />
        ))}
        {NODES.map((label, i) => (
          <g key={label} className="transition-opacity duration-500" style={{ opacity: a >= i ? 1 : 0.3 }}>
            <circle cx="60" cy={Y(i)} r={i === a ? 8 : 6} fill={a >= i ? "currentColor" : "#161616"} stroke="currentColor" strokeWidth="1.5" className="transition-all duration-500" />
            {i === a && <circle cx="60" cy={Y(i)} r="14" fill="none" stroke="currentColor" strokeOpacity="0.3" className="animate-ping origin-center [transform-box:fill-box]" />}
            <text x="80" y={Y(i) + 4} fontSize="12" fill="currentColor" fontFamily="var(--font-geist-mono)">
              {label}
            </text>
          </g>
        ))}
      </svg>

      {/* artifact for the current step */}
      <div className="relative">
        {/* 0. spec */}
        <Layer show={a === 0} className="inset-0 flex flex-col justify-center">
          <Panel title="product-spec.md">
            {[
              ["Sign up with email or Google", true],
              ["Create and share projects", true],
              ["Invite teammates", true],
              ["Pay monthly with Stripe", true],
              ["Native mobile app", false],
            ].map(([t, inScope]) => (
              <li key={t as string} className={cn("flex items-center gap-2.5 text-[12px]", !inScope && "text-ember-3 line-through")}>
                <span className={cn("grid size-4 place-items-center rounded", inScope ? "bg-ember text-furnace" : "ring-1 ring-ember-3")}>
                  {inScope && <IconCheck size={11} stroke={3} />}
                </span>
                {t as string}
                {!inScope && <span className="ml-auto font-mono text-[10px] no-underline">v2</span>}
              </li>
            ))}
          </Panel>
        </Layer>

        {/* 1. schema */}
        <Layer show={a === 1} className="inset-0 flex flex-col justify-center gap-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {[
              { name: "users", fields: [["id", ""], ["email", ""], ["role", ""]] },
              { name: "projects", fields: [["id", ""], ["owner_id", "users"], ["name", ""]] },
              { name: "subscriptions", fields: [["id", ""], ["user_id", "users"], ["plan", ""]] },
            ].map((t, i) => (
              <div key={t.name} className={cn("overflow-hidden rounded-lg bg-furnace-2 ring-1 ring-ember-line", i === 2 && "col-span-2 lg:col-span-1")}>
                <p className="border-b border-ember-line bg-furnace-3 px-3 py-1.5 font-mono text-[11px] text-ember">{t.name}</p>
                <ul className="space-y-1 px-3 py-2 font-mono text-[10px] text-ember-2">
                  {t.fields.map(([f, ref]) => (
                    <li key={f} className="flex justify-between gap-2">
                      {f}
                      {ref && <span className="text-ember-3">→ {ref}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Next.js", "PostgreSQL", "Prisma", "Stripe", "Vercel"].map((t) => (
              <span key={t} className="rounded-full px-2.5 py-1 font-mono text-[10px] text-ember-2 ring-1 ring-ember-line">
                {t}
              </span>
            ))}
          </div>
        </Layer>

        {/* 2. sprint board */}
        <Layer show={a === 2} className="inset-0 flex items-center">
          <div className="grid w-full grid-cols-3 gap-2">
            {["To do", "Doing", "Done"].map((col, c) => (
              <div key={col} className="min-h-48 rounded-lg bg-furnace-2 p-2 ring-1 ring-ember-line">
                <p className="mb-2 font-mono text-[10px] text-ember-3">{col}</p>
                <div className="space-y-1.5">
                  {(c === 0 ? ["Team roles", "Exports"] : c === 1 ? ["Billing"] : ["Auth", "Projects", "Invites"]).map((card, k) => (
                    <div
                      key={card}
                      className={cn(
                        "rounded-md bg-furnace-3 px-2 py-1.5 text-[11px]",
                        c === 1 && "sprint-card ring-1 ring-ember/40",
                      )}
                      style={{ animationDelay: `${k * 200}ms` }}
                    >
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Layer>

        {/* 3. integrations hub */}
        <Layer show={a === 3} className="inset-0 grid place-items-center">
          <div className="relative size-60">
            <svg viewBox="0 0 240 240" className="absolute inset-0 text-ember">
              {[
                [120, 24],
                [216, 120],
                [120, 216],
                [24, 120],
              ].map(([x, y]) => (
                <line key={`${x}${y}`} x1="120" y1="120" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.4" strokeDasharray="2 6" className="flow-line" />
              ))}
            </svg>
            <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-ember text-center font-mono text-[11px] font-medium text-furnace">
              your API
            </span>
            {[
              { Icon: IconBrandStripe, label: "Billing", cls: "left-1/2 top-0 -translate-x-1/2" },
              { Icon: IconLock, label: "Auth", cls: "right-0 top-1/2 -translate-y-1/2" },
              { Icon: IconMail, label: "Email", cls: "bottom-0 left-1/2 -translate-x-1/2" },
              { Icon: IconChartLine, label: "Analytics", cls: "left-0 top-1/2 -translate-y-1/2" },
            ].map(({ Icon, label, cls }) => (
              <span key={label} className={cn("absolute grid size-12 place-items-center rounded-full bg-furnace-2 ring-1 ring-ember-line", cls)} title={label}>
                <Icon size={20} stroke={1.5} />
              </span>
            ))}
          </div>
        </Layer>

        {/* 4. tests */}
        <Layer show={a === 4} className="inset-0 flex flex-col justify-center">
          <Panel title="npm test">
            {["auth  sign up and log in", "billing  upgrade plan", "projects  invite member", "api  rate limits", "e2e  checkout flow"].map((t, i) => (
              <li
                key={t}
                className="flex items-center gap-2.5 font-mono text-[11px] transition-opacity duration-500"
                style={{ opacity: a === 4 ? 1 : 0, transitionDelay: `${i * 180 + 200}ms` }}
              >
                <IconCheck size={13} stroke={2.5} className="text-ember" />
                <span className="text-ember-2">{t}</span>
              </li>
            ))}
            <li
              className="mt-2 border-t border-ember-line pt-2 font-mono text-[11px] text-ember transition-opacity duration-500"
              style={{ opacity: a === 4 ? 1 : 0, transitionDelay: "1200ms" }}
            >
              All checks passed
            </li>
          </Panel>
        </Layer>

        {/* 5. release */}
        <Layer show={a === 5} className="inset-0 flex flex-col justify-center gap-3">
          <div className="rounded-xl bg-furnace-2 p-4 ring-1 ring-ember-line">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-ember-2">production</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ember px-2 py-0.5 text-[10px] font-medium text-furnace">
                <span className="size-1.5 animate-pulse rounded-full bg-furnace" /> Live
              </span>
            </div>
            <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">v1.0.0</p>
            <div className="mt-3 flex h-6 items-end gap-[3px]">
              {Array.from({ length: 30 }, (_, i) => (
                <span key={i} className="h-full flex-1 rounded-sm bg-ember/70" />
              ))}
            </div>
            <p className="mt-1.5 font-mono text-[10px] text-ember-3">uptime, last 30 days</p>
          </div>
          <div className="rounded-xl bg-furnace-2 p-4 ring-1 ring-ember-line">
            <p className="font-mono text-[11px] text-ember-2">next: v1.1</p>
            <ul className="mt-2 space-y-1 text-[12px] text-ember-2">
              <li>Team roles, from beta feedback</li>
              <li>CSV exports</li>
            </ul>
          </div>
        </Layer>
      </div>
    </Canvas>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-furnace-2 ring-1 ring-ember-line">
      <p className="border-b border-ember-line px-4 py-2 font-mono text-[11px] text-ember-2">{title}</p>
      <ul className="space-y-2.5 p-4">{children}</ul>
    </div>
  );
}

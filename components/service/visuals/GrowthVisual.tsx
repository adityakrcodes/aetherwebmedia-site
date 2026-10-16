"use client";

import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import { useStep } from "../ProcessScroller";
import { Canvas, Layer } from "./shared";
import { cn } from "@/lib/utils";

const RESULTS = ["competitor-one.com", "directory-site.com", "competitor-two.com", "review-hub.com"];

/** Growth: audit, funnel, a search result climbing, live ads, measurement and scaled spend. */
export default function GrowthVisual() {
  const { active: a } = useStep();
  const rank = a >= 2 ? 0 : 4;

  return (
    <Canvas>
      {/* 0. audit */}
      <Layer show={a === 0} className="inset-0 flex items-center">
        <ul className="w-full space-y-2 rounded-xl bg-furnace-2 p-4 ring-1 ring-ember-line">
          {[
            ["Page speed on mobile", false],
            ["Meta titles and descriptions", false],
            ["Google Business profile", true],
            ["Conversion tracking", false],
            ["Ad account structure", false],
          ].map(([t, ok], i) => (
            <li
              key={t as string}
              className="flex items-center justify-between gap-3 border-b border-ember-line pb-2 text-[12px] transition-opacity duration-500 last:border-0 last:pb-0"
              style={{ opacity: a === 0 ? 1 : 0, transitionDelay: `${i * 150 + 150}ms` }}
            >
              <span className="text-ember-2">{t as string}</span>
              <span className={cn("grid size-5 place-items-center rounded-full", ok ? "bg-ember text-furnace" : "ring-1 ring-ember-3 text-ember-2")}>
                {ok ? <IconCheck size={12} stroke={3} /> : <IconX size={11} stroke={2.5} />}
              </span>
            </li>
          ))}
        </ul>
      </Layer>

      {/* 1. funnel */}
      <Layer show={a === 1} className="inset-0 flex flex-col items-center justify-center gap-1.5">
        {[
          ["Awareness", "SEO, Meta Ads", "92%"],
          ["Consideration", "Content, retargeting", "70%"],
          ["Conversion", "Google Ads, landing pages", "48%"],
        ].map(([stage, channels, w], i) => (
          <div
            key={stage}
            className="flex h-14 items-center justify-between rounded-lg px-4 text-[12px] transition-all duration-700 ease-expo"
            style={{ width: w, background: `rgb(255 255 255 / ${0.08 + i * 0.1})`, transitionDelay: `${i * 120}ms` }}
          >
            <span className="font-medium">{stage}</span>
            <span className="hidden font-mono text-[10px] text-ember-2 sm:inline">{channels}</span>
          </div>
        ))}
      </Layer>

      {/* 2. search results with your page climbing */}
      <Layer show={a === 2} className="inset-0 flex flex-col">
        <div className="flex items-center gap-2 rounded-full bg-furnace-2 px-4 py-2.5 text-[12px] text-ember-2 ring-1 ring-ember-line">
          <IconSearch size={14} /> your service in your city
        </div>
        <div className="relative mt-4 flex-1">
          {RESULTS.map((r, i) => (
            <div
              key={r}
              className="absolute inset-x-0 h-[17%] rounded-lg bg-furnace-2/70 px-3 py-2 transition-[top] duration-1000 ease-expo"
              style={{ top: `${(rank === 0 ? i + 1 : i) * 20}%` }}
            >
              <p className="font-mono text-[10px] text-ember-3">{r}</p>
              <div className="mt-1.5 h-2 w-2/3 rounded bg-ember-3/40" />
            </div>
          ))}
          <div
            className="absolute inset-x-0 h-[17%] rounded-lg bg-ember px-3 py-2 text-furnace shadow-[0_0_30px_rgb(255_255_255/0.2)] transition-[top] duration-1000 ease-expo"
            style={{ top: `${rank * 20}%`, transitionDelay: "250ms" }}
          >
            <p className="font-mono text-[10px]">yourbrand.com</p>
            <p className="mt-0.5 text-[12px] font-medium">The page your buyers were looking for</p>
          </div>
        </div>
      </Layer>

      {/* 3. ads */}
      <Layer show={a === 3} className="inset-0 grid grid-cols-5 items-center gap-3">
        <div className="col-span-3 rounded-xl bg-furnace-2 p-4 ring-1 ring-ember-line">
          <p className="font-mono text-[10px] text-ember-3">Sponsored, yourbrand.com</p>
          <p className="mt-1.5 text-sm font-medium">Get a quote in 24 hours</p>
          <p className="mt-1 text-[11px] leading-snug text-ember-2">Fast turnaround, honest advice and a team that picks up the phone.</p>
        </div>
        <div className="col-span-2 overflow-hidden rounded-xl bg-furnace-2 ring-1 ring-ember-line">
          <div className="relative aspect-square bg-furnace-3">
            <div className="streaks opacity-80">
              <i />
              <i />
              <i />
            </div>
          </div>
          <div className="flex items-center justify-between p-2.5">
            <span className="text-[10px] text-ember-2">yourbrand</span>
            <span className="rounded-full bg-ember px-2 py-0.5 text-[9px] font-medium text-furnace">Learn more</span>
          </div>
        </div>
      </Layer>

      {/* 4. measure */}
      <Layer show={a === 4} className="inset-0 flex flex-col justify-center rounded-xl bg-furnace-2 p-4 ring-1 ring-ember-line">
        <div className="flex gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-ember" /> Leads
          </span>
          <span className="flex items-center gap-1.5 text-ember-2">
            <span className="h-0.5 w-4 border-t border-dashed border-ember-2" /> Cost per lead
          </span>
        </div>
        <svg viewBox="0 0 300 140" className="mt-4 w-full text-ember">
          <path
            d="M0 120 L40 112 L80 104 L120 86 L160 80 L200 58 L240 44 L300 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            pathLength={100}
            strokeDasharray="100"
            className="transition-[stroke-dashoffset] duration-1000 ease-expo"
            style={{ strokeDashoffset: a === 4 ? 0 : 100, transitionDelay: "200ms" }}
          />
          <path d="M0 30 L60 40 L120 52 L180 70 L240 82 L300 96" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="4 4" strokeWidth="1.5" />
        </svg>
      </Layer>

      {/* 5. scale */}
      <Layer show={a === 5} className="inset-0 flex flex-col justify-center gap-3">
        {[
          ["Google Ads", 0.82],
          ["SEO", 0.7],
          ["Meta Ads", 0.46],
          ["Email", 0.3],
        ].map(([ch, w], i) => (
          <div key={ch as string} className="grid grid-cols-[5.5rem_1fr] items-center gap-3 text-[12px]">
            <span className="text-ember-2">{ch as string}</span>
            <span
              className="h-8 origin-left rounded-md bg-ember transition-transform duration-1000 ease-expo"
              style={{ transform: `scaleX(${a === 5 ? (w as number) : 0.15})`, opacity: 0.35 + (w as number) * 0.65, transitionDelay: `${i * 120 + 150}ms` }}
            />
          </div>
        ))}
        <p className="mt-2 font-mono text-[10px] text-ember-3">budget follows what converts</p>
      </Layer>
    </Canvas>
  );
}

"use client";

import { useStep } from "../ProcessScroller";
import { Canvas, Layer } from "./shared";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils";

const SWATCHES = ["#0c0c0c", "#3a3a3a", "#8a8a8a", "#dcdcdb", "#f2f2f2"];

/** Brand: moodboard, positioning, concepts, the final mark, its guidelines and its rollout. */
export default function BrandVisual() {
  const { active: a } = useStep();

  return (
    <Canvas>
      {/* 0. moodboard */}
      <Layer show={a === 0} className="inset-0 grid grid-cols-3 grid-rows-2 gap-2">
        <div className="relative overflow-hidden rounded-lg bg-furnace-3">
          <div className="streaks opacity-80">
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="dot-grid rounded-lg bg-furnace-2 text-ember" />
        <div className="rounded-lg bg-[linear-gradient(160deg,#f2f2f2,#3a3a3a)]" />
        <div className="grid place-items-center rounded-lg bg-ember text-furnace">
          <span className="text-3xl font-semibold tracking-[-0.06em]">Ag</span>
        </div>
        <div className="rounded-lg bg-[radial-gradient(circle_at_30%_30%,#8a8a8a,#0c0c0c_70%)]" />
        <div className="rounded-lg bg-[repeating-linear-gradient(90deg,#222_0_6px,#161616_6px_12px)]" />
      </Layer>

      {/* 1. positioning map */}
      <Layer show={a === 1} className="inset-0">
        <div className="absolute inset-6 border-ember-3">
          <span className="absolute left-1/2 top-0 h-full w-px bg-ember-3/60" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-ember-3/60" />
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-ember-3">Premium</span>
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-ember-3">Budget</span>
          <span className="absolute -left-1 top-1/2 -translate-x-full -translate-y-1/2 pr-1 font-mono text-[10px] text-ember-3 [writing-mode:vertical-rl] sm:[writing-mode:initial]">Classic</span>
          <span className="absolute -right-1 top-1/2 -translate-y-1/2 translate-x-full pl-1 font-mono text-[10px] text-ember-3 [writing-mode:vertical-rl] sm:[writing-mode:initial]">Modern</span>
          {[
            [18, 30],
            [30, 62],
            [24, 74],
            [62, 70],
          ].map(([x, y]) => (
            <span key={`${x}${y}`} className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-3" style={{ left: `${x}%`, top: `${y}%` }} />
          ))}
          <span
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 transition-all duration-1000 ease-expo"
            style={{ left: a === 1 ? "76%" : "50%", top: a === 1 ? "24%" : "50%" }}
          >
            <span className="size-4 rounded-full bg-ember shadow-[0_0_20px_4px_rgb(255_255_255/0.5)]" />
            <span className="text-[11px] font-medium">You</span>
          </span>
        </div>
      </Layer>

      {/* 2. concepts */}
      <Layer show={a === 2} className="inset-0 grid grid-cols-3 items-center gap-3">
        {[
          <svg key="c1" viewBox="0 0 60 60" className="h-14 w-14">
            <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M18 40 L30 16 L42 40" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>,
          <svg key="c2" viewBox="0 0 60 60" className="h-14 w-14">
            <rect x="12" y="12" width="36" height="36" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M22 38 V22 H38" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>,
          <Mark key="c3" className="h-14" />,
        ].map((art, i) => (
          <div
            key={i}
            className={cn(
              "grid aspect-[3/4] place-items-center rounded-xl bg-furnace-2 ring-1 transition-all duration-700 ease-expo",
              i === 2 && a === 2 ? "scale-105 ring-2 ring-ember" : "ring-ember-line",
            )}
          >
            <div className="flex flex-col items-center gap-3 text-ember">
              {art}
              <span className="font-mono text-[10px] text-ember-3">Direction {String.fromCharCode(65 + i)}</span>
            </div>
          </div>
        ))}
      </Layer>

      {/* 3. identity */}
      <Layer show={a === 3} className="inset-0 flex items-center justify-center gap-5">
        <Mark className="h-28 drop-shadow-[0_0_30px_rgb(255_255_255/0.35)] sm:h-36" />
        <span className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">aether</span>
      </Layer>

      {/* 4. guidelines */}
      <Layer show={a === 4} className="inset-0 grid grid-cols-2 grid-rows-[auto_1fr] gap-3">
        <div className="col-span-2 flex overflow-hidden rounded-xl ring-1 ring-ember-line">
          {SWATCHES.map((c, i) => (
            <div key={c} className="flex h-20 flex-1 items-end p-2" style={{ background: c }}>
              <span className={cn("font-mono text-[9px]", i < 3 ? "text-white/80" : "text-black/70")}>{c}</span>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-furnace-2 p-4 ring-1 ring-ember-line">
          <p className="text-5xl font-medium leading-none tracking-[-0.05em]">Aa</p>
          <p className="mt-2 font-mono text-[10px] text-ember-3">Geist, 500</p>
        </div>
        <div className="grid place-items-center rounded-xl bg-furnace-2 ring-1 ring-ember-line">
          <span className="relative p-3 outline-1 outline-dashed outline-ember-3">
            <Mark className="h-10" />
          </span>
          <p className="font-mono text-[10px] text-ember-3">Clear space</p>
        </div>
      </Layer>

      {/* 5. rollout */}
      <Layer show={a === 5} className="inset-0">
        <div className="absolute left-[4%] top-[8%] flex aspect-[7/4] w-[46%] -rotate-6 items-end justify-between rounded-lg bg-ember p-3 text-furnace shadow-2xl transition-transform duration-700">
          <Mark className="h-7" />
          <span className="font-mono text-[9px]">hello@yourbrand.com</span>
        </div>
        <div className="absolute right-[6%] top-[4%] grid aspect-square w-[22%] place-items-center rounded-[22%] bg-furnace-3 ring-1 ring-ember-line">
          <Mark className="h-1/2" />
        </div>
        <div className="absolute bottom-[4%] left-[18%] right-[4%] flex h-[42%] items-center justify-center gap-4 rounded-xl bg-furnace-2 ring-1 ring-ember-line">
          <Mark className="h-14" />
          <span className="text-3xl font-semibold tracking-[-0.05em]">aether</span>
        </div>
      </Layer>
    </Canvas>
  );
}

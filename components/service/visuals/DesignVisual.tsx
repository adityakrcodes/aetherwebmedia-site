"use client";

import { IconPointerFilled } from "@tabler/icons-react";
import { useStep } from "../ProcessScroller";
import { Canvas, Layer, ease } from "./shared";
import { cn } from "@/lib/utils";

const NOTES = [
  { text: "I couldn't find the pricing", x: 4, y: 6, r: -4 },
  { text: "Checkout asks for too much", x: 54, y: 2, r: 3 },
  { text: "Love the product photos", x: 30, y: 36, r: -2 },
  { text: "Is this mobile friendly?", x: 0, y: 64, r: 2 },
  { text: "Too many steps to sign up", x: 58, y: 58, r: -3 },
];

/** Design: a canvas where research notes become structure, wireframes, visuals, a prototype and specs. */
export default function DesignVisual() {
  const { active: a } = useStep();
  const styled = a >= 3;

  return (
    <Canvas>
      {/* 0. research notes */}
      {NOTES.map((n, i) => (
        <div
          key={n.text}
          className={cn(
            "absolute w-[42%] max-w-44 rounded-md bg-paper-3 p-3 text-[11px] leading-snug text-ink shadow-lg transition-all duration-700 ease-expo dark:bg-ember dark:text-furnace",
            a === 0 ? "opacity-100" : "pointer-events-none scale-50 opacity-0",
          )}
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            rotate: `${n.r}deg`,
            transitionDelay: a === 0 ? `${i * 70}ms` : "0ms",
          }}
        >
          {n.text}
        </div>
      ))}

      {/* 1. structure */}
      <Layer show={a === 1} className="inset-0 flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px]">
          {["Landing", "Pricing", "Sign up", "Onboarding", "Dashboard"].map((s, i, arr) => (
            <span key={s} className="flex items-center gap-2">
              <span className="rounded-lg bg-furnace-2 px-3 py-2 ring-1 ring-ember-line">{s}</span>
              {i < arr.length - 1 && <span className="text-ember-3">→</span>}
            </span>
          ))}
        </div>
      </Layer>

      {/* 2-5. artboards */}
      <Layer show={a >= 2} className="inset-0">
        <div className={cn("absolute top-6 h-[78%] transition-all duration-700 ease-expo", a >= 4 ? "left-0 w-[54%]" : "left-[8%] w-[70%]")}>
          <p className="absolute -top-5 left-0 font-mono text-[10px] text-ember-3">Home / Desktop</p>
          <div className={cn("relative h-full overflow-hidden rounded-lg ring-1", ease, styled ? "bg-ember ring-transparent" : "bg-furnace-2 ring-ember-line")}>
            <div className="flex h-full flex-col gap-2.5 p-4">
              <div className={cn("h-2.5 w-1/3 rounded", ease, styled ? "bg-furnace" : "bg-ember-3/40")} />
              <div className="relative">
                <div className={cn("h-4 w-[85%] rounded", ease, styled ? "bg-furnace" : "bg-ember-3/40")} />
                <div className={cn("mt-1.5 h-4 w-[60%] rounded", ease, styled ? "bg-furnace-3" : "bg-ember-3/40")} />
                {/* selection box */}
                <span className={cn("absolute -inset-1.5 rounded-sm border border-ember-2 transition-opacity duration-500", a === 2 ? "opacity-100" : "opacity-0")}>
                  {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
                    <i key={p} className={cn("absolute size-2 border border-ember-2 bg-furnace", p)} />
                  ))}
                </span>
              </div>
              <div className={cn("relative mt-1 flex-1 overflow-hidden rounded", ease, styled ? "bg-furnace" : "bg-ember-3/20")}>
                <div className={cn("streaks", ease, styled ? "opacity-70" : "opacity-0")}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="relative">
                <div className={cn("h-7 w-24 rounded-full", ease, styled ? "bg-furnace" : "bg-ember-3/40")} />
                {/* handoff redlines */}
                <span className={cn("absolute -right-1 top-1/2 translate-x-full -translate-y-1/2 transition-opacity duration-500", a === 5 ? "opacity-100" : "opacity-0")}>
                  <span className="ml-2 rounded bg-ember-2 px-1.5 py-0.5 font-mono text-[9px] text-furnace">Button / Primary</span>
                </span>
                <span className={cn("absolute left-0 top-full mt-1 flex w-24 items-center transition-opacity duration-500", a === 5 ? "opacity-100" : "opacity-0")}>
                  <span className="h-px flex-1 bg-ink-3" />
                  <span className="px-1 font-mono text-[9px] text-ink-3">96</span>
                  <span className="h-px flex-1 bg-ink-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* style panel */}
        <div
          className={cn(
            "absolute right-0 top-6 w-[18%] min-w-20 space-y-3 rounded-lg bg-furnace-2 p-3 ring-1 ring-ember-line transition-all duration-700 ease-expo",
            a === 3 ? "opacity-100" : "pointer-events-none translate-x-4 opacity-0",
          )}
        >
          <p className="font-mono text-[9px] text-ember-3">Colors</p>
          <div className="grid grid-cols-3 gap-1">
            {["#0c0c0c", "#3a3a3a", "#6a6a6a", "#a3a3a3", "#dcdcdb", "#f2f2f2"].map((c) => (
              <span key={c} className="aspect-square rounded ring-1 ring-ember-line" style={{ background: c }} />
            ))}
          </div>
          <p className="font-mono text-[9px] text-ember-3">Type</p>
          <p className="text-2xl font-medium leading-none tracking-[-0.04em]">Aa</p>
        </div>

        {/* 4. second artboard + connector */}
        <div
          className={cn(
            "absolute right-0 top-6 h-[78%] w-[38%] transition-all duration-700 ease-expo",
            a >= 4 ? "opacity-100" : "pointer-events-none translate-x-6 opacity-0",
          )}
        >
          <p className="absolute -top-5 left-0 font-mono text-[10px] text-ember-3">Pricing</p>
          <div className="flex h-full flex-col gap-2 rounded-lg bg-ember p-3">
            <div className="h-2.5 w-1/2 rounded bg-furnace" />
            {[0, 1].map((i) => (
              <div key={i} className="flex-1 rounded bg-furnace/90" />
            ))}
          </div>
        </div>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className={cn("absolute inset-0 h-full w-full text-ember transition-opacity duration-700", a === 4 ? "opacity-100" : "opacity-0")}
        >
          <path d="M24 80 C 40 98, 56 66, 62 46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        </svg>
        <span
          className={cn(
            "absolute left-[62%] top-[46%] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_14px_rgb(255_255_255/0.8)] transition-opacity duration-700",
            a === 4 ? "opacity-100" : "opacity-0",
          )}
        />

        {/* 5. handoff inspector */}
        <div
          className={cn(
            "absolute right-0 top-6 w-[38%] space-y-2.5 rounded-lg bg-furnace-2 p-3 font-mono text-[10px] ring-1 ring-ember-line transition-all duration-700 ease-expo",
            a === 5 ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
          )}
        >
          <p className="text-[11px] text-ember">Button / Primary</p>
          {[
            ["padding", "12 24"],
            ["radius", "full"],
            ["font", "Geist 500, 14"],
            ["fill", "#0c0c0c"],
            ["states", "hover, focus, active"],
          ].map(([k, v]) => (
            <p key={k} className="flex justify-between gap-2 border-t border-ember-line pt-2 text-ember-2">
              <span className="text-ember-3">{k}</span>
              {v}
            </p>
          ))}
        </div>
      </Layer>

      {/* cursor */}
      <div
        className={cn("absolute transition-[left,top,opacity] duration-1000 ease-expo", a === 0 ? "opacity-0" : "opacity-100")}
        style={{ left: `${[50, 50, 44, 82, 18, 18][a]}%`, top: `${[50, 50, 22, 40, 80, 80][a]}%` }}
      >
        <IconPointerFilled size={18} className="-rotate-12 text-ember drop-shadow-[0_1px_3px_rgb(0_0_0/0.9)]" />
        {a === 4 && <span className="tap-ripple absolute -left-2 -top-2 size-8 rounded-full bg-[#6a6a6a]/60" />}
      </div>
    </Canvas>
  );
}

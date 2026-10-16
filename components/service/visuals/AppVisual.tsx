"use client";

import { IconBrandApple, IconBrandGooglePlay, IconCheck, IconCreditCard, IconBell } from "@tabler/icons-react";
import { useStep } from "../ProcessScroller";
import { Canvas, Layer } from "./shared";
import { Mark } from "@/components/brand/Mark";
import { cn } from "@/lib/utils";

/** App: one phone that goes from flow map to prototype to real UI, then to devices and the store. */
export default function AppVisual() {
  const { active: a } = useStep();

  return (
    <Canvas className="grid place-items-center">
      <div className="relative flex h-full w-full items-center justify-center">
        {/* extra devices for testing */}
        <Device show={a >= 4} className="-translate-x-[92%] scale-[0.78]" tablet />
        <Device show={a >= 4} className="translate-x-[96%] scale-[0.72]" />

        {/* main phone */}
        <div
          className={cn(
            "relative aspect-[9/19] h-full max-h-[30rem] overflow-hidden rounded-[2.2rem] border-[5px] border-furnace-3 bg-furnace-2 transition-transform duration-700 ease-expo",
            a >= 4 && a < 5 && "scale-90",
          )}
        >
          <span className="absolute left-1/2 top-2 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-furnace" />

          {/* 0. user flow */}
          <Layer show={a === 0} className="inset-0 flex flex-col items-center justify-center gap-2.5 px-5">
            {["Welcome", "Sign up", "Home", "Checkout"].map((s, i) => (
              <div key={s} className="flex w-full flex-col items-center gap-2.5">
                <span className="w-full rounded-lg bg-furnace-3 py-2 text-center font-mono text-[10px] text-ember-2 ring-1 ring-ember-line">{s}</span>
                {i < 3 && <span className="h-3 w-px bg-ember-3" />}
              </div>
            ))}
          </Layer>

          {/* 1. wireframe prototype */}
          <Layer show={a === 1} className="inset-0 flex flex-col gap-2.5 px-4 pt-10">
            <div className="h-3 w-1/2 rounded border border-dashed border-ember-3" />
            <div className="h-24 rounded-lg border border-dashed border-ember-3" />
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="size-7 rounded-full border border-dashed border-ember-3" />
                <div className="h-2.5 flex-1 rounded border border-dashed border-ember-3" />
              </div>
            ))}
            <div className="relative mt-auto mb-6 h-9 rounded-full border border-dashed border-ember-3">
              <span className="tap-ripple absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/40" />
            </div>
          </Layer>

          {/* 2+. real UI */}
          <Layer show={a >= 2} className="inset-0 flex flex-col gap-3 px-4 pt-10">
            <p className="text-[10px] text-ember-3">Good morning</p>
            <p className="-mt-2 text-sm font-medium">Your week</p>
            <div className="relative h-24 overflow-hidden rounded-xl bg-furnace-3">
              <div className="streaks opacity-70">
                <i />
                <i />
                <i />
              </div>
              <p className="absolute bottom-2 left-3 text-[11px] font-medium">Next delivery, Thursday</p>
            </div>
            {["Orders", "Saved places", "Payments"].map((r) => (
              <div key={r} className="flex items-center gap-2.5 rounded-lg bg-furnace-3/60 p-2">
                <span className="size-6 rounded-full bg-ember/20" />
                <span className="text-[11px] text-ember-2">{r}</span>
              </div>
            ))}
            <div className="mt-auto mb-3 flex justify-around border-t border-ember-line pt-2">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("size-1.5 rounded-full", i === 0 ? "bg-ember" : "bg-ember-3")} />
              ))}
            </div>
          </Layer>

          {/* 3. push notification + payment sheet */}
          <Layer show={a === 3} hidden="-translate-y-8" className="inset-x-2 top-7 z-20 flex items-center gap-2 rounded-xl bg-furnace-3/95 p-2.5 ring-1 ring-ember-line backdrop-blur">
            <span className="grid size-7 place-items-center rounded-lg bg-ember text-furnace">
              <IconBell size={14} />
            </span>
            <span className="text-[10px] leading-tight">
              <span className="block font-medium">Order confirmed</span>
              <span className="text-ember-3">Arriving Thursday</span>
            </span>
          </Layer>
          <Layer show={a === 3} hidden="translate-y-full" className="inset-x-0 bottom-0 z-20 rounded-t-2xl bg-furnace-3 p-4 ring-1 ring-ember-line">
            <p className="flex items-center gap-2 text-[11px] text-ember-2">
              <IconCreditCard size={14} /> Pay securely
            </p>
            <span className="mt-3 block rounded-full bg-ember py-2 text-center text-[11px] font-medium text-furnace">Pay</span>
          </Layer>

          {/* 5. store */}
          <Layer show={a === 5} className="inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-furnace-2 px-4">
            <span className="grid size-16 place-items-center rounded-2xl bg-ember text-furnace shadow-[0_0_40px_rgb(255_255_255/0.25)]">
              <Mark className="h-8" />
            </span>
            <p className="text-sm font-medium">Your App</p>
            <span className="relative grid h-8 w-20 place-items-center overflow-hidden rounded-full bg-furnace-3 text-[11px] font-semibold">
              <span className="install-fill absolute inset-y-0 left-0 bg-ember" />
              <span className="relative mix-blend-difference">OPEN</span>
            </span>
            <div className="mt-2 flex gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] ring-1 ring-ember-line">
                <IconBrandApple size={11} /> App Store
              </span>
              <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] ring-1 ring-ember-line">
                <IconBrandGooglePlay size={11} /> Play
              </span>
            </div>
          </Layer>
        </div>
      </div>
    </Canvas>
  );
}

function Device({ show, className, tablet }: { show: boolean; className?: string; tablet?: boolean }) {
  return (
    <div
      className={cn(
        "absolute rounded-[1.6rem] border-[4px] border-furnace-3 bg-furnace-2 transition-all duration-700 ease-expo",
        tablet ? "aspect-[3/4] h-[62%]" : "aspect-[9/19] h-[70%]",
        show ? "opacity-100" : "translate-x-0 scale-50 opacity-0",
        show && className,
      )}
    >
      <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-ember text-furnace">
        <IconCheck size={13} stroke={3} />
      </span>
      <div className="m-3 space-y-2">
        <div className="h-2 w-1/2 rounded bg-ember-3/50" />
        <div className="h-10 rounded bg-furnace-3" />
        <div className="h-2 w-3/4 rounded bg-ember-3/40" />
      </div>
    </div>
  );
}

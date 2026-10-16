"use client";

import { IconCheck, IconLock, IconPointerFilled, IconTrendingUp } from "@tabler/icons-react";
import { useStep } from "../ProcessScroller";
import { Canvas, Layer, ease } from "./shared";
import { cn } from "@/lib/utils";

const CURSOR = [
  [62, 18],
  [30, 34],
  [70, 46],
  [82, 30],
  [80, 78],
  [26, 22],
];

/** Web: a browser where a site is mapped, wireframed, designed, coded, launched and grown. */
export default function WebVisual() {
  const { active: a } = useStep();
  const wire = a === 1;
  const designed = a >= 2;
  const block = (extra?: string) =>
    cn(
      ease,
      "rounded-md",
      wire && "border border-dashed border-ember-3 bg-transparent",
      designed && "border border-transparent",
      a === 0 && "border border-transparent",
      extra,
    );

  return (
    <Canvas className="flex items-center justify-center">
      <div className="relative h-full w-full max-w-[42rem] overflow-hidden rounded-2xl bg-furnace-2 ring-1 ring-ember-line">
        {/* browser chrome */}
        <div className="flex h-9 items-center gap-3 border-b border-ember-line px-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-ember-3/60" />
            ))}
          </div>
          <div className="mx-auto flex h-5 items-center gap-1.5 rounded-full bg-furnace px-3 font-mono text-[10px] text-ember-2">
            <IconLock size={10} />
            <span className={ease}>{a >= 4 ? "yourbrand.com" : "preview.yourbrand.com"}</span>
          </div>
          <span className="w-8" />
        </div>

        <div className="relative h-[calc(100%-2.25rem)]">
          {/* 0. Sitemap */}
          <Layer show={a === 0} className="inset-0 grid place-items-center p-4">
            <svg viewBox="0 0 320 190" className="h-full max-h-56 w-full text-ember">
              <g fill="none" stroke="currentColor" strokeOpacity="0.35">
                <path d="M160 46 V70 H40 V96 M160 70 H280 V96 M120 70 V96 M200 70 V96 M120 122 V142 H90 V160 M120 142 H150 V160" />
              </g>
              {[
                [130, 18, "Home", 60],
                [12, 96, "Services", 56],
                [92, 96, "Work", 56],
                [172, 96, "About", 56],
                [252, 96, "Contact", 56],
                [66, 160, "Web", 48],
                [126, 160, "Apps", 48],
              ].map(([x, y, label, w]) => (
                <g key={label as string}>
                  <rect x={x as number} y={y as number} width={w as number} height={26} rx={7} fill="#222" stroke="currentColor" strokeOpacity="0.25" />
                  <text x={(x as number) + (w as number) / 2} y={(y as number) + 17} textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="var(--font-geist-mono)">
                    {label}
                  </text>
                </g>
              ))}
            </svg>
          </Layer>

          {/* 1-5. The page itself, wireframe then designed */}
          <Layer show={a >= 1} className="inset-0 flex flex-col gap-3 p-4 sm:gap-4 sm:p-5">
            {/* nav */}
            <div className="flex items-center justify-between">
              <div className={block(cn("h-3 w-14", designed && "bg-ember"))} />
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={block(cn("h-2 w-8", designed && "bg-ember-3"))} />
                ))}
              </div>
              <div className={block(cn("h-5 w-14 rounded-full", designed && "bg-ember"))} />
            </div>
            {/* hero */}
            <div className="grid flex-1 grid-cols-5 gap-3">
              <div className="col-span-3 flex flex-col justify-center gap-2">
                <div className={block(cn("h-4 w-[90%]", designed && "bg-ember"))} />
                <div className={block(cn("h-4 w-[65%]", designed && "bg-ember-2"))} />
                <div className={block(cn("mt-2 h-2 w-[80%]", designed && "bg-ember-3/70"))} />
                <div className={block(cn("h-2 w-[60%]", designed && "bg-ember-3/70"))} />
                <div className={block(cn("mt-3 h-6 w-20 rounded-full", designed && "bg-ember"))} />
              </div>
              <div className={block(cn("relative col-span-2 overflow-hidden", designed && "bg-furnace-3"))}>
                {wire && (
                  <svg className="absolute inset-0 h-full w-full text-ember-3" preserveAspectRatio="none" viewBox="0 0 10 10">
                    <path d="M0 0 L10 10 M10 0 L0 10" stroke="currentColor" strokeWidth="0.06" />
                  </svg>
                )}
                <div className={cn("streaks", ease, designed ? "opacity-80" : "opacity-0")}>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            {/* features */}
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className={block(cn("h-12 sm:h-16", designed && "bg-furnace-3"))} style={{ transitionDelay: `${i * 80}ms` }} />
              ))}
            </div>
          </Layer>

          {/* 3. Code */}
          <Layer
            show={a === 3}
            hidden="translate-x-full"
            className="inset-y-0 right-0 w-[62%] border-l border-ember-line bg-furnace/95 p-4 backdrop-blur"
          >
            <pre className="font-mono text-[10px] leading-[1.7] text-ember-2 sm:text-[11px]">
              {[
                ["export default function Home() {", ""],
                ["  return (", ""],
                ["    <Hero", "text-ember"],
                ['      title="Fast sites that sell"', ""],
                ['      cta="Book a call"', ""],
                ["    />", "text-ember"],
                ["    <Features items={features} />", "text-ember"],
                ["  );", ""],
                ["}", ""],
              ].map(([line, tone], i) => (
                <span
                  key={i}
                  className={cn("block overflow-hidden whitespace-pre transition-[max-width] duration-700 ease-expo", tone)}
                  style={{ maxWidth: a === 3 ? "100%" : "0%", transitionDelay: `${i * 90 + 200}ms` }}
                >
                  {line}
                </span>
              ))}
            </pre>
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ember px-2.5 py-1 font-mono text-[10px] text-furnace">
              <IconCheck size={12} stroke={2.5} /> build passed
            </span>
          </Layer>

          {/* 4. Launch checks */}
          <Layer show={a >= 4} className="bottom-4 right-4 rounded-xl bg-furnace/95 p-3 ring-1 ring-ember-line backdrop-blur">
            <div className="flex gap-3">
              {["Speed", "A11y", "Best", "SEO"].map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <svg viewBox="0 0 36 36" className="size-9 -rotate-90 text-ember">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray="100"
                      className="transition-[stroke-dashoffset] duration-1000 ease-expo"
                      style={{ strokeDashoffset: a >= 4 ? 0 : 100, transitionDelay: `${i * 120 + 250}ms` }}
                    />
                  </svg>
                  <span className="font-mono text-[9px] text-ember-2">{label}</span>
                </div>
              ))}
            </div>
          </Layer>

          {/* 5. Growth */}
          <Layer show={a >= 5} className="left-4 top-4 w-44 rounded-xl bg-furnace/95 p-3 ring-1 ring-ember-line backdrop-blur">
            <div className="flex items-center justify-between text-[11px] text-ember-2">
              Visitors <IconTrendingUp size={14} className="text-ember" />
            </div>
            <svg viewBox="0 0 120 40" className="mt-2 w-full text-ember">
              <path
                d="M0 36 L15 33 L30 34 L45 27 L60 28 L75 19 L90 16 L105 9 L120 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                pathLength={100}
                strokeDasharray="100"
                className="transition-[stroke-dashoffset] duration-1000 ease-expo"
                style={{ strokeDashoffset: a >= 5 ? 0 : 100, transitionDelay: "300ms" }}
              />
            </svg>
          </Layer>

          {/* cursor */}
          <div
            className="absolute transition-[left,top] duration-1000 ease-expo"
            style={{ left: `${CURSOR[a][0]}%`, top: `${CURSOR[a][1]}%` }}
          >
            <IconPointerFilled size={18} className="-rotate-12 text-ember drop-shadow" />
          </div>
        </div>
      </div>
    </Canvas>
  );
}

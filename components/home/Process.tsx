import { IconCheck, IconLock, IconRefresh } from "@tabler/icons-react";
import { Mark } from "@/components/brand/Mark";
import { BookCall } from "@/components/ui/Button";

/* Per-element delay inside a step's sequence. */
const dl = (ms: number, extra?: Record<string, string | number>) => ({ "--dl": `${ms}ms`, ...extra }) as React.CSSProperties;

const steps = [
  {
    when: "Day 1 · 30 min",
    title: "Free scoping call",
    body: "Thirty minutes on your goals, your users and your budget. No pitch deck required.",
    get: "Honest advice on scope",
    Tile: CallTile,
  },
  {
    when: "Before kickoff",
    title: "Written proposal",
    body: "Scope, timeline and price in writing before any work starts, so there are no surprises.",
    get: "A written quote",
    Tile: ProposalTile,
  },
  {
    when: "1-6 weeks",
    title: "Design and build",
    body: "A preview link every week. You see real progress and steer while changes are cheap.",
    get: "A preview every week",
    Tile: BuildTile,
  },
  {
    when: "Launch and after",
    title: "Launch and support",
    body: "We go live, train your team and stay on for fixes and improvements.",
    get: "Live product, docs, support",
    Tile: LaunchTile,
  },
];

/**
 * Four steps on a dark panel, joined by a fuse.
 * Each step plays a short one-shot sequence when it scrolls into view (`data-play`). On wide screens the
 * steps share one timeline: a flame travels the fuse and lights each step as it arrives.
 * All motion is transform/opacity and stops after a few seconds; styles live under "Process" in globals.css.
 */
export default function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="container-x pb-28 md:pb-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <h2
          id="process-heading"
          data-reveal
          className="max-w-3xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
        >
          From first call to launch, <span className="text-ink-3">in four moves.</span>
        </h2>
        <p data-reveal style={{ "--d": 1 } as React.CSSProperties} className="max-w-sm text-lg leading-relaxed text-ink-2">
          You know the scope and price before we start, see progress every week, and keep us on after launch.
        </p>
      </div>

      <div
        data-reveal
        data-anim
        className="proc relative mt-12 overflow-hidden rounded-stage bg-furnace p-5 text-ember ring-1 ring-inset ring-ember-line sm:p-8 md:mt-16 xl:px-4 xl:pb-4 xl:pt-8"
      >
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 text-ember opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,rgb(255_255_255/0.07),transparent)]"
        />

        <div className="relative">
          {/* Wide screens: one horizontal fuse under all four steps, with a flame that walks it. */}
          <div aria-hidden className="proc-fuse hidden xl:block">
            <div className="proc-cord absolute inset-x-0 top-8 h-px" />
            <div className="absolute inset-x-0 top-[calc(2rem-6px)] h-[13px] overflow-hidden">
              <div className="proc-run absolute inset-0">
                <div className="proc-burnt absolute inset-x-0 top-1/2 h-px" />
                <div className="absolute right-0 top-0 h-full w-48 bg-[radial-gradient(closest-side,rgb(255_255_255/0.4),transparent)]" />
              </div>
            </div>
            <div className="proc-run absolute inset-x-0 top-8 z-20 h-0">
              <span className="absolute right-0 top-0 size-[26rem] -translate-y-1/2 translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.07),transparent)]" />
              <span className="absolute -bottom-[3px] right-0 translate-x-1/2">
                <span className="proc-flame relative block">
                  <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.3),transparent)]" />
                  <Mark className="relative block h-7 text-white" />
                </span>
              </span>
            </div>
          </div>

          <ol className="relative grid xl:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-play
                style={{ "--i": i } as React.CSSProperties}
                className="proc-step group relative grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 pb-12 max-xl:last:pb-2 sm:gap-x-6 xl:block xl:rounded-[1.5rem] xl:px-6 xl:pb-6 xl:pt-[3.75rem]"
              >
                {/* node: numbered on the vertical fuse, a dot on the horizontal one */}
                <div aria-hidden className="relative xl:absolute xl:left-6 xl:top-[calc(2rem-5px)] xl:z-10">
                  <span className="proc-node relative grid size-8 place-items-center rounded-full font-mono text-xs xl:size-2.5">
                    <span className="proc-burst absolute inset-0 rounded-full" />
                    <span className="xl:hidden">{i + 1}</span>
                  </span>
                  {i < steps.length - 1 && (
                    <span className="absolute -bottom-12 left-1/2 top-10 w-px -translate-x-1/2 xl:hidden">
                      <span className="proc-cord-v absolute inset-0" />
                      <span className="proc-burn-v absolute inset-0" />
                    </span>
                  )}
                </div>

                <div className="proc-body">
                  <p className="proc-text-2 [grid-area:label] font-mono text-[11px] uppercase tracking-[0.14em] max-xl:pt-2">
                    <span className="mr-3 hidden text-ember xl:inline">0{i + 1}</span>
                    {s.when}
                  </p>
                  <h3 className="proc-text [grid-area:title] mt-3 text-2xl font-medium tracking-[-0.035em] xl:mt-5">{s.title}</h3>
                  <p className="proc-text-2 [grid-area:body] mt-2.5 max-w-md leading-relaxed">{s.body}</p>
                  <div className="[grid-area:tile] mt-6 md:mt-0 xl:mt-5">
                    <div
                      aria-hidden
                      className="proc-tile relative h-44 overflow-hidden rounded-2xl bg-furnace-2 p-4 ring-1 ring-ember-line group-hover:ring-white/20 md:h-full md:min-h-44 xl:h-44"
                    >
                      <s.Tile />
                    </div>
                  </div>
                  <p className="[grid-area:get] mt-6 flex items-center gap-2.5 border-t border-ember-line pt-4 text-sm">
                    <span className="proc-tick grid size-5 shrink-0 place-items-center rounded-full bg-ember text-furnace" style={dl(500)}>
                      <IconCheck size={12} stroke={3} />
                    </span>
                    <span className="text-ember-3">You get</span>
                    <span className="proc-text font-medium">{s.get}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mt-4 flex flex-col items-start gap-5 rounded-[1.5rem] bg-furnace-2/70 p-5 ring-1 ring-inset ring-ember-line sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="max-w-md text-lg leading-snug text-ember-2">
            <span className="text-ember">Move one is free.</span> Thirty minutes, and you leave with a clear next step.
          </p>
          <BookCall tone="ember" label="Book the free call" />
        </div>
      </div>
    </section>
  );
}

/* ---------- Step visuals: small, decorative mini-UIs. ---------- */

function TileHead({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-ember-2">
      <span className="flex items-center gap-1.5">{left}</span>
      <span className="text-ember-3">{right}</span>
    </div>
  );
}

const WAVE = [38, 64, 100, 58, 82, 44, 72, 52, 90, 34, 60, 28];

/** 1. A call with the studio, the agenda ticking off. */
function CallTile() {
  return (
    <>
      <TileHead
        left={
          <>
            <span className="size-1.5 rounded-full bg-ember" />
            Scoping call
          </>
        }
        right="Free"
      />
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="proc-fade rounded-xl bg-furnace p-2.5 ring-1 ring-ember-line" style={dl(0)}>
          <span className="grid size-7 place-items-center rounded-full bg-furnace-2 ring-1 ring-ember-line">
            <Mark className="h-3.5" />
          </span>
          <p className="mt-2 text-[11px] text-ember-2">Aether team</p>
        </div>
        <div className="proc-fade rounded-xl bg-furnace p-2.5 ring-1 ring-ember-line" style={dl(120)}>
          <div className="flex h-7 items-center gap-[3px]">
            {WAVE.map((h, k) => (
              <i
                key={k}
                className="proc-wave block w-[3px] rounded-full bg-ember"
                style={{ height: `${h}%`, "--k": k } as React.CSSProperties}
              />
            ))}
          </div>
          <p className="mt-2 text-[11px] text-ember-2">You</p>
        </div>
      </div>
      <ul className="mt-3 flex gap-1.5">
        {["Goals", "Users", "Budget"].map((t, k) => (
          <li key={t} className="flex items-center gap-1 rounded-full bg-furnace py-1 pl-1 pr-2.5 text-[11px] ring-1 ring-ember-line">
            <span className="proc-tick grid size-4 place-items-center rounded-full bg-ember text-furnace" style={dl(700 + k * 380)}>
              <IconCheck size={10} stroke={3} />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}

/** 2. A proposal that fills in and gets signed. */
function ProposalTile() {
  return (
    <>
      <TileHead left="Proposal" right="v1 · PDF" />
      <div className="mt-3.5 grid grid-cols-[3.75rem_minmax(0,1fr)] items-center gap-y-2.5 font-mono text-[10px] text-ember-3">
        <span>Scope</span>
        <span className="flex flex-col gap-1.5">
          <i className="proc-grow block h-1.5 w-[82%] rounded-full bg-ember-2" style={dl(100)} />
          <i className="proc-grow block h-1.5 w-[56%] rounded-full bg-ember-3/70" style={dl(220)} />
        </span>
        <span>Timeline</span>
        <span className="flex gap-1">
          {[0, 1, 2, 3].map((k) => (
            <i key={k} className="proc-grow block h-1.5 w-6 rounded-full bg-ember-2" style={dl(380 + k * 90)} />
          ))}
        </span>
        <span>Price</span>
        <span className="flex items-center gap-1.5 text-ember-2">
          $<i className="proc-grow block h-1.5 w-12 rounded-full bg-ember" style={dl(760)} />
        </span>
      </div>
      <div className="mt-3.5 flex items-end justify-between border-t border-ember-line pt-2.5">
        <svg viewBox="0 0 96 28" className="h-7 w-24 text-ember">
          <path
            className="proc-sign"
            d="M3 20 C 9 4, 15 3, 13 17 C 12 25, 20 24, 25 13 C 28 7, 33 8, 31 16 C 30 22, 37 21, 41 14 C 44 9, 47 11, 47 17 C 49 23, 55 18, 58 13 C 62 8, 66 12, 68 16 C 72 22, 80 17, 93 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="100"
            style={dl(1000)}
          />
        </svg>
        <span
          className="proc-stamp inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ember ring-1 ring-ember"
          style={dl(1800, { "--rot": "-6deg" })}
        >
          <IconCheck size={11} stroke={2.5} /> Approved
        </span>
      </div>
    </>
  );
}

/* Typical build times from the FAQ, in weeks: the solid bar is the minimum, the faded one the range. */
const BUILDS = [
  { label: "Landing", min: 1, max: 2 },
  { label: "Website", min: 2, max: 4 },
  { label: "SaaS MVP", min: 4, max: 6 },
];

/** 3. Typical build times on a six-week grid, with a preview landing every week. */
function BuildTile() {
  const row = "grid grid-cols-[3.75rem_minmax(0,1fr)] items-center";
  return (
    <>
      <TileHead left="Typical build" right="Weeks" />
      <div className="mt-3 font-mono text-[10px] text-ember-3">
        <div className={row}>
          <span />
          <span className="grid grid-cols-6 text-center">
            {[1, 2, 3, 4, 5, 6].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </span>
        </div>
        <div className="mt-2 space-y-2.5">
          {BUILDS.map((b, k) => (
            <div key={b.label} className={row}>
              <span className="text-ember-2">{b.label}</span>
              <span className="relative h-2">
                <i
                  className="proc-grow absolute inset-y-0 left-0 rounded-full bg-ember-3/50"
                  style={dl(260 + k * 220, { width: `${(b.max / 6) * 100}%` })}
                />
                <i
                  className="proc-grow absolute inset-y-0 left-0 rounded-full bg-ember"
                  style={dl(160 + k * 220, { width: `${(b.min / 6) * 100}%` })}
                />
              </span>
            </div>
          ))}
        </div>
        <div className={`${row} mt-3.5 border-t border-ember-line pt-3`}>
          <span>Preview</span>
          <span className="grid grid-cols-6 justify-items-center">
            {[0, 1, 2, 3, 4, 5].map((w) => (
              <i key={w} className="proc-tick block size-1.5 rounded-full bg-ember" style={dl(500 + w * 170)} />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}

/** 4. The site goes live and the handover checklist completes. */
function LaunchTile() {
  return (
    <>
      <div className="flex h-8 items-center gap-2 rounded-full bg-furnace pl-3 pr-1 font-mono text-[10px] text-ember-2 ring-1 ring-ember-line">
        <IconLock size={11} />
        yourbrand.com
        <span className="proc-stamp ml-auto inline-flex items-center gap-1.5 rounded-full bg-ember px-2 py-1 uppercase tracking-wider text-furnace" style={dl(1500)}>
          <span className="relative size-1.5 rounded-full bg-furnace">
            <span className="proc-ping absolute inset-0 rounded-full bg-furnace" />
          </span>
          Live
        </span>
      </div>
      <ul className="mt-3.5 space-y-2.5 text-[12px] text-ember-2">
        {["Deployed to production", "Team trained", "Docs handed over"].map((t, k) => (
          <li key={t} className="flex items-center gap-2">
            <span className="proc-tick grid size-4 shrink-0 place-items-center rounded-full bg-ember text-furnace" style={dl(150 + k * 420)}>
              <IconCheck size={10} stroke={3} />
            </span>
            {t}
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span className="grid size-4 shrink-0 place-items-center rounded-full ring-1 ring-ember-3">
            <IconRefresh size={10} stroke={2} className="proc-spin" style={dl(1700)} />
          </span>
          Support window
          <span className="proc-fade ml-auto font-mono text-[10px] uppercase tracking-wider text-ember" style={dl(1700)}>
            On
          </span>
        </li>
      </ul>
    </>
  );
}

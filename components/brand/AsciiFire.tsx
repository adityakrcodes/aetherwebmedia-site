"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Spread = "wide" | "center" | "edges";

type Props = {
  className?: string;
  /** How far up the canvas the flames reach, 0 to 1. */
  reach?: number;
  /** Where the flame tongues concentrate along the bottom edge. */
  spread?: Spread;
  /** Character cell height in CSS pixels. */
  cell?: number;
  /** Let the pointer stoke a small flame where it moves. */
  interactive?: boolean;
};

// Low heat to high heat. Index 0 is never drawn.
const RAMP = " .:-=+*xX#";
const MAX = 36;
const FRAME_MS = 46; // about 22fps, plenty for fire and cheap on battery

/**
 * Monochrome ASCII fire, rendered to a canvas with the classic "spread fire" automaton.
 * Glyphs are pre-rendered into an atlas once, so a frame is just a few thousand drawImage calls.
 * It only animates while on screen, and renders one still frame under reduced motion.
 */
export default function AsciiFire({ className, reach = 0.6, spread = "wide", cell = 14, interactive = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const darkQuery = matchMedia("(prefers-color-scheme: dark)");
    const levels = RAMP.length;

    let cols = 0;
    let rows = 0;
    let cw = 0; // device px per cell
    let ch = 0;
    let decayRange = 2;
    let heat = new Uint8Array(0);
    let atlas: HTMLCanvasElement | null = null;
    let raf = 0;
    let last = 0;
    let t = Math.random() * 100;
    let onScreen = false;
    let pointer: { x: number; y: number } | null = null;

    const buildAtlas = () => {
      if (!cw || !ch) return;
      const style = getComputedStyle(canvas);
      const a = document.createElement("canvas");
      a.width = cw * levels;
      a.height = ch;
      const g = a.getContext("2d");
      if (!g) return;
      g.font = `500 ${Math.round(ch * 0.74)}px ${style.fontFamily}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = style.color;
      for (let i = 1; i < levels; i++) {
        g.globalAlpha = 0.16 + 0.84 * ((i - 1) / (levels - 2));
        g.fillText(RAMP[i], i * cw + cw / 2, ch / 2 + 1);
      }
      atlas = a;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cellPx = rect.width < 640 ? cell * 0.86 : cell;
      ch = Math.max(8, Math.round(cellPx * dpr));
      cw = Math.max(5, Math.round(cellPx * 0.62 * dpr));
      cols = Math.max(1, Math.floor((rect.width * dpr) / cw));
      rows = Math.max(2, Math.floor((rect.height * dpr) / ch));
      canvas.width = cols * cw;
      canvas.height = rows * ch;
      heat = new Uint8Array(cols * rows);
      // average decay per row so flames climb to roughly `reach` of the height
      decayRange = Math.max(1.2, ((MAX / Math.max(4, rows * reach)) * 2) + 1);
      buildAtlas();
      if (reduceQuery.matches) still();
    };

    const profile = (u: number) => {
      let f =
        0.5 +
        0.32 * Math.sin(u * 13 + t * 0.9) +
        0.24 * Math.sin(u * 29 - t * 1.6) +
        0.18 * Math.sin(u * 5 - t * 0.35);
      if (spread === "center") f *= 1.5 * Math.exp(-((u - 0.5) ** 2) / 0.045);
      else if (spread === "edges") f *= 0.25 + 1.5 * Math.abs(u - 0.5);
      return f + (Math.random() - 0.5) * 0.4;
    };

    const seed = () => {
      const base = (rows - 1) * cols;
      for (let x = 0; x < cols; x++) {
        const f = profile(x / cols);
        heat[base + x] = f > 0.28 ? Math.min(MAX, Math.round(f * MAX)) : 0;
      }
      if (pointer) {
        const px = Math.round(pointer.x);
        const py = Math.round(pointer.y);
        if (py > 1 && py < rows) {
          for (let dx = -1; dx <= 1; dx++) {
            const x = px + dx;
            if (x >= 0 && x < cols) heat[py * cols + x] = MAX - Math.abs(dx) * 6;
          }
        }
      }
    };

    const spreadFire = () => {
      for (let x = 0; x < cols; x++) {
        for (let y = 1; y < rows; y++) {
          const src = y * cols + x;
          const h = heat[src];
          if (h === 0) {
            heat[src - cols] = 0;
            continue;
          }
          let dx = x - ((Math.random() * 3) | 0) + 1;
          if (dx < 0) dx = 0;
          else if (dx >= cols) dx = cols - 1;
          const d = (Math.random() * decayRange) | 0;
          heat[(y - 1) * cols + dx] = h > d ? h - d : 0;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!atlas) return;
      for (let y = 0; y < rows; y++) {
        const row = y * cols;
        for (let x = 0; x < cols; x++) {
          const h = heat[row + x];
          if (h < 3) continue;
          const lvl = Math.min(levels - 1, 1 + (((h / MAX) * (levels - 1)) | 0));
          ctx.drawImage(atlas, lvl * cw, 0, cw, ch, x * cw, y * ch, cw, ch);
        }
      }
    };

    const tick = () => {
      t += 0.045;
      seed();
      spreadFire();
    };

    function still() {
      heat.fill(0);
      for (let i = 0; i < rows * 2; i++) tick();
      draw();
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      tick();
      draw();
    };

    const start = () => {
      if (raf || reduceQuery.matches || !onScreen || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    const ro = new ResizeObserver(() => resize());
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotion = () => (reduceQuery.matches ? (stop(), still()) : start());

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = canvas.getBoundingClientRect();
      pointer = {
        x: ((e.clientX - r.left) / r.width) * cols,
        y: ((e.clientY - r.top) / r.height) * rows,
      };
    };
    const onLeave = () => (pointer = null);

    resize();
    document.fonts?.ready.then(buildAtlas);
    io.observe(canvas);
    ro.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", onMotion);
    darkQuery.addEventListener("change", buildAtlas);
    if (interactive) {
      host.addEventListener("pointermove", onMove, { passive: true });
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", onMotion);
      darkQuery.removeEventListener("change", buildAtlas);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reach, spread, cell, interactive]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full font-mono", className)}
      style={{ color: "var(--fire)" }}
    />
  );
}

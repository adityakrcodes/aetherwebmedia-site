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
// 20fps: plenty for fire, cheap on battery, and a whole number of 60Hz and 120Hz frames.
// Driven by a timer rather than requestAnimationFrame, so the page is not woken on every vsync.
const FRAME_MS = 50;
// Glyph to draw for each heat value (0 = nothing), so drawing is a lookup.
const LEVEL = Uint8Array.from({ length: MAX + 1 }, (_, h) =>
  h < 3 ? 0 : Math.min(RAMP.length - 1, 1 + (((h / MAX) * (RAMP.length - 1)) | 0)),
);

const VERTEX = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";

// Each pixel finds its cell, reads that cell's glyph from the grid texture,
// and copies the matching pixel of that glyph from the atlas.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D grid;
uniform sampler2D atlas;
uniform vec2 cell;
uniform vec2 size;
void main() {
  vec2 px = vec2(gl_FragCoord.x, size.y * cell.y - gl_FragCoord.y);
  vec2 c = floor(px / cell);
  float glyph = floor(texture2D(grid, (c + 0.5) / size).r * 255.0 + 0.5);
  vec2 o = px - c * cell;
  gl_FragColor = glyph < 0.5 ? vec4(0.0) : texture2D(atlas, vec2((glyph * cell.x + o.x) / (cell.x * ${RAMP.length}.0), o.y / cell.y));
}`;

/**
 * Paints a whole frame in one draw call: the glyph for every cell goes up as a tiny texture
 * and the shader copies pixels from the glyph atlas. A few thousand 2D drawImage calls per frame
 * cost about three times as much CPU, almost all of it per-call overhead.
 */
function createGlRenderer(gl: WebGLRenderingContext) {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.bindAttribLocation(program, 0, "p");
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // One quad covering the canvas.
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const texture = (unit: number, name: string) => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, name), unit);
  };
  texture(1, "atlas");
  texture(0, "grid"); // left active, so each frame's upload goes to the grid
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

  const cellAt = gl.getUniformLocation(program, "cell");
  const sizeAt = gl.getUniformLocation(program, "size");
  let cols = 0;
  let rows = 0;

  return {
    atlas(source: HTMLCanvasElement) {
      gl.activeTexture(gl.TEXTURE1);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
      gl.activeTexture(gl.TEXTURE0);
    },
    resize(c: number, r: number, cw: number, ch: number) {
      cols = c;
      rows = r;
      gl.viewport(0, 0, cols * cw, rows * ch);
      gl.uniform2f(cellAt, cw, ch);
      gl.uniform2f(sizeAt, cols, rows);
    },
    draw(glyphs: Uint8Array) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, cols, rows, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, glyphs);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  };
}

/**
 * Monochrome ASCII fire, rendered to a canvas with the classic "spread fire" automaton.
 * Glyphs are pre-rendered into an atlas once and painted with WebGL in a single draw per frame
 * (2D canvas drawImage where WebGL is unavailable). Rows above the tallest flame are skipped.
 * It only animates while on screen, and renders one still frame under reduced motion.
 */
export default function AsciiFire({ className, reach = 0.6, spread = "wide", cell = 14, interactive = true }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const gl = canvas.getContext("webgl", { antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    let gpu = gl && createGlRenderer(gl);
    const ctx = gl ? null : canvas.getContext("2d");
    if (!gpu && !ctx) return;

    const reduceQuery = matchMedia("(prefers-reduced-motion: reduce)");
    const darkQuery = matchMedia("(prefers-color-scheme: dark)");
    const levels = RAMP.length;

    let cols = 0;
    let rows = 0;
    let cw = 0; // device px per cell
    let ch = 0;
    let decayRange = 2;
    let heat = new Uint8Array(0);
    let glyphs = new Uint8Array(0); // what the WebGL grid texture holds
    // Every row above `top` is cold. `drawnTop` is the highest row painted in the last frame.
    let top = 0;
    let drawnTop = 0;
    let atlas: HTMLCanvasElement | null = null;
    let timer = 0;
    let rand = (Math.random() * 0x7fffffff) | 1;
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
      gpu?.atlas(a);
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
      glyphs = new Uint8Array(cols * rows);
      top = rows;
      drawnTop = rows;
      gpu?.resize(cols, rows, cw, ch);
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
      top = Math.min(top, rows - 1);
      if (pointer) {
        const px = Math.round(pointer.x);
        const py = Math.round(pointer.y);
        if (py > 1 && py < rows) {
          for (let dx = -1; dx <= 1; dx++) {
            const x = px + dx;
            if (x >= 0 && x < cols) heat[py * cols + x] = MAX - Math.abs(dx) * 6;
          }
          top = Math.min(top, py);
        }
      }
    };

    const spreadFire = () => {
      // Rows above `top` are cold, so they would only copy zeros upward.
      const from = Math.max(1, top);
      // xorshift32: one cheap random number per burning cell drives both the drift and the decay.
      let s = rand;
      for (let x = 0; x < cols; x++) {
        for (let y = from; y < rows; y++) {
          const src = y * cols + x;
          const h = heat[src];
          if (h === 0) {
            heat[src - cols] = 0;
            continue;
          }
          s ^= s << 13;
          s ^= s >>> 17;
          s ^= s << 5;
          let dx = x - ((s >>> 0) % 3) + 1;
          if (dx < 0) dx = 0;
          else if (dx >= cols) dx = cols - 1;
          const d = ((((s >>> 8) & 0xffff) * decayRange) / 0x10000) | 0;
          heat[(y - 1) * cols + dx] = h > d ? h - d : 0;
        }
      }
      rand = s;
      // Heat climbs at most one row per tick, so the new top is at or just above the old one.
      let next = from - 1;
      while (next < rows) {
        const row = next * cols;
        let x = 0;
        while (x < cols && heat[row + x] === 0) x++;
        if (x < cols) break;
        next++;
      }
      top = next;
    };

    const draw = () => {
      // Only the band that held or now holds flames has changed.
      const from = Math.min(drawnTop, top);
      drawnTop = top;
      if (gpu) {
        for (let i = from * cols; i < glyphs.length; i++) glyphs[i] = LEVEL[heat[i]];
        gpu.draw(glyphs);
        return;
      }
      if (!ctx) return;
      ctx.clearRect(0, from * ch, canvas.width, canvas.height - from * ch);
      if (!atlas) return;
      for (let y = top; y < rows; y++) {
        const row = y * cols;
        for (let x = 0; x < cols; x++) {
          const glyph = LEVEL[heat[row + x]];
          if (glyph) ctx.drawImage(atlas, glyph * cw, 0, cw, ch, x * cw, y * ch, cw, ch);
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
      top = rows;
      for (let i = 0; i < rows * 2; i++) tick();
      draw();
    }

    const loop = () => {
      timer = window.setTimeout(loop, FRAME_MS);
      tick();
      draw();
    };

    const start = () => {
      if (timer || reduceQuery.matches || !onScreen || document.hidden) return;
      loop();
    };
    const stop = () => {
      clearTimeout(timer);
      timer = 0;
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

    // The GPU can drop the context (driver reset, memory pressure); rebuild it when it returns.
    const onContextLost = (e: Event) => {
      e.preventDefault();
      stop();
    };
    const onContextRestored = () => {
      gpu = gl && createGlRenderer(gl);
      resize();
      start();
    };

    resize();
    document.fonts?.ready.then(buildAtlas);
    io.observe(canvas);
    ro.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    reduceQuery.addEventListener("change", onMotion);
    darkQuery.addEventListener("change", buildAtlas);
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
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
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
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

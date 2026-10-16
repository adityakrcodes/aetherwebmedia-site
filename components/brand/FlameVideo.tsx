"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The liquid-chrome flame logo loop. Its black background disappears with `mix-blend-screen`
 * on dark stages. Plays only while visible and never under reduced motion.
 */
export default function FlameVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduce.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="metadata"
      poster="/media/flame-poster.webp"
      width={560}
      height={630}
      className={cn("pointer-events-none select-none mix-blend-screen", className)}
    >
      <source src="/media/flame.mp4" type="video/mp4" />
    </video>
  );
}

"use client";

import { cn } from "@/lib/utils";

/** Content area inside the visual shell, below the step header. */
export function Canvas({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-x-4 bottom-4 top-14 sm:inset-x-8 sm:bottom-8 sm:top-16", className)}>
      {children}
    </div>
  );
}

/** A layer that eases in when `show` is true. Animations inside it are paused while it is hidden. */
export function Layer({
  show,
  className,
  children,
  style,
  hidden = "translate-y-4 scale-[0.97]",
}: {
  show: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  hidden?: string;
}) {
  return (
    <div
      style={style}
      data-paused={show ? undefined : ""}
      className={cn(
        "absolute transition-[opacity,transform,filter] duration-700 ease-expo",
        show ? "opacity-100" : cn("pointer-events-none opacity-0", hidden),
        className,
      )}
    >
      {children}
    </div>
  );
}

export const ease = "transition-all duration-700 ease-expo";

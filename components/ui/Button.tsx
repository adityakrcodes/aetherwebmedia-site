import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { EmberPill } from "@/components/brand/Mark";

type Tone = "ink" | "ember";

const base =
  "group inline-flex h-12 items-center gap-3 whitespace-nowrap rounded-full text-[0.95rem] font-medium transition-[transform,background-color,color,box-shadow] duration-300 ease-expo active:scale-[0.98]";

/**
 * The one primary CTA on the site. Opens the enquiry form in a modal (LeadDialog), or jumps to the
 * inline form at the end of the page without JS. `service` pre-selects that service in the form.
 * `tone="ember"` is for dark stages, `tone="ink"` for the paper canvas.
 * Its ember pill only moves on hover: a loop that is always on screen keeps the browser rendering every frame.
 */
export function StartProject({
  tone = "ink",
  service,
  className,
  label = "Start a project",
}: {
  tone?: Tone;
  service?: string;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href="#enquire"
      data-lead={service ?? ""}
      aria-haspopup="dialog"
      className={cn(
        base,
        "pl-1.5 pr-6 text-[0.95rem]",
        tone === "ember"
          ? "bg-ember text-furnace hover:bg-white"
          : "bg-ink text-paper hover:shadow-[0_10px_30px_-12px_rgb(15_15_15/0.45)]",
        className,
      )}
    >
      <span className="text-[2.35rem] leading-none transition-transform duration-500 ease-expo group-hover:scale-110">
        <EmberPill still />
      </span>
      {label}
    </a>
  );
}

/** Secondary action: an outlined pill. */
export function GhostLink({
  href,
  children,
  tone = "ink",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        base,
        "px-6 ring-1 ring-inset",
        tone === "ember"
          ? "text-ember ring-ember-line hover:bg-white/8"
          : "text-ink ring-line hover:bg-ink/5",
        className,
      )}
    >
      {children}
      <IconArrowUpRight
        size={18}
        stroke={1.75}
        className="transition-transform duration-300 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { calUrl, site } from "@/lib/site";
import { EmberPill } from "@/components/brand/Mark";

type Tone = "ink" | "ember";

const base =
  "group inline-flex h-12 items-center gap-3 whitespace-nowrap rounded-full text-[0.95rem] font-medium transition-[transform,background-color,color,box-shadow] duration-300 ease-expo active:scale-[0.98]";

/**
 * The one primary CTA on the site. Opens the Cal.com modal, or the booking page without JS.
 * `tone="ember"` is for dark stages, `tone="ink"` for the paper canvas.
 */
export function BookCall({
  tone = "ink",
  calLink = site.calLink,
  className,
  label = "Book a call",
}: {
  tone?: Tone;
  calLink?: string;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={calUrl(calLink)}
      data-cal={calLink}
      target="_blank"
      rel="noopener"
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
        <EmberPill />
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

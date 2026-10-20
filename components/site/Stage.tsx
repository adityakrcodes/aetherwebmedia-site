import { cn } from "@/lib/utils";
import AsciiFire from "@/components/brand/AsciiFire";
import LeadForm from "@/components/site/LeadForm";
import { site } from "@/lib/site";

/**
 * The dark "furnace" panel: rounded, inset from the viewport, with ASCII fire rising from the floor.
 * Used for heroes and the closing call to action.
 */
export function Stage({
  children,
  className,
  spread = "wide",
  reach = 0.55,
  as: Tag = "section",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  spread?: "wide" | "center" | "edges";
  reach?: number;
  as?: "section" | "div";
  id?: string;
  labelledBy?: string;
}) {
  return (
    <Tag id={id} aria-labelledby={labelledBy} className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-stage bg-furnace text-ember ring-1 ring-inset ring-ember-line",
          className,
        )}
      >
        <AsciiFire spread={spread} reach={reach} className="-z-10" />
        {/* heat glow from the floor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(60%_80%_at_50%_100%,rgb(255_255_255/0.13),transparent_70%)]"
        />
        {children}
      </div>
    </Tag>
  );
}

/** Oversized wordmark cropped by the bottom edge of a stage, after the Kinetic-type hero. */
export function GiantWord({ word, className }: { word: string; className?: string }) {
  const size = Math.min(28, Math.round(150 / word.length));
  return (
    <div aria-hidden className={cn("pointer-events-none select-none overflow-hidden", className)}>
      <p
        className="translate-y-[16%] text-center font-semibold leading-[0.78] tracking-[-0.065em] text-ember"
        style={{ fontSize: `${size}vw` }}
      >
        {word}
      </p>
    </div>
  );
}

/**
 * Closing call to action used at the end of every page, with the enquiry form inline.
 * The form is `#enquire`, where every StartProject button lands without JavaScript.
 */
export function CtaStage({
  heading = "Ready to ship?",
  body = "Leave your details and we reply within 24 hours. After one call you get a clear plan, a timeline and a written quote.",
  service,
}: {
  heading?: string;
  body?: string;
  service?: string;
}) {
  return (
    <Stage spread="edges" reach={0.75} labelledBy="cta-heading">
      <div className="container-x grid min-h-[86dvh] items-center gap-12 py-24 sm:py-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2
            id="cta-heading"
            data-reveal
            className="text-[clamp(3rem,8vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.055em]"
          >
            {heading}
          </h2>
          <p data-reveal style={{ "--d": 1 } as React.CSSProperties} className="mt-8 max-w-sm text-lg text-ember-2">
            {body}
          </p>
          <a
            data-reveal
            style={{ "--d": 2 } as React.CSSProperties}
            href={`mailto:${site.email}`}
            className="mt-8 inline-block text-sm text-ember-2 underline-offset-4 transition-colors hover:text-ember hover:underline"
          >
            Prefer email? {site.email}
          </a>
        </div>
        <div
          id="enquire"
          data-reveal
          style={{ "--d": 1 } as React.CSSProperties}
          className="rounded-card bg-furnace/95 p-6 ring-1 ring-inset ring-ember-line sm:p-8 lg:col-span-7 lg:p-10 xl:col-span-6 xl:col-start-7"
        >
          <LeadForm service={service} />
        </div>
      </div>
    </Stage>
  );
}

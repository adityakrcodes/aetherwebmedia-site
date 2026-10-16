import { cn } from "@/lib/utils";

/** The Aether flame mark. Takes the current text color. Size it with a height class. */
export function Mark({ className }: { className?: string }) {
  return <span aria-hidden className={cn("mark h-6", className)} />;
}

/** Inline capsule of moving light, sized to the surrounding type. */
export function EmberPill() {
  return (
    <span aria-hidden className="ember-pill">
      <i />
      <i />
      <i />
    </span>
  );
}

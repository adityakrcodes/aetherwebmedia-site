import Link from "next/link";
import { Stage } from "@/components/site/Stage";
import { GhostLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Stage spread="center" reach={0.7} className="min-h-[calc(100dvh-1rem)]">
      <div className="container-x flex min-h-[calc(100dvh-1rem)] flex-col items-center justify-center text-center">
        <p className="font-mono text-sm text-ember-3">404</p>
        <h1 className="mt-4 text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em]">
          This page burned out.
        </h1>
        <p className="mt-6 max-w-sm text-ember-2">The link may be old, or the page moved. Everything else is still lit.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-12 items-center rounded-full bg-ember px-6 font-medium text-furnace">
            Back to home
          </Link>
          <GhostLink href="/services" tone="ember">
            Explore services
          </GhostLink>
        </div>
      </div>
    </Stage>
  );
}

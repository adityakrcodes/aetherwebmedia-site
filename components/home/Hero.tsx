import { Stage, GiantWord } from "@/components/site/Stage";
import FlameVideo from "@/components/brand/FlameVideo";
import { BookCall, GhostLink } from "@/components/ui/Button";
import { preload } from "react-dom";

export default function Hero() {
  // The flame poster is the largest paint in the hero, so fetch it first.
  preload("/media/flame-poster.webp", { as: "image", fetchPriority: "high" });
  return (
    <Stage spread="wide" reach={0.5} className="min-h-[calc(100dvh-1rem)] sm:min-h-[calc(100dvh-1.5rem)]" labelledBy="hero-heading">
      <div className="flex min-h-[calc(100dvh-1rem)] flex-col sm:min-h-[calc(100dvh-1.5rem)]">
        <div className="container-x relative z-10 grid flex-1 grid-cols-1 gap-10 pt-28 sm:pt-32 lg:grid-cols-12 lg:pt-36">
          <div className="lg:col-span-10 xl:col-span-9">
            <h1
              id="hero-heading"
              className="rise text-[clamp(2.75rem,6.1vw,6rem)] font-medium leading-[0.94] tracking-[-0.05em]"
            >
              Websites and software,{" "}
              <span className="text-ember-3">forged to convert.</span>
            </h1>
            <p className="rise mt-7 max-w-md text-lg leading-relaxed text-ember-2" style={{ "--d": 1 } as React.CSSProperties}>
              A team of strategists, designers and engineers building fast websites, SaaS products and custom software for growing businesses.
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": 2 } as React.CSSProperties}>
              <BookCall tone="ember" />
              <GhostLink href="/services" tone="ember">
                Explore services
              </GhostLink>
            </div>
          </div>
        </div>

        {/* The chrome flame stands on the wordmark, the way the logo stands on the brand. */}
        <div className="relative mt-10 lg:mt-0">
          <FlameVideo className="fade-in absolute bottom-[58%] left-1/2 z-0 h-[min(28vh,13rem)] w-auto -translate-x-1/2 sm:h-[min(40vh,20rem)] lg:bottom-[52%] lg:left-auto lg:right-[7%] lg:h-[min(58vh,30rem)] lg:translate-x-0" />
          <GiantWord word="aether" className="relative z-10" />
        </div>
      </div>
    </Stage>
  );
}

import Image from "next/image";
import { workItems } from "@/lib/services";
import { cn } from "@/lib/utils";

/** Horizontal, scroll-snapping rail of real project screenshots. Greyscale until hovered. */
export default function Work({
  items = ["apex", "imperial", "maestro", "abnb", "purple-night"],
  heading = "Selected work",
  className,
}: {
  items?: string[];
  heading?: string;
  className?: string;
}) {
  return (
    <section id="work" aria-labelledby="work-heading" className={cn("pb-28 md:pb-40", className)}>
      <div className="container-x">
        <h2
          id="work-heading"
          data-reveal
          className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
        >
          {heading}
        </h2>
      </div>
      <ul
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:px-10 [&::-webkit-scrollbar]:hidden"
        aria-label="Projects"
      >
        {items.map((key, i) => {
          const w = workItems[key];
          if (!w) return null;
          return (
            <li
              key={key}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
              className="group w-[84vw] shrink-0 snap-start sm:w-[60vw] lg:w-[42vw] xl:w-[36rem]"
            >
              <figure>
                <div className="relative aspect-[16/10] overflow-hidden rounded-card bg-paper-2 ring-1 ring-line">
                  <Image
                    src={w.src}
                    alt={`${w.name}, ${w.kind.toLowerCase()} by Aether`}
                    fill
                    sizes="(min-width: 1280px) 36rem, (min-width: 1024px) 42vw, (min-width: 640px) 60vw, 84vw"
                    className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-expo group-hover:scale-[1.02] group-hover:grayscale-0"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 px-1">
                  <span className="text-lg font-medium tracking-[-0.02em]">{w.name}</span>
                  <span className="text-sm text-ink-2">{w.kind}</span>
                </figcaption>
              </figure>
            </li>
          );
        })}
        <li aria-hidden className="w-1 shrink-0" />
      </ul>
    </section>
  );
}

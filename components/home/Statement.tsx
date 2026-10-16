import Image from "next/image";
import { EmberPill, Mark } from "@/components/brand/Mark";

type Segment = string | React.ReactElement;

/** Splits text segments into words that light up in sequence as the block scrolls past. */
function LitText({ segments }: { segments: Segment[] }) {
  const total = segments.reduce((n, s) => n + (typeof s === "string" ? s.trim().split(/\s+/).length : 1), 0);
  let i = 0;
  return (
    <>
      {segments.map((seg, s) => {
        if (typeof seg !== "string") {
          i++;
          return <span key={s}>{seg} </span>;
        }
        return seg
          .trim()
          .split(/\s+/)
          .map((word, w) => (
            <span key={`${s}-${w}`} className="w" style={{ "--p": (i++ / total) * 100 } as React.CSSProperties}>
              {word}{" "}
            </span>
          ));
      })}
    </>
  );
}

export default function Statement() {
  return (
    <section aria-labelledby="studio-heading" className="container-x py-28 md:py-44">
      <div className="grid md:grid-cols-12">
        <div className="md:col-span-10 md:col-start-3 lg:col-span-8 lg:col-start-4">
          <p id="studio-heading" className="mb-8 flex items-center gap-2 text-sm text-ink-2">
            <Mark className="h-4" />
            About the studio
          </p>
          <p className="lit-words text-[clamp(1.85rem,3.7vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.04em]">
            <LitText
              segments={[
                "Aether is a design and engineering studio",
                <EmberPill key="ember" />,
                "building websites and software for businesses that want more customers.",
                <span key="img" className="img-pill" aria-hidden>
                  <Image src="/images/work/imperial.webp" alt="" fill sizes="120px" className="object-cover grayscale" />
                </span>,
                "Every build is fast, findable and made to turn visitors into buyers.",
              ]}
            />
          </p>
          <p className="mt-10 max-w-sm text-sm leading-relaxed text-ink-2">
            Formerly AKC Web Media. Founded by two engineers who still design and write every line themselves.
          </p>
        </div>
      </div>
    </section>
  );
}

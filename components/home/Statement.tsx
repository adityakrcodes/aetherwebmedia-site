import Image from "next/image";
import { EmberPill, Mark } from "@/components/brand/Mark";

type Segment = string | React.ReactElement;

const roles = [
  "Product strategy",
  "UI/UX design",
  "Front-end",
  "Back-end",
  "Mobile",
  "Brand design",
  "SEO and growth",
  "QA and testing",
];

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
          <p className="mt-10 max-w-md text-sm leading-relaxed text-ink-2">
            Formerly AKC Web Media. Strategists, designers, engineers and marketers under one roof, with a specialist on
            every part of your project.
          </p>
          <ul aria-label="Who works on your project" className="mt-5 flex max-w-xl flex-wrap gap-2">
            {roles.map((r) => (
              <li key={r} className="rounded-full bg-paper-2 px-3.5 py-2 text-sm text-ink-2">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

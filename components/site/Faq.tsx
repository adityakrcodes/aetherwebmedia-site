import { IconPlus } from "@tabler/icons-react";
import { StartProject } from "@/components/ui/Button";

/** FAQ as native <details>, so it works without JavaScript. Also emits FAQPage structured data. */
export default function Faq({
  faqs,
  heading = "Questions, answered.",
  service,
}: {
  faqs: { q: string; a: string }[];
  heading?: string;
  service?: string;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section id="faq" aria-labelledby="faq-heading" className="container-x pb-28 md:pb-40">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2
              id="faq-heading"
              data-reveal
              className="text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
            >
              {heading}
            </h2>
            <p data-reveal className="mt-6 max-w-sm text-ink-2">
              Still unsure about something? Leave your details and our team will get back to you within 24 hours.
            </p>
            <div data-reveal className="mt-8">
              <StartProject service={service} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              data-reveal
              style={{ "--d": i } as React.CSSProperties}
              className="group border-b border-line first:border-t"
              open={i === 0}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium tracking-[-0.02em] sm:text-xl">
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform duration-300 ease-expo group-open:rotate-45">
                  <IconPlus size={16} stroke={1.75} />
                </span>
              </summary>
              <p className="max-w-xl pb-7 leading-relaxed text-ink-2">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </section>
  );
}

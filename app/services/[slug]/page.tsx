import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services, type VisualKey } from "@/lib/services";
import { site } from "@/lib/site";
import { ServiceHero, Builds, Outcomes, Included, Plans, OtherServices } from "@/components/service/ServiceSections";
import ProcessScroller from "@/components/service/ProcessScroller";
import WebVisual from "@/components/service/visuals/WebVisual";
import SoftwareVisual from "@/components/service/visuals/SoftwareVisual";
import AppVisual from "@/components/service/visuals/AppVisual";
import DesignVisual from "@/components/service/visuals/DesignVisual";
import BrandVisual from "@/components/service/visuals/BrandVisual";
import GrowthVisual from "@/components/service/visuals/GrowthVisual";
import Work from "@/components/home/Work";
import Faq from "@/components/site/Faq";
import { CtaStage } from "@/components/site/Stage";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const url = `/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: `${s.metaTitle} | ${site.name}`, description: s.metaDescription, url },
    twitter: { title: `${s.metaTitle} | ${site.name}`, description: s.metaDescription },
  };
}

// Only the visual for the current page is rendered, so only its client code is sent.
const visuals: Record<VisualKey, React.ReactNode> = {
  web: <WebVisual />,
  software: <SoftwareVisual />,
  app: <AppVisual />,
  design: <DesignVisual />,
  brand: <BrandVisual />,
  growth: <GrowthVisual />,
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    ...(s.plans && {
      offers: s.plans.map((p) => ({
        "@type": "Offer",
        name: p.name,
        price: p.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
      })),
    }),
  };

  return (
    <>
      <ServiceHero s={s} />
      <Builds s={s} />
      <Outcomes s={s} />

      <section id="process" aria-labelledby="process-heading" className="container-x pb-12">
        <h2
          id="process-heading"
          data-reveal
          className="max-w-4xl text-[clamp(2.2rem,4.6vw,4.25rem)] font-medium leading-[1] tracking-[-0.05em]"
        >
          {s.processTitle}.
        </h2>
        <p data-reveal className="mt-5 max-w-lg text-lg text-ink-2">
          Six steps, with something real to review at the end of each one.
        </p>
        <div className="mt-6">
          <ProcessScroller steps={s.process} visual={visuals[s.visual]} title={s.processTitle} />
        </div>
      </section>

      <Included s={s} />
      <Plans s={s} />
      {s.work && <Work items={s.work} heading="Recent work" />}
      <Faq faqs={s.faqs} heading={`${s.name}, answered.`} calLink={s.calLink} />
      <OtherServices current={s.slug} />
      <CtaStage calLink={s.calLink} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}

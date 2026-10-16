import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Statement from "@/components/home/Statement";
import Services from "@/components/home/Services";
import WhatYouGet from "@/components/home/WhatYouGet";
import Work from "@/components/home/Work";
import Process from "@/components/home/Process";
import Pricing from "@/components/home/Pricing";
import Team from "@/components/home/Team";
import Faq from "@/components/site/Faq";
import { CtaStage } from "@/components/site/Stage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqs = [
  {
    q: "What do you build?",
    a: "Mostly websites and software: marketing sites, online stores, web apps, SaaS products and internal tools. We also design and build mobile apps, and help with branding, UI/UX and marketing around them.",
  },
  {
    q: "How much does a project cost?",
    a: "Landing pages start at $500, software and mobile apps at $1,000. After a free call you get a written proposal with the exact scope, timeline and price.",
  },
  {
    q: "How long does it take?",
    a: "A landing page takes 1-2 weeks, a marketing website 2-4 weeks and a SaaS MVP 4-6 weeks. Bigger platforms are planned in phases so you can launch sooner.",
  },
  {
    q: "Do I own the code and designs?",
    a: "Yes, completely. Code lives in your repository, designs in your Figma, and every account is in your name.",
  },
  {
    q: "How do we work together?",
    a: "You talk directly with the two founders. Expect a weekly preview link, a shared board of what is in progress and quick replies on email or chat.",
  },
  {
    q: "What happens after launch?",
    a: "Every project includes a support window for fixes and small changes. After that you can keep us on monthly for new features, or take everything in-house with full documentation.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <WhatYouGet />
      <Work />
      <Process />
      <Pricing />
      <Team />
      <Faq faqs={faqs} />
      <CtaStage />
    </>
  );
}

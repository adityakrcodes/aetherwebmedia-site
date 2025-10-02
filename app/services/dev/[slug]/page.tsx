"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DotGrid from "@/components/DotGrid";
import { SaasBentoGrid, SaasBentoGridItem } from "@/components/ui/saas-bento-grid";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import CardSwap, { Card } from "@/components/CardSwap";
import Image from "next/image";
import { servicesConfig } from "../../services";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CometCard } from "@/components/ui/comet-card";

export const runtime = 'edge';

type PageProps = {
  params: { slug: string };
};

export default function ServicePage({ params }: PageProps) {
  const service = servicesConfig[params.slug];

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "schedule-a-call" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])

  if (!service) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <p>Service not found.</p>
      </div>
    );
  }

  const { badgeLabel, headline, subtext, outcomes, roadmap, stack, stackImages, pricing } = service;

  return (
    <div className="relative ">
      <Header />
      <section className="relative pt-32 md:pt-52">
        <div className="absolute inset-0 -z-10 h-screen w-screen">
          <DotGrid dotSize={5} gap={12} baseColor="#060405" activeColor="#79757A" proximity={170} shockRadius={200} shockStrength={5} resistance={750} returnDuration={1.5} />
        </div>
        <div className="max-w-[85rem] mr-auto ml-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-normal text-neutral-200 font-sans">{badgeLabel}</span>
          </div>
          <div className="mt-6 flex justify-between gap-[11rem] items-center flex-wrap lg:flex-nowrap">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tight text-white font-poppins font-light leading-[1.08]">
                {headline}
              </h1>
              <p className="text-neutral-300 md:text-base max-w-2xl">
                {subtext}
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#roadmap" className="inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl px-5 py-3 backdrop-blur-lg">See the roadmap</a>
                <div
                  data-cal-namespace="schedule-a-call"
                  data-cal-link="aetherwebmedia/schedule-a-call"
                  data-cal-config='{"layout":"month_view"}'
                  className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  <span className="relative z-10 block bg-gray-950 rounded-xl px-6 py-3 text-sm">Book a Call</span>
                </div>
              </div>
            </div>
            <div className="relative lg:h-[441px] lg:bottom-[3rem] h-[200px] md:w-[500px] w-[200px] md:left-[16rem] left-10">
              <CardSwap cardDistance={60} verticalDistance={70} delay={3000} pauseOnHover={false} skewAmount={0}>
                {stackImages.map((src) => (
                  <Card key={src} className="md:w-[300px] w-[600px]!">
                    {/* Using next/image for optimization but allowing string src */}
                    <Image src={src} alt="Stack" fill className="object-cover rounded-lg" />
                  </Card>
                ))}
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      <section id="outcomes" className="relative py-16 md:py-24 mt-26">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="text-3xl md:text-5xl tracking-tight text-white font-manrope font-medium text-center">Outcomes over features</h2>
          <p className="text-neutral-300 mt-4 text-center max-w-2xl mx-auto">What you can expect within the first release window.</p>
          <SaasBentoGrid className="mt-8">
            {outcomes.map((o, i) => (
              <SaasBentoGridItem
                key={o.title}
                title={o.title}
                description={o.desc}
                header={<div className="h-20 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800" />}
                className={i % 4 === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              />
            ))}
          </SaasBentoGrid>
        </div>
      </section>

      <section id="roadmap" className="relative py-16 ">
        <div className="mx-auto w-screen pointer-events-auto">
          <h2 className="text-3xl md:text-5xl tracking-tight text-white font-manrope font-medium text-center mb-10">Roadmap</h2>
          <StickyScroll
            content={roadmap.map((r) => ({
              title: r.stepTitle,
              description: r.description,
              content: (
                <div className={`flex h-full w-full items-center justify-center text-white rounded-xl`} style={{
                  background: `linear-gradient(to bottom right, ${r.gradientFrom}, ${r.gradientTo})`
                }}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{r.emoji}</div>
                    <div className="text-lg font-semibold">{r.stepTitle}</div>
                  </div>
                </div>
              )
            }))}
          />
        </div>
      </section>

      <section id="stack" className="relative py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h2 className="text-3xl md:text-5xl tracking-tight text-white font-manrope font-medium text-center">Stack we love</h2>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {stack.map((s) => (
              <span key={s} className="text-sm text-neutral-200 bg-white/5 rounded-lg ring-1 ring-white/10 px-3 py-2">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-center text-neutral-400 text-sm">We'll choose pragmatically based on your problem, not trends.</p>
        </div>
      </section>

      <div className="w-full h-[126rem] md:h-screen relative" id="pricing">

        <DotGrid

          dotSize={5}

          gap={12}

          baseColor="#060405"

          activeColor="#79757A"

          proximity={170}

          shockRadius={200}

          shockStrength={5}

          resistance={750}

          returnDuration={1.5}

        />
        <h1 className="text-5xl md:text-7xl tracking-tight font-semibold text-white absolute md:top-[18%] top-[7%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          Pricing
        </h1>
        <div className="flex items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col md:flex-row items-center justify-center lg:gap-32 gap-16 w-full relative z-10 mt-60">
            {/* First Bundle */}
            <CometCard className="max-w-[320px] h-[520px]" rotateDepth={3} translateDepth={3}>
              <div className="group my-10 flex w-64 lg:w-80 flex-col rounded-2xl bg-[rgba(12,12,12,0.6)] p-5 text-white ring-1 ring-white/10 backdrop-blur-md hover:ring-white/20 transition">
                <div className="px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10 w-max text-[11px] tracking-wide uppercase text-neutral-200">{pricing[0].badgeLabel}</div>
                <h3 className="mt-4 text-[22px] font-medium text-white">{pricing[0].title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-300">Fast, accessible, SEO‑friendly site with CMS.</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">{pricing[0].price}</span>
                  <span className="text-xs text-neutral-400">starting</span>
                </div>
                <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <ul className="mt-4 space-y-2 text-[13px] text-neutral-200">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[0].features[0]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Modern, responsive website design</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[0].features[2]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[0].features[3]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[0].features[4]}</li>
                </ul>
                <div
                    data-cal-namespace="schedule-a-call"
                    data-cal-link="aetherwebmedia/schedule-a-call"
                    data-cal-config='{"layout":"month_view"}'
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/90 active:scale-[0.99] transition cursor-pointer"
                  >
                    <p className=" text-sm cursor-pointer">Book a Call</p></div>
              </div>
            </CometCard>

            {/* Middle Pack */}
            <CometCard className="max-w-[320px] h-[520px] md:scale-130 mt-16 lg:mt-0" rotateDepth={3} translateDepth={3}>
              <div className="group my-10 flex w-64 lg:w-80 flex-col rounded-2xl bg-[rgba(12,12,12,0.6)] p-5 text-white ring-1 ring-white/10 backdrop-blur-md hover:ring-white/20 transition">
                <div className="px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10 w-max text-[11px] tracking-wide uppercase text-neutral-200">{pricing[1].badgeLabel}</div>
                <h3 className="mt-4 text-[22px] font-medium text-white">{pricing[1].title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-300">{pricing[1].subtitle}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">{pricing[1].price}</span>
                  <span className="text-xs text-neutral-400">starting</span>
                </div>
                <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <ul className="mt-4 space-y-2 text-[13px] text-neutral-200">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[1].features[0]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Authentication & user management</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[1].features[2]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[1].features[3]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[1].features[4]}</li>
                </ul>
                  <div
                    data-cal-namespace="schedule-a-call"
                    data-cal-link="aetherwebmedia/schedule-a-call"
                    data-cal-config='{"layout":"month_view"}'
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/90 active:scale-[0.99] transition cursor-pointer"
                  >
                    <p className=" text-sm cursor-pointer">Book a Call</p></div>
              </div>
            </CometCard>

            {/* Big Bundle */}
            <CometCard className="max-w-[320px] h-[540px] " rotateDepth={5} translateDepth={5}>
              <div className="group my-10 flex w-64 lg:w-80 flex-col rounded-2xl bg-[rgba(12,12,12,0.6)] p-5 text-white ring-1 ring-white/10 backdrop-blur-md hover:ring-white/20 transition">
                <div className="px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10 w-max text-[11px] tracking-wide uppercase text-neutral-200">{pricing[2].badgeLabel}</div>
                <h3 className="mt-4 text-[22px] font-medium text-white">{pricing[2].title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-300">Cross-platform app with core flows and analytics.</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">{pricing[2].price}</span>
                  <span className="text-xs text-neutral-400">starting</span>
                </div>
                <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <ul className="mt-4 space-y-2 text-[13px] text-neutral-200">
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[2].features[0]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[2].features[1]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[2].features[2]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[2].features[3]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />{pricing[2].features[4]}</li>
                  <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />1 month free support <br /> (Post-launch)</li>
                </ul>
                <div
                    data-cal-namespace="schedule-a-call"
                    data-cal-link="aetherwebmedia/schedule-a-call"
                    data-cal-config='{"layout":"month_view"}'
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/90 active:scale-[0.99] transition cursor-pointer"
                  >
                    <p className=" text-sm cursor-pointer">Book a Call</p></div>
              </div>
            </CometCard>
          </div>
        </div>
      </div>

      {/* <section id="work" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-4xl tracking-tight text-white font-manrope font-medium">From idea to production quickly</h3>
            <p className="mt-3 text-neutral-300">We partner with teams to ship focused releases with the right integrations for measurable outcomes.</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl px-5 py-3 backdrop-blur-lg">View details</a>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[16/10] rounded-2xl bg-neutral-900/70 ring-1 ring-white/10" />
          </div>
        </div>
      </section> */}

      <section id="contact" className="relative py-20 lg:rounded-b-[9rem] rounded-b-[4rem]" style={{ boxShadow: "0 60px 60px -12px rgba(0,0,0,1), 0 60px 0px -40px rgba(0,0,0,1)" }}>
        <div className="mx-auto max-w-5xl text-center px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-normal text-neutral-200 font-sans">Let's move fast</span>
          </div>
          <h3 className="mt-6 text-3xl md:text-5xl tracking-tight text-white font-manrope font-medium">Tell us your idea. We'll scope it — free.</h3>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">Get a timeline, budget range, and recommended stack. No obligation.</p>
          <div className="mt-8">
            <a href="mailto:aetherwebmedia@gmail.com" className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 block bg-gray-950 rounded-xl px-6 py-3 text-sm">Email Us</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



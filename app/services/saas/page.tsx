"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import DotGrid from "@/components/DotGrid";
import { SaasBentoGrid, SaasBentoGridItem } from "@/components/ui/saas-bento-grid";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import CardSwap, { Card } from '@/components/CardSwap'
import image1 from '@/public/image1.png'
import image2 from '@/public/image2.png'
import image3 from '@/public/image3.png'
import image4 from '@/public/image.png'


export default function Saas() {
  const outcomes = [
    { title: "Ship in Weeks", desc: "A usable MVP in 4–6 weeks, scoping only what matters." },
    { title: "Market Validation", desc: "Analytics, feedback loops, and A/B hooks built-in." },
    { title: "Ownable Codebase", desc: "Readable, typed code designed to be extended by any team." },
    { title: "Security First", desc: "Best practices for auth, RBAC, and data protection from day one." },
    { title: "Payments & Plans", desc: "Stripe subscriptions, trials, and metered billing ready." },
    { title: "Cloud Native", desc: "Deployed with observability, error tracking, and rollbacks." },
  ];

  const roadmapContent = [
    {
      title: "01 · Scope",
      description: "Define MVP goals, success metrics, and non-negotiables. We'll map your core user journey and identify the minimum feature set needed to validate your hypothesis.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-lg font-semibold">Scope Definition</div>
          </div>
        </div>
      ),
    },
    {
      title: "02 · UX Draft",
      description: "Wireframes and flows focused on activation. We'll design the user experience that gets users to their first 'aha moment' as quickly as possible.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">✏️</div>
            <div className="text-lg font-semibold">UX Design</div>
          </div>
        </div>
      ),
    },
    {
      title: "03 · Build",
      description: "Core features only, production quality. We'll build your MVP with clean, typed code that's ready for real users from day one.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--purple-500),var(--pink-500))] text-white rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <div className="text-lg font-semibold">Development</div>
          </div>
        </div>
      ),
    },
    {
      title: "04 · Integrate",
      description: "Auth, billing, email, analytics, and ops. We'll connect all the essential services your SaaS needs to function and scale.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--cyan-500))] text-white rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🔗</div>
            <div className="text-lg font-semibold">Integration</div>
          </div>
        </div>
      ),
    },
    {
      title: "05 · Validate",
      description: "Dogfood, QA, and closed-beta with fast fixes. We'll test everything thoroughly and iterate quickly based on real user feedback.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--green-500),var(--emerald-500))] text-white rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🧪</div>
            <div className="text-lg font-semibold">Testing</div>
          </div>
        </div>
      ),
    },
    {
      title: "06 · Launch",
      description: "Ship, measure, iterate — with a clear v1.1 plan. We'll deploy your MVP and set up the feedback loops you need to grow.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--red-500),var(--orange-500))] text-white rounded-xl">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <div className="text-lg font-semibold">Launch</div>
          </div>
        </div>
      ),
    },
  ];

  const stack = ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "tRPC/REST", "Stripe", "Clerk/Auth.js", "Vercel/AWS", "Sentry", "PostHog"];

  const stackImages = [image1, image2, image3, image4];

  return (
    <div className="relative scroll-smooth ">
      <Header />
      <section className="relative pt-32 md:pt-36">
        <div className="absolute inset-0 -z-10 h-screen w-screen">
          <DotGrid dotSize={5} gap={12} baseColor="#060405" activeColor="#79757A" proximity={170} shockRadius={200} shockStrength={5} resistance={750} returnDuration={1.5} />
        </div>
        <div className="max-w-[85rem] mr-auto ml-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-normal text-neutral-200 font-sans">SaaS MVP Development</span>
          </div>
          <div className="mt-6 flex justify-between gap-[11rem] items-center flex-wrap">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight text-white font-poppins font-light leading-[1.08]">
                Build only what's needed to prove what matters
              </h1>
              <p className="text-neutral-300 md:text-lg max-w-2xl">
                We design and ship focused MVPs that validate your thesis quickly — with real users, clean code, and a runway to scale.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href="#roadmap" className="inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl px-5 py-3 backdrop-blur-lg">See the roadmap</a>
                <a href="#contact" className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  <span className="relative z-10 block bg-gray-950 rounded-xl px-6 py-3 text-sm">Book a Call</span>
                </a>
              </div>
            </div>
            <div className="relative lg:h-[475px] h-[200px] md:w-[500px] w-[200px] md:left-80 left-10">

              <CardSwap
                
                cardDistance={60}
                verticalDistance={70}
                delay={3000}
                pauseOnHover={false}
                skewAmount={0}
               >

                {stackImages.map((s) => (
                  <Card key={s.src} className="md:w-[300px] w-[600px]!">
                    <img src={s.src} alt="Stack" className="w-full h-full object-cover rounded-lg" />
                  </Card>
                ))}

              </CardSwap>

            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
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

      {/* Roadmap with Sticky Scroll Reveal */}
      <section id="roadmap" className="relative py-16 ">
        <div className="mx-auto w-screen pointer-events-auto">
          <h2 className="text-3xl md:text-5xl tracking-tight text-white font-manrope font-medium text-center mb-10">MVP Roadmap</h2>
          <StickyScroll content={roadmapContent} />
        </div>
      </section>

      {/* Stack */}
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
          <p className="mt-4 text-center text-neutral-400 text-sm">We’ll choose pragmatically based on your problem, not trends.</p>
        </div>
      </section>

      {/* Mini Case Study */}
      <section id="work" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-4xl tracking-tight text-white font-manrope font-medium">From idea to paid users in 5 weeks</h3>
            <p className="mt-3 text-neutral-300">We partnered with a B2B team to ship a focused MVP with auth, billing, and a dashboard. They closed 12 trial signups in week one and converted 4 to paid by week four.</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 ring-1 ring-white/15 hover:bg-white/10 transition text-sm font-medium text-white bg-white/5 rounded-xl px-5 py-3 backdrop-blur-lg">View details</a>
          </div>
          <div className="order-1 md:order-2">
            <div className="aspect-[16/10] rounded-2xl bg-neutral-900/70 ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-20 lg:rounded-b-[9rem] rounded-b-[4rem]" style={{ boxShadow: "0 60px 60px -12px rgba(0,0,0,1), 0 60px 0px -40px rgba(0,0,0,1)" }}>
        <div className="mx-auto max-w-5xl text-center px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10 backdrop-blur">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
            <span className="text-sm font-normal text-neutral-200 font-sans">Let’s move fast</span>
          </div>
          <h3 className="mt-6 text-3xl md:text-5xl tracking-tight text-white font-manrope font-medium">Tell us your idea. We’ll scope your MVP — free.</h3>
          <p className="mt-4 text-neutral-300 max-w-2xl mx-auto">Get a timeline, budget range, and recommended stack. No obligation.</p>
          <div className="mt-8">
            <a href="mailto:hello@novalume.studio" className="group relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              <span className="relative z-10 block bg-gray-950 rounded-xl px-6 py-3 text-sm">Email Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}



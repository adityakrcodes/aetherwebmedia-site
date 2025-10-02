import DotGrid from "@/components/DotGrid";
import { CometCard } from "@/components/ui/comet-card";



export default function Pricing() {
  return (
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
          {/* Web Dev Bundle */}
          <CometCard className="max-w-[320px] h-[520px]" rotateDepth={3} translateDepth={3}>
            <div className="group my-10 flex w-64 lg:w-80 flex-col rounded-2xl bg-[rgba(12,12,12,0.6)] p-5 text-white ring-1 ring-white/10 backdrop-blur-md hover:ring-white/20 transition">
              <div className="px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10 w-max text-[11px] tracking-wide uppercase text-neutral-200">Web Dev Bundle</div>
              <h3 className="mt-4 text-[22px] font-medium text-white">Launch‑ready website</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-300">Fast, accessible, SEO‑friendly site with CMS.</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-semibold">$500</span>
                <span className="text-xs text-neutral-400">onwards</span>
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <ul className="mt-4 space-y-2 text-[13px] text-neutral-200">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Up to 5 pages, mobile‑friendly</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Modern, responsive website design</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Edit content yourself + traffic insights</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Smooth, tasteful animations</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />1 month free support</li>
              </ul>
              <a href="/services/dev/web" className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/90 active:scale-[0.99] transition">Explore More</a>
            </div>
          </CometCard>

          {/* SaaS Bundle */}
          <CometCard className="max-w-[320px] h-[520px] scale-130 mt-16 lg:mt-0" rotateDepth={3} translateDepth={3}>
            <div className="group my-10 flex w-64 lg:w-80 flex-col rounded-2xl bg-[rgba(12,12,12,0.6)] p-5 text-white ring-1 ring-white/10 backdrop-blur-md hover:ring-white/20 transition">
              <div className="px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10 w-max text-[11px] tracking-wide uppercase text-neutral-200">SaaS Bundle</div>
              <h3 className="mt-4 text-[22px] font-medium text-white">MVP to revenue</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-300">Core product, auth, billing, and dashboard.</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-semibold">$2,000</span>
                <span className="text-xs text-neutral-400">onwards</span>
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <ul className="mt-4 space-y-2 text-[13px] text-neutral-200">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />End-to-end SaaS MVP development</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Authentication & user management</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Scalable backend architecture</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Integrated payment systems</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />2 month free support</li>
              </ul>
              <a href="/services/dev/saas" className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/90 active:scale-[0.99] transition">Explore More</a>
            </div>
          </CometCard>

          {/* App Dev Bundle */}
          

          <CometCard className="max-w-[320px] h-[540px] mt-16 lg:mt-0" rotateDepth={5} translateDepth={5}>
            <div className="group my-10 flex w-64 lg:w-80 flex-col rounded-2xl bg-[rgba(12,12,12,0.6)] p-5 text-white ring-1 ring-white/10 backdrop-blur-md hover:ring-white/20 transition">
              <div className="px-2 py-1 rounded-full bg-white/5 ring-1 ring-white/10 w-max text-[11px] tracking-wide uppercase text-neutral-200">App Dev Bundle</div>
              <h3 className="mt-4 text-[22px] font-medium text-white">Prototype to store</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-300">Cross-platform app with core flows and analytics.</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-semibold">$1,000</span>
                <span className="text-xs text-neutral-400">onwards</span>
              </div>
              <div className="mt-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <ul className="mt-4 space-y-2 text-[13px] text-neutral-200">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Works on iOS and Android</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Custom UI/UX design</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />Login, notifications, and analytics</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />API integrations</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />App store deployment support</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-white/60" />1 month free support <br /> (Post-launch)</li>
              </ul>
              <a href="/services/dev/app" className="mt-6 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2.5 text-sm font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-white/90 active:scale-[0.99] transition">Explore More</a>
            </div>
          </CometCard>
        </div>
      </div>
    </div>
  )
}
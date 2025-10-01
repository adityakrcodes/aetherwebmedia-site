import DotGrid from "@/components/DotGrid";
import { CometCard } from "@/components/ui/comet-card";



export default function Pricing() {
  return (
    <div className="w-full h-[126rem] md:h-screen relative">

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
      <h1 className="text-7xl font-bold absolute md:top-[20%] top-[5%] left-1/2 -translate-x-1/2 -translate-y-1/2">Pricing</h1>
      <div className="flex items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col md:flex-row items-center justify-center lg:gap-32 gap-16 w-full relative z-10 md:mt-0 mt-20">
          {/* Web Dev Bundle */}
          <CometCard className="max-w-[300px] h-[460px]">
            <div className="my-10 flex w-60 lg:w-80 flex-col rounded-[16px] bg-[#1F2121] p-4 text-white">
              <div className="px-2 py-1 rounded-full bg-white/10 ring-1 ring-white/10 w-max text-xs">Web Dev Bundle</div>
              <h3 className="mt-3 text-2xl font-semibold">Launch-ready website</h3>
              <p className="mt-1 text-sm text-neutral-300">Fast, accessible, SEO‑friendly site with CMS.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$4,900</span>
                <span className="text-xs text-neutral-400">starting</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• 5‑8 pages, responsive</li>
                <li>• Component library</li>
                <li>• CMS + analytics</li>
                <li>• Basic animations</li>
              </ul>
              <a href="/services/web" className="mt-6 inline-flex items-center justify-center rounded-lg bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition">Explore Web</a>
            </div>
          </CometCard>

          {/* App Dev Bundle */}
          <CometCard className="max-w-[300px] h-[480px] scale-130">
            <div className="my-10 flex w-60 lg:w-80 flex-col rounded-[16px] bg-[#1F2121] p-4 text-white">
              <div className="px-2 py-1 rounded-full bg-white/10 ring-1 ring-white/10 w-max text-xs">App Dev Bundle</div>
              <h3 className="mt-3 text-2xl font-semibold">Prototype to store</h3>
              <p className="mt-1 text-sm text-neutral-300">Cross‑platform app with core flows and analytics.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$12,000</span>
                <span className="text-xs text-neutral-400">starting</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• iOS + Android</li>
                <li>• Offline‑first data</li>
                <li>• Auth, push, analytics</li>
                <li>• CI/CD setup</li>
              </ul>
              <a href="/services/app" className="mt-6 inline-flex items-center justify-center rounded-lg bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition">Explore App</a>
            </div>
          </CometCard>

          {/* SaaS Bundle */}
          <CometCard className="max-w-[300px] h-[460px]">
            <div className="my-10 flex w-60 lg:w-80 flex-col rounded-[16px] bg-[#1F2121] p-4 text-white">
              <div className="px-2 py-1 rounded-full bg-white/10 ring-1 ring-white/10 w-max text-xs">SaaS Bundle</div>
              <h3 className="mt-3 text-2xl font-semibold">MVP to revenue</h3>
              <p className="mt-1 text-sm text-neutral-300">Core product, auth, billing, and dashboard.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold">$18,000</span>
                <span className="text-xs text-neutral-400">starting</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-200">
                <li>• Auth + RBAC</li>
                <li>• Subscriptions (Stripe)</li>
                <li>• Analytics + events</li>
                <li>• Production deployment</li>
              </ul>
              <a href="/services/saas" className="mt-6 inline-flex items-center justify-center rounded-lg bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition">Explore SaaS</a>
            </div>
          </CometCard>
        </div>
      </div>
    </div>
  )
}
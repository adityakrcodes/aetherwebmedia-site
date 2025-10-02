export type ServiceConfig = {
  badgeLabel: string;
  headline: string;
  subtext: string;
  outcomes: { title: string; desc: string }[];
  roadmap: {
    stepTitle: string;
    description: string;
    gradientFrom: string;
    gradientTo: string;
    emoji: string;
  }[];
  stack: string[];
  stackImages: string[]; // public path strings
  pricing: { badgeLabel: string; title: string; subtitle: string; price: string; features: string[] }[];
};

export const servicesConfig: Record<string, ServiceConfig> = {
  saas: {
    badgeLabel: "SaaS MVP Development",
    headline: "Build only what's needed to prove what matters",
    subtext:
      "We design and ship focused MVPs that validate your thesis quickly — with real users, clean code, and a runway to scale.",
    outcomes: [
      { title: "Ship in Weeks", desc: "A usable MVP in 4-6 weeks, scoping only what matters." },
      { title: "Market Validation", desc: "Analytics, feedback loops, and A/B hooks built-in." },
      { title: "Ownable Codebase", desc: "Readable, typed code designed to be extended by any team." },
      { title: "Security First", desc: "Best practices for auth, RBAC, and data protection from day one." },
      { title: "Payments & Plans", desc: "Stripe subscriptions, trials, and metered billing ready." },
      { title: "Cloud Native", desc: "Deployed with observability, error tracking, and rollbacks." }
    ],
    roadmap: [
      { stepTitle: "01 · Scope", description: "Define MVP goals, success metrics, and non-negotiables. We'll map your core user journey and identify the minimum feature set needed to validate your hypothesis.", gradientFrom: "var(--cyan-500)", gradientTo: "var(--emerald-500)", emoji: "🎯" },
      { stepTitle: "02 · UX Draft", description: "Wireframes and flows focused on activation. We'll design the user experience that gets users to their first 'aha moment' as quickly as possible.", gradientFrom: "var(--orange-500)", gradientTo: "var(--yellow-500)", emoji: "✏️" },
      { stepTitle: "03 · Build", description: "Core features only, production quality. We'll build your MVP with clean, typed code that's ready for real users from day one.", gradientFrom: "var(--purple-500)", gradientTo: "var(--pink-500)", emoji: "⚡" },
      { stepTitle: "04 · Integrate", description: "Auth, billing, email, analytics, and ops. We'll connect all the essential services your SaaS needs to function and scale.", gradientFrom: "var(--blue-500)", gradientTo: "var(--cyan-500)", emoji: "🔗" },
      { stepTitle: "05 · Validate", description: "Dogfood, QA, and closed-beta with fast fixes. We'll test everything thoroughly and iterate quickly based on real user feedback.", gradientFrom: "var(--green-500)", gradientTo: "var(--emerald-500)", emoji: "🧪" },
      { stepTitle: "06 · Launch", description: "Ship, measure, iterate — with a clear v1.1 plan. We'll deploy your MVP and set up the feedback loops you need to grow.", gradientFrom: "var(--red-500)", gradientTo: "var(--orange-500)", emoji: "🚀" }
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "tRPC/REST",
      "Stripe",
      "Clerk/Auth.js",
      "Vercel/AWS",
      "Sentry",
      "PostHog"
    ],
    stackImages: [
      "/png/works/purple-night.png",
      "/image2.png",
      "/image3.png",
      "/image.png"
    ],
    pricing: [
      {
        badgeLabel: "AI-Built Product",
        title: "Finish Your AI-Built Product",
        subtitle: "For founders who already experimented with AI-made websites and want it turned into a real, production-ready MVP.", price: "$1000",
        features: [
          "Transform AI-generated prototypes into functional SaaS",
          "Optimize codebase & remove AI-generated bloat",
          "Responsive & scalable deployment",
          " 1 week of support & fixes",
          "Perfect for: Cost-conscious founders testing fast"
        ]
      },
      {
        badgeLabel: "MVP Development",
        title: "SaaS MVP Development",
        subtitle: "Our most popular option — build your SaaS MVP from scratch.",
        price: "$2,000",
        features: [
          " Full-stack MVP tailored to your idea",
          "Scalable backend & database architecture",
          "Authentication, payments, and core integrations",
          "Custom UI/UX design for SaaS",
          "1 month of dedicated support & iteration",
          "Perfect for: Founders validating with first real users & investors"
        ]
      },
      {
        badgeLabel: "Custom Build",
        title: "Custom Solutions",
        subtitle: "When your startup needs beyond-MVP capabilities and heavy customization.",
        price: "$5,000",
        features: [
          "Everything in MVP Development",
          "Fully tailored workflows & advanced features",
          "Complex integrations (AI/ML, APIs, automation)",
          "Multi-role access, dashboards & team features",
          "2+ months support & long-term iteration roadmap",
          "Perfect for: Startups gearing for rapid scale & fundraising"
        ]
      }
    ],
  },
  web: {
    badgeLabel: "Web App Development",
    headline: "Design and ship fast, accessible, high‑performing web apps",
    subtext:
      "From marketing sites to complex dashboards — we build web experiences that load fast, look great, and convert.",
    outcomes: [
      { title: "Blazing Performance", desc: "Core Web Vitals optimized for SEO and conversions." },
      { title: "Accessible by Default", desc: "Inclusive UX that works for everyone, everywhere." },
      { title: "Component Systems", desc: "Scalable UI libraries with Storybook-level clarity." },
      { title: "Internationalization", desc: "i18n ready — locales, RTL, and content systems." },
      { title: "Analytics & A/B", desc: "Experimentation hooks to learn and iterate quickly." },
      { title: "SEO & Schema", desc: "Semantic markup and structured data for discoverability." }
    ],
    roadmap: [
      { stepTitle: "01 · Discover", description: "Audit goals, brand, users and constraints. Identify highest-impact pages and flows.", gradientFrom: "var(--cyan-500)", gradientTo: "var(--emerald-500)", emoji: "🧭" },
      { stepTitle: "02 · Design", description: "Wireframe → visual design with a reusable component system.", gradientFrom: "var(--orange-500)", gradientTo: "var(--yellow-500)", emoji: "🎨" },
      { stepTitle: "03 · Build", description: "Implement UI with attention to performance, accessibility and DX.", gradientFrom: "var(--purple-500)", gradientTo: "var(--pink-500)", emoji: "🔧" },
      { stepTitle: "04 · Integrate", description: "CMS, analytics, auth, and required third‑party services.", gradientFrom: "var(--blue-500)", gradientTo: "var(--cyan-500)", emoji: "🔗" },
      { stepTitle: "05 · QA", description: "Cross‑browser/device testing, a11y checks and perf budgets met.", gradientFrom: "var(--green-500)", gradientTo: "var(--emerald-500)", emoji: "✅" },
      { stepTitle: "06 · Launch", description: "Deploy, monitor, iterate with data‑backed improvements.", gradientFrom: "var(--red-500)", gradientTo: "var(--orange-500)", emoji: "🚀" }
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "React Query",
      "Contentlayer/CMS",
      "Vercel/AWS",
      "Sentry",
      "PostHog"
    ],
    stackImages: [
      "/png/works/abnb.png",
      "/png/works/apex.png",
      "/png/works/maestro.png",
      "/png/works/imperial.png"
    ],
    pricing: [
      { 
        badgeLabel: "Plan A", 
        title: "Landing Page Development", 
        subtitle: "For businesses and startups who just need a stunning online presence.", 
        price: "$500", 
        features: [
          "Built with Framer or Webflow", 
          "Clean, responsive design", 
          "SEO-friendly structure",
          "Fast deployment & handover",
          "1 week of support",
          "Perfect for: Startups, portfolios, and product launches"
        ] 
      },
      { 
        badgeLabel: "Plan B", 
        title: "Full-Fledged Web App", 
        subtitle: "For founders who want a scalable web application (beyond a website).", 
        price: "$1,000", 
        features: [
          "Custom web app development (E-commerce, Social Media, SaaS dashboards, etc.)", 
          "Secure backend & database setup", 
          "User authentication, payments & integrations",
          "Responsive UI/UX tailored to your brand",
          "1 month of support & iteration",
          "Perfect for: Startups ready to onboard real users"
        ] 
      },
      { 
        badgeLabel: "Plan C", 
        title: "Custom Build", 
        subtitle: "For complex ideas and startups aiming to scale.", 
        price: "$2,500", 
        features: [
          "Everything in Full-Fledged Web App", 
          "Fully tailored workflows & advanced features", 
          "AI/ML integrations, APIs & automation",
          "CI/CD deployment for continuous updates",
          " 2+ months support + roadmap",
          "Perfect for: Startups moving toward funding & scaling"
        ] 
      }
    ],
  },
  app: {
    badgeLabel: "App Development",
    headline: "Design and build reliable, scalable mobile apps",
    subtext:
      "From rapid prototypes to production apps — we deliver performant iOS/Android experiences with a maintainable codebase.",
    outcomes: [
      { title: "Cross‑Platform", desc: "Single codebase targeting iOS and Android efficiently." },
      { title: "Offline First", desc: "Robust caching and sync for spotty networks." },
      { title: "Native Feel", desc: "Fluid interactions and accessible mobile UI patterns." },
      { title: "Secure", desc: "Best practices for auth, storage, and network security." },
      { title: "Analytics Ready", desc: "Event tracking and experimentation out of the box." },
      { title: "CI/CD", desc: "Automated builds, testing, and store deploy pipelines." }
    ],
    roadmap: [
      { stepTitle: "01 · Discover", description: "Define user jobs, critical flows, and success metrics.", gradientFrom: "var(--cyan-500)", gradientTo: "var(--emerald-500)", emoji: "🔎" },
      { stepTitle: "02 · UX & UI", description: "Mobile IA, wireframes, and visual design system.", gradientFrom: "var(--orange-500)", gradientTo: "var(--yellow-500)", emoji: "📱" },
      { stepTitle: "03 · Build", description: "Implement core features with native-quality UX.", gradientFrom: "var(--purple-500)", gradientTo: "var(--pink-500)", emoji: "🛠️" },
      { stepTitle: "04 · Integrate", description: "Auth, push, analytics, payments, and APIs.", gradientFrom: "var(--blue-500)", gradientTo: "var(--cyan-500)", emoji: "🔗" },
      { stepTitle: "05 · Test", description: "Device lab testing, crash analytics, and perf budgets.", gradientFrom: "var(--green-500)", gradientTo: "var(--emerald-500)", emoji: "🧪" },
      { stepTitle: "06 · Launch", description: "App Store and Play Store submission, post-launch iteration.", gradientFrom: "var(--red-500)", gradientTo: "var(--orange-500)", emoji: "🚀" }
    ],
    stack: [
      "React Native/Expo",
      "TypeScript",
      "React Query",
      "Zustand/Recoil",
      "Native Modules",
      "Firebase/OneSignal",
      "RevenueCat/Stripe",
      "Sentry",
      "EAS/CI"
    ],
    stackImages: [
      "/app/image1.png",
      "/app/image2.png",
      "/app/image3.png",
      "/app/image4.png"
    ],
    pricing: [
      {
        badgeLabel: "Plan A",
        title: "Starter App",
        subtitle: "For founders who need a functional first version.",
        price: "$1000",
        features: [
          " Mobile app with clean UI",
          " Core features + smooth animations",
          "Responsive design for iOS & Android",
          "Cloud deployment ready",
          "2 weeks of support"
        ]
      },
      {
        badgeLabel: "Plan B",
        title: "MVP App",
        subtitle: "For startups validating with first users & investors.",
        price: "$2,500",
        features: [
          "User app + admin dashboard",
          " Custom UI/UX for your brand",
          "Scalable backend system",
          "App Store & Play Store publishing",
          "1 month of support & iteration"
        ]
      },
      {
        badgeLabel: "Plan C",
        title: "Full Cycle App",
        subtitle: "For startups aiming to scale fast with complete solutions.",
        price: "$4,500",
        features: [
          "User app, business app & admin dashboard",
          "Premium custom design",
          "Advanced integrations (payments, APIs, automation)",
          "Thorough QA & performance optimization",
          "2+ months of support & growth roadmap"
        ]
      }
    ],
  },

};

export const serviceSlugs = Object.keys(servicesConfig);


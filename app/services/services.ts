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
      "/image1.png",
      "/image2.png",
      "/image3.png",
      "/image.png"
    ]
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
      "/image1.png",
      "/image2.png",
      "/image3.png",
      "/image.png"
    ]
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
    ]
  },
  
};

export const serviceSlugs = Object.keys(servicesConfig);


/**
 * Every service page is generated from this file.
 * Timelines marked "typical" are estimates: adjust freely.
 */

export type IconKey =
  | "bolt"
  | "search"
  | "target"
  | "edit"
  | "accessible"
  | "stack"
  | "rocket"
  | "chart"
  | "code"
  | "shield"
  | "credit"
  | "cloud"
  | "devices"
  | "wifi"
  | "hand"
  | "refresh"
  | "users"
  | "palette"
  | "flask"
  | "eye"
  | "compass"
  | "message"
  | "layers"
  | "speaker"
  | "trend"
  | "filter";

export type VisualKey = "web" | "software" | "app" | "design" | "brand" | "growth";

export type Plan = {
  name: string;
  summary: string;
  features: string[];
  bestFor: string;
  featured?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  /** The oversized word cropped at the bottom of the hero. */
  word: string;
  category: string;
  featured: boolean;
  /** One line used on cards and in listings. */
  summary: string;
  metaTitle: string;
  metaDescription: string;
  headline: [string, string];
  intro: string;
  facts: { label: string; value: string }[];
  calLink?: string;
  builds?: { icon: IconKey; title: string; body: string }[];
  outcomes: { icon: IconKey; title: string; body: string }[];
  processTitle: string;
  visual: VisualKey;
  process: { title: string; body: string; deliverable: string; when: string }[];
  included: string[];
  stack: string[];
  plans?: Plan[];
  quote?: { title: string; body: string; examples: string[] };
  work?: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    name: "Web Development",
    word: "web",
    category: "Core service",
    featured: true,
    summary: "Marketing sites, stores and web apps that load fast and turn visitors into customers.",
    metaTitle: "Web Development Agency | Fast websites that convert",
    metaDescription:
      "Custom websites, landing pages, e-commerce stores and web apps built for speed, SEO and conversion. Launched in weeks.",
    headline: ["Websites that load fast", "and sell harder."],
    intro: "Custom marketing sites, stores and web apps, engineered for speed, search and conversion.",
    facts: [
      { label: "Typical launch", value: "2-6 weeks" },
      { label: "Previews", value: "Every week" },
      { label: "Code ownership", value: "100% yours" },
    ],
    builds: [
      { icon: "rocket", title: "Landing pages", body: "One page, one goal. Built for launches, ads and product drops." },
      { icon: "layers", title: "Marketing websites", body: "Multi-page sites that explain what you do and why it matters." },
      { icon: "credit", title: "E-commerce stores", body: "Shopify or custom storefronts with fast product pages and checkout." },
      { icon: "code", title: "Web apps and dashboards", body: "Logged-in products, portals and admin tools that run in the browser." },
      { icon: "edit", title: "CMS-powered sites", body: "Blogs, case studies and landing pages your team can publish alone." },
      { icon: "refresh", title: "Redesigns and migrations", body: "Move off a slow or dated site without losing your search rankings." },
    ],
    outcomes: [
      { icon: "bolt", title: "Speed you can feel", body: "Lean pages built to pass Core Web Vitals, because slow sites lose visitors." },
      { icon: "search", title: "Found on Google", body: "Semantic markup, structured data and clean URLs from the first commit." },
      { icon: "target", title: "Built to convert", body: "Clear messaging, strong calls to action and tracking on every key step." },
      { icon: "edit", title: "Easy to update", body: "Edit pages, posts and products yourself through a CMS that fits your team." },
      { icon: "accessible", title: "Accessible", body: "Readable, keyboard friendly and tested with screen readers." },
      { icon: "stack", title: "Ready to grow", body: "A component system that lets you add pages without starting over." },
    ],
    processTitle: "How a website comes to life",
    visual: "web",
    process: [
      {
        title: "Discover",
        body: "We dig into your goals, audience and competitors, then map the pages that will do the most work.",
        deliverable: "Sitemap and project plan",
        when: "Days 1-3",
      },
      {
        title: "Wireframe",
        body: "Low-fidelity layouts lock the structure and content order before anything gets polished.",
        deliverable: "Clickable wireframes",
        when: "Week 1",
      },
      {
        title: "Design",
        body: "Your brand becomes a visual system: type, color, components and every key page in high fidelity.",
        deliverable: "Figma designs",
        when: "Weeks 1-2",
      },
      {
        title: "Build",
        body: "We code it component by component in Next.js or the CMS that suits you, with a preview link every week.",
        deliverable: "Staging website",
        when: "Weeks 2-4",
      },
      {
        title: "Launch",
        body: "Speed, SEO and accessibility checks, analytics wired up, then we go live on your domain.",
        deliverable: "Live website",
        when: "Launch week",
      },
      {
        title: "Grow",
        body: "We watch real visitor data, remove friction and ship improvements during your support window.",
        deliverable: "Improvements and support",
        when: "After launch",
      },
    ],
    included: [
      "Responsive on every screen",
      "On-page SEO setup",
      "Analytics and conversion tracking",
      "CMS setup and training",
      "Speed optimization",
      "Hosting and domain setup",
      "Forms and integrations",
      "Post-launch support",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Webflow", "Framer", "Shopify", "WordPress", "Sanity", "Vercel", "Cloudflare"],
    plans: [
      {
        name: "Landing page",
        summary: "A sharp, fast single page for launches, campaigns and early-stage brands.",
        features: [
          "Built in Framer, Webflow or Next.js",
          "Clean, responsive design",
          "SEO-friendly structure",
          "Fast deployment and handover",
          "1 week of support",
        ],
        bestFor: "Startups, portfolios and product launches",
      },
      {
        name: "Full web app",
        summary: "A scalable web application for founders who need more than a website.",
        features: [
          "Custom web app (store, community, SaaS dashboard)",
          "Secure backend and database",
          "Login, payments and integrations",
          "Responsive UI designed for your brand",
          "1 month of support and iteration",
        ],
        bestFor: "Startups ready to onboard real users",
        featured: true,
      },
      {
        name: "Custom build",
        summary: "For complex ideas that need tailored workflows and room to scale.",
        features: [
          "Everything in Full web app",
          "Tailored workflows and advanced features",
          "AI, API and automation integrations",
          "CI/CD for continuous releases",
          "2+ months of support and a roadmap",
        ],
        bestFor: "Teams heading toward funding and scale",
      },
    ],
    work: ["apex", "abnb", "imperial", "maestro", "purple-night"],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A landing page usually takes 1-2 weeks. A multi-page marketing site takes 2-4 weeks, and web apps take 4-8 weeks depending on features. You get a fixed timeline in your proposal.",
      },
      {
        q: "Can I edit the website myself after launch?",
        a: "Yes. We set up a CMS that matches how your team works and walk you through it, so text, images, blog posts and products never need a developer.",
      },
      {
        q: "Will a redesign hurt my Google rankings?",
        a: "Not when it is planned. We map every old URL to its new home with redirects, keep your metadata and check indexing after launch.",
      },
      {
        q: "Do you handle hosting and domains?",
        a: "We do. We deploy to fast global hosting such as Vercel or Cloudflare, connect your domain and set up SSL. You keep full ownership of every account.",
      },
      {
        q: "What do you need from me to start?",
        a: "Your goals, any brand assets you have and access to your current site if there is one. If you do not have copy yet, we help write it.",
      },
    ],
  },
  {
    slug: "software-development",
    name: "Software Development",
    word: "software",
    category: "Core service",
    featured: true,
    summary: "SaaS products, internal tools and custom platforms, from first MVP to scale.",
    metaTitle: "Custom Software and SaaS MVP Development",
    metaDescription:
      "SaaS MVPs, internal tools, customer portals and AI features built on clean, typed code you own. Usable MVP in 4-6 weeks.",
    headline: ["Software that ships,", "then keeps shipping."],
    intro: "SaaS MVPs, internal tools and custom platforms on clean, typed code your team can own and extend.",
    facts: [
      { label: "Usable MVP", value: "4-6 weeks" },
      { label: "Demos", value: "Every week" },
      { label: "Code ownership", value: "100% yours" },
    ],
    builds: [
      { icon: "rocket", title: "SaaS MVPs", body: "The smallest product that proves your idea with real, paying users." },
      { icon: "layers", title: "Internal tools", body: "Admin panels and back-office apps that replace spreadsheets and copy-paste." },
      { icon: "users", title: "Customer portals", body: "Dashboards, accounts and self-serve flows your customers log into." },
      { icon: "code", title: "APIs and integrations", body: "Connect your product to payments, CRMs, ERPs and the rest of your stack." },
      { icon: "flask", title: "AI features", body: "Assistants, search, summarisation and automations built on top of LLMs." },
      { icon: "refresh", title: "AI prototype rescue", body: "Turn an AI-generated prototype into secure, production-ready software." },
    ],
    outcomes: [
      { icon: "rocket", title: "Ship in weeks", body: "A usable MVP in 4-6 weeks, scoped to what proves your thesis." },
      { icon: "chart", title: "Validate with data", body: "Analytics, feedback loops and experiment hooks are part of the build." },
      { icon: "code", title: "Code you own", body: "Readable, typed code in your repository, ready for any team to extend." },
      { icon: "shield", title: "Secure from day one", body: "Authentication, roles and data protection done properly at the start." },
      { icon: "credit", title: "Payments ready", body: "Subscriptions, trials and usage billing with Stripe, wired and tested." },
      { icon: "cloud", title: "Built to run", body: "Monitoring, error tracking and safe rollbacks in production." },
    ],
    processTitle: "How your software gets built",
    visual: "software",
    process: [
      {
        title: "Scope",
        body: "We define the problem, the users and the smallest feature set that proves your idea. Everything else goes on a later list.",
        deliverable: "Product spec",
        when: "Week 1",
      },
      {
        title: "Architect",
        body: "Data model, stack and infrastructure chosen for where you are now and where you are going next.",
        deliverable: "Architecture plan",
        when: "Week 1",
      },
      {
        title: "Build in sprints",
        body: "Core features land in short sprints. Every week you click through a working demo and steer what comes next.",
        deliverable: "Weekly demo builds",
        when: "Weeks 2-5",
      },
      {
        title: "Integrate",
        body: "Auth, billing, email, analytics and the third-party services your product depends on, connected and tested.",
        deliverable: "Connected services",
        when: "Weeks 3-5",
      },
      {
        title: "Test",
        body: "Automated tests, manual QA and a closed beta with real users, with fixes shipped fast.",
        deliverable: "Release candidate",
        when: "Week 5-6",
      },
      {
        title: "Release and iterate",
        body: "Production deploy with monitoring in place, then a clear v1.1 plan built from real usage.",
        deliverable: "Live product and roadmap",
        when: "Week 6 onward",
      },
    ],
    included: [
      "Product scoping workshop",
      "UX for core flows",
      "Auth and user roles",
      "Payments and subscriptions",
      "Admin dashboard",
      "Automated tests",
      "CI/CD pipeline",
      "Monitoring and error tracking",
      "Docs and handover",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Supabase", "Stripe", "Clerk", "AWS", "Vercel", "Sentry", "PostHog", "OpenAI"],
    plans: [
      {
        name: "Finish your AI-built product",
        summary: "You prototyped with AI tools. We turn it into a real, production-ready MVP.",
        features: [
          "Turn AI-generated prototypes into working SaaS",
          "Clean up and remove AI-generated bloat",
          "Responsive, scalable deployment",
          "1 week of support and fixes",
        ],
        bestFor: "Cost-conscious founders testing fast",
      },
      {
        name: "SaaS MVP",
        summary: "Our most popular option: your SaaS MVP built from scratch.",
        features: [
          "Full-stack MVP tailored to your idea",
          "Scalable backend and database",
          "Auth, payments and core integrations",
          "Custom UI and UX for your product",
          "1 month of support and iteration",
        ],
        bestFor: "Founders validating with users and investors",
        featured: true,
      },
      {
        name: "Custom solution",
        summary: "When you need capabilities well beyond an MVP and heavy customization.",
        features: [
          "Everything in SaaS MVP",
          "Tailored workflows and advanced features",
          "Complex integrations (AI, APIs, automation)",
          "Multi-role access, dashboards and teams",
          "2+ months of support and a roadmap",
        ],
        bestFor: "Startups preparing to scale and raise",
      },
    ],
    work: ["purple-night", "apex", "imperial"],
    faqs: [
      {
        q: "Can you finish a product I started with AI tools?",
        a: "Yes, that is exactly what our first plan is for. We review what you have, keep what works, fix security and structure, and deploy it properly.",
      },
      {
        q: "Who owns the code?",
        a: "You do. The repository lives in your GitHub organisation from day one, and every account (hosting, database, payments) is in your name.",
      },
      {
        q: "How will I know how the project is going?",
        a: "You get a working demo every week, a shared board with what is in progress, and a direct channel to the engineers building your product.",
      },
      {
        q: "Can you work alongside my existing developers?",
        a: "Yes. We can lead the build, join your team for a specific feature, or review and stabilise an existing codebase.",
      },
      {
        q: "What happens after launch?",
        a: "Every plan includes a support window. After that you can continue month to month for new features, or take the code in-house with full documentation.",
      },
    ],
  },
  {
    slug: "app-development",
    name: "App Development",
    word: "apps",
    category: "Mobile",
    featured: false,
    summary: "iOS and Android apps from one codebase, designed to feel native.",
    metaTitle: "Mobile App Development for iOS and Android",
    metaDescription:
      "Cross-platform iOS and Android apps with native feel, solid backends and store submission handled. From prototype to App Store.",
    headline: ["Mobile apps people", "keep on their home screen."],
    intro: "Cross-platform iOS and Android apps with native feel, solid backends and a smooth path through store review.",
    facts: [
      { label: "Platforms", value: "iOS and Android" },
      { label: "Codebase", value: "One for both" },
      { label: "Store submission", value: "Handled" },
    ],
    outcomes: [
      { icon: "devices", title: "One codebase", body: "iOS and Android from a single codebase, so features ship to both at once." },
      { icon: "wifi", title: "Works offline", body: "Caching and sync that hold up on patchy connections." },
      { icon: "hand", title: "Native feel", body: "Fluid gestures, haptics and platform patterns users already know." },
      { icon: "shield", title: "Secure", body: "Safe auth, encrypted storage and hardened network calls." },
      { icon: "chart", title: "Measured", body: "Event tracking and crash reporting from the first build." },
      { icon: "refresh", title: "Easy to update", body: "Automated builds and over-the-air updates for fast fixes." },
    ],
    processTitle: "How your app reaches the store",
    visual: "app",
    process: [
      {
        title: "Map the flows",
        body: "We define who uses the app, the jobs they need done and the screens that get them there.",
        deliverable: "User flows",
        when: "Week 1",
      },
      {
        title: "Prototype",
        body: "Clickable prototypes on your own phone, so you feel the app before we write production code.",
        deliverable: "Interactive prototype",
        when: "Weeks 1-2",
      },
      {
        title: "Build",
        body: "Core features built in React Native with native-quality interactions and a design system to match.",
        deliverable: "Test builds on your phone",
        when: "Weeks 2-6",
      },
      {
        title: "Integrate",
        body: "Login, push notifications, payments and your APIs, connected and tested end to end.",
        deliverable: "Connected app",
        when: "Weeks 4-6",
      },
      {
        title: "Test on devices",
        body: "Real iPhones, Android phones and tablets, plus crash analytics and performance budgets.",
        deliverable: "Release build",
        when: "Week 7",
      },
      {
        title: "Ship to the stores",
        body: "We prepare listings, handle App Store and Play Store review, then keep iterating after launch.",
        deliverable: "Live in both stores",
        when: "Week 8",
      },
    ],
    included: [
      "iOS and Android apps",
      "UI and UX design",
      "Push notifications",
      "In-app payments",
      "Analytics and crash reporting",
      "Admin dashboard (MVP plan and up)",
      "Store listings and submission",
      "Over-the-air updates",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "Supabase", "RevenueCat", "Stripe", "OneSignal", "Sentry", "EAS"],
    plans: [
      {
        name: "Starter app",
        summary: "A functional first version for founders who need to get in front of users.",
        features: [
          "Mobile app with a clean UI",
          "Core features and smooth animations",
          "Responsive for iOS and Android",
          "Cloud deployment ready",
          "2 weeks of support",
        ],
        bestFor: "First versions and pilots",
      },
      {
        name: "MVP app",
        summary: "For startups validating with first users and investors.",
        features: [
          "User app and admin dashboard",
          "Custom UI and UX for your brand",
          "Scalable backend",
          "App Store and Play Store publishing",
          "1 month of support and iteration",
        ],
        bestFor: "Startups going to market",
        featured: true,
      },
      {
        name: "Full cycle app",
        summary: "A complete product for startups aiming to scale fast.",
        features: [
          "User app, business app and admin dashboard",
          "Premium custom design",
          "Payments, APIs and automation",
          "Thorough QA and performance work",
          "2+ months of support and a growth roadmap",
        ],
        bestFor: "Marketplaces and multi-sided products",
      },
    ],
    work: ["wander-app", "quantumpay-app", "imperial"],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "For most products we use React Native, which gives you one codebase with native performance on both platforms. If your app needs deep hardware access we will tell you up front.",
      },
      {
        q: "What if Apple rejects the app?",
        a: "We build to the store guidelines from the start and handle the review process. If a reviewer asks for changes, we make them as part of the project.",
      },
      {
        q: "Do I need a backend?",
        a: "Almost every app with accounts or data does. We set one up with Supabase, Firebase or a custom API, depending on your needs and budget.",
      },
      {
        q: "Can you update the app after launch?",
        a: "Yes. Small fixes can go out instantly with over-the-air updates. Larger releases go through the stores as usual.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    word: "design",
    category: "Design",
    featured: false,
    summary: "Research-led interfaces and design systems that make products easy to use.",
    metaTitle: "UI/UX Design for Websites and Products",
    metaDescription:
      "Product and web design grounded in research, tested with real users and handed off ready to build. Wireframes, UI, design systems and prototypes.",
    headline: ["Interfaces that make", "the next step obvious."],
    intro: "Product and web design grounded in research, tested with real users and handed off ready to build.",
    facts: [
      { label: "Testing", value: "With real users" },
      { label: "Files", value: "Yours in Figma" },
      { label: "Handoff", value: "Developer ready" },
    ],
    calLink: "aetherwebmedia/request-for-designing-service",
    outcomes: [
      { icon: "target", title: "Fewer drop-offs", body: "Flows designed around what users came to do, not what is easy to build." },
      { icon: "layers", title: "A real design system", body: "Reusable components and tokens, so every new screen stays consistent." },
      { icon: "code", title: "Faster development", body: "Specs, states and components developers can build without guessing." },
      { icon: "accessible", title: "Accessible by default", body: "Contrast, sizing and focus states that meet WCAG guidelines." },
      { icon: "eye", title: "Tested before build", body: "Prototypes put in front of real users before a line of code is written." },
      { icon: "palette", title: "True to your brand", body: "Visuals that look like you, not like the template everyone else used." },
    ],
    processTitle: "How a design takes shape",
    visual: "design",
    process: [
      {
        title: "Research",
        body: "Interviews, analytics and competitor reviews to understand what users need and where they get stuck.",
        deliverable: "Research insights",
        when: "Week 1",
      },
      {
        title: "Structure",
        body: "Information architecture and user flows that put every screen and step in a sensible order.",
        deliverable: "Sitemap and flows",
        when: "Week 1",
      },
      {
        title: "Wireframes",
        body: "Low-fidelity layouts to agree on content and hierarchy quickly, before visual polish.",
        deliverable: "Wireframes",
        when: "Week 2",
      },
      {
        title: "Visual design",
        body: "Type, color, imagery and components applied across every key screen, in light and dark.",
        deliverable: "High-fidelity UI",
        when: "Weeks 2-3",
      },
      {
        title: "Prototype and test",
        body: "A clickable prototype tested with real users. What confuses them gets fixed now, while it is cheap.",
        deliverable: "Tested prototype",
        when: "Week 4",
      },
      {
        title: "Handoff",
        body: "Organised Figma files, a component library and annotated specs for every state and breakpoint.",
        deliverable: "Design system and specs",
        when: "Week 4-5",
      },
    ],
    included: [
      "User research",
      "User flows and IA",
      "Wireframes",
      "High-fidelity UI",
      "Design system",
      "Interactive prototype",
      "Usability testing",
      "Developer handoff",
    ],
    stack: ["Figma", "FigJam", "Framer", "Maze", "Notion", "Lottie"],
    quote: {
      title: "Scoped per project",
      body: "Design work varies a lot by scope. After a short call you get a written proposal with a clear scope and timeline.",
      examples: ["Website design", "SaaS product design", "Mobile app design", "Design system", "UX audit"],
    },
    work: ["purple-night", "maestro", "quantumpay-app"],
    faqs: [
      {
        q: "Do you only design, or also build?",
        a: "Both. Many clients have us design and then build, which avoids the usual handoff gaps. If you have your own developers, we hand off clean, annotated files.",
      },
      {
        q: "Will I own the design files?",
        a: "Yes. Everything lives in a Figma workspace you own, including the component library.",
      },
      {
        q: "Can you redesign part of an existing product?",
        a: "Yes. We often start with a UX audit of your current product and redesign the flows that cost you the most users first.",
      },
      {
        q: "How do you test designs with users?",
        a: "We run short moderated or unmoderated sessions with people who match your audience, then share the findings and fixes.",
      },
    ],
  },
  {
    slug: "branding",
    name: "Branding",
    word: "brand",
    category: "Identity",
    featured: false,
    summary: "Identity systems with a clear story, built to look right everywhere they appear.",
    metaTitle: "Branding and Visual Identity Design",
    metaDescription:
      "Brand strategy, logo design and complete identity systems with guidelines, so your business looks consistent and memorable everywhere.",
    headline: ["Brands people remember", "after one look."],
    intro: "Strategy, logo and identity systems that give your business a clear voice and a consistent look everywhere.",
    facts: [
      { label: "Starts with", value: "Strategy" },
      { label: "Guidelines", value: "Included" },
      { label: "Source files", value: "All yours" },
    ],
    calLink: "aetherwebmedia/request-for-branding-and-marketing-service",
    outcomes: [
      { icon: "eye", title: "Instantly recognisable", body: "A distinctive mark and visual language people connect to you." },
      { icon: "compass", title: "Clear positioning", body: "A sharp answer to who you are for and why you are different." },
      { icon: "message", title: "A consistent voice", body: "Tone and messaging guidance that keeps every touchpoint on brand." },
      { icon: "layers", title: "A system, not a logo", body: "Type, color, layout and imagery rules that scale across channels." },
      { icon: "stack", title: "Ready-to-use assets", body: "Logo files, templates and social kits in every format you need." },
      { icon: "trend", title: "Built to last", body: "Identity designed to grow with you, not to chase this year's trend." },
    ],
    processTitle: "How a brand is forged",
    visual: "brand",
    process: [
      {
        title: "Discovery",
        body: "Workshops with your team, a look at your market and the brands you compete with for attention.",
        deliverable: "Discovery summary",
        when: "Week 1",
      },
      {
        title: "Strategy",
        body: "Positioning, personality and messaging that define the space your brand will own.",
        deliverable: "Brand strategy",
        when: "Week 1-2",
      },
      {
        title: "Concepts",
        body: "Several distinct creative directions, each with a mark, type and color story. You pick one to develop.",
        deliverable: "Concept directions",
        when: "Week 2-3",
      },
      {
        title: "Identity system",
        body: "The chosen direction refined into a full system: logo suite, palette, typography and graphic language.",
        deliverable: "Identity system",
        when: "Week 3-4",
      },
      {
        title: "Guidelines",
        body: "Clear rules for using the brand, so every designer, agency and team member gets it right.",
        deliverable: "Brand guidelines",
        when: "Week 4-5",
      },
      {
        title: "Rollout",
        body: "Business cards, social templates, decks and website updates, so the new brand shows up everywhere at once.",
        deliverable: "Launch assets",
        when: "Week 5-6",
      },
    ],
    included: [
      "Brand workshop",
      "Positioning and messaging",
      "Logo suite",
      "Color and typography",
      "Graphic language",
      "Brand guidelines",
      "Social media kit",
      "Stationery and templates",
    ],
    stack: ["Figma", "Illustrator", "Photoshop", "After Effects", "Notion"],
    quote: {
      title: "Scoped per project",
      body: "A logo refresh and a full identity are very different projects. After a short call you get a written proposal with a clear scope and timeline.",
      examples: ["Logo and mark", "Full identity system", "Rebrand", "Brand guidelines", "Launch kit"],
    },
    faqs: [
      {
        q: "Do I need a full brand or just a logo?",
        a: "If you are just starting, a strong mark and a simple palette may be enough. If people already know you, a full system keeps everything consistent. We will recommend what fits.",
      },
      {
        q: "How many logo concepts will I see?",
        a: "Usually three distinct directions. We refine the one you choose until it is right.",
      },
      {
        q: "Can you refresh our brand without starting over?",
        a: "Yes. A refresh keeps the recognition you have built while fixing what holds the brand back.",
      },
      {
        q: "What files do I get?",
        a: "Every logo version in SVG, PNG and PDF, color values for print and screen, fonts guidance, templates and the full guidelines document.",
      },
    ],
  },
  {
    slug: "growth-marketing",
    name: "SEO and Marketing",
    word: "growth",
    category: "Marketing",
    featured: false,
    summary: "SEO, paid ads and campaigns measured against leads and revenue, not likes.",
    metaTitle: "SEO, Google Ads and Performance Marketing",
    metaDescription:
      "Technical SEO, content and paid campaigns on Google and Meta, tracked from first click to closed deal. Marketing measured in leads and revenue.",
    headline: ["Marketing that shows up", "in your revenue."],
    intro: "Technical SEO, content and paid campaigns on Google and Meta, tracked from first click to closed deal.",
    facts: [
      { label: "Measured in", value: "Leads and revenue" },
      { label: "Channels", value: "Search and social" },
      { label: "Reporting", value: "Monthly" },
    ],
    calLink: "aetherwebmedia/request-for-advertising-service",
    outcomes: [
      { icon: "search", title: "Ranked for what matters", body: "Keywords chosen for buying intent, not vanity traffic." },
      { icon: "target", title: "Ads that pay back", body: "Campaigns structured around cost per lead and return on spend." },
      { icon: "chart", title: "Tracking you can trust", body: "Analytics and conversion tracking set up so every result is measurable." },
      { icon: "filter", title: "A full funnel", body: "Awareness, consideration and conversion working together." },
      { icon: "speaker", title: "Content that works", body: "Pages and posts that answer real questions and bring people back." },
      { icon: "trend", title: "Compounding growth", body: "SEO that keeps paying off long after a campaign ends." },
    ],
    processTitle: "How we grow your pipeline",
    visual: "growth",
    process: [
      {
        title: "Audit",
        body: "Site speed, technical SEO, tracking and any existing ad accounts, checked for what is costing you leads.",
        deliverable: "Audit report",
        when: "Week 1",
      },
      {
        title: "Strategy",
        body: "Channels, budgets and a funnel built around the customers worth the most to you.",
        deliverable: "Growth plan",
        when: "Week 1-2",
      },
      {
        title: "Content and SEO",
        body: "Technical fixes, keyword-led pages and content that climbs for searches your buyers make.",
        deliverable: "Optimised pages",
        when: "Ongoing",
      },
      {
        title: "Campaigns",
        body: "Search and social ads with tight targeting, clear offers and landing pages built to convert.",
        deliverable: "Live campaigns",
        when: "Week 2 onward",
      },
      {
        title: "Measure",
        body: "Conversion tracking from first click to closed deal, with a plain-language report every month.",
        deliverable: "Monthly report",
        when: "Monthly",
      },
      {
        title: "Scale",
        body: "Budget moves to what works, losing ads get cut, and winning pages get more traffic.",
        deliverable: "Optimised spend",
        when: "Monthly",
      },
    ],
    included: [
      "Technical SEO audit",
      "Keyword research",
      "On-page optimisation",
      "Content plan",
      "Google Ads",
      "Meta Ads",
      "Conversion tracking",
      "Monthly reporting",
    ],
    stack: ["Google Ads", "Meta Ads", "Google Search Console", "Google Analytics", "Ahrefs", "Semrush", "Looker Studio"],
    quote: {
      title: "Scoped per project",
      body: "Marketing depends on your goals and ad budget. After a short call you get a written plan with channels, targets and reporting.",
      examples: ["SEO audit", "Monthly SEO", "Google Ads management", "Meta Ads management", "Landing page CRO"],
    },
    faqs: [
      {
        q: "How long until SEO shows results?",
        a: "Technical fixes can help within weeks. New content usually takes 3-6 months to rank well, which is why we pair SEO with paid campaigns early on.",
      },
      {
        q: "How much should I spend on ads?",
        a: "It depends on your market and margins. We recommend a test budget, prove what converts, then scale the winners.",
      },
      {
        q: "Do I keep my ad accounts?",
        a: "Always. Accounts, data and tracking stay in your name. We work inside them with the access you grant.",
      },
      {
        q: "How do you report results?",
        a: "A monthly report in plain language: what we did, what it cost, how many leads it produced and what we will do next.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const workItems: Record<string, { name: string; kind: string; src: string; w: number; h: number }> = {
  apex: { name: "Apex Media", kind: "Agency website", src: "/images/work/apex.webp", w: 1600, h: 901 },
  abnb: { name: "ABNB", kind: "Service business website", src: "/images/work/abnb.webp", w: 1600, h: 901 },
  imperial: { name: "Imperial", kind: "App landing page", src: "/images/work/imperial.webp", w: 1600, h: 1024 },
  maestro: { name: "Maestro Legal", kind: "Law firm website", src: "/images/work/maestro.webp", w: 1600, h: 1179 },
  "purple-night": { name: "Purplenight", kind: "Product landing page", src: "/images/work/purple-night.webp", w: 1600, h: 985 },
  "wander-app": { name: "Wander", kind: "Travel app UI", src: "/images/work/wander-app.webp", w: 1400, h: 875 },
  "quantumpay-app": { name: "QuantumPay", kind: "Fintech app UI", src: "/images/work/quantumpay-app.webp", w: 1311, h: 846 },
};

export const site = {
  name: "Aether Web Media",
  short: "Aether",
  formerly: "AKC Web Media",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aetherwebmedia.com",
  email: "info@aetherwebmedia.com",
  description:
    "Aether Web Media designs and engineers fast websites, SaaS products and custom software for growing businesses. Built to load fast, rank and convert.",
  calLink: "aetherwebmedia/schedule-a-call",
  gaId: "G-DGM9KZVHR6",
  socials: [
    { label: "X", href: "https://x.com/aetherwebmedia" },
    { label: "Instagram", href: "https://instagram.com/aetherwebmedia" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/aetherwebmedia" },
  ],
} as const;

export const calUrl = (link: string = site.calLink) => `https://cal.com/${link}`;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
] as const;

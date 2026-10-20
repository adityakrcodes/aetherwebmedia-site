export const site = {
  name: "Aether Web Media",
  short: "Aether",
  formerly: "AKC Web Media",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aetherwebmedia.com",
  email: "info@aetherwebmedia.com",
  description:
    "Aether Web Media designs and engineers fast websites, SaaS products and custom software for growing businesses. Built to load fast, rank and convert.",
  gaId: "G-DGM9KZVHR6",
  socials: [
    { label: "X", href: "https://x.com/aetherwebmedia" },
    { label: "Instagram", href: "https://instagram.com/aetherwebmedia" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/aetherwebmedia" },
  ],
} as const;

/**
 * The enquiry form, hosted by the Aether workspace. GET `url` for the live field definitions and copy;
 * this mirrors them so the form renders without a request. Keep the options in sync with the workspace.
 */
export const leadForm = {
  url: "https://workspace.aetherwebmedia.com/api/public/lead-forms/lead-form",
  title: "What can we help with?",
  description: "Tell us a little about what you need. It takes under a minute, and we reply within 24 hours.",
  submitLabel: "Send enquiry",
  success:
    "Thanks, we’ve got your message. Our team will reply within 24 hours (usually sooner). If it’s urgent, WhatsApp us at +91 97981 80179.",
  services: ["Web Development", "Software Development", "App Development", "UI/UX Design", "Branding", "SEO and Marketing"],
  budgets: ["Small project", "Medium project", "Large project", "Ongoing retainer", "Not sure yet"],
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
] as const;

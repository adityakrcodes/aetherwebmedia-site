import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep old service URLs (and the ones the old sitemap listed) working for visitors and search engines.
  async redirects() {
    return [
      { source: "/services/dev/web", destination: "/services/web-development", permanent: true },
      { source: "/services/dev/saas", destination: "/services/software-development", permanent: true },
      { source: "/services/dev/app", destination: "/services/app-development", permanent: true },
      { source: "/services/design", destination: "/services/ui-ux-design", permanent: true },
      { source: "/services/ad", destination: "/services/growth-marketing", permanent: true },
      { source: "/blog", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

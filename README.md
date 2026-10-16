# Aether Web Media

Marketing site for Aether Web Media (formerly AKC Web Media). Next.js 15 App Router, Tailwind v4, deployed to Cloudflare Workers through OpenNext.

## Run it

```bash
pnpm dev        # local dev server
pnpm build      # production build (all pages are prerendered)
pnpm preview    # build for Cloudflare and serve the Worker locally
pnpm deploy     # build and deploy to Cloudflare
```

## Where things live

| What | Where |
| --- | --- |
| Service pages content (copy, steps, plans, FAQs) | `lib/services.ts` |
| Site name, email, Cal.com link, socials, nav | `lib/site.ts` |
| Design tokens (colors, radii, motion) | `app/globals.css` |
| Home page sections | `components/home/` |
| Service page sections | `components/service/ServiceSections.tsx` |
| Scroll-driven process visual per service | `components/service/visuals/` |
| ASCII fire, flame video, brand mark | `components/brand/` |

Adding a service: add an entry to `services` in `lib/services.ts`. Its page, sitemap entry and footer link are generated from that. Pick an existing `visual` or add a new one in `components/service/visuals/` and register it in `app/services/[slug]/page.tsx`.

## Notes

- Booking buttons are plain links to Cal.com with `data-cal`; the Cal.com embed only loads when someone hovers, focuses or clicks one.
- The brand is monochrome on purpose. The flame lives in the ASCII fire canvas, the chrome flame video and the light streaks, not in color.
- `open-next.config.ts` serves prerendered pages from Workers static assets. Keep it if you keep `dynamicParams = false` on service pages, or they will 404 on Cloudflare.
- Old URLs (`/services/dev/web`, `/services/dev/saas`, `/services/dev/app`, `/services/design`, `/services/ad`) redirect in `next.config.ts`.

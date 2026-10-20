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
| Site name, email, lead form endpoint and options, socials, nav | `lib/site.ts` |
| Design tokens (colors, radii, motion) | `app/globals.css` |
| Home page sections | `components/home/` |
| Service page sections | `components/service/ServiceSections.tsx` |
| Scroll-driven process visual per service | `components/service/visuals/` |
| ASCII fire, flame video, brand mark | `components/brand/` |

Adding a service: add an entry to `services` in `lib/services.ts`. Its page, sitemap entry and footer link are generated from that. Pick an existing `visual` or add a new one in `components/service/visuals/` and register it in `app/services/[slug]/page.tsx`.

## Notes

- "Start a project" buttons are links to `#enquire` (the inline form in the closing stage) with `data-lead`; with JavaScript they open the same form in a modal (`components/site/LeadDialog.tsx`). The form posts to the Aether workspace lead form API. If you change the form's fields or options in the workspace, update `leadForm` in `lib/site.ts`.
- The brand is monochrome on purpose. The flame lives in the ASCII fire canvas, the chrome flame video and the light streaks, not in color.
- `open-next.config.ts` serves prerendered pages from Workers static assets. Keep it if you keep `dynamicParams = false` on service pages, or they will 404 on Cloudflare.
- Old URLs (`/services/dev/web`, `/services/dev/saas`, `/services/dev/app`, `/services/design`, `/services/ad`) redirect in `next.config.ts`.

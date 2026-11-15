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
- The modal and the inline `#enquire` form (`components/site/LeadInline.tsx`) follow the form's mode in the workspace, read at runtime from the form's public config (`lib/lead-chat/config.ts`): `agentic` shows the conversational chat (`components/site/lead-chat/`), `both` adds a Chat/Form switch, `classic` shows the plain form. The chat's questions, wording and success card come from the workspace builder, so they change without a deploy. The classic form is the fallback if the config can't be loaded (the modal waits 4s) or the chat fails; inline, it is what the server renders, so it is there without JavaScript and is never swapped for the chat once someone has started typing in it. The chat's state machine (`lib/lead-chat/agentic.ts`, `answers.ts`) is a port of the workspace's `lib/lead-forms/`; keep the two in sync when the workspace changes.
- The brand is monochrome on purpose. The flame lives in the ASCII fire canvas, the chrome flame video and the light streaks, not in color.
- `open-next.config.ts` serves prerendered pages from Workers static assets. Keep it if you keep `dynamicParams = false` on service pages, or they will 404 on Cloudflare.
- Old URLs (`/services/dev/web`, `/services/dev/saas`, `/services/dev/app`, `/services/design`, `/services/ad`) redirect in `next.config.ts`.

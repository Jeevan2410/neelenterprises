# NEXT_STEPS

## Immediate (Phase 1 — Architecture)
1. ✅ Phase 0 docs (this set)
2. Scaffold Astro + TS + Tailwind v4 project, `npm install`, verify build
3. `src/config/site.ts` (business truth, SITE_URL from env)
4. i18n routing (en/kn/hi) + UI dictionaries
5. Design tokens (light/dark), BaseLayout with SEO component, theme toggle
6. Content modules: services (19, all `enabled` flag), FAQs, industries, brands, locations
7. Copy brand assets into `public/images/` organized folders; fix `site.webmanifest`

## Phase 2 — Design system components (buttons, nav, footer, cards, forms)
## Phase 3 — Core pages (home, about, services index + 19 service pages, contact, locations, FAQ, legal, 404)
## Phase 4 — 3D + scroll choreography (needs licensed .glb or built-from-primitives forklift)
## Phase 5 — Supabase Postgres: migrations, enquiry API, Turnstile, email abstraction
## Phase 6 — Admin (`/admin`, auth, enquiries/services/FAQ/settings)
## Phase 7 — Cloudinary media
## Phase 8 — Full SEO pass (JSON-LD, sitemap, robots, hreflang verification)
## Phase 9 — Testing/QA (lint, typecheck, a11y, responsive, perf)
## Phase 10 — GitHub + Actions + Cloudflare deploy

## Open questions for the business (non-blocking)
- Final domain?
- Real workshop photos available?
- Transparent/SVG logo version?
- Social accounts?
- Which services from the 19 are actively offered today (for `enabled` flags)?
- Kannada/Hindi translation supply — professional translation vs. marked-draft machine translation?

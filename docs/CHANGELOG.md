# CHANGELOG

## 2026-09-13 (session 8 — Phase 6)
### Added
- Admin panel `/admin` (noindex): Supabase Auth sign-in, enquiries dashboard (latest 200, status new/contacted/closed inline updates), XSS-escaped rendering.
- `database/migrations/0002_admin_access.sql`: read/update policies for authenticated users.
- `.env` created locally with the business's Supabase/Cloudinary credentials (git-ignored, verified); `PUBLIC_SUPABASE_*` build vars for the client login.

### Security note
- Cloudinary API secret was shared in chat — recommend rotating it in the Cloudinary dashboard before production use (never committed; stored only in `.env`).

## 2026-09-12 (session 7 — Phases 8 & 10)
### Added
- OG/social preview image (1200x630, 52KB) generated from brand tokens; `og:image` + `twitter:card summary_large_image` on all pages.
- GitHub Actions CI (`.github/workflows/ci.yml`): install → `astro check` → build → SEO smoke checks (sitemap, robots, 404, structured data, hreflang, route availability, /admin disallow).

## 2026-09-12 (session 6 — Phase 5)
### Added
- `database/migrations/0001_enquiries.sql`: enquiries + enquiry_attachments tables, indexes, RLS (anon insert-only).
- Enquiry pipeline: `functions/api/enquiry.ts` (Cloudflare Pages Function — Turnstile verify, honeypot, server-side validation via `src/lib/enquiry.ts`, Supabase REST insert with service role, email notification, crypto-random reference number, WhatsApp follow-up link).
- Email abstraction `src/lib/email.ts` (Resend HTTP API; no-op fallback when unconfigured so enquiries never fail on email).
- Request-service form now POSTs to `/api/enquiry` with success state (reference number, WhatsApp follow-up), error state, and WhatsApp handoff fallback when the endpoint is unreachable.

### Security
- Reference randomness switched from `Math.random` to `crypto.getRandomValues` (Mimosa finding).

### Note
- Live operation requires env vars (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, optional RESEND_API_KEY / TURNSTILE keys) configured in Cloudflare Pages + applying the migration. Until then the form falls back to WhatsApp handoff gracefully.

## 2026-09-12 (session 5 — Phase 4)
### Added
- 3D layer `src/components/3d/`: `ForkliftModel.ts` (original forklift built from Three.js primitives — no copyrighted model; replaceable for a licensed .glb later), `ForkliftScene.ts` (renderer, lights, scroll-linked camera orbit, hotspot projection), `ForkliftScene.astro` (island), `ForkliftFallback.astro`.
- Component hotspots are real links to battery/controller/engine/hydraulic/tyre service pages.
- Loading discipline: Three.js dynamic-imported only after the canvas nears the viewport (`client:visible` + IntersectionObserver gate); loads on homepages only; skipped on reduced-motion / ≤640px / no-WebGL with link-card fallback; full cleanup/dispose on teardown.
- `.forklift-hotspot` styles; `three` + `@types/three` dependencies (reason recorded in DECISIONS).

## 2026-09-12 (session 4 — Phase 3)
### Added
- `Breadcrumbs.astro`: visible breadcrumb nav + matching BreadcrumbList JSON-LD, used on service/industry/location detail pages.
- Service detail enrichment: verified scope section (category-level coverage map in `misc.ts`), locations block, industry-context links, FAQ relevance filter, conversion block.
- Industry detail pages: services-for-industry links (internal-link graph §58).
- FAQ page: conversion fallback block (request service / explore services).

## 2026-09-11 (session 3 — Phase 2)
### Added
- Self-hosted fonts: Archivo Variable + JetBrains Mono Variable (Fontsource).
- Motion system: reveal-on-scroll (`[data-reveal]` + IntersectionObserver, JS-optional), hero word-stagger, CSS brand marquee — all reduced-motion safe.
- Components: `Button.astro` (3 variants), `SectionHeading.astro`, `ServiceCard.astro`, `details.faq` styling.
- Homepage sections: parts/equipment gallery (8 catalog images, restricted copy), FAQ teaser, locations, conversion block.
- `@astrojs/check` wired (`npm run check`) — 0 errors.
- docs/DESIGN_SYSTEM.md.

### Changed
- Expanded design tokens (sunken surface, line-strong, accent-strong, motion durations/easing, focus).
- Header: active-page underline animation, aria-current, mono controls, button component.
- FAQ + ServiceDetail FAQ blocks restyled.

### Fixed
- TypeScript union error on staff tiers (About view) via `StaffTier` interface.

## 2026-09-11 (session 2)
### Added
- Astro 5 + TypeScript strict + Tailwind v4 architecture; `@astrojs/sitemap`.
- Canonical site config (`src/config/site.ts`), i18n dictionaries (en/kn/hi, EN fallback), locale catch-all routes.
- Design tokens with deliberate light/dark systems; theme toggle (persisted, no-flash).
- 14 shared views + EN routes + kn/hi generated routes (103 pages total).
- Content modules: 19 services (individually disableable), 9 brand logos, 4 industries, 11 FAQs.
- SEO framework: canonical, hreflang, OG, Organization/Service/LocalBusiness/FAQPage JSON-LD, sitemap-index, robots.txt.
- Request-service form (interim WhatsApp handoff pending Phase 5 API), mobile sticky CTA bar.
- Assets staged into `public/images/`; rewritten `site.webmanifest`.

### Fixed
- Missing frontmatter fences in route files (pages rendered as text; caught by dist inspection).

## 2026-09-11
### Added
- Phase 0 discovery: repository + asset inventory, Company Profile.docx extraction and fact verification.
- Documentation set: PROJECT_STATE, DECISIONS, ASSET_INDEX, ARCHITECTURE, NEXT_STEPS, CONTENT_STATUS, SEO_STATUS, DATABASE_SCHEMA, KNOWN_ISSUES, CURRENT_TASK, CHANGELOG.

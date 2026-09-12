# CHANGELOG

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

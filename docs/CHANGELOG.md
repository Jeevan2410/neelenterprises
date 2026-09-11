# CHANGELOG

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

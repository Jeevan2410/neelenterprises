# DECISIONS

| # | Date | Decision | Reason | Alternatives rejected |
|---|------|----------|--------|----------------------|
| 1 | 2026-09-11 | Astro static-first (hybrid) + TypeScript + Tailwind v4 | SEO, islands architecture, performance | Next.js (overkill SPA weight) |
| 2 | 2026-09-11 | Content in typed TS data modules (`src/content/`) before DB exists; DB (Supabase Postgres) only for enquiries/admin in Phase 5 | Do not use a DB for static markup; keep phases honest | Full CMS now (overengineering) |
| 3 | 2026-09-11 | i18n via Astro's native i18n routing, `en` default, `kn`/`hi` locales; translations in `src/i18n/` dictionaries; EN complete first, kn/hi stubbed with TODO marks | Editable, typed, no runtime dependency | Framework i18n libs |
| 4 | 2026-09-11 | Three.js dynamically imported on homepage island only; poster-image fallback; no 3D on mobile/low-power/reduced-motion | Performance budget, accessibility | Global WebGL |
| 5 | 2026-09-11 | GSAP (ScrollTrigger) + CSS animations; Lenis only if scroll choreography requires it (decide in Phase 4) | Timeline/scroll orchestration value; dependency discipline | Many animation libs |
| 6 | 2026-09-11 | Single canonical site config `src/config/site.ts` reading `SITE_URL` env; no hard-coded domain anywhere | Domain undecided |
| 7 | 2026-09-11 | Keep original asset folders in place at repo root during Phase 1; copy needed assets into `public/` with organized names (originals preserved per no-deletion rule) | Asset safety |
| 8 | 2026-09-11 | Use `favicon/` set as canonical favicon set; `favicon_io/` marked duplicate (do not delete without confirmation) | Newer, complete |
| 9 | 2026-09-11 | Gallery photos labeled as generic catalog/AI imagery, NOT claimed as "our workshop photos" — gallery copy will say "parts & equipment we service" style wording; the 3 `Gemini_Generated_*` files are AI-generated hero candidates and must never be presented as real client work | Truthfulness rule |
| 10 | 2026-09-11 | AI-generated images allowed only as ambient/decorative visuals; real client photos must be supplied before "Real Work" gallery goes live (tracked CONTENT_STATUS) | Truthfulness rule |
| 11 | 2026-09-11 | Supabase Postgres chosen for Phase 5 (admin + enquiries); migrations in `database/migrations/` | Managed, RLS, free tier |
| 12 | 2026-09-11 | Cloudflare Turnstile planned for enquiry form spam protection (Phase 5) | Not solely hidden fields |

# PROJECT STATE — NEEL ENTERPRISES WEBSITE

Last updated: 2026-09-11

```
PROJECT_STATUS:
  phase: development
  current_phase: phase-2-complete-awaiting-phase-3
  build_status: passing (103 pages, verified)
  database_status: not-started (phase 5)
  admin_status: not-started (phase 6)
  seo_status: framework-live (titles, canonical, hreflang, OG, Organization JSON-LD, FAQPage on /faq, LocalBusiness on location pages, sitemap, robots)
  3d_status: pending-model (phase 4; placeholder slot exists in hero)
  cloudinary_status: pending
  domain_status: pending (SITE_URL env placeholder)
  production_status: not-deployed
```

## Phase 1 delivered (2026-09-11)

- Astro 5 + TS strict + Tailwind v4 project; `astro build` passes (103 pages).
- `src/config/site.ts` — single canonical business-truth config.
- i18n: `en` at root, `kn`/`hi` via `src/pages/[locale]/[...page].astro` catch-all reusing shared views; dictionaries in `src/i18n/ui.ts` (kn/hi empty, EN fallback).
- Design tokens (deliberate light/dark) in `src/styles/global.css`; theme toggle persisted in localStorage; system default; no-flash inline script.
- Shared views in `src/views/`: Home, About, ServicesIndex, ServiceDetail, Industries, IndustryDetail, Brands, Locations, LocationDetail, Faq, Contact, RequestService, Legal, NotFound.
- Content modules: `src/content/services.ts` (19 services, `enabled` flags), `src/content/misc.ts` (brands, industries, 11 FAQs).
- Conversion: WhatsApp/email links via `src/utils/links.ts`; request-service form is interim (hands off to WhatsApp) until Phase 5 API; mobile sticky CTA bar.
- Assets copied to `public/images/{brand,brands}`; canonical favicon set in `public/`; `site.webmanifest` rewritten; `robots.txt` disallows /admin and /api.
- SEO component: unique title/description, canonical, hreflang (en/kn/hi/x-default), OG, Organization/Service/LocalBusiness/FAQPage JSON-LD.

## Rules honored

- No invented facts, testimonials, stats, or authorization claims.
- Brand names used only as "technical experience with…".

## What exists

- Brand assets only (no code prior to 2026-09-11):
  - `logo.png` (463x479 PNG) and `Company Logo.jpeg` (same artwork, JPEG).
  - `favicon/` and `favicon_io/` — two generated favicon sets (overlapping; `favicon/` is the newer/complete set).
  - `company logos/` — 9 brand logo PNGs (permission granted to display).
  - `gallery/` — ~38 part/equipment photos + 3 AI-generated hero images (see ASSET_INDEX for classification).
  - `Company Profile.docx` — verified source of business facts.

## Verified business truth (source: client brief + Company Profile.docx)

- Company: NEEL ENTERPRISES
- Registered Office: No.11-87/3 & 11-87/4, Sdananda Building, Kinnigoli Main Road, Opposite Durgaprasad Residency, Mennabetu, Kinnigoli – 574150
- Branch: Sy No-14/5, Hanuman Layout, Hesaraghatta Main Road, Near Chikkabanavara Railway Station, Chikkabanavara, Bangalore – 560090
- Email: neelenterprises.741@gmail.com
- Phone/WhatsApp: +91 81051 42089
- 18 years' experience claim is supported by the profile.
- Staff experience tiers (from profile): 18+ yrs (Jungheinrich, Toyota & BT, Jost's, Maini, Macneill, Baka, Godrej, Voltas), 14+ yrs (Maini, Yale, Jungheinrich, Jost's, Baka, Macneill, Godrej, Voltas), 4+ yrs maintenance, 3 technical assistants.
- Industries (from profile): Automobile, Engineering, Pharma, Warehousing.

## Rules honored

- No invented facts, testimonials, stats, or authorization claims.
- Brand names used only as "technical experience with…".

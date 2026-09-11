# ARCHITECTURE

## Stack

- **Astro 5** (static output; SSR/hybrid only when enquiry API lands in Phase 5) — MPA, SEO-first
- **TypeScript** strict
- **Tailwind CSS v4** (`@tailwindcss/vite`) with design tokens in `src/styles/tokens.css`
- **Three.js** — dynamically imported island, homepage only (Phase 4)
- **GSAP + ScrollTrigger** — scroll choreography (Phase 4); CSS animations otherwise
- Hosting: Cloudflare Pages; CI/CD: GitHub Actions
- DB (Phase 5): Supabase Postgres — enquiries, admin content
- Media (Phase 7): Cloudinary behind a provider abstraction

## Directory layout

```
/
├─ docs/                    # agent handoff docs (this set)
├─ database/migrations/     # Phase 5 SQL migrations
├─ public/
│  ├─ images/{brand,services,forklifts,parts,gallery,locations}/
│  ├─ models/               # future forklift.glb
│  └─ favicon.*
├─ src/
│  ├─ config/site.ts        # single canonical business + SITE_URL config
│  ├─ content/              # typed TS content modules (services, faqs, industries, brands, locations)
│  ├─ i18n/                 # ui dictionaries: en, kn, hi
│  ├─ layouts/BaseLayout.astro
│  ├─ components/
│  │  ├─ navigation/  hero/  buttons/  typography/  cards/
│  │  ├─ services/    industries/  brands/  gallery/
│  │  ├─ locations/   faq/  forms/  footer/  seo/  motion/
│  │  └─ 3d/{ForkliftScene,ForkliftModel,ForkliftCamera,ForkliftInteraction,ForkliftFallback}
│  ├─ pages/                # en at root, /kn /hi prefixed
│  ├─ styles/tokens.css
│  └─ utils/{whatsapp.ts,email.ts,analytics.ts,seo.ts}
└─ .github/workflows/ci.yml
```

## Routing (Astro i18n)

- `defaultLocale: 'en'` at root; `locales: ['en','kn','hi']`, `prefixDefaultLocale: false`.
- Shared page components under `src/pages` structure call a factory per locale to avoid duplication.
- hreflang alternates generated from the sitemap/page meta.

## Rendering strategy

- Everything static until Phase 5. `/request-service/` form posts to a server endpoint (Cloudflare Function or Supabase edge) — endpoint decision recorded when implemented; Turnstile for bots.
- 3D island (`client:visible` + dynamic `import('three')`) with poster fallback; skipped entirely on reduced-motion / no-WebGL / small screens.

## Design system summary

- Concept: **"KEEP INDUSTRY MOVING."** — uptime, precision, motion.
- Palette: industrial graphite/steel neutrals + single safety accent (amber, used sparingly); deliberate light AND dark token sets.
- Type: technical grotesque for display (self-hosted variable font, subset), mono for data/labels.
- Motion tokens respect `prefers-reduced-motion`.

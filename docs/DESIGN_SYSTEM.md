# DESIGN_SYSTEM

Concept: **"KEEP INDUSTRY MOVING."** Industrial engineering credibility × restrained experimental motion.

## Tokens (`src/styles/global.css`)

### Color — deliberate light/dark systems
| Token | Light | Dark |
|---|---|---|
| `--bg` / `--bg-elevated` / `--bg-sunken` | #f6f6f4 / #fff / #ecece8 | #0e1013 / #171a1f / #0a0c0e |
| `--ink` / `--ink-muted` | #14161a / #5a6068 | #eceeeb / #9aa1a8 |
| `--line` / `--line-strong` | #d8dad6 / #14161a | #2a2e35 / #eceeeb |
| `--accent` (safety amber) | #b45309 | #f0a437 |

Accent is used sparingly: primary buttons, hover states, labels — never large fills.

### Type
- Display/body: **Archivo Variable** (self-hosted via Fontsource), black weights for headlines, tight tracking.
- Data/labels: **JetBrains Mono Variable** — `.label-mono` utility (uppercase, 0.14em tracking).

### Motion
- Durations: `--dur-fast` 150ms / `--dur-base` 300ms / `--dur-slow` 600ms; easing `--ease-out` (expo-ish).
- Reveal-on-scroll: `[data-reveal]` + IntersectionObserver (`src/scripts/reveal.ts`); hidden initial state gated on `html.js` so no-JS users always see content.
- Hero kinetic type: pure-CSS word stagger (`.hero-word`, `--word-delay`).
- Brand marquee: CSS-only, duplicated track, pauses on hover.
- All of the above collapse under `prefers-reduced-motion: reduce`.

## Components
- `Button.astro` — variants `primary` / `outline` / `quiet`; 2px radius, lift-on-hover.
- `ServiceCard.astro` — bordered card, power-type label, arrow affordance on hover.
- `SectionHeading.astro` — mono eyebrow + black display title, reveal-enabled.
- `details.faq` — global FAQ styling with animated +/× marker.
- Header: sticky, blur, active-page underline scale animation; mobile details menu.
- Mobile CTA bar: fixed 3-up (WhatsApp / Email / Request) below sm.

## Accessibility rules baked in
- `:focus-visible` outline token on everything; skip-to-content link.
- Decorative marquee duplicates carry `aria-hidden` + empty alt.
- No essential content inside canvas/animation (brief §81).

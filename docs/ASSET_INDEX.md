# ASSET INDEX (Phase 0 inventory)

## Brand / identity

| Asset | Format/Size | Notes |
|---|---|---|
| `logo.png` | PNG 463x479 (RGB, no alpha) | Primary logo. RGB (no transparency) — needs a transparent-background version for dark UI; TODO |
| `Company Logo.jpeg` | JPEG 463x479 | Same artwork as logo.png — duplicate artwork, different format |

## Favicons — two overlapping sets (see DECISIONS #8)

- `favicon/` — CANONICAL set: favicon.ico, favicon.svg, favicon-96x96.png, apple-touch-icon.png, web-app-manifest-192x192/512x512.png, site.webmanifest. NOTE: manifest still contains template values (`name: "MyWebSite"`, red background) — must be rewritten.
- `favicon_io/` — older duplicate set (android-chrome, favicon-16/32). Marked duplicate; do not delete without confirmation.

## Company/brand logos (client confirmed permission to display)

baka.png, godrej.png, josts.png, jungheinrich.png, macneill.png, maini.png, toyota-bt.png, voltas.png, yale.png

Note: yale.png is extra vs. the profile's brand list (Yale IS in the 14+ yr list, so supported). Display wording: "technical experience with these brands" only.

## Gallery — `gallery/` (38 files)

### Real-looking part/equipment catalog photos (~35 JPEGs, 7–455 KB)
Categories: wheels/bearings/rollers (polyurethane, tandem), hydraulic cylinders/pumps/valves, controllers/contactors, traction battery cells, seats, switches, pallet trucks, forklifts (Komatsu counterbalance, tow tractor), brake shoes, oil filter, ignition switch.
⚠️ Naming and uniform quality suggest stock/catalog imagery, not necessarily NEEL's own photography. Copy must not claim "our workshop" until confirmed. Tracked in CONTENT_STATUS.

### AI-generated images (3 PNGs, 1.4–2.2 MB each — heavy)
- `Gemini_Generated_Image_7e7u877e7u877e7u.png`
- `Gemini_Generated_Image_7u6ena7u6ena7u6e.png`
- `Gemini_Generated_Image_xytqxfxytqxfxytq.png`
Hero/background candidates only. Must be compressed (target <300 KB) before use. Never presented as real work.

## Missing / needed

- Transparent-background logo (SVG preferred) — **blocking for polished dark UI**
- Real workshop/service photographs — needed for "Real Work" section
- OG/social preview image (1200x630)
- 3D forklift `.glb`/`.gltf` (licensed or original)
- Social media account URLs
- GST / legal / registration details (not to be invented)

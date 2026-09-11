# KNOWN_ISSUES

1. **Logo has no transparency** (`logo.png` is RGB on background). Dark-mode UI will box it. Need SVG/transparent PNG from business. Workaround: display on light chip/container.
2. **favicon manifest is template values** (`MyWebSite`, red bg) — must rewrite before launch.
3. **Duplicate favicon sets** (`favicon/` + `favicon_io/`) — canonical chosen (`favicon/`); awaiting confirmation to remove duplicate.
4. **3 AI-generated images are 1.4–2.2 MB PNGs** — unusable as-is; compress/convert before any use.
5. **No 3D forklift model** — Phase 4 will build a primitive-based placeholder forklift in Three.js behind the replaceable `ForkliftModel` layer.
6. **Domain undecided** — SITE_URL env placeholder.
7. **Services enabled/disabled** — all 19 default-enabled; business confirmation pending (open question).
8. **`gallery/` photos provenance unconfirmed** — copy restricted to neutral catalog wording (see CONTENT_STATUS).

# DEPLOYMENT

## Source control

- Remote: `https://github.com/Jeevan2410/neelenterprises.git` (branch `main`, first push 2026-09-11).
- Branching: `main` is the integration branch; feature branches for larger changes.

## Hosting (planned)

Target: Cloudflare Pages, build command `npm run build`, output `dist/`.
Environment variables to configure at host: `SITE_URL` (see `.env.example`).
CI/CD via GitHub Actions is Phase 10 — not yet configured.

## Status

- production_status: not-deployed
- GitHub repo: connected ✅

# DEPLOYMENT

## Source control

- Remote: `https://github.com/Jeevan2410/neelenterprises.git` (branch `main`, first push 2026-09-11).
- Branching: `main` is the integration branch; feature branches for larger changes.

## Hosting (planned)

Target: Cloudflare Pages, build command `npm run build`, output `dist/`.
Pages Functions in `functions/` deploy automatically (POST /api/enquiry).

### Environment variables to configure at Cloudflare Pages
| Var | Required | Purpose |
|---|---|---|
| `SITE_URL` | yes | canonical origin (also set at build) |
| `SUPABASE_URL` | yes | enquiry persistence |
| `SUPABASE_SERVICE_ROLE_KEY` | yes (server-side only) | enquiry insert |
| `RESEND_API_KEY` | optional | email notifications; skipped if absent |
| `ENQUIRY_FROM_EMAIL` | optional | Resend sender |
| `TURNSTILE_SECRET_KEY` | optional | form bot protection |

### Database setup
1. Supabase project exists: `bbfssdsqaphoounexdpv` (credentials in local `.env`, never committed).
2. Run `database/migrations/0001_enquiries.sql` then `0002_admin_access.sql` in the Supabase SQL editor.
3. Create your admin login: Supabase Dashboard → Authentication → Users → Add user (email + password).
4. Set env vars in Cloudflare Pages (production + preview): `SITE_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (Dashboard → Settings → API → service_role — server-side only), `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, optional `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`.

### Cloudinary
Credentials held in `.env` only. Integration deferred to Phase 7 (not yet used by any code).

### Local behaviour without env vars
The form detects an unreachable `/api/enquiry` and hands off to WhatsApp,
so the site remains fully functional pre-deployment (brief §63).

## Status

- production_status: not-deployed
- GitHub repo: connected ✅
- CI/CD: GitHub Actions workflow added (Phase 10): lint/typecheck/build on push & PR.

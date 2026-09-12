# CURRENT_TASK

**Phase 4 complete** (3D forklift island live on homepages with fallbacks). Do not redo: Phases 1–4 (see CHANGELOG).

**Next: Phase 5 — Database & enquiry pipeline.** Supabase Postgres schema via `database/migrations/` (see DATABASE_SCHEMA.md); server endpoint for `/request-service/` (Cloudflare Pages function or Supabase edge — decide against SSR adapter requirements); Turnstile; email abstraction (`sendEnquiryNotification`); enquiry reference numbers; real form submission replacing interim WhatsApp handoff. **Blocked on user env vars** (SUPABASE_URL/keys, TURNSTILE keys) — migrations and code can be written and documented first; `wrangler`-based local path documented in DEPLOYMENT.md.

Then: Phase 6 admin, Phase 7 Cloudinary, Phase 8 SEO final pass, Phase 9 QA, Phase 10 CI/CD.

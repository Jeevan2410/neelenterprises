# DATABASE_SCHEMA (Phase 5 — design ahead, not yet implemented)

Provider: Supabase PostgreSQL. All schema changes via `database/migrations/NNN_*.sql`.

## Planned tables

- `admin_users` (id, email, password_hash, role, created_at) — auth via Supabase Auth where possible
- `services` (id, slug, enabled, sort_order, image_url, created_at) + `service_translations` (service_id, locale, title, short_desc, long_desc, seo_title, seo_description, benefits jsonb, process jsonb)
- `service_categories` (id, slug) + join table
- `enquiries` (id, reference_no, name, company, email, phone, city, state, site_location, equipment_type, brand, model, capacity, fuel_type, requirement, urgency, description, locale, status, created_at)
- `enquiry_attachments` (id, enquiry_id, url, public_id, filename, size, mime)
- `faqs` (id, category, sort_order, active) + `faq_translations` (faq_id, locale, question, answer)
- `industries`, `brands`, `locations` (+ translations) — seeded from static content initially
- `site_settings` (key, value jsonb) — email, phone, social links, toggles
- `media` (id, provider, public_id, url, alt, title, entity_type, entity_id)

## Policies

- RLS on everything; anon may only INSERT into `enquiries`/`enquiry_attachments` (with Turnstile-verified endpoint).
- No service-role keys in client code.

## Status

Not started. Do not create until Phase 5 (dependency discipline).

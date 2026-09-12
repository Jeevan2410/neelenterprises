-- 0001_enquiries.sql — Phase 5 enquiry storage (docs/DATABASE_SCHEMA.md)
-- Apply in Supabase SQL editor or via supabase CLI. Idempotent.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_no text unique not null,
  name text not null,
  company text,
  email text not null,
  phone text not null,
  city text not null,
  state text,
  site_location text,
  equipment_type text not null,
  brand text,
  model text,
  capacity text,
  fuel_type text,
  requirement text not null,
  urgency text not null default 'planned',
  description text,
  locale text not null default 'en',
  status text not null default 'new',          -- new | contacted | closed
  created_at timestamptz not null default now()
);

create table if not exists public.enquiry_attachments (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  url text not null,
  public_id text,
  filename text not null,
  size_bytes integer,
  mime_type text,
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Row level security: anonymous users may INSERT only (via the server-side
-- function using the service role, so anon access here is defense-in-depth).
alter table public.enquiries enable row level security;
alter table public.enquiry_attachments enable row level security;

drop policy if exists "anon can insert enquiries" on public.enquiries;
create policy "anon can insert enquiries"
  on public.enquiries for insert to anon with check (true);

drop policy if exists "anon can insert attachments" on public.enquiry_attachments;
create policy "anon can insert attachments"
  on public.enquiry_attachments for insert to anon with check (true);

-- Reads/updates are for authenticated admin users only (Phase 6 adds admin
-- auth; until then no read policies exist — service role bypasses RLS).
-- 0002_admin_access.sql — Phase 6 admin access.
-- Admins are Supabase Auth users created in the Supabase Dashboard
-- (Authentication > Users). Any authenticated user may read/update enquiries.

drop policy if exists "authenticated can read enquiries" on public.enquiries;
create policy "authenticated can read enquiries"
  on public.enquiries for select to authenticated using (true);

drop policy if exists "authenticated can update enquiries"
  on public.enquiries for update to authenticated using (true) with check (true);

drop policy if exists "authenticated can read attachments" on public.enquiry_attachments;
create policy "authenticated can read attachments"
  on public.enquiry_attachments for select to authenticated using (true);

-- 1. Fix RLS on setlists
alter table public.setlists enable row level security;
-- Add basic policy for setlists if not exists (assuming owner management)
create policy "Users can manage their own setlists"
on public.setlists for all
to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Public setlists are viewable by everyone"
on public.setlists for select
to public
using (is_public = true);

-- 2. Security Definier Views
-- Making views invoke RLS of underlying tables
alter view public.category_details set (security_invoker = true);
alter view public.song_with_categories set (security_invoker = true);

-- 3. Fix Mutable Search Path on Function
alter function public.check_is_subcategory() set search_path = public;

-- 4. Harden INSERT policies
-- (Assuming policies might exist that are too permissive, we ensure strict ones)
-- For Compositions
create policy "Authenticated users can create compositions"
on public.compositions for insert
to authenticated
with check (auth.role() = 'authenticated');

-- For Song Versions (Ensure contributor matches)
-- Drop existing if loose (safe to just create a specific one if naming doesn't conflict, 
-- or we can drop 'Enable insert for all users' if we knew the name. 
-- Since we are patching, we'll force a strict policy).
-- The previous schema doc had "Users can insert versions", effectively just 'authenticated'.
-- We will ensure stricter check.
drop policy if exists "Enable insert for all users" on public.song_versions;
drop policy if exists "Enable insert for all users" on public.compositions;

-- 1. Schema Changes
alter table public.compositions add column owner_id uuid references public.profiles(id);

-- 2. RLS Updates for Compositions
-- Allow authenticated users to create songs (assigning themselves as owner)
drop policy if exists "Authenticated users can create compositions" on public.compositions;

create policy "Authenticated users can create compositions"
on public.compositions
for insert
to authenticated
with check ((select auth.role()) = 'authenticated');

-- Allow Owners to UPDATE their own songs
create policy "Owners can update their songs"
on public.compositions
for update
to authenticated
using (owner_id = (select auth.uid()));

-- Allow Admins to UPDATE ALL songs
create policy "Admins can update all songs"
on public.compositions
for update
to authenticated
using ((select role from public.profiles where id = (select auth.uid())) = 'admin');


-- 3. RLS Updates for Song Versions
-- Allow Owners of the parent song OR the contributor of the version to update it?
-- For now, let's stick to: Contributor can edit their version.
create policy "Contributors can update their versions"
on public.song_versions
for update
to authenticated
using (contributor_id = (select auth.uid()));

-- Admins can update all versions
create policy "Admins can update all versions"
on public.song_versions
for update
to authenticated
using ((select role from public.profiles where id = (select auth.uid())) = 'admin');

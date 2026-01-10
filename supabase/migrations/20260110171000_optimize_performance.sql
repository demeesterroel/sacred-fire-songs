-- Optimize Categories Policies (Drop ALL, Split to avoid SELECT overlap)
drop policy "Allow admins/members to manage categories" on public.categories;

-- Recreate as INSERT/UPDATE/DELETE only (SELECT is handled by Public Read)
create policy "Admins/Members can manage categories"
on public.categories
for insert
to authenticated
with check ((select auth.role()) = 'authenticated');

create policy "Admins/Members can update categories"
on public.categories
for update
to authenticated
using ((select auth.role()) = 'authenticated');

create policy "Admins/Members can delete categories"
on public.categories
for delete
to authenticated
using ((select auth.role()) = 'authenticated');


-- Optimize Compositions Policies (Cache auth call)
drop policy "Authenticated users can create compositions" on public.compositions;

create policy "Authenticated users can create compositions"
on public.compositions
for insert
to authenticated
with check ((select auth.role()) = 'authenticated');


-- Optimize Song Versions Policies (Cache auth call)
drop policy "Users can insert versions" on public.song_versions;

create policy "Users can insert versions"
on public.song_versions
for insert
with check ((select auth.uid()) = contributor_id);


-- Optimize Setlists Policies (Cache auth call, Split to refine scope)
drop policy "Users can manage their own setlists" on public.setlists;

-- Owner View (covers private lists)
create policy "Owners can view their setlists"
on public.setlists
for select
to authenticated
using (owner_id = (select auth.uid()));

-- Owner Modifications
create policy "Owners can insert setlists"
on public.setlists
for insert
to authenticated
with check (owner_id = (select auth.uid()));

create policy "Owners can update setlists"
on public.setlists
for update
to authenticated
using (owner_id = (select auth.uid()));

create policy "Owners can delete setlists"
on public.setlists
for delete
to authenticated
using (owner_id = (select auth.uid()));


-- Optimize Setlist Items Policies (Cache auth call, Split to avoid SELECT overlap)
drop policy "Allow authenticated users to manage items" on public.setlist_items;

-- Recreate as INSERT/UPDATE/DELETE only (SELECT is handled by Public Read)
create policy "Auth users can insert setlist items"
on public.setlist_items
for insert
to authenticated
with check ((select auth.role()) = 'authenticated');

create policy "Auth users can update setlist items"
on public.setlist_items
for update
to authenticated
using ((select auth.role()) = 'authenticated');

create policy "Auth users can delete setlist items"
on public.setlist_items
for delete
to authenticated
using ((select auth.role()) = 'authenticated');

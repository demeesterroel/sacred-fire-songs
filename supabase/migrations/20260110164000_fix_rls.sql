-- Enable RLS on setlist_items
alter table public.setlist_items enable row level security;

-- Allow public read access (so setlists can be viewed)
create policy "Allow public read access"
on public.setlist_items for select
to public
using (true);

-- Allow authenticated users (members/admins) to manage their items
-- Note: Ideally this should check ownership of the parent setlist, but for MVP we allow all auth users to insert/update for now, 
-- or we can rely on the app logic.
-- A better policy would be: 
-- using ( exists ( select 1 from public.setlists s where s.id = setlist_id and s.owner_id = auth.uid() ) )

-- For simplicity/compatibility with current structure, we allow auth users full access for now, 
-- matching the 'Allow admins/members to manage categories' style for trusted users.
create policy "Allow authenticated users to manage items"
on public.setlist_items for all
to authenticated
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

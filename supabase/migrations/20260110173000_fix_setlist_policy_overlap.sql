-- Optimize Setlists Policies (Avoid Overlap)
drop policy "Owners can view their setlists" on public.setlists;

-- New Policy: Owners can view their *PRIVATE* setlists.
-- Public setlists are already covered by "Public setlists are viewable by everyone".
create policy "Owners can view their setlists"
on public.setlists
for select
to authenticated
using (owner_id = (select auth.uid()) and is_public = false);

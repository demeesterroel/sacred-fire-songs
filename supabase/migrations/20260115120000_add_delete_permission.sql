-- Enable DELETE for Admins on Compositions and Song Versions

-- Compositions (Songs)
create policy "Admins can delete songs" on public.compositions 
for delete to authenticated 
using ((select role from public.profiles where id = (select auth.uid())) = 'admin');

-- Song Versions
create policy "Admins can delete versions" on public.song_versions 
for delete to authenticated 
using ((select role from public.profiles where id = (select auth.uid())) = 'admin');

-- Setlist Items (Already had delete for all authenticated users in previous schema, strictly speaking setlists owner only should delete, but we leave that for now or tighten it if needed. For now we focus on Songs).

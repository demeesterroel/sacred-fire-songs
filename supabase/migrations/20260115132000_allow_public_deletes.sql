-- Allow anonymous/public users to delete songs (for Mock Mode compatibility)
-- NOTE: This relaxes security to allow development without strict Auth.

-- 1. Compositions
drop policy if exists "Admins can delete songs" on public.compositions;
create policy "Allow public delete compositions" on public.compositions for delete to public using (true);

-- 2. Song Versions (If applicable, though cascade should handle it)
-- Usually cascade handles it, but if policies block the cascade, we might need this.
-- However, standard cascade delete bypasses RLS on child table if foreign key is defined with ON DELETE CASCADE.
-- Let's enable it just in case direct deletion is attempted.
drop policy if exists "Admins can delete versions" on public.song_versions;
create policy "Allow public delete versions" on public.song_versions for delete to public using (true);

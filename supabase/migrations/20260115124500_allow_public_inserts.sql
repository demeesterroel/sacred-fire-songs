-- Allow anonymous/public users to insert new songs (for Mock Mode compatibility)
-- NOTE: This relaxes security to allow development without strict Auth.

-- 1. Compositions
drop policy if exists "Authenticated users can create compositions" on public.compositions;
create policy "Allow public insert compositions" on public.compositions for insert to public with check (true);

-- 2. Song Versions
drop policy if exists "Users can insert versions" on public.song_versions;
create policy "Allow public insert versions" on public.song_versions for insert to public with check (true);

-- 3. Update 'db-schema.sql' reference:
-- (Manually updated in doc/db-schema.sql)

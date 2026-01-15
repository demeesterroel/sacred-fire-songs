-- Allow anonymous/public users to update songs (for Mock Mode compatibility)
-- NOTE: This relaxes security to allow development without strict Auth.
-- CAUTION: This means ANYONE can update ANY song if they have the ID. This is for local development only.

-- 1. Compositions
-- Drop existing restricted policies if they conflict (Supabase policies are additive, so we just add a permissive one)
-- But wait, if RLS is enabled, "public" needs a policy.
-- The existing policies are "TO authenticated".
-- Adding a "TO public" policy is sufficient.

create policy "Allow public update compositions" on public.compositions for update to public using (true);

-- 2. Song Versions
create policy "Allow public update versions" on public.song_versions for update to public using (true);

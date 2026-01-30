-- Migration: Fix Song Versions RLS
-- Triggering CI push to main
Policies for Song Versions -- Date: 2026-01-30
-- Description: Restores INSERT, UPDATE, and DELETE policies for song_versions that were accidentally dropped.
-- 1. INSERT Policy
-- Allow authenticated users to insert versions if they are the contributor
DROP POLICY IF EXISTS "Allow authenticated insert versions" ON public.song_versions;
CREATE POLICY "Allow authenticated insert versions" ON public.song_versions FOR
INSERT TO authenticated WITH CHECK (
    contributor_id = (
      select auth.uid()
    )
  );
-- 2. UPDATE Policy
-- Allow contributors and admins to update versions
DROP POLICY IF EXISTS "Allow contributors and admins to update versions" ON public.song_versions;
CREATE POLICY "Allow contributors and admins to update versions" ON public.song_versions FOR
UPDATE TO authenticated USING (
    contributor_id = (
      select auth.uid()
    )
    OR (
      select role
      from public.profiles
      where id = (
          select auth.uid()
        )
    ) = 'admin'
  ) WITH CHECK (
    contributor_id = (
      select auth.uid()
    )
    OR (
      select role
      from public.profiles
      where id = (
          select auth.uid()
        )
    ) = 'admin'
  );
-- 3. DELETE Policy
-- Allow contributors and admins to delete versions
DROP POLICY IF EXISTS "Allow contributors and admins to delete versions" ON public.song_versions;
CREATE POLICY "Allow contributors and admins to delete versions" ON public.song_versions FOR DELETE TO authenticated USING (
  contributor_id = (
    select auth.uid()
  )
  OR (
    select role
    from public.profiles
    where id = (
        select auth.uid()
      )
  ) = 'admin'
);
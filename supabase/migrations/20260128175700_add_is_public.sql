-- Migration: Add is_public column and update RLS for private song support
-- Date: 2026-01-28

-- 1. Add is_public column to compositions (defaulting to true for legacy compatibility)
ALTER TABLE public.compositions 
ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT true;

-- 2. Update RLS Policies for Compositions to restrict access based on is_public

-- Drop existing "Public compositions are viewable by everyone" if it conflicts, 
-- or we can modify/replace it. We'll drop and recreate to be safe and explicit.
DROP POLICY IF EXISTS "Public compositions are viewable by everyone" ON public.compositions;

-- Re-create: Public read access ONLY if is_public is true
CREATE POLICY "Public compositions are viewable by everyone" 
ON public.compositions FOR SELECT 
USING (is_public = true);

-- Add: Owners can view their own private songs
CREATE POLICY "Owners can view their own songs" 
ON public.compositions FOR SELECT 
TO authenticated 
USING (owner_id = (select auth.uid()));

-- Update Song Versions RLS?
-- If a song is private, the versions should implicitly be private.
-- However, song_versions doesn't have `is_public`. 
-- We can join check or rely on the fact that you can't find the `composition_id` if you can't see the composition?
-- Actually, strict RLS on child table is better.
-- Let's check if we can join `compositions` in the RLS policy for `song_versions`.
-- Supabase RLS allows subqueries.

DROP POLICY IF EXISTS "Public versions are viewable by everyone" ON public.song_versions;

CREATE POLICY "Public versions are viewable by everyone" 
ON public.song_versions FOR SELECT 
USING (
  exists (
    select 1 from public.compositions c 
    where c.id = song_versions.composition_id 
    and c.is_public = true
  )
);

CREATE POLICY "Owners can view their own song versions" 
ON public.song_versions FOR SELECT 
TO authenticated 
USING (
  exists (
    select 1 from public.compositions c 
    where c.id = song_versions.composition_id 
    and c.owner_id = (select auth.uid())
  )
);

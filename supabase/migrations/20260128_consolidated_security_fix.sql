-- Migration: Consolidated Security Fix for Private Songs
-- Date: 2026-01-28

-- 1. Ensure RLS is enabled
ALTER TABLE public.compositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.song_versions ENABLE ROW LEVEL SECURITY;

-- 2. Drop EVERY potentially leaky policy on compositions
DROP POLICY IF EXISTS "Public compositions are viewable by everyone" ON public.compositions;
DROP POLICY IF EXISTS "Allow public read access" ON public.compositions;
DROP POLICY IF EXISTS "Allow public insert compositions" ON public.compositions;
DROP POLICY IF EXISTS "Allow public update compositions" ON public.compositions;
DROP POLICY IF EXISTS "Allow public delete compositions" ON public.compositions;

-- 3. Re-establish SECURE Compositions Policies
-- Public SELECT: ONLY public songs
CREATE POLICY "Public songs are viewable by everyone" 
ON public.compositions FOR SELECT 
TO public 
USING (is_public = true);

-- Auth SELECT: Public songs + Own songs + (Admin: All)
CREATE POLICY "Authenticated users can view appropriate songs" 
ON public.compositions FOR SELECT 
TO authenticated 
USING (
  is_public = true 
  OR owner_id = (select auth.uid()) 
  OR (select role from public.profiles where id = (select auth.uid())) = 'admin'
);

-- Manage: Owners can update/delete their own
CREATE POLICY "Owners can manage their songs" 
ON public.compositions FOR ALL 
TO authenticated 
USING (owner_id = (select auth.uid()))
WITH CHECK (owner_id = (select auth.uid()));

-- Admins: Full access
CREATE POLICY "Admins can manage all songs" 
ON public.compositions FOR ALL 
TO authenticated 
USING ((select role from public.profiles where id = (select auth.uid())) = 'admin');


-- 4. Secure versions too
DROP POLICY IF EXISTS "Public versions are viewable by everyone" ON public.song_versions;
DROP POLICY IF EXISTS "Allow public update versions" ON public.song_versions;
DROP POLICY IF EXISTS "Allow public insert versions" ON public.song_versions;
DROP POLICY IF EXISTS "Allow public delete versions" ON public.song_versions;

CREATE POLICY "Respect composition privacy for versions" 
ON public.song_versions FOR SELECT 
TO public 
USING (
  EXISTS (
    SELECT 1 FROM public.compositions c 
    WHERE c.id = song_versions.composition_id 
    AND c.is_public = true
  )
);

CREATE POLICY "Authenticated users can view appropriate versions" 
ON public.song_versions FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.compositions c 
    WHERE c.id = song_versions.composition_id 
    AND (
      c.is_public = true 
      OR c.owner_id = (select auth.uid())
      OR (select role from public.profiles where id = (select auth.uid())) = 'admin'
    )
  )
);


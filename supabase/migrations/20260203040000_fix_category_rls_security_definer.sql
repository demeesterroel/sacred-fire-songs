-- Migration: Fix RLS for song_category_map using Security Definer
-- Date: 2026-02-03
-- Description: 
-- 1. Creates a security definer function to check song management permissions.
--    This bypasses RLS on the 'compositions' table when checking ownership, 
--    preventing recursion or visibility issues during INSERTs.
-- 2. Cleans up all previous conflicting policies (including name mismatches).
-- 3. Applies strictly defined policies using the helper function.
-- 1. Create Helper Function (Security Definer)
CREATE OR REPLACE FUNCTION public.fn_check_song_manage_access(target_song_id UUID) RETURNS BOOLEAN AS $$
DECLARE is_owner BOOLEAN;
is_admin BOOLEAN;
BEGIN -- Check if user is owner (direct check on compositions, bypassing RLS)
SELECT EXISTS (
    SELECT 1
    FROM public.compositions
    WHERE id = target_song_id
      AND owner_id = auth.uid()
  ) INTO is_owner;
-- Check if user is admin (direct check on profiles, bypassing RLS)
SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
      AND role = 'admin'
  ) INTO is_admin;
RETURN (
  is_owner
  OR is_admin
);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;
-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.fn_check_song_manage_access TO authenticated;
GRANT EXECUTE ON FUNCTION public.fn_check_song_manage_access TO service_role;
-- 2. Clean up ALL previous policies (Known and Potential Mismatches)
DROP POLICY IF EXISTS "Allow public read access" ON public.song_category_map;
DROP POLICY IF EXISTS "Public read access for song_category_map" ON public.song_category_map;
DROP POLICY IF EXISTS "Owners/Admins can insert song categories" ON public.song_category_map;
DROP POLICY IF EXISTS "Owners/Admins can delete song categories" ON public.song_category_map;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.song_category_map;
-- 3. Re-apply Policies
-- SELECT: Public (We want tags to be visible to everyone for search/filtering)
CREATE POLICY "Public read access for song_category_map" ON public.song_category_map FOR
SELECT TO public USING (true);
-- INSERT: Authenticated + Access Check
CREATE POLICY "Owners/Admins can insert song categories" ON public.song_category_map FOR
INSERT TO authenticated WITH CHECK (public.fn_check_song_manage_access(song_id));
-- DELETE: Authenticated + Access Check
CREATE POLICY "Owners/Admins can delete song categories" ON public.song_category_map FOR DELETE TO authenticated USING (public.fn_check_song_manage_access(song_id));
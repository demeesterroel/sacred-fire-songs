-- Apply Supabase suggested fix for Setlists
-- First, drop potential existing overlapping policies to start clean
drop policy if exists "Owners can view their setlists" on public.setlists;
drop policy if exists "Public setlists are viewable by everyone" on public.setlists;
drop policy if exists "Public setlists visible" on public.setlists;

-- Allow anyone (including anon) to read public setlists
CREATE POLICY "Public setlists visible" ON public.setlists
  FOR SELECT
  TO public
  USING (is_public = true);

-- Allow authenticated users to view their own setlists (only applies to authenticated)
CREATE POLICY "Owners can view their setlists" ON public.setlists
  FOR SELECT
  TO authenticated
  USING (owner_id = (SELECT auth.uid()));

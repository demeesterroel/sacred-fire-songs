-- Migration: Enable RLS on compositions and secure it
-- Date: 2026-01-28

-- 1. Enable RLS
ALTER TABLE public.compositions ENABLE ROW LEVEL SECURITY;

-- 2. Drop overly permissive public policies (from dev stage)
DROP POLICY IF EXISTS "Allow public insert compositions" ON public.compositions;
DROP POLICY IF EXISTS "Allow public delete compositions" ON public.compositions;
DROP POLICY IF EXISTS "Allow public update compositions" ON public.compositions;

-- 3. Ensure SELECT policy from previous migration is intact/updated
-- (20260128_add_is_public.sql already added "Public compositions are viewable by everyone")

-- 4. Secure versions too
ALTER TABLE public.song_versions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public update versions" ON public.song_versions;


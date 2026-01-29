-- Migration: Migrate data from 'musician' to 'expert'
-- Date: 2026-01-11 (Part 2)

-- 2. Update existing profiles with 'musician' role to 'expert'
-- This is in a separate migration file to ensure it runs in a separate transaction from the ALTER TYPE
UPDATE public.profiles
SET role = 'expert'
WHERE role = 'musician';

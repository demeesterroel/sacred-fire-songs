-- Migration: Rename 'musician' role to 'expert'
-- Date: 2026-01-11

-- 1. Add 'expert' to the enum (Postgres doesn't support renaming enum values directly easily)
ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'expert' AFTER 'admin';

-- 2. Update existing profiles with 'musician' role to 'expert'
UPDATE public.profiles
SET role = 'expert'
WHERE role = 'musician';

-- NOTE: We cannot easily remove 'musician' from the enum without dropping/recreating the type, 
-- or manually updating pg_catalog. For safety in this migration, we will leave 'musician' 
-- as a legacy value but migrate all data to 'expert'. The database constraint will simply allow both for now.

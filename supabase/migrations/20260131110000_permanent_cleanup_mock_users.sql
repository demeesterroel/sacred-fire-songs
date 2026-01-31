-- Permanent Cleanup: Remove legacy mock users from all environments
-- This script targets the @mock.com pattern to clean Production and Preview data
-- Force trigger deployment
BEGIN;
-- 1. Remove from profiles (public schema)
DELETE FROM public.profiles
WHERE email LIKE '%@mock.com';
-- 2. Remove from auth.users (auth schema)
-- Note: Migrations run with high-level permissions allowing this cleanup
DELETE FROM auth.users
WHERE email LIKE '%@mock.com';
COMMIT;
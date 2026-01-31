-- Permanent Cleanup: Remove legacy mock users from all environments
-- This script targets the @mock.com pattern to clean Production and Preview data
-- Force trigger deployment
BEGIN;
-- 1. Remove compositions and versions owned by mock users
-- This prevents foreign key violations on profiles/users
DELETE FROM public.compositions
WHERE owner_id IN (
    SELECT id
    FROM public.profiles
    WHERE email LIKE '%@mock.com'
  );
-- 2. Remove from profiles (public schema)
DELETE FROM public.profiles
WHERE email LIKE '%@mock.com';
-- 3. Remove from auth.users (auth schema)
DELETE FROM auth.users
WHERE email LIKE '%@mock.com';
COMMIT;
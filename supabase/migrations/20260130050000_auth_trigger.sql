-- Migration: Automate Profile Creation
-- Date: 2026-01-30
-- Description: Creates a trigger to automatically insert a record into public.profiles when an auth.user is created.
-- 1. Create the function that will handle the insertion
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger AS $$ BEGIN
INSERT INTO public.profiles (id, email, role)
VALUES (new.id, new.email, 'member');
-- Default to 'member' role
RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 2. Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER
INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- 3. Backfill: Create profiles for any existing users who are missing one
INSERT INTO public.profiles (id, email, role)
SELECT id,
  email,
  'member'
FROM auth.users
WHERE id NOT IN (
    SELECT id
    FROM public.profiles
  ) ON CONFLICT (id) DO NOTHING;
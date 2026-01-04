-- Migration to update user_role enum
-- Replacing ('admin', 'moderator', 'user') with ('admin', 'musician', 'member')

BEGIN;

-- 1. Create the new enum type
CREATE TYPE user_role_new AS ENUM ('admin', 'musician', 'member');

-- 2. Drop the default value on the column temporarily
ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;

-- 3. Update the column to use the new type with data mapping
-- Maps 'user' -> 'member'
-- Maps 'moderator' -> 'musician'
-- Maps 'admin' -> 'admin'
ALTER TABLE public.profiles 
ALTER COLUMN role TYPE user_role_new 
USING (
  CASE role::text
    WHEN 'user' THEN 'member'::user_role_new
    WHEN 'moderator' THEN 'musician'::user_role_new
    WHEN 'admin' THEN 'admin'::user_role_new
    ELSE 'member'::user_role_new -- Safe fallback
  END
);

-- 4. Drop the old type
DROP TYPE user_role;

-- 5. Rename the new type to the old name
ALTER TYPE user_role_new RENAME TO user_role;

-- 6. Set the new default value
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'member'::user_role;

COMMIT;

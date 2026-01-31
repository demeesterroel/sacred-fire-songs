-- Clean up old mock.com users from profiles
-- These were used for the legacy mock system
DELETE FROM public.profiles
WHERE email IN (
    'admin@mock.com',
    'musician@mock.com',
    'member@mock.com'
  );
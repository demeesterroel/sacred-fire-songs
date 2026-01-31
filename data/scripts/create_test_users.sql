-- Test User Creation Script (Development only)
-- Creates Admin, Musician, and Member roles for testing RLS
-- 1. ADMIn: admin@test.com / password123
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    email_change,
    email_change_confirm_status,
    recovery_token
  )
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@test.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    0,
    ''
  ) ON CONFLICT (id) DO NOTHING;
-- 2. MUSICIAN: musician@test.com / password123
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    email_change,
    email_change_confirm_status,
    recovery_token
  )
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'musician@test.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    0,
    ''
  ) ON CONFLICT (id) DO NOTHING;
-- 3. MEMBER: member@test.com / password123
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    email_change,
    email_change_confirm_status,
    recovery_token
  )
VALUES (
    '00000000-0000-0000-0000-000000000003',
    'member@test.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    0,
    ''
  ) ON CONFLICT (id) DO NOTHING;
-- Ensure profiles exist with correct roles
INSERT INTO public.profiles (id, email, role)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@test.com',
    'admin'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'musician@test.com',
    'musician'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'member@test.com',
    'member'
  ) ON CONFLICT (id) DO
UPDATE
SET role = EXCLUDED.role;
-- Role Assignment Script for Test Users (Development only)
-- Assigns roles to manually created test users
-- 1. ADMIN
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'roel.de.meester+admin@gmail.com';
-- 2. MUSICIAN
UPDATE public.profiles
SET role = 'musician'
WHERE email = 'roel.de.meester+musician@gmail.com';
-- 3. MEMBER
UPDATE public.profiles
SET role = 'member'
WHERE email = 'roel.de.meester+member@gmail.com';
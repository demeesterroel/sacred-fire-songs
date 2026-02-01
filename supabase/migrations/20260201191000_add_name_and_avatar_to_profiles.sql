-- Add full_name and avatar_url to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS avatar_url text;
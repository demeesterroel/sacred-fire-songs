-- Migration: Seed Mock Data for Testing
-- Date: 2026-01-11
-- Description: Inserts mock users (Member, Musician, Admin) and sets up test songs.

-- 1. Insert Mock Users into auth.users (This allows foreign key references in profiles/compositions)
-- Note: inserting directly into auth.users is typically restricted, but in local dev/migrations valid.
INSERT INTO auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'member@mock.com', '$2y$10$MockHashPassword............', now(), now(), now()),
    ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'musician@mock.com', '$2y$10$MockHashPassword............', now(), now(), now()),
    ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@mock.com', '$2y$10$MockHashPassword............', now(), now(), now())
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Mock Profiles
INSERT INTO public.profiles (id, email, role)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'member@mock.com', 'member'),
    ('22222222-2222-2222-2222-222222222222', 'musician@mock.com', 'musician'),
    ('33333333-3333-3333-3333-333333333333', 'admin@mock.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = EXCLUDED.role;

-- 3. Update 'Victory Song' -> 'Victory Member Song' and owner to Mock Member
UPDATE public.compositions
SET 
    title = 'Victory Member Song',
    owner_id = '11111111-1111-1111-1111-111111111111'
WHERE title = 'Victory Song';

-- 4. Create 'Victory Musician Song' for Mock Musician
DO $$
DECLARE
    new_song_id uuid;
BEGIN
    INSERT INTO public.compositions (title, original_author, primary_language, owner_id)
    VALUES ('Victory Musician Song', 'Mock Musician', 'ES', '22222222-2222-2222-2222-222222222222')
    RETURNING id INTO new_song_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro, contributor_id)
    VALUES (new_song_id, 'Standard', '[G] This is a song [D] for the musician!', '22222222-2222-2222-2222-222222222222');
    
    -- Assign to a category (e.g. Medicine Songs)
    INSERT INTO public.song_category_map (song_id, category_id)
    SELECT new_song_id, id FROM public.categories WHERE slug = 'medicine-songs' LIMIT 1;
END $$;

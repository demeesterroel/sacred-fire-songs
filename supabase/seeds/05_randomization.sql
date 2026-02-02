-- Randomization: Assign ownership, visibility, and categories using percentages
DO $$
DECLARE admin_id uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
musician_id uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12';
member_id uuid := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13';
total_songs INTEGER;
member_count INTEGER;
musician_count INTEGER;
admin_count INTEGER;
member_private_count INTEGER;
musician_private_count INTEGER;
admin_private_count INTEGER;
songs_with_tags_count INTEGER;
element_tags_count INTEGER;
language_tags_count INTEGER;
song RECORD;
counter INTEGER := 0;
BEGIN -- Get total song count
SELECT COUNT(*) INTO total_songs
FROM public.compositions;
-- Calculate ownership distribution (40% member, 40% musician, 20% admin)
member_count := FLOOR(total_songs * 0.40);
musician_count := FLOOR(total_songs * 0.40);
admin_count := total_songs - member_count - musician_count;
-- Remaining goes to admin
-- Calculate private song counts (25% of member, 25% of musician, 75% of admin)
member_private_count := FLOOR(member_count * 0.25);
musician_private_count := FLOOR(musician_count * 0.25);
admin_private_count := FLOOR(admin_count * 0.75);
-- Reset all to public first for consistency
UPDATE public.compositions
SET is_public = true,
    owner_id = NULL;
-- Assign ownership to member (40%)
UPDATE public.compositions
SET owner_id = member_id
WHERE id IN (
        SELECT id
        FROM public.compositions
        ORDER BY RANDOM()
        LIMIT member_count
    );
-- Make 25% of member's songs private
UPDATE public.compositions
SET is_public = false
WHERE id IN (
        SELECT id
        FROM public.compositions
        WHERE owner_id = member_id
        ORDER BY RANDOM()
        LIMIT member_private_count
    );
-- Assign ownership to musician (40% of remaining)
UPDATE public.compositions
SET owner_id = musician_id
WHERE owner_id IS NULL
    AND id IN (
        SELECT id
        FROM public.compositions
        WHERE owner_id IS NULL
        ORDER BY RANDOM()
        LIMIT musician_count
    );
-- Make 25% of musician's songs private
UPDATE public.compositions
SET is_public = false
WHERE id IN (
        SELECT id
        FROM public.compositions
        WHERE owner_id = musician_id
        ORDER BY RANDOM()
        LIMIT musician_private_count
    );
-- Assign remaining songs to admin (20%)
UPDATE public.compositions
SET owner_id = admin_id
WHERE owner_id IS NULL;
-- Make 75% of admin's songs private
UPDATE public.compositions
SET is_public = false
WHERE id IN (
        SELECT id
        FROM public.compositions
        WHERE owner_id = admin_id
        ORDER BY RANDOM()
        LIMIT admin_private_count
    );
-- Update song_versions contributor_id to match composition owner_id
UPDATE public.song_versions sv
SET contributor_id = c.owner_id
FROM public.compositions c
WHERE sv.composition_id = c.id;
-- Set has_chords and has_melody flags
-- 20% of songs have chords, and 10% have melody
-- Ensure at least 10 songs have BOTH chords and melody for faceted filtering testing
DECLARE songs_with_chords_count INTEGER;
songs_with_melody_count INTEGER;
songs_with_both_count INTEGER;
BEGIN -- Calculate counts
songs_with_chords_count := FLOOR(total_songs * 0.20);
songs_with_melody_count := FLOOR(total_songs * 0.10);
songs_with_both_count := GREATEST(10, FLOOR(total_songs * 0.05));
-- At least 10 songs with both
-- Reset all flags
UPDATE public.compositions
SET has_chords = false,
    has_melody = false;
-- First, set both flags for songs_with_both_count songs
UPDATE public.compositions
SET has_chords = true,
    has_melody = true
WHERE id IN (
        SELECT id
        FROM public.compositions
        ORDER BY RANDOM()
        LIMIT songs_with_both_count
    );
-- Then set has_chords for additional songs to reach 20% total
UPDATE public.compositions
SET has_chords = true
WHERE id IN (
        SELECT id
        FROM public.compositions
        WHERE has_chords = false
        ORDER BY RANDOM()
        LIMIT (songs_with_chords_count - songs_with_both_count)
    );
-- Finally set has_melody for additional songs to reach 10% total
UPDATE public.compositions
SET has_melody = true
WHERE id IN (
        SELECT id
        FROM public.compositions
        WHERE has_melody = false
        ORDER BY RANDOM()
        LIMIT (songs_with_melody_count - songs_with_both_count)
    );
END;
END $$;
-- Category/Tag Assignment
DO $$
DECLARE total_songs INTEGER;
songs_with_tags_count INTEGER;
element_tags_count INTEGER;
language_tags_count INTEGER;
song RECORD;
element_categories uuid [];
language_categories uuid [];
random_category uuid;
BEGIN -- Get total song count
SELECT COUNT(*) INTO total_songs
FROM public.compositions;
-- Calculate tag distribution
songs_with_tags_count := FLOOR(total_songs * 0.20);
-- 20% of songs should have at least 1 tag
element_tags_count := FLOOR(songs_with_tags_count * 0.40 * 0.25);
-- 40% of tagged songs, 25% get element tags
language_tags_count := FLOOR(songs_with_tags_count * 0.40 * 0.50);
-- 40% of tagged songs, 50% get language tags
-- Get element category IDs (Water, Fire, Earth, Air)
SELECT array_agg(id) INTO element_categories
FROM public.categories
WHERE slug IN ('water', 'fire', 'earth', 'air');
-- Get language category IDs
SELECT array_agg(id) INTO language_categories
FROM public.categories
WHERE slug IN (
        'english',
        'espanol',
        'portuguese',
        'french',
        'german',
        'italian'
    );
-- Assign element tags to calculated percentage of songs
IF element_categories IS NOT NULL
AND array_length(element_categories, 1) > 0 THEN FOR song IN
SELECT id
FROM public.compositions
ORDER BY RANDOM()
LIMIT element_tags_count LOOP -- Assign 1-2 random element tags
    FOR i IN 1..(1 + FLOOR(RANDOM() * 2)) LOOP random_category := element_categories [1 + FLOOR(RANDOM() * array_length(element_categories, 1))];
INSERT INTO public.song_category_map (song_id, category_id)
VALUES (song.id, random_category) ON CONFLICT DO NOTHING;
END LOOP;
END LOOP;
END IF;
-- Assign language tags to calculated percentage of songs
IF language_categories IS NOT NULL
AND array_length(language_categories, 1) > 0 THEN FOR song IN
SELECT id
FROM public.compositions
ORDER BY RANDOM()
LIMIT language_tags_count LOOP -- Assign 1 random language tag
    random_category := language_categories [1 + FLOOR(RANDOM() * array_length(language_categories, 1))];
INSERT INTO public.song_category_map (song_id, category_id)
VALUES (song.id, random_category) ON CONFLICT DO NOTHING;
END LOOP;
END IF;
-- Assign random tags to remaining songs to ensure 20% have at least 1 tag
FOR song IN
SELECT c.id
FROM public.compositions c
    LEFT JOIN public.song_category_map scm ON c.id = scm.song_id
WHERE scm.song_id IS NULL
ORDER BY RANDOM()
LIMIT (
        songs_with_tags_count - element_tags_count - language_tags_count
    ) LOOP -- Assign 1-2 random subcategories
INSERT INTO public.song_category_map (song_id, category_id)
SELECT song.id,
    id
FROM public.categories
WHERE parent_id IS NOT NULL -- Only subcategories (tags)
ORDER BY RANDOM()
LIMIT (1 + FLOOR(RANDOM() * 2)) ON CONFLICT DO NOTHING;
END LOOP;
END $$;
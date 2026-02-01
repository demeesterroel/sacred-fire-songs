-- Seed Random Categories
-- 1. Ensure at least 5 songs have BOTH 'Water' and 'Fire' (for testing multi-tag AND logic)
-- 2. Assigns 2 random subcategories to every other song that doesn't have them
DO $$
DECLARE song RECORD;
water_id UUID;
fire_id UUID;
BEGIN -- Get IDs for specific test tags
SELECT id INTO water_id
FROM public.categories
WHERE slug = 'water'
LIMIT 1;
SELECT id INTO fire_id
FROM public.categories
WHERE slug = 'fire'
LIMIT 1;
-- 1. Assign Water AND Fire to 5 random songs
IF water_id IS NOT NULL
AND fire_id IS NOT NULL THEN FOR song IN
SELECT id
FROM public.compositions
ORDER BY random()
LIMIT 5 LOOP
INSERT INTO public.song_category_map (song_id, category_id)
VALUES (song.id, water_id) ON CONFLICT DO NOTHING;
INSERT INTO public.song_category_map (song_id, category_id)
VALUES (song.id, fire_id) ON CONFLICT DO NOTHING;
END LOOP;
END IF;
-- 2. Assign random tags to all songs (coverage)
FOR song IN
SELECT id
FROM public.compositions LOOP
INSERT INTO public.song_category_map (song_id, category_id)
SELECT song.id,
  id
FROM public.categories
WHERE parent_id IS NOT NULL -- Only link to subcategories (Tags)
ORDER BY random()
LIMIT 2 ON CONFLICT (song_id, category_id) DO NOTHING;
END LOOP;
END $$;
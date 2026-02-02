-- Randomization: Assign random categories/tags
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
    'spanish',
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
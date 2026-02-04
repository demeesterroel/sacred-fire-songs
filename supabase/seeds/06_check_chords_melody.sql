-- Randomization: Set has_chords and has_melody flags
DO $$
DECLARE total_songs INTEGER;
melody_target INTEGER;
both_target INTEGER := 10;
BEGIN
SELECT COUNT(*) INTO total_songs
FROM public.compositions;
melody_target := FLOOR(total_songs * 0.10);
-- 1. Identify songs that ACTUALLY have chords in ChordPro
UPDATE public.compositions c
SET has_chords = EXISTS (
    SELECT 1
    FROM public.song_versions v
    WHERE v.composition_id = c.id
      AND v.content_chordpro ~ '\[[A-G]'
  );
-- 2. Reset has_melody
UPDATE public.compositions
SET has_melody = false;
-- 3. Ensure at least 10 songs have BOTH (for faceted filtering testing)
-- Pick 10 lucky winners from those that actually have chords
UPDATE public.compositions
SET has_melody = true
WHERE id IN (
    SELECT id
    FROM public.compositions
    WHERE has_chords = true
    ORDER BY RANDOM()
    LIMIT both_target
  );
-- 4. Assign remaining melody flags to meet the 10% target
UPDATE public.compositions
SET has_melody = true
WHERE id IN (
    SELECT id
    FROM public.compositions
    WHERE has_melody = false
    ORDER BY RANDOM()
    LIMIT (
        melody_target - (
          SELECT count(*)
          FROM public.compositions
          WHERE has_melody = true
        )
      )
  );
END $$;
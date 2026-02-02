-- Randomization: Assign ownership and visibility using percentages
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
BEGIN -- Get total song count
SELECT COUNT(*) INTO total_songs
FROM public.compositions;
-- Calculate ownership distribution (40% member, 40% musician, 20% admin)
member_count := FLOOR(total_songs * 0.40);
musician_count := FLOOR(total_songs * 0.40);
admin_count := total_songs - member_count - musician_count;
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
END $$;
-- Allow public read access to song_category_map
-- Required for filtering songs by category/tag to work for all users
BEGIN;
-- Policy for song_category_map
CREATE POLICY "Allow public read access" ON public.song_category_map FOR
SELECT TO public USING (true);
COMMIT;
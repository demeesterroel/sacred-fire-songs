-- Script to populate YouTube URLs for the top 10 songs
-- Run this via Supabase SQL Editor or `supabase db reset` seed (if adapted)

-- 1. Abuelitas piedras
UPDATE public.song_versions
SET youtube_url = '2pzlBCq6k64'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Abuelitas piedras');

-- 2. Abuelito Fuego
UPDATE public.song_versions
SET youtube_url = 'yVAi5K84jFk'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Abuelito Fuego');

-- 3. Agradecer
UPDATE public.song_versions
SET youtube_url = 'dTXwgJp-iPw'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Agradecer');

-- 4. Agua cambia
UPDATE public.song_versions
SET youtube_url = 'H3DIEf7bNzs'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Agua cambia');

-- 5. Agüita
UPDATE public.song_versions
SET youtube_url = 'YZHdypgxy14'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Agüita');

-- 6. Aho Gran Espíritu
UPDATE public.song_versions
SET youtube_url = 'NKMV_zVUOyE'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Aho Gran Espíritu');

-- 7. Aho Pacha Mama
UPDATE public.song_versions
SET youtube_url = 'ZE9KR7avpuw'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Aho Pacha Mama');

-- 8. Aquí en la montaña (No URL found - Placeholder)
-- UPDATE public.song_versions
-- SET youtube_url = 'YOUR_YOUTUBE_ID_HERE'
-- WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Aquí en la montaña');

-- 9. Bendice la Tierra
UPDATE public.song_versions
SET youtube_url = 'QXzmdy9myqo'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Bendice la Tierra');

-- 10. Blessed we are
UPDATE public.song_versions
SET youtube_url = 'YiDpIaXQDrI'
WHERE composition_id IN (SELECT id FROM public.compositions WHERE title = 'Blessed we are');

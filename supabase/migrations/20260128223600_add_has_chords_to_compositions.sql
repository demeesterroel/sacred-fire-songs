-- Add has_chords and has_melody columns to compositions
ALTER TABLE public.compositions
ADD COLUMN has_chords boolean DEFAULT false,
ADD COLUMN has_melody boolean DEFAULT false;

-- Data Backfill: Update existing compositions for chords
-- A composition is flagged as 'has_chords' if any of its versions contains 
-- a bracketed chord pattern (e.g., [Am]) or matches a heuristic.
UPDATE public.compositions c
SET has_chords = EXISTS (
    SELECT 1 
    FROM public.song_versions v 
    WHERE v.composition_id = c.id 
    AND v.content_chordpro ~ '\[[A-G]'
);

-- Note: This migration should be run in the Supabase SQL Editor.

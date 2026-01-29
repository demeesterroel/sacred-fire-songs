-- Migration: Fix NULL is_public values for existing songs
-- Date: 2026-01-29
-- Reason: Existing songs might have is_public=NULL if the column creation skipped default backfill.
-- This causes them to be hidden by the RLS policy "is_public = true".

UPDATE public.compositions
SET is_public = true
WHERE is_public IS NULL;

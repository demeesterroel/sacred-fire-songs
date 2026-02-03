-- Migration: Remove primary_language from compositions
ALTER TABLE public.compositions DROP COLUMN IF EXISTS primary_language;
-- Add tuning column to song_versions
ALTER TABLE public.song_versions 
ADD COLUMN IF NOT EXISTS tuning text DEFAULT 'Standard';

comment on column public.song_versions.tuning is 'Guitar tuning for this version (e.g., Standard, Drop D)';

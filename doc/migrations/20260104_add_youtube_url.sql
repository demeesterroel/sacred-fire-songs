-- Add youtube_url column to song_versions table if it doesn't exist
ALTER TABLE public.song_versions 
ADD COLUMN IF NOT EXISTS youtube_url text;

-- Comment on column
COMMENT ON COLUMN public.song_versions.youtube_url IS 'Video ID or URL for YouTube embed';

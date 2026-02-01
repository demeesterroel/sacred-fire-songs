-- Add icon_name column to categories table for Lucide icon support
-- This enables dual-mode icon display: Lucide icons (preferred) or emoji (fallback)
ALTER TABLE public.categories
ADD COLUMN icon_name text;
COMMENT ON COLUMN public.categories.icon_name IS 'Lucide icon component name (e.g., Waves, Leaf). If null, falls back to emoji.';
-- Update existing top-level categories with Lucide icon names
UPDATE public.categories
SET icon_name = 'Waves'
WHERE slug = 'the-elements';
UPDATE public.categories
SET icon_name = 'Leaf'
WHERE slug = 'nature';
UPDATE public.categories
SET icon_name = 'MessageCircle'
WHERE slug = 'languages';
UPDATE public.categories
SET icon_name = 'TreePine'
WHERE slug = 'lineage-tradition';
UPDATE public.categories
SET icon_name = 'FlaskConical'
WHERE slug = 'medicine-healing';
UPDATE public.categories
SET icon_name = 'Sparkles'
WHERE slug = 'spiritual-concepts';
-- Subcategories (tags) will use emojis by default (icon_name remains null)
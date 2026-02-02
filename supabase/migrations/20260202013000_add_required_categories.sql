-- Add required categories and tags to all environments
-- 2026-02-02 01:30:00
DO $$
DECLARE medicine_id UUID;
languages_id UUID;
lineage_id UUID;
BEGIN -- Get parent IDs
SELECT id INTO medicine_id
FROM public.categories
WHERE name = 'Medicine & Healing'
  AND parent_id IS NULL;
SELECT id INTO languages_id
FROM public.categories
WHERE name = 'Languages'
  AND parent_id IS NULL;
SELECT id INTO lineage_id
FROM public.categories
WHERE name = 'Lineage & Tradition'
  AND parent_id IS NULL;
-- Update existing Santo Daime / Umbanda record
UPDATE public.categories
SET name = 'Santo Daime',
  slug = 'santo-daime'
WHERE slug = 'santo-daime-umbanda';
-- Insert Medicine & Healing subcategories
INSERT INTO public.categories (name, slug, emoji, parent_id)
VALUES ('Ayahuasca', 'ayahuasca', '🍵', medicine_id),
  ('Peyote', 'peyote', '🌵', medicine_id),
  ('Rapé', 'rape', '🌬️', medicine_id),
  ('San Pedro', 'san-pedro', '🌵', medicine_id),
  ('Santa Maria', 'santa-maria', '🌿', medicine_id),
  ('Tobacco', 'tobacco', '🍂', medicine_id) ON CONFLICT (slug) DO NOTHING;
-- Insert Languages subcategories
INSERT INTO public.categories (name, slug, emoji, parent_id)
VALUES ('German', 'german', '🇩🇪', languages_id),
  ('Belarusian', 'belarusian', '🇧🇾', languages_id),
  ('Croatian', 'croatian', '🇭🇷', languages_id),
  ('Italian', 'italian', '🇮🇹', languages_id),
  ('Lithuanian', 'lithuanian', '🇱🇹', languages_id),
  ('Russian', 'russian', '🇷🇺', languages_id) ON CONFLICT (slug) DO NOTHING;
-- Insert Lineage & Tradition subcategories
INSERT INTO public.categories (name, slug, emoji, parent_id)
VALUES ('Lakota', 'lakota', '🪶', lineage_id),
  ('Sacred Pipe', 'sacred-pipe', '💨', lineage_id),
  ('Temazcal', 'temazcal', '⛺', lineage_id),
  ('Umbanda', 'umbanda', '🌊', lineage_id) ON CONFLICT (slug) DO NOTHING;
END $$;
-- Rename 'espanol' slug to 'spanish'
UPDATE public.categories
SET slug = 'spanish'
WHERE slug = 'espanol';
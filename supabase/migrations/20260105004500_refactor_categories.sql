-- Refactor Categories Table & Taxonomy
-- Replaces flat 'category_type' with hierarchical 'categories' table
-- Adapts user-provided 'songs' references to 'compositions'

BEGIN;

-- 1. Clean up old schema
DROP TABLE IF EXISTS public.composition_categories CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TYPE IF EXISTS public.category_type CASCADE;
DROP VIEW IF EXISTS public.category_details CASCADE;
DROP VIEW IF EXISTS public.song_with_categories CASCADE;

-- 2. Create new Categories table
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  emoji text,
  flavour_text text,
  parent_id uuid references public.categories(id),
  created_at timestamptz default now()
);

-- 3. Create new Map table (Adapting 'songs' -> 'compositions')
create table public.song_category_map (
  song_id uuid references public.compositions(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  primary key (song_id, category_id)
);

-- 4. Trigger to prevent linking to parent groups
create or replace function public.check_is_subcategory()
returns trigger as $$
begin
  if (select parent_id from public.categories where id = new.category_id) is null then
    raise exception 'Songs can only be linked to subcategories, not parent groups.';
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_check_subcategory
before insert or update on public.song_category_map
for each row execute function public.check_is_subcategory();

-- 5. Seed Data
with groups as (
  insert into public.categories (name, slug, emoji)
  values 
    ('The Elements', 'the-elements', '🌀'),
    ('Nature', 'nature', '🌿'),
    ('Languages', 'languages', '🗣️'),
    ('Lineage & Tradition', 'lineage-tradition', '🌳'),
    ('Medicine & Healing', 'medicine-healing', '🦅'),
    ('Spiritual Concepts', 'spiritual-concepts', '✨')
  returning id, name
)
insert into public.categories (name, slug, emoji, flavour_text, parent_id)
values
-- THE ELEMENTS
('Water', 'water', '💧', 'Songs dedicated to the water element, rivers, and rain.', (select id from groups where name = 'The Elements')),
('Air', 'air', '🌬️', 'Songs for the wind, the breath, and the invisible spirit.', (select id from groups where name = 'The Elements')),
('Fire', 'fire', '🔥', 'Songs for the sacred fire, transformation, and warmth.', (select id from groups where name = 'The Elements')),
('Earth', 'earth', '🌎', 'Songs for Pachamama and the physical grounding of the earth.', (select id from groups where name = 'The Elements')),

-- NATURE
('Animales', 'animales', '🐾', 'Songs dedicated to power animals like the Jaguar and Serpent.', (select id from groups where name = 'Nature')),
('Bird', 'bird', '🦅', 'Melodies for the winged ones, the Condor, and the Eagle.', (select id from groups where name = 'Nature')),
('Plantas', 'plantas', '🍃', 'Songs for specific master plants or general botanical spirits.', (select id from groups where name = 'Nature')),
('Moon', 'moon', '🌙', 'Songs for Mama Quilla and the cycles of the night.', (select id from groups where name = 'Nature')),
('Sun', 'sun', '☀️', 'Songs for Inti and the light of consciousness.', (select id from groups where name = 'Nature')),
('Mountain', 'mountain', '🏔️', 'Hymns for the Apus and the sacred heights.', (select id from groups where name = 'Nature')),
('Selva', 'selva', '🌳', 'Songs emerging from the heart of the jungle.', (select id from groups where name = 'Nature')),

-- LANGUAGES
('Spanish', 'espanol', '🇪🇸', 'Songs written or sung in Spanish.', (select id from groups where name = 'Languages')),
('English', 'english', '🇬🇧', 'Songs written or sung in English.', (select id from groups where name = 'Languages')),
('Quechua / Kichwa', 'quechua-kichwa', '🏔️', 'Traditional Andean songs in the native tongue.', (select id from groups where name = 'Languages')),
('Portuguese', 'portuguese', '🇧🇷', 'Hinos and songs from the Brazilian traditions.', (select id from groups where name = 'Languages')),
('Nahuatl', 'nahuatl', '🏹', 'Ancient songs from the Mexica and Mesoamerican traditions.', (select id from groups where name = 'Languages')),
('Huni Kuin', 'huni-kuin', '🐍', 'Sacred chants in the Hatxa Kuin language.', (select id from groups where name = 'Languages')),

-- LINEAGE & TRADITION
('Andean', 'andean', '🧣', 'Songs from the high mountains and Q''ero traditions.', (select id from groups where name = 'Lineage & Tradition')),
('Amazonian', 'amazonian', '🏹', 'Songs emerging from the Shipibo and Yawanawa lineages.', (select id from groups where name = 'Lineage & Tradition')),
('Native American', 'native-american', '🪶', 'Songs from Northern traditions and the Red Road.', (select id from groups where name = 'Lineage & Tradition')),
('Santo Daime / Umbanda', 'santo-daime-umbanda', '🌟', 'Specific religious spiritual lineages from Brazil.', (select id from groups where name = 'Lineage & Tradition')),
('Traditional', 'traditional', '📜', 'Folk songs passed down through oral tradition.', (select id from groups where name = 'Lineage & Tradition')),

-- MEDICINE & HEALING
('Medicine Songs', 'medicine-songs', '🧪', 'The broad category for songs used in ceremony.', (select id from groups where name = 'Medicine & Healing')),
('Icaros', 'icaros', '🎶', 'Healing chants used by maestros during plant ceremonies.', (select id from groups where name = 'Medicine & Healing')),
('Healing / Limpieza', 'healing-limpieza', '🌿', 'Songs specifically for cleansing the energy field.', (select id from groups where name = 'Medicine & Healing')),
('Protection', 'protection', '🛡️', 'Songs used to create a sacred container or ward off heavy energy.', (select id from groups where name = 'Medicine & Healing')),
('Opening / Closing', 'opening-closing', '🔑', 'Songs used for the start or end of a ritual.', (select id from groups where name = 'Medicine & Healing')),

-- SPIRITUAL CONCEPTS
('Gratitude', 'gratitude', '🙏', 'Songs of thanks and deep appreciation.', (select id from groups where name = 'Spiritual Concepts')),
('Love / Heart', 'love-heart', '💖', 'Songs focused on opening the Anahata heart center.', (select id from groups where name = 'Spiritual Concepts')),
('Plegarias', 'plegarias', '🕯️', 'Devotional prayers and sacred invocations.', (select id from groups where name = 'Spiritual Concepts')),
('Vocalization', 'vocalization', '🗣️', 'Songs focusing on the power of pure voice and tone.', (select id from groups where name = 'Spiritual Concepts')),
('Women', 'women', '♀️', 'Songs celebrating the divine feminine and sisterhood.', (select id from groups where name = 'Spiritual Concepts'));

-- 6. Create Views

-- View: Category Details (for UI display)
create or replace view public.category_details as
select 
  child.id as subcategory_id,
  child.name as subcategory_name,
  child.slug as subcategory_slug,
  child.emoji as subcategory_emoji,
  child.flavour_text,
  parent.name as parent_group_name,
  parent.emoji as parent_emoji,
  concat(child.emoji, ' ', child.name, ' (', parent.emoji, ' ', parent.name, ')') as full_display_name
from public.categories child
join public.categories parent on child.parent_id = parent.id
where child.parent_id is not null;

-- View: Songs with Categories (Adapting 'songs' -> 'compositions')
create or replace view public.song_with_categories as
select 
  s.id as song_id,
  s.title,
  jsonb_agg(
    jsonb_build_object(
      'category', cd.subcategory_name,
      'emoji', cd.subcategory_emoji,
      'parent', cd.parent_group_name
    )
  ) as categories
from public.compositions s
join public.song_category_map scm on s.id = scm.song_id
join public.category_details cd on scm.category_id = cd.subcategory_id
group by s.id, s.title;

-- 7. RLS Policies

alter table public.categories enable row level security;
alter table public.song_category_map enable row level security;

-- Allow anyone (public) to read categories
create policy "Allow public read access"
on public.categories for select
to public
using (true);

-- Allow only authenticated users to manage categories (Insert/Update/Delete)
create policy "Allow admins/members to manage categories"
on public.categories for all
to authenticated
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

COMMIT;

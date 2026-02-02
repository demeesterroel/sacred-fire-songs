const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, '../songs/nina_urku');
const files = fs.readdirSync(songsDir).filter(f => f.endsWith('.pro')).sort();

// Slug mapping for tags found in the .pro files
const tagToSlugMap = {
  // Languages
  'Spanish': 'spanish',
  'English': 'english',
  'Portuguese': 'portuguese',
  'Nahuatl': 'nahuatl',
  'Quechua': 'quechua-kichwa',
  'German': 'german',
  'Italian': 'italian',
  'Russian': 'russian',
  'Belarusian': 'belarusian',
  'Croatian': 'croatian',
  'Lithuanian': 'lithuanian',

  // Elements & Nature
  'Air': 'air',
  'Earth': 'earth',
  'Fire': 'fire',
  'Water': 'water',
  'Selva': 'selva',
  'Mountain': 'mountain',
  'Sun': 'sun',
  'Moon': 'moon',
  'Bird': 'bird',
  'Animales': 'animales',
  'Animal': 'animales',
  'Plants': 'plantas',
  'Medicine Plants': 'plantas',

  // Lineage & Traditions
  'Santo Daime': 'santo-daime',
  'Santa Daime': 'santo-daime',
  'Santa Maria': 'santa-maria',
  'Umbanda': 'umbanda',
  'Lakota': 'lakota',
  'Huni Kuin': 'huni-kuin',
  'Andean': 'andean',
  'Amazonian': 'amazonian',
  'Sacred Pipe': 'sacred-pipe',
  'Temazcal': 'temazcal',
  'Sun Dance': 'danza-del-sol',

  // Medicine
  'Ayahuasca': 'ayahuasca',
  'Peyote': 'peyote',
  'Rapé': 'rape',
  'San Pedro': 'san-pedro',
  'Tobacco': 'tobacco',
  'Icaros': 'icaros',
  'Medicine Songs': 'medicine-songs',
  'Healing': 'healing-limpieza',

  // Other
  'Vocalization': 'vocalization',
  'Women': 'women'
};

let sql = '-- Batch Import of Nina Urku Songs with Category Mapping\n\n';

files.forEach(file => {
  const content = fs.readFileSync(path.join(songsDir, file), 'utf8');

  // Extract title
  const titleMatch = content.match(/\{title:\s*(.*?)\}/i);
  const rawTitle = titleMatch ? titleMatch[1] : file.replace('.pro', '');
  const cleanTitle = rawTitle.trim();

  // Extract artist/author
  const artistMatch = content.match(/\{artist:\s*(.*?)\}/i) || content.match(/\{author:\s*(.*?)\}/i);
  let finalAuthor = artistMatch ? artistMatch[1].trim() : 'Traditional';
  if (finalAuthor === 'Unknown') finalAuthor = 'Traditional';

  // Extract tags
  const tagMatches = [...content.matchAll(/\{tag:\s*(.*?)\}/gi)];
  const tags = tagMatches.map(m => m[1].trim());

  // Escape single quotes
  const escapedTitle = cleanTitle.replace(/'/g, "''");
  const escapedAuthor = finalAuthor.replace(/'/g, "''");
  const escapedContent = content.replace(/'/g, "''");

  sql += `
-- Song: ${cleanTitle}
DO $$
DECLARE
    comp_id uuid;
BEGIN
    -- Insert composition
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('${escapedTitle}', '${escapedAuthor}') 
    RETURNING id INTO comp_id;

    -- Insert standard version
    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '${escapedContent}');

    -- Map categories
`;

  tags.forEach(tag => {
    const slug = tagToSlugMap[tag];
    if (slug) {
      sql += `    -- Tag: ${tag}
    INSERT INTO public.song_category_map (song_id, category_id)
    SELECT comp_id, id FROM public.categories WHERE slug = '${slug}';
`;
    } else {
      sql += `    -- Warning: No mapping for tag "${tag}"\n`;
    }
  });

  sql += `END $$;\n`;
});

process.stdout.write(sql);

const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, '../data/songs');
const files = fs.readdirSync(songsDir).filter(f => f.endsWith('.cho')).sort();

// Researched author mapping
const authorMap = {
    "Abuelitas piedras": "Traditional (Maria Valdivia)",
    "Abuelito Fuego": "Traditional (Camino Rojo)",
    "Agradecer": "Traditional",
    "Agua cambia": "Traditional",
    "Aho Gran Espíritu": "Traditional",
    "Aho Pacha Mama": "Traditional",
    "Bendice la Tierra": "Traditional",
    "Blessed we are": "Peia",
    "Brilla Diamante": "Traditional",
    "Caboclo": "Traditional (Umbanda)",
    "Calling": "Traditional",
    "Canto enamorado del pájaro": "Traditional",
    "Colhendo lírio lirulê": "Traditional",
    "Core core": "Traditional",
    "Cuatro Vientos": "Danit",
    "Down to the river": "Traditional (Spiritual)",
    "Earth Water Blood": "Traditional",
    "Espíritu del agua": "Traditional",
    "Eu sou Santa Maria": "Traditional (Santo Daime)",
    "Florecerá": "Traditional",
    "Fly - little bird": "Traditional",
    "Gitsi Gitsi Manitou": "Traditional",
    "Hey yamayo": "Curawaka",
    "Ide were were": "Traditional (Yoruba)",
    "Inan Tonanzin": "Traditional (Nahuatl)",
    "L'albero": "Dario Hampi Pakari",
    "Luz divina": "Traditional",
    "Medicina Lapitoj": "Coral Herencia",
    "Mother I Feel You": "Traditional",
    "Mother I Honor You": "Traditional",
    "Pachamama": "Traditional",
    "Queen of the web": "Traditional",
    "Salve salve mama Oxun": "Traditional (Umbanda)",
    "Salve Rainha do Mar": "João de Angola",
    "Siento la medica": "Traditional",
    "Sou Filho de Deus": "Traditional (Santo Daime)",
    "Tamborcito": "Traditional",
    "Tonantzin tzin tzin": "Traditional (Nahuatl)",
    "Ven ven": "Traditional",
    "Vuela": "Traditional",
    "Weyo wey yanna": "Traditional",
    "Wichita tuya": "Traditional (Lakota)"
};

let sql = '-- Batch Import of ChordPro Songs with Researched Authors\n\n';

files.forEach(file => {
    const content = fs.readFileSync(path.join(songsDir, file), 'utf8');

    // Extract title from tag or filename
    let titleMatch = content.match(/\{title:\s*(.*?)\}/i);
    let rawTitle = titleMatch ? titleMatch[1] : file.replace('.cho', '');
    let cleanTitle = rawTitle.replace(/^\d+[\.\s]*/, '').trim();

    // Determine author (prioritize mapping, then tags)
    let authorMatch = content.match(/\{artist:\s*(.*?)\}/i) || content.match(/\{composer:\s*(.*?)\}/i);
    let authorTag = authorMatch ? authorMatch[1].trim() : null;
    let finalAuthor = authorMap[cleanTitle] || authorTag || 'Traditional';

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
    INSERT INTO public.compositions (title, original_author) 
    VALUES ('${escapedTitle}', '${escapedAuthor}') 
    RETURNING id INTO comp_id;

    INSERT INTO public.song_versions (composition_id, version_name, content_chordpro)
    VALUES (comp_id, 'Standard', '${escapedContent}');
END $$;
`;
});

console.log(sql);

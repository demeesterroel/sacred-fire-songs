import ChordSheetJS from 'chordsheetjs';

export function parseChordPro(content: string) {
    const parser = new ChordSheetJS.ChordProParser();
    const song = parser.parse(content);

    // We'll return the lines so we can map over them in React
    return song.lines;
}
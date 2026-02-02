import ChordSheetJS from 'chordsheetjs';

import { convertChordsOverLyricsToChordPro } from './chordProParsing';

export function parseChordProForDisplay(content: string) {
    const parser = new ChordSheetJS.ChordProParser();
    const chordProContent = convertChordsOverLyricsToChordPro(content);

    try {
        const song = parser.parse(chordProContent);

        // We'll return the lines so we can map over them in React, but we filter out metadata
        // lines that are purely directives (like {title}) as they create empty space.
        return song.lines.filter(line => {
            return line.items.some((item: any) =>
                (item.lyrics && item.lyrics.trim().length > 0) || item.chords
            );
        });
    } catch (error) {
        console.error('Error parsing ChordPro content:', error);
        // Fallback: return a simple "raw" representation or empty lines if parsing fails completely
        return [];
    }
}
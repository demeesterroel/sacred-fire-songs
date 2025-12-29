// lib/songUtils.ts

/**
 * Filters a list of songs by title or author (case-insensitive)
 */
export function filterSongs(songs: any[], query: string) {
    const lowerQuery = query.toLowerCase();

    return songs.filter(song =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.author.toLowerCase().includes(lowerQuery)
    );
}
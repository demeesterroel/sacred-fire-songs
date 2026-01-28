// lib/songUtils.ts
export interface Song {
    id: string;
    title: string;
    author: string;
    songKey: string | null;
    color: string;
    isPublic?: boolean;
}
/**
 * Filters a list of songs by title or author (case-insensitive)
 */
export function filterSongs(songs: Song[], query: string) {
    const lowerQuery = query.toLowerCase();

    return songs.filter(song =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.author.toLowerCase().includes(lowerQuery)
    );
}
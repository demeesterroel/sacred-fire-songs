import { createClient } from "./supabase/client";

// lib/songUtils.ts
export interface Song {
    id: string;
    title: string;
    author: string;
    songKey: string | null;
    color: string;
    isPublic?: boolean;
    content?: string; // ChordPro content for searching
    createdAt: string;
}

/**
 * Filters a list of songs by title, author, or content (case-insensitive)
 */
export function filterSongs(songs: Song[], query: string) {
    const lowerQuery = query.toLowerCase();

    return songs.filter(song =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.author.toLowerCase().includes(lowerQuery) ||
        (song.content && song.content.toLowerCase().includes(lowerQuery))
    );
}

/**
 * Shared song fetching logic
 */
export const fetchSongs = async (limit?: number) => {
    const supabase = createClient();
    let query = supabase
        .from('compositions')
        .select('*, song_versions(key, content_chordpro)')
        .order('created_at', { ascending: false });

    if (limit) {
        query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.map(item => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const version = (item.song_versions as any[])?.[0];
        return {
            id: item.id,
            title: item.title,
            author: item.original_author || "Unknown",
            songKey: version?.key || null,
            content: version?.content_chordpro || "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            isPublic: (item as any).is_public ?? true,
            createdAt: item.created_at,
            color: "red"
        } as Song;
    });
};
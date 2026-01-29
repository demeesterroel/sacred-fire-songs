import { createClient } from "./supabase/client";

// lib/songUtils.ts
export interface Song {
    id: string;
    title: string;
    author: string;
    songKey: string | null;
    color: string;
    isPublic?: boolean;
    hasChords?: boolean;
    hasMelody?: boolean;
    content?: string; // ChordPro content for searching
    createdAt: string;
    isFavorite?: boolean;
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

    const { data: compositions, error } = await query;

    if (error) throw error;

    // Fetch favorites for current user if applicable
    let favoriteSongIds: Set<string> = new Set();
    const { data: authData } = await supabase.auth.getUser();
    const user = authData?.user;

    if (user) {
        const { data: favorites } = await supabase
            .from('setlists')
            .select('setlist_items(song_version_id)')
            .eq('owner_id', user.id)
            .eq('title', 'My Favorites')
            .maybeSingle();

        if (favorites?.setlist_items) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (favorites.setlist_items as any[]).forEach(item => {
                favoriteSongIds.add(item.song_version_id);
            });
        }
    }

    return (compositions as any[]).map(item => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const version = (item.song_versions as any[])?.[0];
        const isFav = version ? favoriteSongIds.has(version.id) : false;

        return {
            id: item.id,
            title: item.title,
            author: item.original_author || "Unknown",
            songKey: version?.key || null,
            content: version?.content_chordpro || "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            isPublic: item.is_public ?? true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            hasChords: item.has_chords ?? false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            hasMelody: item.has_melody ?? false,
            createdAt: item.created_at,
            isFavorite: isFav,
            color: "red"
        } as Song;
    });
};
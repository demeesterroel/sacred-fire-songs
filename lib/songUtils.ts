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
 * Optimized for performance and resilience.
 */
export const fetchSongs = async (limit?: number, userId?: string) => {
    const supabase = createClient();

    try {
        // Fetch Compositions and Versions
        // Note: For large libraries, we might want to exclude 'content_chordpro' in the list view
        // but for now we keep it to support client-side lyric search.
        const { data: compositions, error } = await supabase
            .from('compositions')
            .select(`
                id,
                title,
                original_author,
                is_public,
                has_chords,
                has_melody,
                created_at,
                song_versions (
                    id,
                    key,
                    content_chordpro
                )
            `)
            .order('created_at', { ascending: false })
            .limit(limit || 100);

        if (error) throw error;
        if (!compositions) return [];

        // 2. Fetch favorites for current user if applicable
        let favoriteVersionIds: Set<string> = new Set();

        if (userId) {
            const { data: favorites } = await supabase
                .from('setlist_items')
                .select('song_version_id, setlists!inner(title, owner_id)')
                .eq('setlists.title', 'My Favorites')
                .eq('setlists.owner_id', userId);

            if (favorites) {
                (favorites as any[]).forEach(item => {
                    if (item.song_version_id) {
                        favoriteVersionIds.add(item.song_version_id);
                    }
                });
            }
        }

        // 3. Map to Song interface
        return (compositions as any[]).map(item => {
            const versions = item.song_versions || [];
            const version = Array.isArray(versions) ? versions[0] : versions;
            const isFav = version?.id ? favoriteVersionIds.has(version.id) : false;

            return {
                id: item.id,
                title: item.title,
                author: item.original_author || "Unknown",
                songKey: version?.key || null,
                content: version?.content_chordpro || "",
                isPublic: item.is_public ?? true,
                hasChords: item.has_chords ?? false,
                hasMelody: item.has_melody ?? false,
                createdAt: item.created_at,
                isFavorite: isFav,
                color: "red"
            } as Song;
        });

    } catch (err) {
        console.error("[fetchSongs] Fatal error:", err);
        return [];
    }
};
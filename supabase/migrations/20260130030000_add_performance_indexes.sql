-- Migration: Add missing indices on foreign keys for performance
-- Date: 2026-01-30
-- Description: Adds indexes to foreign key columns that were flagged by performance analysis to prevent sequential scans during joins.
-- 1. Categories (parent_id)
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON public.categories(parent_id);
-- 2. Song Versions (composition_id, contributor_id)
CREATE INDEX IF NOT EXISTS idx_song_versions_composition_id ON public.song_versions(composition_id);
CREATE INDEX IF NOT EXISTS idx_song_versions_contributor_id ON public.song_versions(contributor_id);
-- 3. Setlists (owner_id)
CREATE INDEX IF NOT EXISTS idx_setlists_owner_id ON public.setlists(owner_id);
-- 4. Setlist Items (setlist_id, song_version_id)
-- These are critical for joining setlists to songs
CREATE INDEX IF NOT EXISTS idx_setlist_items_setlist_id ON public.setlist_items(setlist_id);
CREATE INDEX IF NOT EXISTS idx_setlist_items_song_version_id ON public.setlist_items(song_version_id);
-- 5. Song Category Map (song_id, category_id)
-- Note: Primary key (song_id, category_id) already covers queries filtering by both or just song_id.
-- But we need an index on category_id for "Find all songs in this category"
CREATE INDEX IF NOT EXISTS idx_song_category_map_category_id ON public.song_category_map(category_id);
-- 6. Compositions (owner_id)
-- Identified via grep: 20260110180000_expand_permissions.sql added owner_id references profiles(id)
CREATE INDEX IF NOT EXISTS idx_compositions_owner_id ON public.compositions(owner_id);
-- End of migration
/**
 * Sacred Fire Songs - Data Contract
 * These interfaces map to the Supabase database schema and UI requirements.
 */

export type UserRole = 'admin' | 'expert' | 'member';

export type CategoryType = 'Theme' | 'Rhythm' | 'Origin';

export interface UserProfile {
  id: string; // UUID
  email: string;
  role: UserRole;
  created_at: string; // ISO Date String
}

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  created_at: string;
}

export interface Composition {
  id: string;
  title: string;
  original_author?: string | null; // Optional because often unknown for medicine songs
  primary_language: string;
  created_at: string;
  // Relations (populated via joins)
  categories?: Category[];
}

export interface CompositionCategory {
  composition_id: string;
  category_id: string;
}

export interface SongVersion {
  id: string;
  composition_id: string; // Foreign Key -> Composition
  version_name: string; // Default: 'Standard'
  content_chordpro: string;
  melody_notation?: string | null; // ABC Notation (Phase 2)
  key?: string | null; // e.g., 'Am'
  capo: number;
  tuning?: string | null; // Added v2.4 (e.g. 'Standard', 'Drop D')
  audio_url?: string | null;
  youtube_url?: string | null;
  contributor_id?: string | null; // Foreign Key -> UserProfile
  vote_count: number;
  created_at: string;
}

export interface Setlist {
  id: string;
  owner_id: string;
  title: string;
  description?: string | null;
  is_public: boolean;
  created_at: string;
  // Nested items for easier UI consumption
  items?: SetlistItem[];
}

export interface SetlistItem {
  id: string;
  setlist_id: string;
  song_version_id: string;
  order_index: number;
  transposition_override?: number | null;
  created_at: string;
  // Reference to the actual song version when fetched
  song_version?: SongVersion;
}

// UI Helper Interfaces
// For MVP (Phase 1), we often need a "Populated" song object for the UI
// effectively joining Composition + The Default Version
export interface SongUI {
  id: string; // composition_id
  title: string;
  author: string;
  version_id: string;
  key: string;
  content: string; // chordpro
}

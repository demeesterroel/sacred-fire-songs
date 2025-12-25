/**
 * Camino Rojo - Data Contract
 * These interfaces map directly to our Supabase database schema.
 */

export type UserRole = 'admin' | 'moderator' | 'user';
export type CategoryType = 'Theme' | 'Rhythm' | 'Origin';

export interface UserProfile {
  id: string; // UUID String
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
  original_author?: string | null;
  primary_language: string;
  created_at: string;
  // This will populated in the app via join tables
  categories?: Category[];
}

export interface SongVersion {
  id: string;
  composition_id: string;
  version_name: string;
  content_chordpro: string;
  melody_notation?: string | null; // ABC Notation
  key?: string | null;
  capo: number;
  audio_url?: string | null;
  contributor_id?: string | null;
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

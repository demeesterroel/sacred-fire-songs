'use client';

import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";
import SongCardSkeleton from "@/components/home/SongCardSkeleton";
import { useState } from "react";
import { filterSongs } from "@/lib/songUtils";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "@/hooks/useAuth";

// Pure async function, reusable and testable
const fetchSongs = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('compositions')
    .select('*, song_versions(key)')
    .order('title');

  if (error) throw error;

  return data.map(item => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const version = (item.song_versions as any[])?.[0];
    return {
      id: item.id,
      title: item.title,
      author: item.original_author || "Unknown",
      songKey: version?.key || null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      isPublic: (item as any).is_public ?? true, // Default to true if missing
      color: "red"
    };
  });
};

type FilterType = 'all' | 'public' | 'private';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { user } = useAuth();

  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: fetchSongs,
  });

  // 1. Text Search Filter
  let displaySongs = filterSongs(songs, searchQuery);

  // 2. Tab Filter
  if (user) {
    if (activeFilter === 'public') {
      displaySongs = displaySongs.filter(song => song.isPublic);
    } else if (activeFilter === 'private') {
      displaySongs = displaySongs.filter(song => !song.isPublic);
    }
  } else {
    // Guest: Always filter out private songs
    displaySongs = displaySongs.filter(song => song.isPublic);
  }

  return (
    <main className="flex-1 min-h-0 bg-gray-950">

      {/* Dashboard Widgets Area */}
      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">

        {/* Header & Search */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-white tracking-tight hidden md:block">Dashboard</h2>

            {/* Auth-only Filters */}
            {user && (
              <div className="flex p-1 bg-gray-900 rounded-lg border border-gray-800 self-start md:self-auto">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'all' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('public')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'public' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  Public
                </button>
                <button
                  onClick={() => setActiveFilter('private')}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeFilter === 'private' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                >
                  Private
                </button>
              </div>
            )}
          </div>

          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Quick Stats / Actions (Desktop Only for now, or adapted) */}
        <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900/50 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3 group-hover:bg-red-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music w-5 h-5 text-red-500"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
            </div>
            <h3 className="font-bold text-white">Browse Songs</h3>
            <p className="text-xs text-gray-500 mt-1">{songs.length} tracks</p>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-cloud w-5 h-5 text-blue-500"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M12 12v9" /><path d="m16 16-4-4-4 4" /></svg>
            </div>
            <h3 className="font-bold text-white">Upload Song</h3>
            <p className="text-xs text-gray-500 mt-1">Add new</p>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 group-hover:bg-amber-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star w-5 h-5 text-amber-500"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <h3 className="font-bold text-white">Favorites</h3>
            <p className="text-xs text-gray-500 mt-1">12 saved</p>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gray-500/10 flex items-center justify-center mb-3 group-hover:bg-gray-500/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings w-5 h-5 text-gray-400"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <h3 className="font-bold text-white">Settings</h3>
            <p className="text-xs text-gray-500 mt-1">Preferences</p>
          </div>
        </div>

        {/* Song List Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-white">Recent Additions</h3>
            <button className="text-xs font-bold text-red-500 hover:text-red-400 uppercase tracking-wider">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <SongCardSkeleton key={i} />
                ))}
              </>
            ) : displaySongs.length > 0 ? (
              displaySongs.map((song, index) => (
                <SongCard
                  key={index}
                  id={song.id}
                  title={song.title}
                  author={song.author}
                  songKey={song.songKey}
                  accentColor={song.color}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 pt-10">No songs found for this filter.</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );

}
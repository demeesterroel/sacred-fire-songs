'use client';

import Header from "@/components/common/Header";
import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";
import { useState, useEffect } from "react"; // Added useEffect
import { filterSongs } from "@/lib/songUtils";
import { supabase } from "@/lib/supabase"; // Import our new connection
import { Song } from "@/lib/songUtils";
import SongCardSkeleton from "@/components/home/SongCardSkeleton";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]); // Real data starts empty
  const [loading, setLoading] = useState(true);

  // FETCH LOGIC
  useEffect(() => {
    async function fetchSongs() {
      setLoading(true);
      const { data, error } = await supabase
        .from('compositions')
        .select('*')
        .order('title');

      if (!error && data) {
        // Map the DB fields to the props our SongCard expects
        const formatted = data.map(item => ({
          id: item.id,
          title: item.title,
          author: item.original_author || "Unknown",
          songKey: "Am", // Note: We'll fetch real keys in Phase 2
          color: "red"   // Note: We'll add real colors soon
        }));
        setSongs(formatted);
      }
      setLoading(false);
    }

    fetchSongs();
  }, []);

  // Use the 'songs' state instead of mock data
  const filteredSongs = filterSongs(songs, searchQuery);

  return (
    <>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <main className="flex-1 p-5 space-y-4 pb-32 overflow-y-auto hide-scroll scroll-smooth min-h-0">
        {loading ? (
          <>
            {[...Array(5)].map((_, i) => (
              <SongCardSkeleton key={i} />
            ))}
          </>
        ) : filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
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
          <p className="text-center text-gray-400 pt-10">No songs found</p>
        )}
      </main>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-20" />
    </>
  );
}
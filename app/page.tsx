'use client';

import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";
import SongCardSkeleton from "@/components/home/SongCardSkeleton";
import { useState } from "react";
import { filterSongs } from "@/lib/songUtils";
import { supabase } from "@/lib/supabase";
import { useQuery } from '@tanstack/react-query'; // The new superpower

// Pure async function, reusable and testable
const fetchSongs = async () => {
  const { data, error } = await supabase
    .from('compositions')
    .select('*')
    .order('title');

  if (error) throw error;

  return data.map(item => ({
    id: item.id,
    title: item.title,
    author: item.original_author || "Unknown",
    songKey: "Am",
    color: "red"
  }));
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // 1 line of code handles: loading, data, caching, background updates
  const { data: songs = [], isLoading } = useQuery({
    queryKey: ['songs'], // The unique ID for this cache
    queryFn: fetchSongs,
  });

  const filteredSongs = filterSongs(songs, searchQuery);

  return (
    <>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <main className="flex-1 p-5 space-y-4 pb-32 overflow-y-auto hide-scroll scroll-smooth min-h-0">
        {isLoading ? (
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
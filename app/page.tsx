'use client';

import Header from "@/components/common/Header";
import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";
import { useState } from "react";
import { filterSongs } from "@/lib/songUtils";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const mockSongs = [
    { title: "Grandmother Earth", author: "Traditional", songKey: "Am", color: "red" },
    { title: "Aguita de la Vida", author: "Danit", songKey: "Em", color: "orange" },
    { title: "Pachamama", author: "Medicine Family", songKey: "G", color: "yellow" },
    { title: "Water Spirit", author: "Nalini Blossom", songKey: "Dm", color: "blue" },
    { title: "Cuatro Vientos", author: "Danit", songKey: "Am", color: "purple" },
  ];

  // Step 3.1: Create the filtered list
  const filteredSongs = filterSongs(mockSongs, searchQuery);

  return (
    <div className="min-h-screen bg-black flex justify-center selection:bg-red-500/30">
      {/* Phone Frame */}
      <div className="w-full max-w-[420px] bg-gray-900 min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
        <Header />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <main className="flex-1 p-5 space-y-4 pb-32 overflow-y-auto hide-scroll scroll-smooth">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <SongCard
                key={index}
                title={song.title}
                author={song.author}
                songKey={song.songKey}
                accentColor={song.color}
              />
            ))) : (
            <p className="text-center text-gray-400 pt-10">No songs found</p>
          )}
        </main>

        {/* Bottom Fade - Gradient Overlay for Premium Feel */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-20" />
      </div>
    </div>
  );
}

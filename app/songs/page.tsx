'use client';

import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";
import SongCardSkeleton from "@/components/home/SongCardSkeleton";
import { useState } from "react";
import { filterSongs, fetchSongs } from "@/lib/songUtils";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "@/hooks/useAuth";

type FilterType = 'all' | 'public' | 'private';
type SortByType = 'title' | 'newest';

export default function SongsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [sortBy, setSortBy] = useState<SortByType>('title');
    const { user } = useAuth();

    const { data: songs = [], isLoading } = useQuery({
        queryKey: ['songs', 'all'],
        queryFn: () => fetchSongs(), // Fetch all songs
    });

    // 1. Text Search Filter (includes Title, Author, and Content)
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

    // 3. Sorting Logic
    displaySongs = [...displaySongs].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
    });

    return (
        <main className="flex-1 min-h-0 bg-gray-950">
            <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
                {/* Header & Controls */}
                <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <h2 className="text-3xl font-bold text-white tracking-tight">Browse Songs</h2>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Sort Controls */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sort by:</span>
                                <div className="flex p-1 bg-gray-900 rounded-lg border border-gray-800">
                                    <button
                                        onClick={() => setSortBy('title')}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${sortBy === 'title' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Title
                                    </button>
                                    <button
                                        onClick={() => setSortBy('newest')}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${sortBy === 'newest' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Newest
                                    </button>
                                </div>
                            </div>

                            <div className="h-4 w-px bg-gray-800 hidden sm:block"></div>

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
                    </div>

                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>

                {/* Song List */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {isLoading ? (
                            <>
                                {[...Array(12)].map((_, i) => (
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
                                    isPublic={song.isPublic}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 px-4">
                                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-900 border border-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-gray-600 w-8 h-8"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">No songs found</h3>
                                <p className="text-gray-400 max-w-xs mx-auto">
                                    {searchQuery ? `We couldn't find any songs matching "${searchQuery}".` : "There are no songs available for this filter."}
                                </p>
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="mt-6 text-red-500 hover:text-red-400 font-medium transition-colors"
                                    >
                                        Clear search
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

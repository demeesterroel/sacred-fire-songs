'use client';

import SearchBar from "@/components/home/SearchBar";
import SongCard from "@/components/home/SongCard";
import SongCardSkeleton from "@/components/home/SongCardSkeleton";
import { Music, Guitar, ChevronUp, ChevronDown } from "lucide-react";
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
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showOnlyChords, setShowOnlyChords] = useState(false);
    const [showOnlyMelody, setShowOnlyMelody] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const { user } = useAuth();

    const { data: songs = [], isLoading } = useQuery({
        queryKey: ['songs', 'all', user?.id],
        queryFn: () => fetchSongs(undefined, user?.id), // Fetch all songs with user favorites
    });

    const handleSortClick = (newSortBy: SortByType) => {
        if (newSortBy === sortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            // Default to 'asc' for title, 'desc' for newest
            setSortOrder(newSortBy === 'newest' ? 'desc' : 'asc');
        }
    };

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

    // 3. Chord & Melody Filters
    if (showOnlyChords) {
        displaySongs = displaySongs.filter(song => song.hasChords);
    }
    if (showOnlyMelody) {
        displaySongs = displaySongs.filter(song => song.hasMelody);
    }
    if (showFavorites) {
        displaySongs = displaySongs.filter(song => song.isFavorite);
    }

    // 4. Sorting Logic
    displaySongs = [...displaySongs].sort((a, b) => {
        let result = 0;
        if (sortBy === 'title') {
            result = a.title.localeCompare(b.title);
        } else {
            result = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            // Since default for 'newest' is DESC (b-a), we invert logic for the multiplier
            // but actually let's keep it simple: 
            // if we want 'newest' (DESC) by default, and result is (b - a):
            // 'asc' order means b - a > 0 (b is newer, stays at top) -> this is DESC naturally.
            // Let's redefine: sortBy 'newest' normally means latest at top.
        }

        const multiplier = sortOrder === 'asc' ? 1 : -1;

        // For 'newest', the base comparison (b-a) is already descending.
        // If sortOrder is 'asc', we want newest at top (the default b-a result).
        // If sortOrder is 'desc', we want oldest at top.
        // Wait, standard convention: ASC = Oldest first, DESC = Newest first.
        // Let's fix the comparison to be a-b (ASC), then multiply.

        if (sortBy === 'title') {
            return a.title.localeCompare(b.title) * multiplier;
        } else {
            // Newest: a-b is Oldest First (ASC)
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return (timeA - timeB) * multiplier;
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
                                        onClick={() => handleSortClick('title')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${sortBy === 'title' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Title
                                        {sortBy === 'title' && (
                                            sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleSortClick('newest')}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${sortBy === 'newest' ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Newest
                                        {sortBy === 'newest' && (
                                            sortOrder === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                                        )}
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
                                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeFilter === 'private'
                                            ? 'bg-black/40 border border-dashed border-white/20 text-gray-300 shadow-sm'
                                            : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        Private
                                    </button>
                                </div>
                            )}
                            {/* Chord, Melody & Favorites Filter Toggles */}
                            <div className="flex items-center gap-2">
                                {user && (
                                    <button
                                        onClick={() => setShowFavorites(!showFavorites)}
                                        className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${showFavorites
                                            ? 'bg-red-500/20 text-red-500 border-red-500/30'
                                            : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200'
                                            }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={showFavorites ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                                        Favorites
                                    </button>
                                )}

                                <button
                                    onClick={() => setShowOnlyChords(!showOnlyChords)}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${showOnlyChords
                                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200'
                                        }`}
                                >
                                    <Guitar className={`w-3.5 h-3.5 ${showOnlyChords ? 'text-amber-400' : 'text-gray-500'}`} />
                                    Chords
                                </button>

                                <button
                                    onClick={() => setShowOnlyMelody(!showOnlyMelody)}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${showOnlyMelody
                                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200'
                                        }`}
                                >
                                    <Music className={`w-3.5 h-3.5 ${showOnlyMelody ? 'text-emerald-400' : 'text-gray-500'}`} />
                                    Melody
                                </button>
                            </div>

                            <div className="h-4 w-px bg-gray-800 hidden lg:block"></div>
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
                                    hasChords={song.hasChords}
                                    hasMelody={song.hasMelody}
                                    isFavorite={song.isFavorite}
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

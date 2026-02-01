'use client';

import SongCard from "@/components/home/SongCard";
import SongCardSkeleton from "@/components/home/SongCardSkeleton";
import { Music, Guitar, ChevronDown, Flame, Search, X, Plus } from "lucide-react";
import { useState } from "react";
import { filterSongs, fetchSongs } from "@/lib/songUtils";
import { useQuery } from '@tanstack/react-query';
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCategoryColor, getCategoryStyles } from "@/lib/uiUtils";

type FilterType = 'all' | 'public' | 'private';
type SortByType = 'title' | 'newest';

export default function SongsPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCategory = searchParams.get('category') || undefined;
    const activeTag = searchParams.get('tag') || undefined;

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [sortBy, setSortBy] = useState<SortByType>('newest');
    const [showOnlyChords, setShowOnlyChords] = useState(false);
    const [showOnlyMelody, setShowOnlyMelody] = useState(false);
    const { user } = useAuth();

    const { data: songs = [], isLoading } = useQuery({
        queryKey: ['songs', 'all'],
        queryFn: () => fetchSongs(), // Fetch all songs
    });

    // 1. Filter Songs (Search + Tags + Categories)
    let displaySongs = filterSongs(songs, searchQuery, 'all', {
        tag: activeTag,
        category: activeCategory
    });

    // 2. Tab Filter (Public/Draft)
    if (user) {
        if (activeFilter === 'public') {
            displaySongs = displaySongs.filter(song => song.isPublic);
        } else if (activeFilter === 'draft') {
            displaySongs = displaySongs.filter(song => !song.isPublic);
        }
    } else {
        // Guest: Always filter out non-public (draft) songs
        displaySongs = displaySongs.filter(song => song.isPublic);
    }


    // 3. Chord & Melody Filters
    if (showOnlyChords) {
        displaySongs = displaySongs.filter(song => song.hasChords);
    }
    if (showOnlyMelody) {
        displaySongs = displaySongs.filter(song => song.hasMelody);
    }

    // 4. Sorting Logic
    displaySongs = [...displaySongs].sort((a, b) => {
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        } else {
            // Newest: latest time at top
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeB - timeA;
        }
    });

    return (
        <main className="flex-1 min-h-0 bg-gray-950">
            <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
                {/* Sticky Header with Search and Advanced Sort */}
                <div className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50 px-4 py-6 -mx-4 md:-mx-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Top Row: Search & Stats */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                            <div className="flex-1 relative w-full max-w-2xl">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search 500+ medicine songs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-4 self-end md:self-auto">
                                <span className="hidden md:block text-xs text-gray-500 whitespace-nowrap">
                                    {displaySongs.length} songs found
                                </span>

                                {user && (
                                    <Link
                                        href="/songs/add"
                                        className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-red-900/40 active:scale-95 whitespace-nowrap"
                                    >
                                        <Plus className="w-4 h-4 text-white" strokeWidth={3} />
                                        Create Song
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Active Filter Pills */}
                        {(activeCategory || activeTag) && (
                            <div className="flex flex-wrap items-center gap-2">
                                {activeCategory?.split(',').map(cat => {
                                    const color = getCategoryColor(cat);
                                    const styles = getCategoryStyles(color);
                                    return (
                                        <div key={`cat-${cat}`} className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${styles.inactive}`}>
                                            <span>CATEGORY: {cat}</span>
                                            <button
                                                className="hover:text-white"
                                                onClick={() => {
                                                    const params = new URLSearchParams(searchParams.toString());
                                                    const remaining = activeCategory.split(',').filter(c => c !== cat);
                                                    if (remaining.length > 0) {
                                                        params.set('category', remaining.join(','));
                                                    } else {
                                                        params.delete('category');
                                                    }
                                                    router.push(`?${params.toString()}`);
                                                }}
                                            >
                                                <X className="w-2.5 h-2.5" />
                                            </button>
                                        </div>
                                    );
                                })}
                                {activeTag?.split(',').map(tag => {
                                    const color = getCategoryColor(tag);
                                    const styles = getCategoryStyles(color);
                                    return (
                                        <div key={`tag-${tag}`} className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${styles.inactive}`}>
                                            <span>TAG: {tag}</span>
                                            <button
                                                className="hover:text-white"
                                                onClick={() => {
                                                    const params = new URLSearchParams(searchParams.toString());
                                                    const remaining = activeTag.split(',').filter(t => t !== tag);
                                                    if (remaining.length > 0) {
                                                        params.set('tag', remaining.join(','));
                                                    } else {
                                                        params.delete('tag');
                                                    }
                                                    router.push(`?${params.toString()}`);
                                                }}
                                            >
                                                <X className="w-2.5 h-2.5" />
                                            </button>
                                        </div>
                                    );
                                })}
                                <button
                                    className="text-[9px] font-bold text-gray-600 hover:text-gray-400 uppercase tracking-widest ml-1"
                                    onClick={() => {
                                        router.push(window.location.pathname);
                                    }}
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* Lower Row: Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                            <div className="flex flex-wrap items-center gap-6">
                                {/* Sort Dropdown */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sort:</span>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as SortByType)}
                                            className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm text-gray-300 outline-none focus:border-gray-700 appearance-none pr-8 cursor-pointer"
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="title">Title (A-Z)</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Visibility Tabs (All / Public / Private) */}
                                {user && (
                                    <div className="bg-gray-900/80 p-1 rounded-xl border border-gray-800 inline-flex shadow-inner">
                                        <button
                                            onClick={() => updateQuery({ status: 'all' })}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeFilter === 'all' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => updateQuery({ status: 'public' })}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeFilter === 'public' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Public
                                        </button>
                                        <button
                                            onClick={() => updateQuery({ status: 'draft' })}
                                            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeFilter === 'draft' ? 'bg-gray-800 text-white shadow-sm ring-1 ring-white/5' : 'text-gray-500 hover:text-gray-300'}`}
                                        >
                                            Draft
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                {/* View Toggles */}
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowOnlyChords(!showOnlyChords)}
                                        className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all border ${showOnlyChords
                                            ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 shadow-sm shadow-amber-900/20'
                                            : 'border-gray-800 bg-gray-900/50 text-gray-500 hover:text-gray-300 hover:border-gray-700'
                                            }`}
                                    >
                                        <Guitar className="w-3.5 h-3.5" /> Chords
                                    </button>
                                    <button
                                        onClick={() => setShowOnlyMelody(!showOnlyMelody)}
                                        className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all border ${showOnlyMelody
                                            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500 shadow-sm shadow-emerald-900/20'
                                            : 'border-gray-800 bg-gray-900/50 text-gray-500 hover:text-gray-300 hover:border-gray-700'
                                            }`}
                                    >
                                        <Music className="w-3.5 h-3.5" /> Melody
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    categories={song.categories}
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

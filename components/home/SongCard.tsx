'use client';

import Link from 'next/link';
import { Lock, Music, Guitar, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toggleFavorite } from '@/app/actions/toggleFavorite';
import { useAuth } from '@/hooks/useAuth';

interface SongCardProps {
    id: string;
    title: string;
    author: string;
    songKey?: string | null;
    accentColor?: string;
    isPublic?: boolean;
    hasChords?: boolean;
    hasMelody?: boolean;
    isFavorite?: boolean;
}

export default function SongCard({ id, title, author, songKey, accentColor = 'red', isPublic = true, hasChords = false, hasMelody = false, isFavorite = false }: SongCardProps) {
    // Mapping color name to Tailwind class
    const borderColors: Record<string, string> = {
        red: 'bg-red-500',
        orange: 'bg-orange-500',
        yellow: 'bg-yellow-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
    };

    const textColors: Record<string, string> = {
        red: 'group-hover:text-red-400',
        orange: 'group-hover:text-orange-400',
        yellow: 'group-hover:text-yellow-400',
        blue: 'group-hover:text-blue-400',
        purple: 'group-hover:text-purple-400',
    };

    const { user } = useAuth();
    const [isFav, setIsFav] = useState(isFavorite);

    // Sync with prop changes (e.g. after re-fetch)
    useEffect(() => {
        setIsFav(isFavorite);
    }, [isFavorite]);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert('Please log in to favorite songs');
            return;
        }

        // Optimistic update
        setIsFav(!isFav);

        const result = await toggleFavorite(id, undefined, user.id);
        if (result.error) {
            console.error('Favorite error:', result.error);
            setIsFav(isFav); // Revert on error
            alert(result.error);
        }
    };

    return (
        <Link href={`/songs/${id}`} className="block">
            <div className={`
                relative p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm group overflow-hidden
                ${isPublic
                    ? 'bg-gray-800/30 border border-white/5 hover:bg-gray-800/50 hover:border-white/10 hover:shadow-2xl hover:shadow-black/50'
                    : 'bg-black/40 border border-dashed border-white/10 hover:bg-black/60 hover:border-white/20 opacity-70 hover:opacity-100'}
                active:scale-[0.98] cursor-pointer
            `}>
                {/* Glow Effect */}
                <div className={`absolute -inset-1 ${borderColors[accentColor]} ${isPublic ? 'opacity-0 group-hover:opacity-10' : 'opacity-0'} blur-2xl transition-opacity duration-500`}></div>

                <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${borderColors[accentColor]} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-y-110`}
                ></div>

                <div className="relative flex justify-between items-center z-10">
                    <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-0.5">
                            <h3 className={`text-[17px] font-bold text-gray-100 leading-tight ${textColors[accentColor]} transition-colors group-hover:translate-x-1 duration-300 truncate`}>
                                {title}
                            </h3>
                            {!isPublic && (
                                <Lock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <p className={`text-sm font-medium transition-colors ${isPublic ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500'}`}>
                                {author}
                            </p>
                            {hasChords && (
                                <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                                    <Guitar className="w-2.5 h-2.5" />
                                    Chords
                                </div>
                            )}
                            {hasMelody && (
                                <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                    <Music className="w-2.5 h-2.5" />
                                    Melody
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {user && (
                            <button
                                onClick={handleToggleFavorite}
                                className={`p-2 rounded-full transition-all duration-300 ${isFav
                                    ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                    }`}
                                title={isFav ? "Remove from favorites" : "Add to favorites"}
                            >
                                <Heart className={`w-5 h-5 transition-transform duration-300 ${isFav ? 'fill-current scale-110' : 'scale-100 hover:scale-110'}`} />
                            </button>
                        )}
                        {songKey && (
                            <>
                                <span className="text-[9px] font-black tracking-[0.1em] text-gray-500 uppercase">Key</span>
                                <span className="text-xs font-mono font-bold bg-white/5 text-gray-300 px-2.5 py-1 rounded-lg border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                                    {songKey}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

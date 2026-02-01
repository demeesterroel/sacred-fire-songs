'use client';

import Link from 'next/link';
import { Lock, Music, Guitar } from 'lucide-react';
import { getCategoryColor, getCategoryStyles } from '@/lib/uiUtils';

interface SongCardProps {
    id: string;
    title: string;
    author: string;
    songKey?: string | null;
    accentColor?: string;
    isPublic?: boolean;
    hasChords?: boolean;
    hasMelody?: boolean;
    categories?: {
        name: string;
        slug: string;
    }[];
}

export default function SongCard({
    id,
    title,
    author,
    songKey,
    accentColor = 'red',
    isPublic = true,
    hasChords = false,
    hasMelody = false,
    categories = []
}: SongCardProps) {
    // Mapping color name to Tailwind class
    const borderColors: Record<string, string> = {
        red: 'bg-red-500',
        orange: 'bg-orange-500',
        yellow: 'bg-yellow-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        emerald: 'bg-emerald-500',
        indigo: 'bg-indigo-500',
        amber: 'bg-amber-500',
        slate: 'bg-slate-500',
    };

    const textColors: Record<string, string> = {
        red: 'group-hover:text-red-400',
        orange: 'group-hover:text-orange-400',
        yellow: 'group-hover:text-yellow-400',
        blue: 'group-hover:text-blue-400',
        purple: 'group-hover:text-purple-400',
        emerald: 'group-hover:text-emerald-400',
        indigo: 'group-hover:text-indigo-400',
        amber: 'group-hover:text-amber-400',
    };

    return (
        <Link href={`/songs/${id}`} className="block">
            <div className={`
                relative p-5 rounded-2xl transition-all duration-300 backdrop-blur-sm group overflow-hidden h-full flex flex-col justify-between
                ${isPublic
                    ? 'bg-gray-900/40 border border-gray-800 hover:border-white/10 hover:bg-gray-800/60'
                    : 'bg-black/40 border border-dashed border-white/10 hover:bg-black/60 opacity-70 hover:opacity-100'}
                active:scale-[0.98] cursor-pointer
            `}>
                {/* Accent Border */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${borderColors[accentColor] || borderColors.red} rounded-l-2xl opacity-50 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-y-110`}
                ></div>

                <div className="relative flex justify-between items-start z-10 w-full mb-4">
                    <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-base font-bold text-gray-100 leading-tight ${textColors[accentColor] || textColors.red} transition-colors group-hover:translate-x-1 duration-300 truncate`}>
                                {title}
                            </h3>
                            {!isPublic && (
                                <span className="text-[9px] font-black bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded border border-gray-700 uppercase tracking-tighter shrink-0">
                                    Draft
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 truncate mb-3">
                            {author}
                        </p>

                        {/* Categories/Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                            {categories.map((cat, idx) => {
                                const color = getCategoryColor(cat.slug);
                                const style = getCategoryStyles(color);
                                return (
                                    <span
                                        key={idx}
                                        className={`text-[10px] px-2 py-0.5 rounded-full ${style.pill}`}
                                    >
                                        {cat.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                        {hasChords && (
                            <div className="text-amber-500 mb-1" title="Has Chords">
                                <Guitar className="w-3.5 h-3.5" />
                            </div>
                        )}
                        {songKey && (
                            <div className="text-[10px] font-mono text-gray-400">
                                <span className="text-gray-600 uppercase text-[8px] tracking-wider mr-1">Key</span>
                                {songKey}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

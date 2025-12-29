'use client';

import Link from 'next/link';

interface SongCardProps {
    id: string;
    title: string;
    author: string;
    songKey: string;
    accentColor?: string;
}

export default function SongCard({ id, title, author, songKey, accentColor = 'red' }: SongCardProps) {
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

    return (
        <Link href={`/songs/${id}`} className="block">
            <div className="bg-gray-800/30 p-4 rounded-2xl border border-white/5 active:scale-[0.98] transition-all duration-300 cursor-pointer group relative overflow-hidden backdrop-blur-sm hover:bg-gray-800/50 hover:border-white/10 hover:shadow-2xl hover:shadow-black/50">
                {/* Glow Effect */}
                <div className={`absolute -inset-1 ${borderColors[accentColor]} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>

                <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${borderColors[accentColor]} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-y-110`}
                ></div>

                <div className="relative flex justify-between items-center z-10">
                    <div>
                        <h3 className={`text-[17px] font-bold text-gray-100 leading-tight ${textColors[accentColor]} transition-colors group-hover:translate-x-1 duration-300`}>
                            {title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 font-medium group-hover:text-gray-300 transition-colors">
                            {author}
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[9px] font-black tracking-[0.1em] text-gray-500 uppercase">Key</span>
                        <span className="text-xs font-mono font-bold bg-white/5 text-gray-300 px-2.5 py-1 rounded-lg border border-white/10 shadow-inner group-hover:bg-white/10 transition-colors">
                            {songKey}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

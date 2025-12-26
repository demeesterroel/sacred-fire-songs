'use client';

interface SongCardProps {
    title: string;
    author: string;
    songKey: string;
    accentColor?: string;
}

export default function SongCard({ title, author, songKey, accentColor = 'red' }: SongCardProps) {
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
        <div className="bg-gray-800/40 p-4 rounded-2xl border border-gray-700/50 active:bg-gray-800 active:scale-[0.99] transition-all cursor-pointer group relative overflow-hidden">
            <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${borderColors[accentColor]} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
            ></div>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className={`text-[17px] font-semibold text-gray-100 leading-tight ${textColors[accentColor]} transition-colors`}>
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{author}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">Key</span>
                    <span className="text-xs font-mono font-bold bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md border border-gray-600/30">
                        {songKey}
                    </span>
                </div>
            </div>
        </div>
    );
}

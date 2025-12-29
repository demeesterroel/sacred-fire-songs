'use client';

import { parseChordPro } from '@/lib/chordUtils';

interface SongDisplayProps {
    content: string;
}

export default function SongDisplay({ content }: SongDisplayProps) {
    const lines = parseChordPro(content);

    return (
        <div className="space-y-6 font-mono" >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {lines.map((line: any, lineIdx: number) => (
                <div key={lineIdx} className="flex flex-wrap leading-loose" >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {line.items.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="flex flex-col mr-1" >
                            {/* The Chord (Red and Bold) */}
                            {
                                item.chords ? (
                                    <span className="text-red-500 font-bold text-xs h-4" >
                                        {item.chords}
                                    </span>
                                ) : (
                                    <div className="h-4" /> // Spacer for lyrics without chords
                                )}
                            {/* The Lyric (White) */}
                            <span className="text-gray-100 text-[15px]" >
                                {item.lyrics || '\u00A0'}
                            </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
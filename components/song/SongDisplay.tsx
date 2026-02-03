'use client';

import { parseChordProForDisplay, ChordProSection, ChordProLine, ChordProItem } from '@/lib/chordUtils';

interface SongDisplayProps {
    content: string;
}

export default function SongDisplay({ content }: SongDisplayProps) {
    const sections: ChordProSection[] = parseChordProForDisplay(content);

    return (
        <div className="space-y-12">
            {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="relative">
                    {/* Section Label */}
                    {section.label && (
                        <>
                            {/* Desktop: Vertical Label */}
                            <span
                                className="absolute -left-4 top-0 -translate-x-full hidden md:block text-xs font-black text-gray-600 uppercase tracking-widest rotate-180"
                                style={{ writingMode: 'vertical-rl' }}
                            >
                                {section.label}
                            </span>
                            {/* Mobile: Horizontal Label */}
                            <span className="md:hidden block text-xs font-black text-gray-600 uppercase tracking-widest mb-4">
                                {section.label}
                            </span>
                        </>
                    )}

                    {/* Section Content */}
                    <div className="space-y-6">
                        {section.lines.map((line: ChordProLine, lineIdx) => (
                            <div key={lineIdx}>
                                <div className="flex flex-wrap leading-loose">
                                    {line.items.map((item: ChordProItem, itemIdx) => (
                                        <div key={itemIdx} className="flex flex-col mr-1">
                                            {/* The Chord (Red and Bold) */}
                                            {item.chords ? (
                                                <span className="text-[#ff4400] font-bold text-xs h-4 font-mono mb-1">
                                                    {item.chords}
                                                </span>
                                            ) : (
                                                <div className="h-4 mb-1" /> // Spacer
                                            )}
                                            {/* The Lyric (White) */}
                                            <span className="text-gray-300 text-xl md:text-2xl font-medium tracking-tight font-sans">
                                                {item.lyrics || '\u00A0'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
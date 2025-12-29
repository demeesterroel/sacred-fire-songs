'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/common/Header';
import SongDisplay from '@/components/song/SongDisplay';
import SongDetailSkeleton from '@/components/song/SongDetailSkeleton';

export default function SongDetailPage() {
    const { id } = useParams(); // This grabs the UUID from the URL!
    const [song, setSong] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSongDetails() {
            setLoading(true);

            // The "Magic" Query: Fetch song + all its children versions
            const { data, error } = await supabase
                .from('compositions')
                .select(`
          title,
          original_author,
          song_versions (
            id,
            version_name,
            content_chordpro,
            key
          )
        `)
                .eq('id', id)
                .single();

            if (!error && data) {
                setSong(data);
            }
            setLoading(false);
        }

        if (id) fetchSongDetails();
    }, [id]);


    const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);

    // ... inside the component ...
    if (loading) return <SongDetailSkeleton />;
    if (!song) return notFound();

    const versions = song.song_versions || [];
    const currentVersion = versions[selectedVersionIndex];

    return (
        <main className="flex-1 p-6 text-white overflow-y-auto min-h-0 hide-scroll scroll-smooth">
            <h1 className="text-3xl font-bold text-red-500">{song.title}</h1>
            <p className="text-gray-400 mt-1">by {song.original_author || 'Traditional'}</p>

            {/* Version Selector Pills */}
            {versions.length > 1 && (
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2 hide-scroll">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {versions.map((v: any, index: number) => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVersionIndex(index)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${index === selectedVersionIndex
                                ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-white/5'
                                }`}
                        >
                            {v.version_name || `Version ${index + 1}`}
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-white/5 font-mono text-sm whitespace-pre-wrap transition-all duration-300">
                {/* Key Badge */}
                {currentVersion?.key && (
                    <div className="flex justify-end mb-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">
                            Key: {currentVersion.key}
                        </span>
                    </div>
                )}
                <SongDisplay key={currentVersion?.id || 'empty'} content={currentVersion?.content_chordpro || ''} />
            </div>
        </main>
    );
}

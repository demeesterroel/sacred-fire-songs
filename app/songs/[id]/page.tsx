'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/common/Header';
import SongDisplay from '@/components/song/SongDisplay';

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

    if (loading) return <div className="min-h-screen bg-black text-white p-10">Loading song...</div>;
    if (!song) return <div className="min-h-screen bg-black text-white p-10">Song not found</div>;

    return (
        <div className="min-h-screen bg-black flex justify-center selection:bg-red-500/30">
            <div className="w-full max-w-[420px] bg-gray-900 min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
                <Header />

                <main className="flex-1 p-6 text-white overflow-y-auto">
                    <h1 className="text-3xl font-bold text-red-500">{song.title}</h1>
                    <p className="text-gray-400 mt-1">by {song.original_author || 'Traditional'}</p>

                    <div className="mt-8 p-4 bg-gray-800 rounded-xl border border-white/5 font-mono text-sm whitespace-pre-wrap">
                        <SongDisplay content={song.song_versions?.[0]?.content_chordpro || ''} />                    </div>
                </main>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/common/Header';
import SongDisplay from '@/components/song/SongDisplay';
import SongDetailSkeleton from '@/components/song/SongDetailSkeleton';
import { useQuery } from '@tanstack/react-query';

// Standalone fetch function
const fetchSong = async (id: string) => {
    const { data, error } = await supabase
        .from('compositions')
        .select(`
          title,
          original_author,
          owner_id,
          song_versions (
            id,
            version_name,
            content_chordpro,
            key,
            youtube_url
          )
        `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

import YouTubeEmbed from '@/components/song/YouTubeEmbed';

export default function SongDetailPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0]; // Safe type handling

    const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);

    const { user, loading: authLoading } = useAuth();

    // The Query Hook
    const { data: song, isLoading: songLoading } = useQuery({
        queryKey: ['song', id],
        queryFn: () => fetchSong(id!),
        enabled: !!id,
    });

    if (songLoading || authLoading) return <SongDetailSkeleton />;
    if (!song) return notFound();

    const versions = song.song_versions || [];
    const currentVersion = versions[selectedVersionIndex];

    return (
        <main className="flex-1 p-6 text-white min-h-0">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-red-500">{song.title}</h1>
                    <p className="text-gray-400 mt-1">by {song.original_author || 'Traditional'}</p>
                </div>
                {/* Edit Button for Owners or Admins */}
                {user && (song.owner_id === user.id || user.role === 'admin') && (
                    <Link
                        href={`/songs/${id}/edit`}
                        className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm font-bold border border-gray-700 transition-colors"
                    >
                        Edit Song
                    </Link>
                )}
            </div>

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

                {/* YouTube Embed */}
                {currentVersion?.youtube_url && (
                    <YouTubeEmbed videoId={currentVersion.youtube_url} />
                )}
            </div>

            {/* Bottom spacing */}
            <div className="h-8"></div>
        </main>
    );
}
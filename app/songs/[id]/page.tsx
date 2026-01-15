'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import SongDisplay from '@/components/song/SongDisplay';
import SongDetailSkeleton from '@/components/song/SongDetailSkeleton';
import YouTubeEmbed from '@/components/song/YouTubeEmbed';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import { deleteSong } from '@/app/actions/deleteSong';
import { useQuery } from '@tanstack/react-query';
import { Trash2, Edit2, ArrowLeft } from 'lucide-react';

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

export default function SongDetailPage() {
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : params.id?.[0]; // Safe type handling

    const [selectedVersionIndex, setSelectedVersionIndex] = useState(0);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { user, loading: authLoading } = useAuth();
    const isAdmin = user?.role === 'admin';

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

    const handleDelete = async () => {
        if (!id) return;
        setIsDeleting(true);
        // Execute server action
        await deleteSong(id);
        // Note: The action redirects, so we don't need to handle success UI here usually,
        // but if it fails we might want to catch it. For MVP we assume success/redirect.
    };

    return (
        <main className="flex-1 min-h-0 bg-gray-900">
            {/* Mobile-Friendly Header with Action Bar */}
            <div className="flex justify-between items-center px-4 py-4 sticky top-0 bg-gray-900/95 backdrop-blur-md z-30 border-b border-white/5 shadow-sm">
                <div className="flex items-center gap-3 overflow-hidden">
                    {/* Simplified Logo/Title for context, or just Title if standard header is separate */}
                    {/* Note: The main app shell likely has a header, but this view typically takes over content. 
                         Based on mockup, we show Title in body, and Actions in header? 
                         Actually mockup shows Logo in header. We will stick to the page layout which seems to not have the global header inside main.
                         Wait, previous code had `Header` imported but not used in the return? 
                         Let's align with the previous structure but adding the buttons.
                     */}
                </div>

                {/* Action Bar */}
                <div className="flex items-center gap-2 ml-auto">
                    {/* Delete Button (Admin Only) */}
                    {isAdmin && (
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full transition-colors border border-red-500/20 active:scale-95"
                            title="Delete Song"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}

                    {/* Edit Button (Owner or Admin) */}
                    {(song.owner_id === user?.id || isAdmin) && (
                        <Link
                            href={`/songs/${id}/edit`}
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10"
                            title="Edit Song"
                        >
                            <Edit2 className="w-5 h-5" />
                        </Link>
                    )}

                    {/* Back Button */}
                    <Link
                        href="/"
                        className="p-2.5 text-gray-400 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/10"
                        title="Back to Library"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            <div className="p-6">
                <div>
                    <h1 className="text-3xl font-bold text-red-500 leading-tight">{song.title}</h1>
                    <p className="text-gray-400 mt-1 font-medium">by {song.original_author || 'Traditional'}</p>
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

                <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-white/5 font-mono text-sm whitespace-pre-wrap transition-all duration-300 shadow-xl">
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
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Song?"
                message={`Are you sure you want to delete "${song.title}"? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </main>
    );
}
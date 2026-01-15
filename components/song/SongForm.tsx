'use client';

import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type SongFormData = {
    title: string;
    author: string;
    content: string;
};

interface SongFormProps {
    mode: 'create' | 'edit';
    initialData?: SongFormData;
    songId?: string;
    versionId?: string; // For updating the specific version
}

const SongForm = ({ mode, initialData, songId, versionId }: SongFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<SongFormData>({
        defaultValues: initialData
    });

    const queryClient = useQueryClient();
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [showUpload, setShowUpload] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();

            // Extract Title
            const titleMatch = text.match(/{(?:title|t):\s*(.*?)}/i);
            if (titleMatch) {
                setValue('title', titleMatch[1].trim());
            }

            // Extract Author
            const authorMatch = text.match(/{(?:author|a|artist):\s*(.*?)}/i);
            if (authorMatch) {
                setValue('author', authorMatch[1].trim());
            }

            // Set Content (we might want to strip metadata or keep it - usually keeping it is safer)
            // Ideally clean up blank lines at start
            setValue('content', text.trim());

            // Auto-collapse after success
            setShowUpload(false);
        } catch (err) {
            console.error('Failed to read file', err);
            // Optionally set an error state here
        }
    };

    const mutation = useMutation({
        mutationFn: async (data: SongFormData) => {
            if (mode === 'create') {
                // 1. Insert Composition
                const { data: composition, error: compError } = await supabase
                    .from('compositions')
                    .insert({
                        title: data.title,
                        original_author: data.author,
                        primary_language: 'es', // Default for now
                    })
                    .select()
                    .single();

                if (compError) throw compError;
                if (!composition) throw new Error('Failed to create composition');

                // 2. Insert Version
                const { error: versionError } = await supabase
                    .from('song_versions')
                    .insert({
                        composition_id: composition.id,
                        version_name: 'Standard',
                        content_chordpro: data.content,
                        capo: 0,
                        vote_count: 0
                    });

                if (versionError) throw versionError;

                return composition.id;
            } else {
                // UPDATE MODE
                if (!songId || !versionId) throw new Error('Missing ID for update');

                // 1. Update Composition
                const { error: compError } = await supabase
                    .from('compositions')
                    .update({
                        title: data.title,
                        original_author: data.author,
                    })
                    .eq('id', songId);

                if (compError) throw compError;

                // 2. Update Version
                const { error: versionError } = await supabase
                    .from('song_versions')
                    .update({
                        content_chordpro: data.content,
                    })
                    .eq('id', versionId);

                if (versionError) throw versionError;

                return songId;
            }
        },
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['songs'] });
            queryClient.invalidateQueries({ queryKey: ['song', id] });
            router.push(mode === 'create' ? '/' : `/songs/${id}`);
        },
        onError: (error: any) => {
            // Error handling can be added here, e.g., toast notification
        }
    });

    const handleFormSubmit = (data: SongFormData) => {
        mutation.mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-gray-900 border border-white/10 p-6 rounded-2xl max-w-2xl mx-auto shadow-xl">
            <div className="space-y-4">
                {/* File Upload Toggle Section */}
                {!showUpload ? (
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setShowUpload(true)}
                            className="text-indigo-400 text-xs font-semibold flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <span className="material-symbols-outlined text-sm">attachment</span>
                            Or upload a file (.cho, .txt)
                        </button>
                    </div>
                ) : (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 relative">
                        <button
                            type="button"
                            onClick={() => setShowUpload(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                        >
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>

                        <div className="flex items-start gap-3 mb-4">
                            <span className="material-symbols-outlined text-blue-400 mt-0.5">info</span>
                            <p className="text-blue-100 text-xs leading-relaxed flex-1">
                                Upload a <span className="bg-blue-500/30 px-1 rounded font-mono">.cho</span> or <span className="bg-blue-500/30 px-1 rounded font-mono">.txt</span> file. Title and author will be detected automatically.
                            </p>
                        </div>

                        <label className="w-full border-2 border-dashed border-gray-600 hover:border-indigo-500/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer bg-gray-800/50 group">
                            <input
                                type="file"
                                accept=".cho,.txt,.pro,.chordpro"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                            <div className="bg-gray-700/50 group-hover:bg-gray-700 p-4 rounded-full transition-colors">
                                <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-white">cloud_upload</span>
                            </div>
                            <div className="text-center">
                                <p className="text-white font-semibold group-hover:text-indigo-300">Tap to select file</p>
                                <p className="text-gray-500 text-xs mt-1">ChordPro files only</p>
                            </div>
                        </label>
                    </div>
                )}

                <div className="flex items-center gap-4 py-2">
                    <div className="h-px bg-gray-700/50 flex-1"></div>
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">or manual entry</span>
                    <div className="h-px bg-gray-700/50 flex-1"></div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                        Song Title
                    </label>
                    <input
                        id="title"
                        {...register('title', { required: 'Title is required' })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        placeholder="e.g. Grandmother Earth"
                    />
                    {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                        Original Author
                    </label>
                    <input
                        id="author"
                        {...register('author', { required: 'Author is required' })}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                        placeholder="e.g. Traditional or Artist Name"
                    />
                    {errors.author && <p className="text-red-400 text-sm">{errors.author.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                    ChordPro Content
                </label>
                <div className="text-xs text-gray-500 mb-1">
                    Use brackets for chords: <code className="bg-gray-800 px-1 rounded">[Am]</code>
                </div>
                <textarea
                    id="content"
                    {...register('content', { required: 'Content is required' })}
                    rows={10}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                    placeholder="[Am]Grandmother [C]Earth..."
                />
                {errors.content && <p className="text-red-400 text-sm">{errors.content.message}</p>}
            </div>

            {serverError && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
                    Error: {serverError}
                </div>
            )}

            <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
                {mutation.isPending ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                    </>
                ) : (
                    mode === 'create' ? 'Add Song' : 'Save Changes'
                )}
            </button>
        </form>
    );
}

export default SongForm;

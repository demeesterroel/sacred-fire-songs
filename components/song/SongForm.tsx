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
    language: string;
    tags: string[];
    youtubeLink: string;
    spotifyLink: string;
    soundcloudLink: string;
};

interface SongFormProps {
    mode: 'create' | 'edit';
    initialData?: SongFormData;
    songId?: string;
    versionId?: string; // For updating the specific version
}

const LANGUAGES = ['English', 'Sanskrit', 'Spanish', 'Portuguese'];
const PREDEFINED_TAGS = ['Healing', 'Mantra', 'Medicine', 'Ceremony'];

const SongForm = ({ mode, initialData, songId, versionId }: SongFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SongFormData>({
        defaultValues: {
            ...initialData,
            language: initialData?.language || 'English',
            tags: initialData?.tags || [],
            youtubeLink: initialData?.youtubeLink || '',
            spotifyLink: initialData?.spotifyLink || '',
            soundcloudLink: initialData?.soundcloudLink || '',
        }
    });

    const queryClient = useQueryClient();
    const router = useRouter();
    const [serverError, setServerError] = useState<string | null>(null);
    const [showUpload, setShowUpload] = useState(false);

    // Watch fields for UI updates
    const currentTags = watch('tags') || [];
    const currentLanguage = watch('language');

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

            // Set Content
            setValue('content', text.trim());

            // Auto-collapse after success
            setShowUpload(false);
        } catch (err) {
            console.error('Failed to read file', err);
        }
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const input = e.currentTarget;
            const newTag = input.value.trim();

            if (newTag && !currentTags.includes(newTag)) {
                setValue('tags', [...currentTags, newTag]);
                input.value = '';
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
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
                        primary_language: 'es', // Default for now, ideally use data.language map
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
                        // Note: links and other metadata not yet persisted as per instruction
                    });

                if (versionError) throw versionError;

                return composition.id;
            } else {
                // UPDATE MODE code remains same as persist logic is unchanged
                if (!songId || !versionId) throw new Error('Missing ID for update');

                const { error: compError } = await supabase
                    .from('compositions')
                    .update({
                        title: data.title,
                        original_author: data.author,
                    })
                    .eq('id', songId);

                if (compError) throw compError;

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
            setServerError(error.message);
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
                        {/* Upload UI Code */}
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
                        <div className="flex items-center justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setShowUpload(false)}
                                className="cursor-pointer flex min-w-[100px] items-center justify-center rounded-lg h-11 px-6 border border-slate-300 dark:border-[#674d32] text-slate-600 dark:text-[#c9ad92] text-sm font-bold hover:bg-slate-50 dark:hover:bg-[#332619]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-11 px-8 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 active:bg-primary/90"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                )}


                {/* Song Details Section */}
                <div>
                    <div className="pb-2">
                        <h3 className="text-white text-lg font-bold leading-tight tracking-tight">Song Details</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 p-1">
                                Song Title
                            </label>
                            <input
                                id="title"
                                {...register('title', { required: 'Title is required' })}
                                className="w-full bg-[#1d1c26] border border-[#3f3d52] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[#a19eb7]/50"
                                placeholder="e.g. Grandmother Earth"
                            />
                            {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="author" className="block text-sm font-medium text-gray-300 p-1">
                                Author/Composer
                            </label>
                            <input
                                id="author"
                                {...register('author', { required: 'Author is required' })}
                                className="w-full bg-[#1d1c26] border border-[#3f3d52] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[#a19eb7]/50"
                                placeholder="e.g. Traditional or Artist Name"
                            />
                            {errors.author && <p className="text-red-400 text-sm">{errors.author.message}</p>}
                        </div>

                        {/* Language Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300 p-1">Language</label>
                            <div className="flex flex-wrap gap-2">
                                {LANGUAGES.map(lang => (
                                    <button
                                        key={lang}
                                        type="button"
                                        onClick={() => setValue('language', lang)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${currentLanguage === lang
                                            ? 'bg-primary text-white border-primary'
                                            : 'bg-[#1d1c26] text-[#a19eb7] border-[#3f3d52] hover:border-gray-500'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                                <button type="button" className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1d1c26] border border-[#3f3d52] text-[#a19eb7] hover:text-white hover:border-gray-500">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        </div>

                        {/* Categories/Tags Section */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300 p-1">Categories / Tags</label>
                            <div className="flex flex-wrap gap-2 p-2 min-h-[48px] rounded-lg border border-[#3f3d52] bg-[#1d1c26] items-center">
                                {currentTags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 bg-[#3f3d52]/50 text-white text-xs px-2 py-1 rounded">
                                        {tag}
                                        <span
                                            onClick={() => removeTag(tag)}
                                            className="material-symbols-outlined text-[14px] cursor-pointer hover:text-red-400"
                                        >
                                            close
                                        </span>
                                    </span>
                                ))}
                                <input
                                    className="bg-transparent border-none focus:ring-0 p-0 text-xs text-[#a19eb7] ml-1 flex-1 min-w-[100px] placeholder:text-[#a19eb7]/30"
                                    placeholder="Add tags..."
                                    onKeyDown={handleAddTag}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lyrics & Chords Section */}
                <div className="space-y-2 mt-6">
                    <div className="flex justify-between items-end pb-2">
                        <div>
                            <h3 className="text-white text-lg font-bold leading-tight tracking-tight">Lyrics & chords</h3>
                            <p className="text-[#a19eb7] text-xs font-normal mt-1">Use brackets [] for chords: eg.<span className="font-mono text-primary">[Am]</span></p>
                        </div>
                        <span className="material-symbols-outlined text-[#a19eb7] cursor-pointer">help_outline</span>
                    </div>

                    <textarea
                        id="content"
                        {...register('content', { required: 'Content is required' })}
                        rows={10}
                        className="w-full bg-[#1d1c26] border border-[#3f3d52] rounded-lg px-4 py-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[#a19eb7]/30 leading-relaxed"
                        placeholder="[Am]In the light of the [G]morning sun...&#10;[F]We rise to [E7]sing as one."
                    />
                    {errors.content && <p className="text-red-400 text-sm">{errors.content.message}</p>}
                </div>

                {/* Links Section */}
                <div className="space-y-4 mt-6">
                    <div className="pb-2 pt-4">
                        <h3 className="text-white text-lg font-bold leading-tight tracking-tight">Links</h3>
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="material-symbols-outlined text-[#ff0000] text-xl">play_circle</span>
                        </div>
                        <input
                            {...register('youtubeLink')}
                            className="w-full pl-11 bg-[#1d1c26] border border-[#3f3d52] rounded-lg h-12 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[#a19eb7]/50 text-sm"
                            placeholder="Paste YouTube link"
                        />
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="material-symbols-outlined text-[#1db954] text-xl">radio</span>
                        </div>
                        <input
                            {...register('spotifyLink')}
                            className="w-full pl-11 bg-[#1d1c26] border border-[#3f3d52] rounded-lg h-12 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[#a19eb7]/50 text-sm"
                            placeholder="Paste Spotify link"
                        />
                    </div>

                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-[#ff5500]" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.285 2.659.37 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0Zm-1.663-.257c.27 2.726.39 5.171 0 7.904a.266.266 0 0 1-.532 0c-.38-2.69-.257-5.21 0-7.904a.266.266 0 0 1 .532 0Zm-1.647.77a26.108 26.108 0 0 1-.008 7.147.272.272 0 0 1-.542 0 27.955 27.955 0 0 1 0-7.147.275.275 0 0 1 .55 0Zm-1.67 1.769c.421 1.865.228 3.5-.029 5.388a.257.257 0 0 1-.514 0c-.21-1.858-.398-3.549 0-5.389a.272.272 0 0 1 .543 0Zm-1.655-.273c.388 1.897.26 3.508-.01 5.412-.026.28-.514.283-.54 0-.244-1.878-.347-3.54-.01-5.412a.283.283 0 0 1 .56 0Zm-1.668.911c.4 1.268.257 2.292-.026 3.572a.257.257 0 0 1-.514 0c-.241-1.262-.354-2.312-.023-3.572a.283.283 0 0 1 .563 0Z" />
                            </svg>
                        </div>
                        <input
                            {...register('soundcloudLink')}
                            className="w-full pl-11 bg-[#1d1c26] border border-[#3f3d52] rounded-lg h-12 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-[#a19eb7]/50 text-sm"
                            placeholder="Paste Soundcloud link"
                        />
                    </div>
                </div>
            </div>

            {serverError && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
                    Error: {serverError}
                </div>
            )}

            <div className="flex gap-3">
                <button
                    type="button"
                    className="flex-1 bg-transparent border-2 border-[#3f3d52] text-[#a19eb7] hover:text-white hover:border-white/20 font-bold py-3 rounded-xl active:scale-[0.98] transition-all"
                >
                    Save Draft
                </button>
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex-1 bg-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {mutation.isPending ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : (
                        mode === 'create' ? 'Publish Song' : 'Save Changes'
                    )}
                </button>
            </div>
        </form>
    );
}

export default SongForm;

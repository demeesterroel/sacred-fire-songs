'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, LayoutDashboard, Compass, Library, ListMusic, PlusCircle, LogOut } from 'lucide-react';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth, MOCK_USERS } from '@/hooks/useAuth';
import DevTools from '../dev/DevTools';
import LibrarySidebar from '../library/LibrarySidebar';

import { getSiteTitle } from '@/lib/env';

const Sidebar = () => {
    const { user, loading, logout } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    };

    return (
        <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 sticky top-0 h-screen overflow-y-auto z-20">
            {/* User Profile (Top of Sidebar) */}
            <div className="p-4 border-b border-gray-800/50 bg-gray-800/30 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-900/40 flex items-center justify-center text-xs font-bold text-red-400 ring-1 ring-red-500/20 shadow-inner">
                        {user ? (user.email?.charAt(0).toUpperCase() || '?') : '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-white truncate">
                            {user ? (user.email?.split('@')[0] || 'Member') : 'Guest'}
                        </p>
                        <p className="text-[9px] text-gray-500 truncate" title={user?.id || ''}>
                            {user ? (user.email || 'Not Logged In') : 'Welcome, Guest'}
                        </p>
                    </div>
                    {user && (
                        <button
                            onClick={logout}
                            title="Log Out"
                            className="group"
                        >
                            <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-400 transition-colors" />
                        </button>
                    )}
                </div>
            </div>

            <div className="px-6 py-2">
                {/* Main Menu */}
                <nav className="space-y-1 mb-8">
                    <Link
                        href="/"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/') && pathname === '/'
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <LayoutDashboard className={`w-5 h-5 ${isActive('/') && pathname === '/' ? 'text-red-500' : ''}`} />
                        Dashboard
                    </Link>

                    <Link
                        href="/explore"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/explore')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <Compass className={`w-5 h-5 ${isActive('/explore') ? 'text-red-500' : ''}`} />
                        Explore
                    </Link>

                    <Link
                        href="/songs"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/songs') && pathname !== '/songs/add'
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <Library className={`w-5 h-5 ${isActive('/songs') && pathname !== '/songs/add' ? 'text-red-500' : ''}`} />
                        Library
                    </Link>

                    <Link
                        href="/playlists"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/playlists')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <ListMusic className={`w-5 h-5 ${isActive('/playlists') ? 'text-red-500' : ''}`} />
                        Playlist
                    </Link>

                    <Link
                        href="/songs/add"
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/songs/add')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        <PlusCircle className={`w-5 h-5 ${isActive('/songs/add') ? 'text-red-500' : ''}`} />
                        Add Song
                    </Link>
                </nav>

                {/* Filters (Dynamic Taxonomy) */}
                {(pathname === '/songs' || pathname?.startsWith('/explore')) && (
                    <div className="pt-6 border-t border-gray-800/50">
                        <LibrarySidebar />
                    </div>
                )}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto p-4 border-t border-gray-800/30">
                <DevTools />
                <p className="text-[9px] text-center font-mono uppercase tracking-[0.2em] opacity-20 mt-2">Sacred Fire v1.0</p>
            </div>
        </aside>
    );
}

export default Sidebar;

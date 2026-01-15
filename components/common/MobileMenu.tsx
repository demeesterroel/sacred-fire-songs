'use client';

import Link from 'next/link';
import { X, Flame, LayoutGrid, Music, CloudUpload, Settings, LogOut } from 'lucide-react';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { user, loading, mockRole, switchMockRole, logout } = useAuth();
    // Prevent body scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Menu Content */}
            <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-[300px] bg-gray-900 border-l border-gray-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
                <div className="p-5 flex items-center justify-between border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-700 to-orange-600 rounded-full flex items-center justify-center ring-1 ring-white/10">
                            <Flame className="text-white w-4 h-4 fill-current" />
                        </div>
                        <span className="font-bold text-lg text-white">Menu</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-xl text-white font-medium hover:bg-gray-700 transition-colors"
                    >
                        <LayoutGrid className="w-5 h-5 text-red-500" />
                        Dashboard
                    </Link>
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
                    >
                        <Music className="w-5 h-5" />
                        Browse Songs
                    </Link>
                    <Link
                        href="/songs/add"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
                    >
                        <CloudUpload className="w-5 h-5" />
                        Add Song
                    </Link>
                    <Link
                        href="#"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
                    >
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>

                    <div className="my-4 border-t border-gray-800" />

                    <div className="px-4">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Elements</h3>
                        {/* Placeholder filters */}
                        <div className="flex gap-2 flex-wrap">
                            <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">Fire</span>
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded border border-blue-500/20">Water</span>
                            <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Earth</span>
                            <span className="px-2 py-1 bg-slate-500/10 text-slate-400 text-xs rounded border border-slate-500/20">Air</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-800 bg-black/20">
                    <div className="flex items-center gap-3 p-2">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">
                            {user ? user.email?.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {user ? (user.email?.split('@')[0] || 'Member') : 'Guest'}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate font-mono" title={user?.id || ''}>
                                {user ? `ID: ${user.id.slice(0, 8)}...` : 'Not Logged In'}
                            </p>
                        </div>
                        {user && (
                            <button
                                onClick={logout}
                                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <LogOut className="w-4 h-4 text-gray-500 hover:text-white" />
                            </button>
                        )}
                    </div>

                    {/* Mock Role Switcher (Test Only) */}
                    <div className="pt-2 border-t border-gray-800/50">
                        <select
                            className="w-full bg-gray-800 text-xs text-gray-400 rounded px-2 py-1 border border-gray-700 focus:outline-none focus:border-red-500"
                            value={mockRole || ''}
                            onChange={(e) => switchMockRole(e.target.value || null)}
                        >
                            <option value="">-- Use Real Auth --</option>
                            <option value="guest">Guest</option>
                            <option value="mock-member">Mock Member</option>
                            <option value="mock-expert">Mock Expert</option>
                            <option value="mock-admin">Mock Admin</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
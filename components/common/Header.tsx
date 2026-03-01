'use client';

import { Flame } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/context/SidebarContext';
import { UserProfile } from './navigation/UserProfile';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
    const pathname = usePathname();
    const { setIsOpen, headerCount } = useSidebar();
    const { user } = useAuth();

    const getSubtitle = () => {
        if (pathname === '/') return 'DASHBOARD';
        if (pathname === '/songs') return 'LIBRARY';
        if (pathname === '/explore') return 'EXPLORE';
        if (pathname === '/songs/add') return 'ADD SONG';
        if (pathname?.startsWith('/library')) return 'LIBRARY';
        if (pathname?.startsWith('/songs/')) return 'SONG DETAIL';
        return '';
    };

    const subtitle = getSubtitle();
    const displaySubtitle = (pathname === '/songs' && headerCount !== undefined)
        ? `${headerCount} Songs`
        : subtitle;

    // Hide Global Header ONLY on Song Detail Page to allow custom Widescreen Design
    const isSongDetailPage = pathname?.startsWith('/songs/') &&
        pathname !== '/songs' &&
        pathname !== '/songs/add' &&
        !pathname.endsWith('/edit');

    if (isSongDetailPage) return null;

    const userDisplayName = user?.full_name || user?.email?.split('@')[0] || 'Member';
    const userInitials = userDisplayName.substring(0, 1).toUpperCase();

    return (
        <header className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50 px-4 md:px-8 py-4 h-[72px] flex items-center">
            <div className="w-full flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {/* Mobile: Avatar button opens sidebar (replaces hamburger) */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="lg:hidden flex items-center shrink-0 active:scale-95 transition-transform"
                        aria-label="Open menu"
                    >
                        {user ? (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-inner overflow-hidden relative ring-2 ring-gray-700 hover:ring-gray-500 transition-all">
                                {user.avatar_url ? (
                                    <Image
                                        src={user.avatar_url}
                                        alt={userDisplayName}
                                        fill
                                        className="object-cover"
                                        sizes="32px"
                                    />
                                ) : (
                                    userInitials
                                )}
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center ring-2 ring-gray-700 hover:ring-gray-500 transition-all">
                                <span className="text-xs font-bold text-gray-500">?</span>
                            </div>
                        )}
                    </button>

                    {/* Logo: Only on Mobile (Sidebar is hidden) */}
                    <Link href="/" className="flex lg:hidden items-center group/logo shrink-0">
                        <div className="w-9 h-9 bg-gradient-to-br from-red-700 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30 ring-1 ring-white/10 group-hover/logo:scale-110 transition-transform">
                            <Flame className="text-white w-5 h-5 fill-current" />
                        </div>
                    </Link>

                    {/* Divider on Mobile (Desktop sidebar is visible) */}
                    <div className="lg:hidden h-6 w-px bg-gray-800 mx-1 shrink-0" />

                    {/* Breadcrumb / Subtitle */}
                    {displaySubtitle && (
                        <div className="flex items-center">
                            <span className="text-[10px] lg:text-xs uppercase font-black text-red-500 tracking-[0.2em] lg:tracking-[0.3em] opacity-80">
                                {displaySubtitle}
                            </span>
                        </div>
                    )}
                </div>

                {/* User Profile: hidden on mobile (avatar is in bottom nav / header left) */}
                <div className="hidden lg:flex items-center gap-3">
                    <UserProfile layout="header" showText={false} />
                </div>
            </div>
        </header>
    );
}

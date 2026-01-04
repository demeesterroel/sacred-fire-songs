'use client';

import { Flame, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="md:hidden flex justify-between items-center px-5 py-4 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-30 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                    {/* Logo */}
                    <Link href="/" className="w-9 h-9 bg-gradient-to-br from-red-700 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30 ring-1 ring-white/10 cursor-pointer">
                        <Flame className="text-white w-5 h-5 fill-current" />
                    </Link>
                    <Link href="/" className="font-bold text-xl tracking-tight text-white hover:opacity-80 transition-opacity">
                        Camino Rojo
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    {/* Hamburger Menu Trigger */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </header>

            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
}

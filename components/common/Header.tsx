'use client';

import { Flame, LogIn } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-20 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-9 h-9 bg-gradient-to-br from-red-700 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30 ring-1 ring-white/10">
                    <Flame className="text-white w-5 h-5 fill-current" />
                </div>
                <h1 className="font-bold text-xl tracking-tight text-white">Camino Rojo</h1>
            </div>

            {/* Admin Login */}
            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                <LogIn className="w-5 h-5" />
            </button>
        </header>
    );
}

'use client';

import Image from 'next/image';
import { LogIn } from 'lucide-react';

export default function Header() {
    return (
        <header className="flex justify-between items-center px-5 py-4 sticky top-0 bg-gray-900/80 backdrop-blur-md z-30 border-b border-white/5 ring-1 ring-white/5">
            <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-xl shadow-red-900/40 ring-2 ring-white/10 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                    <Image
                        src="/favicon.svg"
                        alt="Camino Rojo Logo"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h1 className="font-bold text-xl tracking-tight text-white drop-shadow-sm">Camino Rojo</h1>
            </div>

            {/* Admin Login */}
            <button className="text-gray-400 hover:text-white transition-all p-2.5 rounded-full hover:bg-white/5 active:bg-white/10 group">
                <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
        </header>
    );
}

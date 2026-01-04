'use client';

import Link from 'next/link';
import { Flame, LayoutGrid, Music, UploadCloud, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="hidden md:flex flex-col w-64 bg-gray-900 border-r border-gray-800 sticky top-0 h-screen overflow-y-auto z-20">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div
                        className="w-10 h-10 bg-gradient-to-br from-red-700 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-red-900/30 ring-1 ring-white/10">
                        <Flame className="text-white w-5 h-5 fill-current" />
                    </div>
                    <h1 className="font-bold text-xl tracking-tight text-white">Camino Rojo</h1>
                </div>

                {/* Main Menu */}
                <nav className="space-y-1 mb-8">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 bg-gray-800 rounded-lg text-white font-medium">
                        <LayoutGrid className="w-5 h-5 text-red-500" />
                        Dashboard
                    </Link>
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                        <Music className="w-5 h-5" />
                        Browse Songs
                    </Link>
                    <Link href="/admin/upload" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                        <UploadCloud className="w-5 h-5" />
                        Upload
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>

                {/* Filters (Visual Only for now) */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Elements</h3>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800/30 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-red-600 focus:ring-red-500/30" />
                                Fire
                            </label>
                            <label className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800/30 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500/30" />
                                Water
                            </label>
                            <label className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800/30 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-amber-500 focus:ring-amber-500/30" />
                                Earth
                            </label>
                            <label className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800/30 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-slate-400 focus:ring-slate-500/30" />
                                Air
                            </label>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Origin</h3>
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800/30 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-green-500 focus:ring-green-500/30" />
                                Medicine
                            </label>
                            <label className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800/30 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500/30" />
                                Icaros
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* User Profile (Bottom Sidebar) */}
            <div className="mt-auto p-4 border-t border-gray-800 bg-gray-900/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-400">AG</div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">Admin Guest</p>
                        <p className="text-xs text-gray-500 truncate">admin@caminorojo.com</p>
                    </div>
                    <button><LogOut className="w-4 h-4 text-gray-500 hover:text-white" /></button>
                </div>
            </div>
        </aside>
    );
}

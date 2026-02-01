'use client';

import { Flame, Droplets, Heart, MoreHorizontal, Plus } from 'lucide-react';
import Link from 'next/link';

export default function PlaylistsPage() {
  return (
    <main className="flex-1 min-w-0 overflow-y-auto">
      {/* Page Actions */}
      <div className="px-8 py-4 max-w-5xl mx-auto flex justify-end">
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-900/20 active:scale-95">
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        {/* Playlist Grid */}
        <div className="grid grid-cols-1 gap-4">

          {/* Playlist 1 */}
          <div className="bg-gray-900/40 p-4 rounded-2xl border border-gray-800 flex items-center justify-between group cursor-pointer hover:bg-gray-800/60 transition-all hover:translate-y-[-2px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-100 group-hover:text-white transition-colors">Yage Ceremony 2024</h3>
                <p className="text-xs text-gray-500 mt-1">12 Songs • Updated 2 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-gray-800 rounded-lg">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Playlist 2 */}
          <div className="bg-gray-900/40 p-4 rounded-2xl border border-gray-800 flex items-center justify-between group cursor-pointer hover:bg-gray-800/60 transition-all hover:translate-y-[-2px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <Droplets className="text-blue-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-100 group-hover:text-white transition-colors">Temazcal - Water Songs</h3>
                <p className="text-xs text-gray-500 mt-1">8 Songs • Updated 1 week ago</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-gray-800 rounded-lg">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Playlist 3 */}
          <div className="bg-gray-900/40 p-4 rounded-2xl border border-gray-800 flex items-center justify-between group cursor-pointer hover:bg-gray-800/60 transition-all hover:translate-y-[-2px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <Heart className="text-red-500 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-100 group-hover:text-white transition-colors">Favorites</h3>
                <p className="text-xs text-gray-500 mt-1">156 Songs • Always with you</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-gray-800 rounded-lg">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="px-4 pt-4 pb-2 sticky top-0 bg-gray-900/95 backdrop-blur-md z-20 border-b border-white/5">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-gray-500 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
                </div>
                <input
                    type="text"
                    value={value} // 1. Set the visual value from our state
                    onChange={(e) => onChange(e.target.value)} // 2. Update the state on change
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-800/80 border border-gray-700/50 rounded-2xl text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 focus:bg-gray-800 transition-all text-base shadow-inner"
                    placeholder="Search title or lyrics..."
                />
            </div>
        </div>
    );
}


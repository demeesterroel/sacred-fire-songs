'use client';

import Link from 'next/link';
import { Home, Construction } from 'lucide-react';

interface UnderConstructionProps {
  title?: string;
  description?: string;
}

export default function UnderConstruction({
  title = "Under Construction",
  description = "Our musicians are currently harmonizing this area. Stay tuned!"
}: UnderConstructionProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-950 min-h-[60vh]">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
        <Construction className="w-24 h-24 text-amber-500 relative z-10" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 max-w-[320px] mb-12 leading-relaxed">
        {description}
      </p>

      <Link
        href="/"
        className="flex items-center gap-3 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-red-500/20 group"
      >
        <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        Back to the Hearth
      </Link>
    </div>
  );
}

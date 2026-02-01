'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCategoryTree } from '@/lib/taxonomyUtils';
import Link from 'next/link';
import { Waves, Leaf, MessageCircle, TreePine, FlaskConical, Sparkles, Loader2, Compass } from 'lucide-react';

const iconMap: Record<string, any> = {
  'the-elements': Waves,
  'nature': Leaf,
  'languages': MessageCircle,
  'lineage-tradition': TreePine,
  'medicine-healing': FlaskConical,
  'spiritual-concepts': Sparkles
};

const getColorClass = (slug: string) => {
  if (slug === 'the-elements') return 'blue';
  if (slug === 'nature') return 'green';
  if (slug === 'languages') return 'purple';
  if (slug === 'lineage-tradition') return 'amber';
  if (slug === 'medicine-healing') return 'red';
  if (slug === 'spiritual-concepts') return 'indigo';
  return 'gray';
};

export default function ExplorePage() {
  const { data: tree = [], isLoading } = useQuery({
    queryKey: ['taxonomy'],
    queryFn: fetchCategoryTree,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Helper for specific ordering
  const order = ["The Elements", "Nature", "Languages", "Lineage & Tradition", "Medicine & Healing", "Spiritual Concepts"];
  const sortedTree = [...tree].sort((a, b) => {
    const indexA = order.indexOf(a.name);
    const indexB = order.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <main className="flex-1 min-h-0 bg-gray-950 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg border border-gray-800">
              <Compass className="w-5 h-5 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Explore Categories</h2>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedTree.map(category => {
            const Icon = iconMap[category.slug] || Compass;
            const color = getColorClass(category.slug);

            // Dynamic tailwind class construction is tricky without safelist, 
            // but let's try to map to safe classes or inline styles if needed.
            // Since I don't want to break things, I'll use standard classes conditionally.

            let bgClass = "hover:border-gray-700";
            let iconBgClass = "bg-gray-800 text-gray-500";
            let textClass = "group-hover:text-white";

            if (color === 'blue') {
              bgClass = "hover:border-blue-500/40 shadow-blue-900/10";
              iconBgClass = "bg-blue-500/10 text-blue-500";
              textClass = "group-hover:text-blue-400";
            } else if (color === 'green') {
              bgClass = "hover:border-green-500/40 shadow-green-900/10";
              iconBgClass = "bg-green-500/10 text-green-500";
              textClass = "group-hover:text-green-400";
            } else if (color === 'purple') {
              bgClass = "hover:border-purple-500/40 shadow-purple-900/10";
              iconBgClass = "bg-purple-500/10 text-purple-500";
              textClass = "group-hover:text-purple-400";
            } else if (color === 'amber') {
              bgClass = "hover:border-amber-500/40 shadow-amber-900/10";
              iconBgClass = "bg-amber-500/10 text-amber-500";
              textClass = "group-hover:text-amber-400";
            } else if (color === 'red') {
              bgClass = "hover:border-red-500/40 shadow-red-900/10";
              iconBgClass = "bg-red-500/10 text-red-500";
              textClass = "group-hover:text-red-400";
            } else if (color === 'indigo') {
              bgClass = "hover:border-indigo-500/40 shadow-indigo-900/10";
              iconBgClass = "bg-indigo-500/10 text-indigo-500";
              textClass = "group-hover:text-indigo-400";
            }

            return (
              <div key={category.id} className="category-card group flex flex-col h-full">
                <div className={`glass-panel relative p-6 rounded-3xl border border-gray-800/50 transition-all h-full shadow-2xl ${bgClass}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`category-icon w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 ${iconBgClass}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-3xl">{category.emoji || '📂'}</span>
                  </div>

                  <Link href={`/songs?category=${category.slug}`} className="before:absolute before:inset-0 z-0 block">
                    <h3 className={`text-xl font-bold text-white mb-3 transition-colors ${textClass}`}>
                      {category.name}
                    </h3>
                  </Link>

                  {/* Ideally we would have a description/flavour_text here. The fetchCategoryTree didn't select it. I will settle for generic or add it to fetch properties later if desired. */}
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed relative z-0">
                    Explore songs related to {category.name.toLowerCase()}.
                  </p>

                  <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                    {category.children.map(tag => (
                      <Link
                        key={tag.id}
                        href={`/songs?tag=${tag.slug}`}
                        className="px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 text-xs font-medium border border-gray-700 hover:bg-gray-700 hover:text-white transition-all"
                      >
                        {tag.emoji} {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

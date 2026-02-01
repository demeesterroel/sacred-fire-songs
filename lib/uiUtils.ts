export const getCategoryColor = (slug: string) => {
  // Top-level categories (Headers)
  if (slug === 'the-elements') return 'blue';
  if (slug === 'nature') return 'emerald';
  if (slug === 'languages') return 'red';
  if (slug === 'lineage-tradition') return 'amber';
  if (slug === 'medicine-healing') return 'indigo';
  if (slug === 'spiritual-concepts') return 'gray'; // or 'yellow'

  // Sub-categories (Tags) - heuristic
  if (slug.includes('water') || slug.includes('blue')) return 'blue';
  if (slug.includes('fire') || slug.includes('red')) return 'red';
  if (slug.includes('earth') || slug.includes('amber')) return 'amber';
  if (slug.includes('air') || slug.includes('slate')) return 'slate';
  if (slug.includes('nature') || slug.includes('green') || slug.includes('plant') || slug.includes('selva')) return 'emerald';
  if (slug.includes('sun') || slug.includes('yellow')) return 'yellow';
  if (slug.includes('moon') || slug.includes('indigo')) return 'indigo';
  return 'gray'; // Default
};

export const getCategoryStyles = (color: string) => {
  const styles: Record<string, { active: string, inactive: string, pill: string }> = {
    blue: {
      active: 'bg-blue-600 text-white border-blue-500',
      inactive: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
      pill: 'bg-blue-900/20 text-blue-400 border border-blue-900/30'
    },
    red: {
      active: 'bg-red-600 text-white border-red-500',
      inactive: 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20',
      pill: 'bg-red-900/20 text-red-500 border border-red-900/30'
    },
    amber: {
      active: 'bg-amber-600 text-white border-amber-500',
      inactive: 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20',
      pill: 'bg-amber-900/20 text-amber-500 border border-amber-900/30'
    },
    slate: {
      active: 'bg-slate-600 text-white border-slate-500',
      inactive: 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20',
      pill: 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
    },
    emerald: {
      active: 'bg-emerald-600 text-white border-emerald-500',
      inactive: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
      pill: 'bg-emerald-900/20 text-emerald-400 border border-emerald-900/30'
    },
    yellow: {
      active: 'bg-yellow-600 text-white border-yellow-500',
      inactive: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20',
      pill: 'bg-yellow-900/20 text-yellow-500 border border-yellow-900/30'
    },
    indigo: {
      active: 'bg-indigo-600 text-white border-indigo-500',
      inactive: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20',
      pill: 'bg-indigo-900/20 text-indigo-400 border border-indigo-900/30'
    },
    teal: {
      active: 'bg-teal-600 text-white border-teal-500',
      inactive: 'bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20',
      pill: 'bg-teal-900/20 text-teal-400 border border-teal-900/30'
    },
    purple: {
      active: 'bg-purple-600 text-white border-purple-500',
      inactive: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
      pill: 'bg-purple-900/20 text-purple-400 border border-purple-900/30'
    },
    gray: {
      active: 'bg-gray-600 text-white border-gray-500',
      inactive: 'bg-gray-700/50 text-gray-400 border-gray-700 hover:bg-gray-700',
      pill: 'bg-gray-800 text-gray-400 border border-gray-700'
    },
  };
  return styles[color] || styles.gray;
}

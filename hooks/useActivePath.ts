'use client';

import { usePathname } from 'next/navigation';

export function useActivePath() {
  const pathname = usePathname();

  const isActive = (path: string, options?: { exact?: boolean; exclude?: readonly string[] }) => {
    if (options?.exact) return pathname === path;
    if (options?.exclude?.some(ex => pathname?.startsWith(ex))) return false;
    return pathname?.startsWith(path);
  };

  return { pathname, isActive };
}

'use client';

import { LucideIcon, Waves, Leaf, MessageCircle, TreePine, FlaskConical, Sparkles, Compass } from 'lucide-react';

/**
 * Map of icon names to Lucide icon components
 * Used for rendering category icons from database icon_name field
 */
const ICON_MAP: Record<string, LucideIcon> = {
  'Waves': Waves,
  'Leaf': Leaf,
  'MessageCircle': MessageCircle,
  'TreePine': TreePine,
  'FlaskConical': FlaskConical,
  'Sparkles': Sparkles,
  'Compass': Compass,
};

/**
 * Get Lucide icon component from icon name
 * @param iconName - Name of the Lucide icon (e.g., 'Waves', 'Leaf')
 * @returns Lucide icon component or null if not found
 */
export function getIconComponent(iconName: string | null | undefined): LucideIcon | null {
  if (!iconName) return null;
  return ICON_MAP[iconName] || null;
}

/**
 * Render icon with fallback to emoji
 * Prioritizes Lucide icon if icon_name is provided, otherwise shows emoji
 * 
 * @param iconName - Lucide icon name from database
 * @param emoji - Emoji fallback from database
 * @param className - CSS classes for the icon
 * @param emojiClassName - CSS classes for the emoji (if used as fallback)
 * @returns JSX element with icon or emoji
 */
export function renderCategoryIcon(
  iconName: string | null | undefined,
  emoji: string | null | undefined,
  className: string = 'w-8 h-8',
  emojiClassName: string = 'text-3xl'
) {
  const Icon = getIconComponent(iconName);

  if (Icon) {
    return <Icon className={className} />;
  }

  return <span className={emojiClassName}>{emoji || '📂'}</span>;
}

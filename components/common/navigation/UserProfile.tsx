'use client';

import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileProps {
  onLogout?: () => void;
  layout?: 'sidebar' | 'mobile' | 'header';
  showText?: boolean;
}

export const UserProfile = ({ onLogout, layout = 'sidebar', showText = true }: UserProfileProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  const isMobile = layout === 'mobile';
  const isHeader = layout === 'header';

  return (
    <div className={`flex items-center gap-2 ${isHeader ? 'bg-gray-800/40 p-1.5 pl-2.5 rounded-2xl border border-gray-700/50 hover:bg-gray-800/60 transition-colors' : ''}`}>
      <div className={`
        ${(isMobile || isHeader) ? 'w-8 h-8' : 'w-8 h-8'} 
        rounded-full bg-red-900/40 flex items-center justify-center 
        ${(isMobile || isHeader) ? 'text-xs' : 'text-xs'} 
        font-bold text-red-400 ring-1 ring-red-500/20 shadow-inner
      `}>
        {user ? (user.email?.charAt(0).toUpperCase() || '?') : '?'}
      </div>
      {(showText || isHeader) && (
        <div className={`flex-1 min-w-0 ${isHeader ? 'max-w-[120px] lg:max-w-none' : ''}`}>
          <p className={`${(isMobile || isHeader) ? 'text-[11px]' : 'text-[11px]'} font-bold text-white truncate leading-tight`}>
            {user ? (user.email?.split('@')[0] || 'Member') : 'Guest'}
          </p>
          <p className={`${(isMobile || isHeader) ? 'text-[9px]' : 'text-[9px]'} text-gray-500 truncate leading-tight`} title={user?.id || ''}>
            {user ? (user.email || 'Not Logged In') : 'Welcome, Guest'}
          </p>
        </div>
      )}
      {user && (showText || isHeader) && (
        <button
          onClick={handleLogout}
          title="Log Out"
          className={`group ${isMobile ? 'p-2 bg-gray-800/50 rounded-lg' : isHeader ? 'p-1.5 ml-1' : ''}`}
        >
          <LogOut className={`${(isMobile || isHeader) ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-gray-600 group-hover:text-red-400 transition-colors`} />
        </button>
      )}
    </div>
  );
};

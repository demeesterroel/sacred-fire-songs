'use client';

import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileProps {
  onLogout?: () => void;
  layout?: 'sidebar' | 'mobile';
  showText?: boolean;
}

export const UserProfile = ({ onLogout, layout = 'sidebar', showText = true }: UserProfileProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onLogout?.();
  };

  const isMobile = layout === 'mobile';

  return (
    <div className={`flex items-center gap-3 ${isMobile ? '' : ''}`}>
      <div className={`${isMobile ? 'w-10 h-10' : 'w-8 h-8'} rounded-full bg-red-900/40 flex items-center justify-center ${isMobile ? 'text-sm' : 'text-xs'} font-bold text-red-400 ring-1 ring-red-500/20 shadow-inner`}>
        {user ? (user.email?.charAt(0).toUpperCase() || '?') : '?'}
      </div>
      {showText && (
        <div className="flex-1 min-w-0">
          <p className={`${isMobile ? 'text-sm' : 'text-[11px]'} font-bold text-white truncate`}>
            {user ? (user.email?.split('@')[0] || 'Member') : 'Guest'}
          </p>
          <p className={`${isMobile ? 'text-[10px]' : 'text-[9px]'} text-gray-500 truncate`} title={user?.id || ''}>
            {user ? (user.email || 'Not Logged In') : 'Welcome, Guest'}
          </p>
        </div>
      )}
      {user && showText && (
        <button
          onClick={handleLogout}
          title="Log Out"
          className={`group ${isMobile ? 'p-2 bg-gray-800/50 rounded-lg' : ''}`}
        >
          <LogOut className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4'} text-gray-600 group-hover:text-red-400 transition-colors`} />
        </button>
      )}
    </div>
  );
};

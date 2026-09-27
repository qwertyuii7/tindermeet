import React from 'react';
import { MEETME_LOGO_URL } from '../data/mockData';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'deck' | 'matches' | 'radar' | 'profile';
  userProfile: UserProfile;
  streakCount: number;
  onOpenFilter: () => void;
  onNavigateTab: (tab: 'deck' | 'matches' | 'radar' | 'profile') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  userProfile,
  streakCount,
  onOpenFilter,
  onNavigateTab,
}) => {
  const getSubTitle = () => {
    switch (currentTab) {
      case 'deck':
        return '// Swipe Deck';
      case 'matches':
        return '// Matches & Chats';
      case 'radar':
        return '// Venue Radar';
      case 'profile':
        return '// Collector Profile';
      default:
        return '';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0d0e15]/85 backdrop-blur-xl pt-safe shadow-[0_4px_24px_rgba(0,0,0,0.6)] border-b border-white/5">
      <div className="h-16 px-4 flex items-center justify-between gap-3 max-w-lg mx-auto w-full">
        {/* Logo & Brand Zone */}
        <div 
          onClick={() => onNavigateTab('deck')}
          className="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer group"
        >
          <img
            alt="MeetMe Electric Emblem"
            className="h-8 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
            src={MEETME_LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-[19px] font-bold tracking-tight text-white truncate">
                MeetMe
              </span>
              <span className="hidden sm:inline font-mono text-[11px] text-[#e3bebe] uppercase tracking-wider">
                {getSubTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Actions & Streak Cluster */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Streak Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#292931] shadow-[inset_0_0_12px_rgba(202,243,0,0.15)] border border-[#caf300]/20">
            <span className="text-[#ff5167] text-[13px] leading-none">🔥</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#caf300] font-semibold">
              {streakCount} Streak
            </span>
          </div>

          {/* Filter Trigger */}
          <button
            aria-label="Filter Attendees"
            onClick={onOpenFilter}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1e1f27] hover:bg-[#383941] text-[#e3e1ec] active:scale-95 transition-all border border-white/5"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>

          {/* User Profile Avatar Link */}
          <button
            onClick={() => onNavigateTab('profile')}
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95 ${
              currentTab === 'profile' ? 'ring-2 ring-[#caf300]' : ''
            }`}
            title="View Profile"
            type="button"
          >
            <img
              alt="Elena Vance Profile"
              className="w-8 h-8 rounded-full object-cover border border-white/10"
              src={userProfile.photo}
            />
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-[#caf300] shadow-[0_0_8px_#caf300] border border-[#12131a]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

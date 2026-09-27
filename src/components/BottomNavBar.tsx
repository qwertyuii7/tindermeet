import React from 'react';

interface BottomNavBarProps {
  currentTab: 'deck' | 'matches' | 'radar' | 'profile';
  matchCount: number;
  onSelectTab: (tab: 'deck' | 'matches' | 'radar' | 'profile') => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  matchCount,
  onSelectTab,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#0d0e15]/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.7)] border-t border-white/5">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto w-full">
        {/* Tab 1: Deck */}
        <button
          onClick={() => onSelectTab('deck')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all relative ${
            currentTab === 'deck'
              ? "text-[#caf300] after:content-[''] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#caf300] after:shadow-[0_0_8px_#caf300]"
              : 'text-[#e3bebe]/60 hover:text-[#e3e1ec]'
          }`}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">style</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff5167] shadow-[0_0_6px_#ff5167]"></span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Deck</span>
        </button>

        {/* Tab 2: Matches */}
        <button
          onClick={() => onSelectTab('matches')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all relative ${
            currentTab === 'matches'
              ? "text-[#caf300] after:content-[''] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#caf300] after:shadow-[0_0_8px_#caf300]"
              : 'text-[#e3bebe]/60 hover:text-[#e3e1ec]'
          }`}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">bolt</span>
            <span className="absolute -top-1.5 -right-2.5 px-1 py-0.2 rounded-full bg-[#ff5167] text-[#5b0015] font-mono text-[9px] font-bold leading-none shadow-[0_0_8px_rgba(255,81,103,0.6)]">
              {matchCount}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Matches</span>
        </button>

        {/* Tab 3: Radar */}
        <button
          onClick={() => onSelectTab('radar')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all relative ${
            currentTab === 'radar'
              ? "text-[#caf300] after:content-[''] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#caf300] after:shadow-[0_0_8px_#caf300]"
              : 'text-[#e3bebe]/60 hover:text-[#e3e1ec]'
          }`}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">near_me</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Radar</span>
        </button>

        {/* Tab 4: Profile */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 w-16 h-14 transition-all relative ${
            currentTab === 'profile'
              ? "text-[#caf300] after:content-[''] after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-[#caf300] after:shadow-[0_0_8px_#caf300]"
              : 'text-[#e3bebe]/60 hover:text-[#e3e1ec]'
          }`}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">badge</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Profile</span>
        </button>
      </div>
    </nav>
  );
};

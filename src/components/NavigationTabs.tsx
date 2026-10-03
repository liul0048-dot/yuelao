import React from 'react';
import { ScreenState } from '../types';
import { templeAudio } from '../utils/audio';

export type TabId = 'prayer' | 'wall' | 'echo' | 'ethos';

interface NavigationTabsProps {
  currentScreen: ScreenState;
  onSelectTab: (tabId: TabId) => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  currentScreen,
  onSelectTab,
}) => {
  // Determine active tab based on current screen
  const getActiveTab = (): TabId => {
    switch (currentScreen) {
      case 'welcome':
      case 'sensor-connect':
      case 'prayer':
      case 'your-moon':
        return 'prayer';
      case 'moon-wall':
      case 'connection':
        return 'wall';
      case 'notification':
      case 'reflection':
        return 'echo';
      case 'ethos':
        return 'ethos';
      default:
        return 'prayer';
    }
  };

  const activeTab = getActiveTab();

  const handleTabClick = (tabId: TabId) => {
    if (tabId === activeTab) return;
    templeAudio.playBell(528, 2.0);
    onSelectTab(tabId);
  };

  return (
    <nav
      className="relative w-full flex-shrink-0 h-14 z-40 bg-[#FAF2E9]/98 backdrop-blur-md border-t border-[#AD6354]/25 shadow-lg shadow-[#8B3327]/5 select-none"
      aria-label="主要導覽 (Main Navigation)"
    >
      <div className="grid grid-cols-4 items-center h-14 px-1">
        {/* Tab 1: 祈願 (Prayer) */}
        <button
          onClick={() => handleTabClick('prayer')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            activeTab === 'prayer' ? 'text-[#8B3327]' : 'text-[#AD6354]/75 hover:text-[#8B3327]'
          }`}
          aria-selected={activeTab === 'prayer'}
        >
          {/* Incense / Sacred Flame Icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={activeTab === 'prayer' ? 2.2 : 1.7}>
            <path d="M12 2C10 6 8 8 8 11a4 4 0 0 0 8 0c0-3-2-5-4-9z" fill={activeTab === 'prayer' ? '#8B3327' : 'none'} fillOpacity="0.15" />
            <path d="M12 15v7" strokeLinecap="round" />
            <path d="M9 18v4" strokeLinecap="round" opacity="0.6" />
            <path d="M15 18v4" strokeLinecap="round" opacity="0.6" />
          </svg>
          <span className="text-[10px] font-serif-tc tracking-wider mt-0.5 font-medium leading-none">
            祈願
          </span>
          {activeTab === 'prayer' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#D74A3E]" />
          )}
        </button>

        {/* Tab 2: 月牆 (Moon Wall) */}
        <button
          onClick={() => handleTabClick('wall')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            activeTab === 'wall' ? 'text-[#8B3327]' : 'text-[#AD6354]/75 hover:text-[#8B3327]'
          }`}
          aria-selected={activeTab === 'wall'}
        >
          {/* Glowing Full Crescent Moon Icon */}
          <div className="relative flex items-center justify-center w-5 h-5">
            {activeTab === 'wall' && (
              <span className="absolute inset-0 rounded-full bg-[#8B3327]/20 blur-xs animate-pulse" />
            )}
            <svg viewBox="0 0 24 24" className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" strokeWidth={activeTab === 'wall' ? 2 : 1.6}>
              <path
                d="M12 4.5 C16.5 4.5 20 8 20 12.5 C20 17 16.5 20.5 12 20.5 C15.2 18.5 16.8 15.5 16.8 12.5 C16.8 9.5 15.2 6.5 12 4.5 Z"
                fill={activeTab === 'wall' ? '#8B3327' : 'none'}
                fillOpacity={activeTab === 'wall' ? 0.9 : 0}
              />
            </svg>
          </div>
          <span className="text-[10px] font-serif-tc tracking-wider mt-0.5 font-medium leading-none">
            月牆
          </span>
          {activeTab === 'wall' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#D74A3E]" />
          )}
        </button>

        {/* Tab 3: 迴響 (Echoes / Notice) */}
        <button
          onClick={() => handleTabClick('echo')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            activeTab === 'echo' ? 'text-[#8B3327]' : 'text-[#AD6354]/75 hover:text-[#8B3327]'
          }`}
          aria-selected={activeTab === 'echo'}
        >
          {/* Red Thread Heart / Knot Icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={activeTab === 'echo' ? 2.2 : 1.7}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill={activeTab === 'echo' ? '#8B3327' : 'none'} fillOpacity="0.15" />
            <circle cx="12" cy="11" r="1.5" fill="#D74A3E" />
          </svg>
          <span className="text-[10px] font-serif-tc tracking-wider mt-0.5 font-medium leading-none">
            迴響
          </span>
          {activeTab === 'echo' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#D74A3E]" />
          )}
        </button>

        {/* Tab 4: 緣起 (Temple Ethos) */}
        <button
          onClick={() => handleTabClick('ethos')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            activeTab === 'ethos' ? 'text-[#8B3327]' : 'text-[#AD6354]/75 hover:text-[#8B3327]'
          }`}
          aria-selected={activeTab === 'ethos'}
        >
          {/* Taiwanese Temple Roof Pavilion Icon */}
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={activeTab === 'ethos' ? 2.2 : 1.7}>
            <path d="M2 10c4-1 7-2 10-2s6 1 10 2c1-1 1-3 0-4-3 1-6 0-10 0S5 7 2 6c-1 1-1 3 0 4z" />
            <path d="M5 10v10M19 10v10M9 13h6M12 2v4" strokeLinecap="round" />
            <path d="M9 20h6" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] font-serif-tc tracking-wider mt-0.5 font-medium leading-none">
            緣起
          </span>
          {activeTab === 'ethos' && (
            <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#D74A3E]" />
          )}
        </button>
      </div>
    </nav>
  );
};

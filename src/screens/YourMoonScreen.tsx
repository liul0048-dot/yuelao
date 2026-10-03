import React, { useState, useEffect } from 'react';
import { MoonTile } from '../components/MoonTile';
import { MoonTileData } from '../types';
import { templeAudio } from '../utils/audio';

interface YourMoonScreenProps {
  userMoon: MoonTileData;
  onPlaceMoon: () => void;
}

export const YourMoonScreen: React.FC<YourMoonScreenProps> = ({
  userMoon,
  onPlaceMoon,
}) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
      templeAudio.playBell(528, 3.8);
    }, 350);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE STATUS (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider">
            第一階段 · 祈願圓滿
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E8B54]" />
            <span className="text-[10px] font-serif-tc text-[#3E8B54]">月光凝聚</span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-3">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            Y O U R &nbsp; M O O N
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            這是你的月光
          </h2>
          <span className="font-cormorant italic text-xs sm:text-sm text-[#8B3327]/80 tracking-wide mt-0.5">
            This is Your Moon
          </span>
        </div>
      </div>

      {/* MAIN INTERACTION AREA (The Physical Hexagon Ceramic Tile with Crescent) */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 my-auto">
        <div
          className={`transition-all duration-1000 transform ${
            revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-3'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <MoonTile
              id={userMoon.moonId}
              colorTone={userMoon.colorTone}
              brightness={userMoon.brightness}
              size={135}
              isUserMoon={true}
              pulsing={true}
            />

            {/* Anonymous ID badge */}
            <div className="mt-3.5 flex flex-col items-center">
              <span className="font-serif-tc text-lg tracking-[0.25em] text-[#6C271B] font-medium pl-1">
                {userMoon.moonId}
              </span>
              <span className="font-cormorant text-[10px] text-[#AD6354] tracking-widest uppercase">
                Hexagonal Ceramic Moon
              </span>
            </div>

            <p className="font-serif-tc text-xs text-[#5D241C] tracking-wide mt-2 text-center">
              「你的祈願，在殿堂留下了一道光。」
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION AREA */}
      <div className="relative z-10 w-full max-w-xs flex-shrink-0 pb-2 px-4 flex flex-col items-center">
        <button
          onClick={() => {
            templeAudio.playBell(432, 3.0);
            onPlaceMoon();
          }}
          className="w-full py-3 px-6 rounded-2xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/20 flex flex-col items-center justify-center cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
        >
          <span className="font-serif-tc text-base font-medium tracking-widest">
            把月光留下
          </span>
          <span className="font-cormorant text-[10px] text-[#FAF2E9]/75 tracking-wider uppercase">
            Place My Moon
          </span>
        </button>

        <p className="text-center text-[10px] font-serif-tc text-[#AD6354]/75 mt-1.5 tracking-wider">
          將月磚嵌上月牆，與廟宇眾人的月光靜靜相伴
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { TempleBackground } from '../components/TempleBackground';
import { MoonTile } from '../components/MoonTile';
import { templeAudio } from '../utils/audio';
import { zenMusic } from '../utils/zenMusic';

interface WelcomeScreenProps {
  onBegin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onBegin }) => {
  const handleStart = () => {
    zenMusic.play().catch(() => {});
    templeAudio.playBell(396, 3.0);
    onBegin();
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      <TempleBackground showFullPosterElements={true} opacity={0.88} />

      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE TEMPLE BADGE (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B3327]" />
            <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider font-medium">
              月老殿宇 · 心弦裝置
            </span>
          </div>

          <div className="w-4 h-4 rounded border border-[#8B3327]/30 flex items-center justify-center">
            <span className="text-[9px] font-serif-tc text-[#8B3327]">月</span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-3">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.28em] text-[#AD6354] uppercase font-semibold">
            L O V E &nbsp; T H R E A D S
          </span>
          <h1 className="font-calligraphy text-4xl sm:text-5xl text-[#6C271B] tracking-wider mb-0.5 drop-shadow-sm select-none">
            月下心弦
          </h1>
          <span className="font-cormorant italic text-xs sm:text-sm text-[#8B3327]/80 tracking-wide">
            A Silent Resonance Installation
          </span>

          {/* Thin decorative thread spacer */}
          <div className="relative w-28 h-2 mt-1 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D74A3E]/70 to-transparent" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#D74A3E]" />
          </div>
        </div>
      </div>

      {/* MAIN INTERACTION AREA (Hero Moon Tile & Quote) */}
      <div className="relative z-10 flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 my-auto">
        <div className="animate-subtle-float relative">
          <MoonTile
            colorTone="ivory"
            brightness={0.88}
            size={135}
            pulsing={true}
          />
        </div>

        <div className="mt-2.5 text-center px-4 max-w-xs">
          <p className="font-serif-tc text-base sm:text-lg text-[#5D241C] leading-snug tracking-wider mb-1 font-medium">
            「讓陌生人的一點光，<br />
            接住你的心意。」
          </p>
          <p className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide">
            “Let another person's light remind you that you are not alone.”
          </p>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTON AREA */}
      <div className="relative z-10 w-full max-w-xs flex-shrink-0 pb-2 px-4 flex flex-col items-center">
        <button
          onClick={handleStart}
          className="group w-full py-3 px-6 rounded-2xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/20 flex flex-col items-center justify-center cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
        >
          <span className="font-serif-tc text-base font-medium tracking-widest flex items-center gap-2">
            開始祈願
          </span>
          <span className="font-cormorant text-[10px] text-[#FAF2E9]/75 tracking-wider uppercase">
            Begin Journey
          </span>
        </button>

        <p className="text-center text-[10px] font-serif-tc text-[#AD6354]/80 mt-1.5 tracking-widest">
          月老廟 · 無聲共鳴體驗
        </p>
      </div>
    </div>
  );
};

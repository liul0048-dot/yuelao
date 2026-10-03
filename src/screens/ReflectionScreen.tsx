import React, { useState } from 'react';
import { MoonTile } from '../components/MoonTile';
import { MoonTileData } from '../types';
import { templeAudio } from '../utils/audio';

interface ReflectionScreenProps {
  userMoon: MoonTileData;
  onPassItForward: () => void;
}

type ReflectionAnswer = 'a_little' | 'same' | 'not_sure';

export const ReflectionScreen: React.FC<ReflectionScreenProps> = ({
  userMoon,
  onPassItForward,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<ReflectionAnswer | null>(null);

  const handleSelect = (answer: ReflectionAnswer) => {
    setSelectedAnswer(answer);
    templeAudio.playBell(528, 3.2);
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#F3E4D6]/60 to-transparent blur-3xl pointer-events-none" />

      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE STATUS (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider">
            心緒映照 · 祈願回甘
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E8B54]" />
            <span className="text-[10px] font-serif-tc text-[#3E8B54]">心念沉澱</span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-2.5">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            I N W A R D &nbsp; R E F L E C T I O N
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            心緒歸返
          </h2>
          <span className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide mt-0.5">
            Restoring Balance
          </span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 flex-1 min-h-0 w-full max-w-sm flex flex-col items-center justify-center px-4 my-auto">
        <div className="mb-2 relative">
          <MoonTile
            id={userMoon.moonId}
            colorTone={userMoon.colorTone}
            brightness={Math.min(1, userMoon.brightness + 0.3)}
            size={95}
            isUserMoon={true}
            pulsing={true}
          />
        </div>

        {/* Question: 「此刻，你的心有沒有輕一點？」 */}
        <div className="text-center px-2 mb-2.5">
          <h3 className="font-serif-tc text-lg sm:text-xl text-[#6C271B] font-semibold leading-relaxed tracking-wider">
            「此刻，你的心有沒有輕一點？」
          </h3>
          <p className="font-cormorant italic text-xs text-[#AD6354]">
            “Does your heart feel a little lighter now?”
          </p>
        </div>

        {/* The 3 Simple Answer Buttons */}
        <div className="w-full grid grid-cols-3 gap-2">
          <button
            onClick={() => handleSelect('a_little')}
            className={`py-2 px-2 rounded-xl border text-xs font-serif-tc transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              selectedAnswer === 'a_little'
                ? 'bg-[#8B3327] text-[#FAF2E9] border-[#8B3327] shadow-sm'
                : 'bg-[#FAF2E9]/90 text-[#6C271B] border-[#AD6354]/30 hover:border-[#8B3327]/60'
            }`}
          >
            <span className="font-medium">輕了一點</span>
            <span className="font-cormorant text-[9px] opacity-75">A little</span>
          </button>

          <button
            onClick={() => handleSelect('same')}
            className={`py-2 px-2 rounded-xl border text-xs font-serif-tc transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              selectedAnswer === 'same'
                ? 'bg-[#8B3327] text-[#FAF2E9] border-[#8B3327] shadow-sm'
                : 'bg-[#FAF2E9]/90 text-[#6C271B] border-[#AD6354]/30 hover:border-[#8B3327]/60'
            }`}
          >
            <span className="font-medium">差不多</span>
            <span className="font-cormorant text-[9px] opacity-75">About same</span>
          </button>

          <button
            onClick={() => handleSelect('not_sure')}
            className={`py-2 px-2 rounded-xl border text-xs font-serif-tc transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
              selectedAnswer === 'not_sure'
                ? 'bg-[#8B3327] text-[#FAF2E9] border-[#8B3327] shadow-sm'
                : 'bg-[#FAF2E9]/90 text-[#6C271B] border-[#AD6354]/30 hover:border-[#8B3327]/60'
            }`}
          >
            <span className="font-medium">說不上來</span>
            <span className="font-cormorant text-[9px] opacity-75">Not sure</span>
          </button>
        </div>

        {/* Reassuring response after answer */}
        {selectedAnswer && (
          <div className="mt-2.5 p-2 bg-[#FAF2E9]/90 rounded-xl border border-[#AD6354]/25 text-center animate-in fade-in duration-300">
            <p className="font-serif-tc text-[11px] text-[#6C271B]">
              {selectedAnswer === 'a_little' &&
                '「很好，帶著這份輕盈，慢慢向前走吧。」'}
              {selectedAnswer === 'same' &&
                '「沒關係，有些心事需要一點時間，慢慢來就好。」'}
              {selectedAnswer === 'not_sure' &&
                '「不必急著找到答案，先好好感受此刻的自己。」'}
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM ACTION BUTTON */}
      <div className="relative z-10 w-full max-w-xs flex-shrink-0 pb-2 px-4 flex flex-col items-center">
        <button
          onClick={onPassItForward}
          className="w-full py-2.5 px-5 rounded-2xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
        >
          <span className="font-serif-tc text-xs sm:text-sm font-medium tracking-widest">
            回到月牆 · 漫步群月 →
          </span>
        </button>

        <p className="text-center text-[10px] font-serif-tc text-[#AD6354]/75 mt-1 tracking-wider">
          將這份被接住的心意，傳遞給下一位祈願者
        </p>
      </div>
    </div>
  );
};

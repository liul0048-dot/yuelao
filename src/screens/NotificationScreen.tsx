import React, { useState, useEffect } from 'react';
import { MoonTile } from '../components/MoonTile';
import { MoonTileData } from '../types';
import { templeAudio } from '../utils/audio';

interface NotificationScreenProps {
  userMoon: MoonTileData;
  onProceedToReflection: () => void;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  userMoon,
  onProceedToReflection,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    templeAudio.playNoticedWhisper();
    const t1 = setTimeout(() => setStep(2), 2000);
    const t2 = setTimeout(() => setStep(3), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      {/* Background Soft Lighting Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-b from-[#F3E4D6] via-[#D74A3E]/15 to-transparent blur-3xl pointer-events-none" />

      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE STATUS (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider">
            月牆回音 · 陌生人的相遇
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D74A3E] animate-pulse" />
            <span className="text-[10px] font-serif-tc text-[#8B3327]">光芒相應</span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-2.5">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            S I L E N T &nbsp; P R E S E N C E
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            無聲的接應
          </h2>
          <span className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide mt-0.5">
            Someone Saw Your Light
          </span>
        </div>
      </div>

      {/* CENTERPIECE */}
      <div className="relative z-10 flex-1 min-h-0 w-full max-w-sm flex flex-col items-center justify-center px-4 my-auto">
        <div className="relative mb-2">
          <MoonTile
            id={userMoon.moonId}
            colorTone={userMoon.colorTone}
            brightness={Math.min(1, userMoon.brightness + 0.35)}
            size={110}
            isUserMoon={true}
            pulsing={true}
          />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-[1.5px] h-6 bg-gradient-to-t from-[#D74A3E] to-transparent animate-pulse" />
        </div>

        {/* Traditional Warm Rice-Paper Letter / Card */}
        <div className="w-full bg-[#FAF2E9] rounded-2xl p-4 sm:p-5 shadow-md border border-[#AD6354]/30 relative overflow-hidden">
          <div className="w-5 h-5 rounded border border-[#8B3327]/30 flex items-center justify-center mb-1.5 mx-auto">
            <span className="text-[9px] font-serif-tc text-[#8B3327]">緣</span>
          </div>

          <div className="text-center space-y-1">
            <p className="font-serif-tc text-xs text-[#AD6354] tracking-wider">
              {step === 1 && '遠方傳來一縷幽微的共鳴…'}
              {step === 2 && '一位陌生祈願者的紅線觸碰了你的月光…'}
              {step === 3 && '「有人在月牆上看見了你的光。」'}
            </p>

            <h3 className="font-serif-tc text-base sm:text-lg text-[#6C271B] font-semibold leading-relaxed tracking-wider">
              「有人看見了你的光，<br />
              為你添了一點暖。」
            </h3>

            <p className="font-cormorant italic text-xs text-[#8B3327]/80">
              “Someone saw your light and answered your presence.”
            </p>
          </div>

          <div className="mt-2 pt-2 border-t border-[#AD6354]/20 flex items-center justify-between text-[10px] font-serif-tc text-[#AD6354]">
            <span>月牆相連 · 無言共鳴</span>
            <span>你的月磚亮度 +35%</span>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTON */}
      <div className="relative z-10 w-full max-w-xs flex-shrink-0 pb-2 px-4 flex flex-col items-center">
        <button
          onClick={onProceedToReflection}
          className="w-full py-2.5 px-5 rounded-2xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/20 flex items-center justify-center gap-2 cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
        >
          <span className="font-serif-tc text-xs sm:text-sm font-medium tracking-widest">
            靜心感受 · 映照心緒 →
          </span>
        </button>

        <p className="text-center text-[10px] font-serif-tc text-[#AD6354]/75 mt-1 tracking-wider">
          不留姓名，不留字句，僅僅是光與光的交會
        </p>
      </div>
    </div>
  );
};

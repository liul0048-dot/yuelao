import React, { useState, useEffect } from 'react';
import { IncenseArtwork } from '../components/IncenseArtwork';
import { templeAudio } from '../utils/audio';

interface PrayerScreenProps {
  physicalIntensity: number;
  gripStrength?: number;
  temperature?: number;
  onFinishPrayer: () => void;
  onBack?: () => void;
}

export const PrayerScreen: React.FC<PrayerScreenProps> = ({
  physicalIntensity,
  gripStrength = 42,
  temperature = 35.6,
  onFinishPrayer,
  onBack,
}) => {
  const [isFinishing, setIsFinishing] = useState(false);

  const handleFinish = () => {
    setIsFinishing(true);
    templeAudio.playPrayerComplete();
    setTimeout(() => {
      onFinishPrayer();
    }, 550);
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — BACK NAVIGATION (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          {onBack ? (
            <button
              onClick={onBack}
              className="text-xs font-serif-tc text-[#8B3327]/85 hover:text-[#8B3327] py-1 cursor-pointer flex items-center gap-1 transition-colors"
              title="返回感應器頁面"
            >
              ← <span>感應調控</span>
            </button>
          ) : (
            <div />
          )}

          {/* Connection status pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/30 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D74A3E] animate-pulse" />
            <span className="font-serif-tc text-[11px] text-[#8B3327] font-medium tracking-wider">
              心弦已連接
            </span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2.5">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            P R A Y E R &nbsp; C H A M B E R
          </span>
          <h2 className="font-serif-tc text-xl sm:text-2xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            執香祈願
          </h2>
          <span className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide mt-0.5">
            Hold Your Incense
          </span>
        </div>
      </div>

      {/* MAIN INTERACTION AREA (Hand holding incense & Sensor trace) */}
      <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col items-center justify-center px-4 my-auto">
        <div className="h-[25vh] max-h-[175px] min-h-[110px] aspect-[4/5] flex items-center justify-center">
          <IncenseArtwork isPraying={true} className="h-full w-auto" />
        </div>

        {/* Sacred guidance text */}
        <div className="text-center px-3 mt-1.5 max-w-xs">
          <h3 className="font-serif-tc text-base sm:text-lg text-[#6C271B] font-semibold leading-snug tracking-wider mb-1">
            「握著香，<br />
            想一想你真正想問月老的事。」
          </h3>
          <p className="font-cormorant italic text-xs text-[#AD6354] tracking-wide">
            “Hold the incense naturally. There is nothing you need to explain.”
          </p>
        </div>

        {/* Physical sensor trace readout */}
        <div className="mt-2 flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/20 text-[10px] font-serif-tc text-[#8B3327]">
          <span>握力 {gripStrength}</span>
          <span className="text-[#AD6354]/40">·</span>
          <span>指溫 {temperature.toFixed(1)}°C</span>
          <span className="text-[#AD6354]/40">·</span>
          <span className="text-[#AD6354]">靜心記錄中</span>
        </div>
      </div>

      {/* BOTTOM ACTION AREA */}
      <div className="relative z-10 w-full max-w-xs flex-shrink-0 pb-2 px-4 flex flex-col items-center">
        <button
          onClick={handleFinish}
          disabled={isFinishing}
          className="w-full py-2.5 px-6 rounded-2xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/20 flex flex-col items-center justify-center cursor-pointer border border-[#AD6354]/40 disabled:opacity-70"
        >
          <span className="font-serif-tc text-sm sm:text-base font-medium text-[#FAF2E9] tracking-widest">
            {isFinishing ? '凝聚月光中…' : '完成祈願'}
          </span>
          <span className="font-cormorant text-[10px] text-[#FAF2E9]/75 tracking-wider uppercase">
            Finish Prayer
          </span>
        </button>

        <p className="text-center text-[10px] font-serif-tc text-[#AD6354]/75 mt-1 tracking-wider">
          將你心中的問句，化作一片專屬的月
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { TempleBackground } from '../components/TempleBackground';
import { templeAudio } from '../utils/audio';

interface EthosScreenProps {
  onGoToPrayer: () => void;
  onGoToWall: () => void;
}

export const EthosScreen: React.FC<EthosScreenProps> = ({
  onGoToPrayer,
  onGoToWall,
}) => {
  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-rice-paper-grain select-none">
      <TempleBackground showFullPosterElements={true} opacity={0.65} />

      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE STATUS (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider">
            理念緣起 · 展覽心法
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B3327]" />
            <span className="text-[10px] font-serif-tc text-[#8B3327]">當代轉化</span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-2.5">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            C O N C E P T &nbsp; & &nbsp; E T H O S
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            緣起 · 月下心弦
          </h2>
          <span className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide mt-0.5">
            Contemporary Temple Installation
          </span>
        </div>
      </div>

      {/* MAIN NARRATIVE CONTENT */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex-1 min-h-0 flex flex-col justify-center px-4 my-auto space-y-2">
        {/* Core Philosophical Quote Card */}
        <div className="bg-[#FAF2E9]/95 rounded-xl p-3 sm:p-3.5 border border-[#AD6354]/30 shadow-xs text-center relative overflow-hidden">
          <p className="font-serif-tc text-sm sm:text-base text-[#6C271B] leading-relaxed tracking-wider font-medium mb-1">
            「你不需要知道我的故事，<br />
            也可以讓我知道，我不是一個人。」
          </p>
          <p className="font-cormorant italic text-[11px] text-[#8B3327]/80">
            “You do not need to know my story to let me know I am not alone.”
          </p>
        </div>

        {/* 3 Core Minimalist Pillars */}
        <div className="space-y-1.5">
          {/* Pillar 1: 六角月磚 */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF2E9]/85 border border-[#AD6354]/20">
            <div className="w-6 h-6 rounded-lg bg-[#8B3327]/10 flex items-center justify-center text-[#8B3327] font-serif-tc text-[11px] font-semibold shrink-0">
              月
            </div>
            <div>
              <h3 className="font-serif-tc text-xs font-semibold text-[#6C271B]">
                六角實體月磚
              </h3>
              <p className="font-serif-tc text-[10px] text-[#5D241C]/80 leading-tight">
                陶瓷雕塑般的六角磚石，祈願後嵌上月牆，靜候紅線相繫。
              </p>
            </div>
          </div>

          {/* Pillar 2: 隱微共鳴 */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF2E9]/85 border border-[#AD6354]/20">
            <div className="w-6 h-6 rounded-lg bg-[#D74A3E]/10 flex items-center justify-center text-[#D74A3E] font-serif-tc text-[11px] font-semibold shrink-0">
              線
            </div>
            <div>
              <h3 className="font-serif-tc text-xs font-semibold text-[#6C271B]">
                無聲情感交會
              </h3>
              <p className="font-serif-tc text-[10px] text-[#5D241C]/80 leading-tight">
                非配對、非社交。僅由月老紅線在月光之間引發微溫共鳴。
              </p>
            </div>
          </div>

          {/* Pillar 3: 當代儀式 */}
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FAF2E9]/85 border border-[#AD6354]/20">
            <div className="w-6 h-6 rounded-lg bg-[#8B3327]/10 flex items-center justify-center text-[#8B3327] font-serif-tc text-[11px] font-semibold shrink-0">
              殿
            </div>
            <div>
              <h3 className="font-serif-tc text-xs font-semibold text-[#6C271B]">
                傳統廟宇的當代轉化
              </h3>
              <p className="font-serif-tc text-[10px] text-[#5D241C]/80 leading-tight">
                以沉靜聲景與月相，承接青年世代未說出口的心事。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex-shrink-0 pb-2 px-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            templeAudio.playBell(396, 2.5);
            onGoToPrayer();
          }}
          className="py-2.5 px-3 rounded-xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] text-[#FAF2E9] text-xs font-serif-tc tracking-wider transition-all shadow-xs text-center cursor-pointer"
        >
          前往執香祈願 →
        </button>

        <button
          onClick={() => {
            templeAudio.playBell(528, 2.5);
            onGoToWall();
          }}
          className="py-2.5 px-3 rounded-xl bg-[#FAF2E9] hover:bg-[#FAF2E9]/80 border border-[#AD6354]/40 text-[#8B3327] text-xs font-serif-tc tracking-wider transition-all shadow-xs text-center cursor-pointer"
        >
          瀏覽殿宇月牆 →
        </button>
      </div>
    </div>
  );
};

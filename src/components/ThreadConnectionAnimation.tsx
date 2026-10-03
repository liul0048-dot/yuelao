import React, { useEffect, useState } from 'react';
import { MoonTile } from './MoonTile';
import { MoonTileData } from '../types';
import { templeAudio } from '../utils/audio';

interface ThreadConnectionAnimationProps {
  userMoon: MoonTileData;
  targetMoon: MoonTileData;
  onComplete: () => void;
  onProceedToNotification: () => void;
}

export const ThreadConnectionAnimation: React.FC<ThreadConnectionAnimationProps> = ({
  userMoon,
  targetMoon,
  onComplete,
  onProceedToNotification,
}) => {
  const [phase, setPhase] = useState<'traveling' | 'connected' | 'deepened'>('traveling');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2600;

    const frame = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(1, elapsed / duration);
      setProgress(pct);

      if (pct < 1) {
        requestAnimationFrame(frame);
      } else {
        setPhase('connected');
        templeAudio.playThreadConnect();
        setTimeout(() => {
          setPhase('deepened');
          onComplete();
        }, 900);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#D74A3E]/10 blur-3xl pointer-events-none" />

      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE STATUS (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider">
            月下相繫 · 紅線微溫
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D74A3E] animate-pulse" />
            <span className="text-[10px] font-serif-tc text-[#8B3327]">
              {phase === 'traveling' ? '延展中' : '已交會'}
            </span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-2.5">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            R E D &nbsp; T H R E A D
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            {phase === 'traveling' ? '心弦延展中…' : '月光相連'}
          </h2>
          <span className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide mt-0.5">
            {phase === 'traveling' ? 'Extending Across the Wall' : 'Two Lights Deepen Together'}
          </span>
        </div>
      </div>

      {/* MAIN VISUAL STAGE */}
      <div className="relative z-10 w-full max-w-sm flex-1 min-h-0 flex flex-col items-center justify-center px-4 my-auto">
        <div className="relative w-full h-[30vh] max-h-[210px] min-h-[150px] flex items-center justify-center">
          <svg
            viewBox="0 0 320 220"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            fill="none"
          >
            <defs>
              <filter id="threadGlow4" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" />
              </filter>
            </defs>

            {/* Traveling Living Red Thread */}
            <path
              d="M 80 70 C 130 110, 190 100, 240 150"
              stroke="#D74A3E"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={260}
              strokeDashoffset={260 * (1 - progress)}
              className="filter drop-shadow-sm"
            />

            {/* Soft thread aura glow */}
            <path
              d="M 80 70 C 130 110, 190 100, 240 150"
              stroke="#D74A3E"
              strokeWidth="5"
              strokeOpacity={0.35 * progress}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={260}
              strokeDashoffset={260 * (1 - progress)}
              filter="url(#threadGlow4)"
            />

            {/* Spark of light moving along the thread tip */}
            {progress > 0 && progress < 1 && (
              <circle
                cx={80 + (240 - 80) * progress + Math.sin(progress * Math.PI) * 12}
                cy={70 + (150 - 70) * progress}
                r="3"
                fill="#FFF8EE"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* User's Moon (Top-Left) */}
          <div className="absolute top-2 left-4 z-20 flex flex-col items-center">
            <MoonTile
              id={userMoon.moonId}
              colorTone={userMoon.colorTone}
              brightness={phase !== 'traveling' ? Math.min(1, userMoon.brightness + 0.22) : userMoon.brightness}
              size={95}
              isUserMoon={true}
              pulsing={phase !== 'traveling'}
            />
            <span className="font-serif-tc text-[10px] text-[#8B3327] tracking-wider mt-0.5 font-medium">
              你的月光
            </span>
          </div>

          {/* Target Moon on the wall (Bottom-Right) */}
          <div className="absolute bottom-2 right-4 z-20 flex flex-col items-center">
            <MoonTile
              id={targetMoon.moonId}
              colorTone={targetMoon.colorTone}
              brightness={phase !== 'traveling' ? Math.min(1, targetMoon.brightness + 0.28) : targetMoon.brightness}
              size={95}
              isResonant={true}
              pulsing={phase === 'deepened'}
            />
            <span className="font-serif-tc text-[10px] text-[#8B3327] tracking-wider mt-0.5 font-medium">
              {targetMoon.moonId}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM EXPLANATION & ACTION */}
      <div className="relative z-10 w-full max-w-xs flex-shrink-0 pb-2 px-4 flex flex-col items-center">
        <div className="bg-[#FAF2E9]/95 rounded-xl p-3 border border-[#AD6354]/25 shadow-xs text-center w-full mb-2">
          <p className="font-serif-tc text-xs text-[#6C271B] leading-relaxed font-medium">
            {phase === 'traveling'
              ? '「紅線正緩緩延伸，尋覓那一道能接住你的光。」'
              : '「兩道月光在殿堂相遇，彼此的光亮悄然加深。」'}
          </p>
          <p className="font-cormorant italic text-[10px] text-[#AD6354] mt-0.5">
            {phase === 'traveling'
              ? 'Seeking resonance beneath the moon...'
              : 'Two lights meet quietly in the temple sanctuary.'}
          </p>
        </div>

        {phase !== 'traveling' && (
          <button
            onClick={onProceedToNotification}
            className="w-full py-2.5 px-4 rounded-xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/15 flex items-center justify-center gap-2 cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
          >
            <span className="font-serif-tc text-xs font-semibold tracking-wider">
              看見回音 · 靜心感受 →
            </span>
            <span className="font-cormorant text-[10px] tracking-wide opacity-85">
              Experience the Echo
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

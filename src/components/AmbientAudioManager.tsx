import React, { useEffect, useState, useRef } from 'react';
import { zenMusic } from '../utils/zenMusic';

interface AmbientAudioManagerProps {
  className?: string;
}

export const AmbientAudioManager: React.FC<AmbientAudioManagerProps> = ({
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.20); // 20% Zen music baseline (15–25% recommended)
  const [showPanel, setShowPanel] = useState(false);
  const userGestureAttached = useRef(false);

  useEffect(() => {
    // Subscribe to Zen music playback state
    const unsubscribe = zenMusic.subscribe((playing) => {
      setIsPlaying(playing);
    });

    // Optional subtle user-gesture listener to enable audio gently on first intentional click if desired
    const handleFirstGesture = () => {
      // Do not auto-blast; keep default paused or gentle
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };

    if (!userGestureAttached.current) {
      window.addEventListener('click', handleFirstGesture, { once: true });
      window.addEventListener('touchstart', handleFirstGesture, { once: true });
      userGestureAttached.current = true;
    }

    return () => {
      unsubscribe();
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
    };
  }, []);

  const togglePlayback = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await zenMusic.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    zenMusic.setVolume(newVol);
  };

  return (
    <div className={`relative flex items-center z-40 select-none flex-shrink-0 ${className}`}>
      <div className="relative flex items-center gap-1.5">
        {/* Subtle Zen Music Control Pill Button */}
        <button
          onClick={togglePlayback}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowPanel((prev) => !prev);
          }}
          className="group px-3 py-1.5 rounded-full bg-[#FAF2E9]/92 hover:bg-[#FAF2E9] border border-[#AD6354]/30 hover:border-[#8B3327]/60 text-xs font-serif-tc text-[#8B3327] tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-1.5 backdrop-blur-md"
          title="♪ 月下靜心 / Moonlit Sound · 點擊切換音樂，長按開啟音量面板"
          aria-label={isPlaying ? '月下靜心 (播放中)' : '月下靜心 (靜音)'}
        >
          {/* Visual Indicator: Animated Sound Waves or Gentle Note */}
          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-3 px-0.5">
              <span className="w-0.5 h-2 bg-[#D74A3E] animate-pulse" />
              <span className="w-0.5 h-3 bg-[#8B3327] animate-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-2.5 bg-[#C77263] animate-pulse" style={{ animationDelay: '300ms' }} />
              <span className="w-0.5 h-1.5 bg-[#AD6354] animate-pulse" style={{ animationDelay: '450ms' }} />
            </div>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-[#AD6354] group-hover:text-[#8B3327] transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}

          <span className="font-serif-tc text-xs font-medium text-[#6C271B] tracking-wide">
            {isPlaying ? '♪ 月下靜心' : '♪ 月下靜心 (靜音)'}
          </span>
          <span className="font-cormorant text-[11px] text-[#AD6354]/80 hidden sm:inline">
            · Moonlit Sound
          </span>
        </button>

        {/* Volume popover trigger button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPanel((prev) => !prev);
          }}
          className="w-7 h-7 rounded-full bg-[#FAF2E9]/92 hover:bg-[#FAF2E9] border border-[#AD6354]/30 text-[#8B3327] text-xs flex items-center justify-center cursor-pointer shadow-xs transition-colors backdrop-blur-md"
          title="調節靜心音樂音量"
          aria-label="調節靜心音樂音量"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </button>
      </div>

      {/* Zen Music Settings Popover */}
      {showPanel && (
        <div className="absolute top-full left-0 mt-2 p-3.5 bg-[#FAF2E9] rounded-2xl shadow-xl border border-[#AD6354]/40 w-64 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md z-50">
          <div className="flex items-center justify-between text-xs font-serif-tc text-[#6C271B] mb-2 pb-1.5 border-b border-[#AD6354]/20">
            <span className="font-semibold tracking-wide">月下靜心聲景</span>
            <button
              onClick={() => setShowPanel(false)}
              className="text-[#AD6354] hover:text-[#6C271B] text-xs px-1 cursor-pointer font-bold"
            >
              ✕
            </button>
          </div>

          {/* Poetic description required by prompt */}
          <div className="mb-2.5">
            <p className="text-xs font-serif-tc text-[#8B3327] font-medium leading-relaxed">
              「月下靜心，讓心慢慢安定下來。」
            </p>
            <p className="text-[10px] font-cormorant italic text-[#AD6354] mt-0.5">
              A quiet moment beneath the moon where the heart can gradually become calm.
            </p>
          </div>

          <div className="text-[10px] font-serif-tc text-[#5D241C]/80 mb-3 space-y-1 bg-[#F3E4D6]/50 p-2 rounded-xl border border-[#AD6354]/15">
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#D74A3E]" />
              <span>古琴絲弦 · 悠然五聲音階</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#8B3327]" />
              <span>清幽竹簫 · 432Hz 磬聲空靈</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#AD6354]" />
              <span>廟庭微風竹葉 · 溫柔沉澱</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-serif-tc text-[#8B3327]">
              <span>背景音量 (建議 15–25%)</span>
              <span className="font-mono font-medium">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#8B3327] cursor-pointer h-1.5 bg-[#E8D5C4] rounded-lg"
            />
          </div>

          {/* Dynamic Audio Ducking Footnote */}
          <div className="mt-2.5 pt-2 border-t border-[#AD6354]/15 text-[10px] font-serif-tc text-[#AD6354] leading-tight">
            互動與祈願時，背景音將自動溫柔微降，隨後柔和復原。
          </div>
        </div>
      )}
    </div>
  );
};

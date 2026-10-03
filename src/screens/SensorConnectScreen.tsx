import React, { useState } from 'react';
import { TempleBackground } from '../components/TempleBackground';
import { templeAudio } from '../utils/audio';

interface SensorConnectScreenProps {
  gripStrength: number;
  temperature: number;
  onGripChange: (val: number) => void;
  onTemperatureChange: (val: number) => void;
  onProceedToPrayer: () => void;
  onBack: () => void;
}

export const SensorConnectScreen: React.FC<SensorConnectScreenProps> = ({
  gripStrength,
  temperature,
  onGripChange,
  onTemperatureChange,
  onProceedToPrayer,
  onBack,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    templeAudio.playBell(396, 1.8);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      templeAudio.playBell(528, 2.5);
    }, 600);
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-between items-center overflow-hidden bg-rice-paper-grain select-none">
      <TempleBackground showFullPosterElements={true} opacity={0.5} />

      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — BACK NAVIGATION (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <button
            onClick={onBack}
            className="text-xs font-serif-tc text-[#8B3327]/85 hover:text-[#8B3327] py-1 cursor-pointer flex items-center gap-1 transition-colors"
            title="返回首頁"
          >
            ← <span>返回首頁</span>
          </button>

          {/* Connection status pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/30 shadow-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isConnected ? 'bg-[#3E8B54] animate-pulse' : 'bg-[#AD6354]/60'
              }`}
            />
            <span className="font-serif-tc text-[11px] text-[#8B3327] font-medium tracking-wide">
              {isConnected ? '已連線' : '未連線'}
            </span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-3">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            S E N S O R &nbsp; C O N N E C T I O N
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            戴上你的心弦
          </h2>
          <span className="font-cormorant italic text-xs sm:text-sm text-[#8B3327]/80 tracking-wide mt-0.5">
            Wear Your Thread
          </span>
        </div>
      </div>

      {/* MAIN INTERACTION AREA (Hand with Minimal Red-Thread Wearable Illustration) */}
      <div className="relative z-10 w-full flex-1 min-h-0 flex flex-col items-center justify-center px-4 my-auto">
        <div className="relative h-[24vh] max-h-[155px] min-h-[100px] aspect-square flex items-center justify-center">
          {/* Subtle glowing halo behind hand */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#FFFDF9]/85 via-[#F3E4D6]/50 to-transparent blur-xl pointer-events-none" />

          <svg
            viewBox="0 0 280 280"
            className="w-full h-full relative z-10 filter drop-shadow-sm select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="handSkinGrad3" x1="140" y1="260" x2="140" y2="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E2CABA" />
                <stop offset="45%" stopColor="#F5ECE1" />
                <stop offset="100%" stopColor="#FAF2E9" />
              </linearGradient>

              <filter id="sensorGlow3" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Forearm & Wrist */}
            <path
              d="M 108 275 L 105 210 C 105 190, 95 180, 92 165 C 88 150, 94 135, 96 120"
              stroke="#BFA28E"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 172 275 L 175 210 C 175 190, 185 180, 188 165 C 192 150, 186 135, 184 120"
              stroke="#BFA28E"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Hand Silhouette */}
            <path
              d="
                M 105 210
                C 95 195, 82 180, 75 160
                C 68 140, 70 120, 80 115
                C 88 110, 98 122, 105 138
                L 112 110
                C 112 90, 114 62, 122 50
                C 127 42, 134 43, 137 52
                L 142 98
                L 143 85
                C 144 65, 147 40, 154 32
                C 160 25, 168 27, 170 38
                L 171 95
                L 173 100
                C 176 80, 180 58, 188 52
                C 194 48, 200 52, 201 62
                L 197 115
                L 199 122
                C 204 105, 210 92, 218 90
                C 225 88, 229 95, 227 106
                C 224 122, 212 145, 202 165
                C 194 180, 182 195, 175 210
                Z
              "
              fill="url(#handSkinGrad3)"
              stroke="#CDB19B"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Palm creases */}
            <path d="M 120 125 C 130 130, 145 130, 155 124" stroke="#CDB19B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            <path d="M 158 123 C 170 128, 185 126, 195 118" stroke="#CDB19B" strokeWidth="1" strokeLinecap="round" opacity="0.6" />

            {/* Red Thread Wearable on Index & Middle fingers */}
            <path d="M 120 86 C 135 82, 155 78, 172 75" stroke="#8B3327" strokeWidth="2" strokeDasharray="3 2" opacity="0.4" />
            <path d="M 118 88 C 132 94, 156 90, 174 81" stroke="#D74A3E" strokeWidth="2.8" strokeLinecap="round" filter="url(#sensorGlow3)" />
            <path d="M 120 93 C 134 98, 154 94, 172 86" stroke="#D74A3E" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

            {/* Connecting knot & sensor bead */}
            <g transform="translate(144, 88)">
              {isConnected && (
                <circle cx="0" cy="0" r="9" fill="#D74A3E" opacity="0.3" className="animate-ping" />
              )}
              <circle cx="0" cy="0" r="4.5" fill="#FAF2E9" stroke="#8B3327" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="2" fill={isConnected ? '#D74A3E' : '#AD6354'} className={isConnected ? 'animate-pulse' : ''} />
            </g>

            {/* Trailing red threads */}
            <path d="M 143 93 C 138 120, 146 150, 141 180 C 138 200, 134 230, 136 270" stroke="#D74A3E" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
            <path d="M 146 93 C 150 125, 145 160, 149 190 C 152 215, 147 245, 150 270" stroke="#D74A3E" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 2" opacity="0.6" />

            {/* Small label indicator */}
            <g opacity="0.85">
              <line x1="68" y1="68" x2="114" y2="84" stroke="#8B3327" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="68" cy="68" r="2" fill="#8B3327" />
              <text x="36" y="66" fill="#6C271B" fontSize="9" fontFamily="serif" letterSpacing="0.5">
                食指與中指
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* EXPLANATION & ACTION SECTION (Bottom Area) */}
      <div className="relative z-10 w-full max-w-sm flex-shrink-0 px-4 pb-2 flex flex-col gap-1.5">
        {/* Concise instruction card */}
        <div className="bg-[#FAF2E9]/95 rounded-xl px-3.5 py-2 border border-[#AD6354]/25 shadow-xs text-center">
          <p className="font-serif-tc text-[11px] sm:text-xs text-[#6C271B] leading-relaxed font-medium">
            「祈願時，心弦將靜靜記錄你執香時的身體軌跡。」
          </p>
          <p className="font-cormorant italic text-[10px] text-[#AD6354] leading-tight">
            “These signals become a physical trace of how you were holding on.”
          </p>

          {/* Inline Sensor Values Strip */}
          <div className="mt-1.5 pt-1.5 border-t border-[#AD6354]/20 flex items-center justify-around text-xs">
            <div className="flex items-center gap-1 font-serif-tc text-[#8B3327]">
              <span className="text-[10px] text-[#AD6354]">握力</span>
              <span className="font-cormorant font-bold text-sm text-[#6C271B]">{gripStrength}</span>
              <span className="text-[9px] text-[#AD6354]">/100</span>
            </div>
            <span className="text-[#AD6354]/40">·</span>
            <div className="flex items-center gap-1 font-serif-tc text-[#8B3327]">
              <span className="text-[10px] text-[#AD6354]">指溫</span>
              <span className="font-cormorant font-bold text-sm text-[#6C271B]">{temperature.toFixed(1)}</span>
              <span className="text-[9px] text-[#AD6354]">°C</span>
            </div>
          </div>
        </div>

        {/* Prototype Demo Sliders (Shown when connected) */}
        {isConnected && (
          <div className="w-full px-3 py-1.5 rounded-xl bg-[#FAF2E9] border border-[#AD6354]/25 flex flex-col gap-1 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-serif-tc">
              <span className="text-[#3E8B54] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3E8B54] animate-pulse" />
                Sensor Connected ✓
              </span>
              <span className="text-[#AD6354]">原型展示調控</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-serif-tc text-[#6C271B]">
              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px]">
                  <span>握力</span>
                  <span className="font-mono">{gripStrength}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gripStrength}
                  onChange={(e) => onGripChange(parseInt(e.target.value, 10))}
                  className="w-full accent-[#8B3327] cursor-pointer h-1 bg-[#E8D5C4] rounded-lg"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between text-[9px]">
                  <span>指溫</span>
                  <span className="font-mono">{temperature.toFixed(1)}°C</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="38"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
                  className="w-full accent-[#D74A3E] cursor-pointer h-1 bg-[#E8D5C4] rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {isConnected ? (
          <button
            onClick={() => {
              templeAudio.playPrayerComplete();
              onProceedToPrayer();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/15 flex items-center justify-center gap-2 cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
          >
            <span className="font-serif-tc text-xs sm:text-sm font-semibold tracking-wider">
              步入殿堂 · 執香祈願 →
            </span>
            <span className="font-cormorant text-[11px] tracking-wide opacity-85">
              Proceed to Prayer
            </span>
          </button>
        ) : (
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full py-2.5 px-4 rounded-xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-md shadow-[#8B3327]/15 flex items-center justify-center gap-2 cursor-pointer border border-[#AD6354]/40 text-[#FAF2E9]"
          >
            {isConnecting ? (
              <span className="font-serif-tc text-xs tracking-widest animate-pulse flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FAF2E9] animate-ping" />
                正在感應心弦...
              </span>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="font-serif-tc text-xs sm:text-sm font-semibold tracking-wider">
                  連接感應器
                </span>
                <span className="font-cormorant text-[11px] tracking-wide opacity-85">
                  · Connect Sensor
                </span>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

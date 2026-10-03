import React from 'react';

export const TempleBackground: React.FC<{
  showFullPosterElements?: boolean;
  opacity?: number;
}> = ({ showFullPosterElements = true, opacity = 1 }) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ opacity }}
    >
      {/* 1. Warm rice-paper subtle gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF2E9] via-[#F3E4D6]/70 to-[#FAF2E9]" />

      {/* 2. Full Crescent Moon in the sky with luminous light glow halo */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
        {/* Soft diffuse atmospheric aura */}
        <div className="w-[260px] h-[260px] rounded-full bg-gradient-to-b from-[#FFFDF9]/80 via-[#F3E4D6]/50 to-transparent blur-3xl pointer-events-none absolute -top-16" />
        
        {/* Full Crescent Moon with light glow effect */}
        <svg viewBox="0 0 100 100" className="w-24 h-24 relative z-10 filter drop-shadow-md opacity-85">
          <defs>
            <filter id="bgMoonGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="bgMoonGrad" x1="45" y1="16" x2="80" y2="84" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.98} />
              <stop offset="50%" stopColor="#FFFBF2" stopOpacity={0.92} />
              <stop offset="100%" stopColor="#EADCCF" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          {/* Radiant Full Crescent Path */}
          <path
            d="M 46,16 C 68,16 80,32 80,50 C 80,68 68,84 46,84 C 64,74 68,62 68,50 C 68,38 64,26 46,16 Z"
            fill="url(#bgMoonGrad)"
            filter="url(#bgMoonGlow)"
          />
          {/* Luminous crest highlight */}
          <path
            d="M 47,17 C 67,19 78,34 78,50 C 78,66 67,81 47,83"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* 3. Poetic Taiwanese Temple Curved Eaves Silhouette */}
      <svg
        viewBox="0 0 400 600"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="templeSilhouetteGrad" x1="200" y1="360" x2="200" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#AD6354" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#8B3327" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#6C271B" stopOpacity="0.32" />
          </linearGradient>

          <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F3E4D6" stopOpacity="0" />
            <stop offset="50%" stopColor="#F3E4D6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F3E4D6" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="redThreadFlow" x1="0" y1="0" x2="400" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D74A3E" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#D74A3E" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#8B3327" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D74A3E" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {showFullPosterElements && (
          <>
            {/* Distant Temple Pavilion Roof / Yanwei (Swallowtail Eaves 燕尾脊) */}
            <path
              d="M 40 460 C 90 445, 140 435, 200 435 C 260 435, 310 445, 360 460 C 375 450, 390 425, 385 415 C 330 422, 270 412, 200 412 C 130 412, 70 422, 15 415 C 10 425, 25 450, 40 460 Z"
              fill="url(#templeSilhouetteGrad)"
            />
            {/* Main Temple Central Ridge with Flaming Pearl Silhouette */}
            <path
              d="M 195 408 C 195 400, 205 400, 205 408 C 208 412, 192 412, 195 408 Z"
              fill="#8B3327"
              opacity="0.3"
            />
            {/* Lower eaves & temple pillars */}
            <path
              d="M 70 470 L 75 590 L 130 590 L 125 470 Z"
              fill="url(#templeSilhouetteGrad)"
              opacity="0.6"
            />
            <path
              d="M 270 470 L 275 590 L 330 590 L 325 470 Z"
              fill="url(#templeSilhouetteGrad)"
              opacity="0.6"
            />
            {/* Temple Arch Door Silhouette */}
            <path
              d="M 160 590 L 160 500 C 160 475, 240 475, 240 500 L 240 590 Z"
              fill="#6C271B"
              opacity="0.25"
            />

            {/* Soft Taiwanese misty clouds */}
            <path
              d="M 20 220 C 60 210, 110 215, 160 228 C 190 236, 230 230, 270 218 C 320 205, 360 212, 390 225"
              stroke="url(#cloudGrad)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 10 320 C 70 305, 140 312, 210 328 C 280 344, 340 330, 395 315"
              stroke="url(#cloudGrad)"
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />

            {/* Subtle organic flowing Yue Lao red thread drifting through the poster */}
            <path
              d="M -20 180 C 80 120, 140 260, 220 190 C 290 130, 330 280, 420 240"
              stroke="url(#redThreadFlow)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M -10 390 C 90 350, 160 440, 250 380 C 310 340, 350 420, 410 390"
              stroke="url(#redThreadFlow)"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 2"
            />
          </>
        )}
      </svg>
    </div>
  );
};

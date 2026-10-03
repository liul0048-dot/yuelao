import React from 'react';

export const IncenseArtwork: React.FC<{
  isPraying?: boolean;
  className?: string;
}> = ({ isPraying = true, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center w-full max-w-[320px] aspect-[4/5] mx-auto select-none ${className}`}>
      {/* Soft circular spiritual aura behind hands */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-[#F3E4D6]/70 via-[#FAF2E9]/40 to-transparent blur-2xl pointer-events-none" />

      {/* SVG Hand holding incense & wearable red thread */}
      <svg
        viewBox="0 0 320 380"
        className="w-full h-full relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle skin/hand tone gradient */}
          <linearGradient id="handGradient" x1="160" y1="180" x2="160" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5ECE1" />
            <stop offset="60%" stopColor="#EADCCF" />
            <stop offset="100%" stopColor="#DBC7B6" />
          </linearGradient>

          {/* Incense ember glow */}
          <radialGradient id="emberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="40%" stopColor="#FF6B4A" />
            <stop offset="100%" stopColor="#8B3327" stopOpacity="0" />
          </radialGradient>

          {/* Incense stick color */}
          <linearGradient id="incenseStick" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5D241C" />
            <stop offset="70%" stopColor="#8B3327" />
            <stop offset="100%" stopColor="#C77263" />
          </linearGradient>

          {/* Smoke blur */}
          <filter id="smokeBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* 1. ANIMATED INCENSE SMOKE DRIFTS */}
        <g className={isPraying ? 'animate-incense-smoke' : ''} style={{ transformOrigin: '160px 105px' }}>
          {/* Smoke strand 1 */}
          <path
            d="M 160 102 C 152 75, 172 50, 156 20 C 148 2, 165 -15, 152 -35"
            stroke="url(#incenseSmokeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
            filter="url(#smokeBlur)"
          />
          {/* Smoke strand 2 */}
          <path
            d="M 161 102 C 168 80, 150 55, 168 28 C 178 8, 158 -10, 172 -30"
            stroke="#FAF2E9"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
            filter="url(#smokeBlur)"
          />
        </g>

        {/* Second smoke layer for depth */}
        <g style={{ animation: 'incenseDrift 5s ease-out 1.5s infinite', transformOrigin: '160px 105px' }}>
          <path
            d="M 159 104 C 145 80, 162 60, 148 30 C 138 10, 152 -5, 142 -25"
            stroke="#F3E4D6"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
            filter="url(#smokeBlur)"
          />
        </g>

        {/* 2. THREE SACRED INCENSE STICKS */}
        {/* Left stick */}
        <line x1="156" y1="104" x2="157" y2="250" stroke="url(#incenseStick)" strokeWidth="2.2" strokeLinecap="round" />
        {/* Center stick */}
        <line x1="160" y1="100" x2="160" y2="250" stroke="url(#incenseStick)" strokeWidth="2.4" strokeLinecap="round" />
        {/* Right stick */}
        <line x1="164" y1="104" x2="163" y2="250" stroke="url(#incenseStick)" strokeWidth="2.2" strokeLinecap="round" />

        {/* Glowing Incense Embers */}
        <circle cx="160" cy="100" r="4.5" fill="url(#emberGlow)" />
        <circle cx="160" cy="100" r="1.5" fill="#FFFBE8" />
        <circle cx="156" cy="104" r="3" fill="url(#emberGlow)" />
        <circle cx="156" cy="104" r="1.2" fill="#FFFBE8" />
        <circle cx="164" cy="104" r="3" fill="url(#emberGlow)" />
        <circle cx="164" cy="104" r="1.2" fill="#FFFBE8" />

        {/* 3. REVERENT HANDS (CLASPING TOGETHER IN PRAYER) */}
        {/* Left hand silhouette & fingers clasping incense */}
        <path
          d="M 96 360 C 102 310, 116 270, 138 238 C 144 230, 154 226, 160 226 C 158 245, 156 268, 154 290 C 150 318, 142 344, 134 360 Z"
          fill="url(#handGradient)"
          stroke="#CDB19B"
          strokeWidth="1.2"
        />

        {/* Right hand silhouette (mirrored with natural overlap) */}
        <path
          d="M 224 360 C 218 310, 204 270, 182 238 C 176 230, 166 226, 160 226 C 162 245, 164 268, 166 290 C 170 318, 178 344, 186 360 Z"
          fill="url(#handGradient)"
          stroke="#CDB19B"
          strokeWidth="1.2"
        />

        {/* Fingers wrapping gently around the incense */}
        {/* Left thumb & fingers */}
        <path
          d="M 138 238 C 146 230, 160 232, 164 240 C 160 248, 146 250, 140 246 Z"
          fill="#FAF2E9"
          stroke="#CDB19B"
          strokeWidth="1"
        />
        <path
          d="M 142 250 C 150 244, 164 246, 167 254 C 162 260, 148 262, 142 258 Z"
          fill="#FAF2E9"
          stroke="#CDB19B"
          strokeWidth="1"
        />

        {/* Right fingers clasping */}
        <path
          d="M 182 238 C 174 230, 160 232, 156 240 C 160 248, 174 250, 180 246 Z"
          fill="#FAF2E9"
          stroke="#CDB19B"
          strokeWidth="1"
        />
        <path
          d="M 178 250 C 170 244, 156 246, 153 254 C 158 260, 172 262, 178 258 Z"
          fill="#FAF2E9"
          stroke="#CDB19B"
          strokeWidth="1"
        />

        {/* 4. SACRED RED THREAD WEARABLE SENSOR */}
        {/* Worn around the index and middle fingers */}
        {/* Soft glowing ambient thread aura */}
        <ellipse cx="160" cy="246" rx="20" ry="9" stroke="#D74A3E" strokeWidth="4" opacity="0.25" filter="url(#smokeBlur)" />

        {/* The delicate double red thread looped gently around fingers */}
        <path
          d="M 142 245 C 145 238, 175 238, 178 245 C 175 252, 145 252, 142 245 Z"
          stroke="#D74A3E"
          strokeWidth="2.4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 144 249 C 147 243, 173 243, 176 249 C 173 255, 147 255, 144 249 Z"
          stroke="#D74A3E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Small sacred Yue Lao jade or knot clasp token */}
        <circle cx="160" cy="245" r="3.2" fill="#8B3327" stroke="#FAF2E9" strokeWidth="1" />
        <circle cx="160" cy="245" r="1.2" fill="#D74A3E" />

        {/* Trailing loose ends of Yue Lao's red thread floating softly down */}
        <path
          d="M 160 248 C 162 265, 155 285, 164 310 C 172 330, 168 355, 163 370"
          stroke="#D74A3E"
          strokeWidth="1.6"
          strokeDasharray="4 1"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 161 248 C 158 268, 165 292, 158 318 C 152 340, 156 360, 152 375"
          stroke="#D74A3E"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>

      {/* Subtle pulse ring around the wearable */}
      <div className="absolute bottom-[36%] w-16 h-16 rounded-full border border-[#D74A3E]/40 animate-ping pointer-events-none" style={{ animationDuration: '3.5s' }} />
    </div>
  );
};

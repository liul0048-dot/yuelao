import React from 'react';
import { MoonColorTone } from '../types';

interface MoonTileProps {
  id?: string;
  colorTone?: MoonColorTone;
  brightness?: number; // 0 (soft/dim) to 1 (bright)
  size?: number; // pixel width/height baseline, default 110
  isUserMoon?: boolean;
  isResonant?: boolean;
  isHighlighted?: boolean;
  pulsing?: boolean;
  showId?: boolean;
  className?: string;
  onClick?: () => void;
}

export const MoonTile: React.FC<MoonTileProps> = ({
  id,
  colorTone = 'terracotta',
  brightness = 0.65,
  size = 110,
  isUserMoon = false,
  isResonant = false,
  isHighlighted = false,
  pulsing = false,
  showId = false,
  className = '',
  onClick,
}) => {
  // Tile palette configuration based on Taiwanese ceramic glaze tones
  const colorMap = {
    ivory: {
      base: '#FAF2E9',
      border: '#E8D5C4',
      shadow: '#CDB19B',
      accent: '#8B3327',
      crescentGlow: '#FFFDF9',
      crescentBody: '#F5ECE1',
    },
    cream: {
      base: '#F3E4D6',
      border: '#E2CABA',
      shadow: '#BFA28E',
      accent: '#8B3327',
      crescentGlow: '#FFF6EC',
      crescentBody: '#EBD4C1',
    },
    terracotta: {
      base: '#AD6354',
      border: '#C07565',
      shadow: '#7D3B2F',
      accent: '#F3E4D6',
      crescentGlow: '#FFEDE5',
      crescentBody: '#E8A393',
    },
    'dusty-rose': {
      base: '#C77263',
      border: '#D98677',
      shadow: '#96483B',
      accent: '#FAF2E9',
      crescentGlow: '#FFF1EE',
      crescentBody: '#EAB0A4',
    },
    'temple-red': {
      base: '#8B3327',
      border: '#A84435',
      shadow: '#591C14',
      accent: '#F3E4D6',
      crescentGlow: '#FFE8E4',
      crescentBody: '#D47565',
    },
  }[colorTone];

  // Glow intensity calculation:
  // brightness: 0.1 to 1.0
  const glowOpacity = Math.min(1, Math.max(0.2, brightness * 0.98));
  const glowBlur = 10 + brightness * 26;

  // Regular pointy-top hexagon points inside 120x138 coordinate space
  // Center is (60, 69), radius approx 56
  // Points: (60, 13), (108.5, 41), (108.5, 97), (60, 125), (11.5, 97), (11.5, 41)
  const hexPoints = "60,13 108.5,41 108.5,97 60,125 11.5,97 11.5,41";
  const innerHexPoints = "60,17 104.5,43 104.5,95 60,121 15.5,95 15.5,43";

  // Full sweeping crescent path: from sharp top cusp (56, 26) through (96, 69) to sharp bottom cusp (56, 112)
  const fullCrescentPath = "M 56,26 C 82,26 96,46 96,69 C 96,92 82,112 56,112 C 78,100 82,85 82,69 C 82,53 78,38 56,26 Z";
  // Crescent fine highlight ridge
  const crescentSpinePath = "M 57,28 C 81,30 94,48 94,69 C 94,90 81,108 57,110";

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center select-none transition-transform duration-300 ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${className}`}
      style={{ width: size, height: size * 1.15 }}
    >
      {/* Outer ambient moonlight glow aura */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-1000 pointer-events-none ${
          pulsing ? 'animate-pulse' : ''
        }`}
        style={{
          background: `radial-gradient(circle, rgba(255, 250, 242, ${glowOpacity * 0.85}) 0%, rgba(245, 225, 205, ${
            glowOpacity * 0.5
          }) 35%, rgba(215, 74, 62, ${glowOpacity * 0.3}) 60%, transparent 75%)`,
          filter: `blur(${glowBlur}px)`,
          transform: 'scale(1.45)',
          opacity: glowOpacity,
        }}
      />

      {/* Resonant or Selected Indicator Aura */}
      {(isResonant || isHighlighted) && (
        <div
          className="absolute inset-0 rounded-full border-2 border-[#D74A3E]/60 animate-ping pointer-events-none"
          style={{ transform: 'scale(1.25)', animationDuration: '3s' }}
        />
      )}

      {/* Sculptural Physical Hexagon Tile SVG */}
      <svg
        viewBox="0 0 120 138"
        className="w-full h-full relative z-10 filter drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Ceramic surface gradient */}
          <linearGradient id={`hexGrad-${id || colorTone}`} x1="15" y1="15" x2="105" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colorMap.border} />
            <stop offset="35%" stopColor={colorMap.base} />
            <stop offset="100%" stopColor={colorMap.shadow} />
          </linearGradient>

          {/* Full Crescent Moon Radiant Gradient */}
          <linearGradient id={`crescentGrad-${id || colorTone}`} x1="50" y1="26" x2="96" y2="112" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.99} />
            <stop offset="30%" stopColor="#FFFDF6" stopOpacity={0.96} />
            <stop offset="65%" stopColor={colorMap.crescentGlow} stopOpacity={0.92} />
            <stop offset="100%" stopColor={colorMap.crescentBody} stopOpacity={0.84} />
          </linearGradient>

          {/* Soft outer moonlight bloom filter */}
          <filter id={`softBloom-${id || colorTone}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={3.5 + brightness * 3.5} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Core lunar brilliance radiance filter */}
          <filter id={`coreRadiance-${id || colorTone}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={1.2 + brightness * 2.0} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Hexagon Tile Drop Edge (Bevel Depth) */}
        <polygon
          points="60,15 109.5,43 109.5,99 60,127 10.5,99 10.5,43"
          fill={colorMap.shadow}
          opacity="0.85"
        />

        {/* 2. Main Sculptural Ceramic Hexagon Body */}
        <polygon
          points={hexPoints}
          fill={`url(#hexGrad-${id || colorTone})`}
          stroke={colorMap.border}
          strokeWidth="1.2"
        />

        {/* 3. Subtle Chamfered Inner Rim */}
        <polygon
          points={innerHexPoints}
          fill="none"
          stroke={colorMap.base}
          strokeWidth="0.8"
          strokeDasharray="2 1"
          opacity="0.45"
        />

        {/* 4. Ceramic Texture / Fine Ring Motif */}
        <circle
          cx="60"
          cy="69"
          r="40"
          stroke={colorMap.border}
          strokeWidth="0.75"
          strokeOpacity="0.3"
          fill="none"
        />

        {/* 5. FULL CRESCENT MOON WITH LIGHT GLOW EFFECT */}
        {/* Layer A: Broad diffused outer moonlight haze */}
        <path
          d={fullCrescentPath}
          fill="#FFFDF6"
          filter={`url(#softBloom-${id || colorTone})`}
          opacity={0.45 + brightness * 0.45}
        />

        {/* Layer B: Warm colored ambient halo glow */}
        <path
          d={fullCrescentPath}
          fill={colorMap.crescentGlow}
          filter={`url(#softBloom-${id || colorTone})`}
          opacity={0.35 + brightness * 0.35}
          transform="translate(60, 69) scale(1.05) translate(-60, -69)"
        />

        {/* Layer C: Sculpted Full Crescent Main Body */}
        <path
          d={fullCrescentPath}
          fill={`url(#crescentGrad-${id || colorTone})`}
          filter={`url(#coreRadiance-${id || colorTone})`}
          opacity={0.78 + brightness * 0.22}
          stroke="#FFFFFF"
          strokeWidth="0.6"
          strokeOpacity={0.6 + brightness * 0.4}
        />

        {/* Layer D: Crescent luminous spine highlight edge */}
        <path
          d={crescentSpinePath}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.7 + brightness * 0.3}
        />

        {/* Layer E: Celestial horn tip radiant stars (top and bottom tips) */}
        <circle
          cx="56"
          cy="26"
          r="1.8"
          fill="#FFFFFF"
          opacity={0.85 + brightness * 0.15}
          filter={`url(#coreRadiance-${id || colorTone})`}
        />
        <circle
          cx="56"
          cy="112"
          r="1.8"
          fill="#FFFFFF"
          opacity={0.85 + brightness * 0.15}
          filter={`url(#coreRadiance-${id || colorTone})`}
        />

        {/* 6. Subtle Red Thread Connector Eyelets / Notches at Apex and Base */}
        <circle cx="60" cy="13" r="2.2" fill="#D74A3E" opacity="0.85" />
        <circle cx="60" cy="125" r="2.2" fill="#D74A3E" opacity="0.85" />
        <circle cx="108.5" cy="69" r="1.8" fill="#D74A3E" opacity="0.6" />
        <circle cx="11.5" cy="69" r="1.8" fill="#D74A3E" opacity="0.6" />

        {/* Small subtle decorative talisman mark */}
        <circle cx="60" cy="69" r="2" fill={colorMap.accent} opacity="0.5" />
      </svg>

      {/* User Moon Tag ("我的月") or anonymous ID */}
      {isUserMoon && (
        <div className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-[#8B3327] text-[#FAF2E9] text-[11px] font-serif-tc tracking-wider shadow-sm flex items-center gap-1 border border-[#F3E4D6]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FAF2E9] animate-pulse"></span>
          我的月
        </div>
      )}

      {isResonant && !isUserMoon && (
        <div className="absolute -top-3 z-20 px-2 py-0.5 rounded-full bg-[#AD6354] text-[#FAF2E9] text-[10px] font-serif-tc tracking-wider shadow-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFF6EC]"></span>
          相似的光
        </div>
      )}

      {showId && id && (
        <span className="mt-1 text-[11px] font-serif-tc text-[#8B3327] tracking-widest font-medium opacity-85">
          {id}
        </span>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { MoonTile } from '../components/MoonTile';
import { MoonTileData, ConnectionData } from '../types';
import { templeAudio } from '../utils/audio';

interface MoonWallScreenProps {
  userMoon: MoonTileData;
  wallMoons: MoonTileData[];
  resonantMoon: MoonTileData | null;
  connections: ConnectionData[];
  onTriggerConnection: (targetMoon: MoonTileData) => void;
  onSimulateIncomingNotice: () => void;
}

export const MoonWallScreen: React.FC<MoonWallScreenProps> = ({
  userMoon,
  wallMoons,
  resonantMoon,
  connections,
  onTriggerConnection,
  onSimulateIncomingNotice,
}) => {
  const [selectedMoon, setSelectedMoon] = useState<MoonTileData | null>(null);
  const [activeResonantTarget, setActiveResonantTarget] = useState<MoonTileData | null>(resonantMoon);

  useEffect(() => {
    if (!activeResonantTarget) {
      const candidates = wallMoons.filter((m) => m.moonId !== userMoon.moonId);
      if (candidates.length > 0) {
        const sorted = [...candidates].sort(
          (a, b) => Math.abs(a.brightness - userMoon.brightness) - Math.abs(b.brightness - userMoon.brightness)
        );
        setActiveResonantTarget(sorted[0]);
      }
    }
  }, [activeResonantTarget, wallMoons, userMoon]);

  const handleSendLight = (target: MoonTileData) => {
    templeAudio.playBell(528, 3.0);
    onTriggerConnection(target);
  };

  const candidateList = wallMoons.filter((m) => m.moonId !== userMoon.moonId);
  const row1 = candidateList.slice(0, 3);
  const row2Left = candidateList.slice(3, 4);
  const row2Right = candidateList.slice(4, 6);
  const row3 = candidateList.slice(6, 9);

  const displayTarget = selectedMoon || activeResonantTarget || candidateList[0];

  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden bg-rice-paper-grain select-none">
      {/* HEADER SECTION (Row 2 & Row 3) */}
      <div className="w-full flex-shrink-0 z-20">
        {/* ROW 2 — SUBTLE STATUS (approx 8–12px vertical spacing from Row 1) */}
        <div className="w-full flex items-center justify-between px-5 pt-2">
          <span className="text-[10px] font-serif-tc text-[#8B3327] tracking-wider">
            月老廟 · 眾生心念聚集
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#FAF2E9]/90 border border-[#AD6354]/25 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D74A3E] animate-pulse" />
            <span className="text-[10px] font-serif-tc text-[#8B3327]">共鳴中</span>
          </div>
        </div>

        {/* ROW 3 — PAGE TITLE (approx 12–18px breathing space from Row 2, completely centered) */}
        <div className="w-full flex flex-col items-center text-center px-4 mt-2 sm:mt-2.5">
          <span className="font-cormorant text-[10px] sm:text-[11px] tracking-[0.25em] text-[#AD6354] uppercase font-semibold">
            M O O N &nbsp; W A L L
          </span>
          <h2 className="font-serif-tc text-2xl sm:text-3xl text-[#6C271B] font-semibold tracking-widest mt-0.5">
            殿宇月牆
          </h2>
          <span className="font-cormorant italic text-xs text-[#8B3327]/80 tracking-wide mt-0.5">
            Some lights are waiting to be seen
          </span>
        </div>
      </div>

      {/* MAIN INTERACTIVE CONSTELLATION MATRIX */}
      <div className="relative z-10 flex-1 min-h-0 w-full max-w-sm mx-auto flex flex-col items-center justify-center px-2 my-auto">
        {/* Soft background temple moonlight aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-[#F3E4D6]/50 via-transparent to-transparent blur-2xl pointer-events-none" />

        {/* SVG Living Red Threads layer between connected moons */}
        <svg
          viewBox="0 0 320 230"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <path
            d="M 160 50 C 160 75, 160 85, 160 115"
            stroke="#D74A3E"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeDasharray="3 2"
            fill="none"
          />
          <path
            d="M 160 115 C 190 120, 215 110, 235 115"
            stroke="#D74A3E"
            strokeWidth="1.6"
            strokeOpacity="0.75"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M 160 115 C 150 145, 120 160, 110 180"
            stroke="#D74A3E"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>

        {/* Interlocking Hexagonal Moon Tile Constellation */}
        <div className="relative z-20 flex flex-col items-center -space-y-4">
          {/* Row 1: 3 Tiles */}
          <div className="flex items-center justify-center -space-x-2">
            {row1.map((moon) => (
              <MoonTile
                key={moon.moonId}
                id={moon.moonId}
                colorTone={moon.colorTone}
                brightness={moon.brightness}
                size={76}
                showId={true}
                isResonant={activeResonantTarget?.moonId === moon.moonId}
                isHighlighted={selectedMoon?.moonId === moon.moonId}
                onClick={() => {
                  templeAudio.playBell(432, 1.8);
                  setSelectedMoon(moon);
                }}
              />
            ))}
          </div>

          {/* Row 2: 4 Tiles (User Moon placed proudly in the center!) */}
          <div className="flex items-center justify-center -space-x-2">
            {row2Left.map((moon) => (
              <MoonTile
                key={moon.moonId}
                id={moon.moonId}
                colorTone={moon.colorTone}
                brightness={moon.brightness}
                size={76}
                showId={true}
                isHighlighted={selectedMoon?.moonId === moon.moonId}
                onClick={() => {
                  templeAudio.playBell(432, 1.8);
                  setSelectedMoon(moon);
                }}
              />
            ))}

            {/* Central User's Moon ("我的月") */}
            <MoonTile
              id={userMoon.moonId}
              colorTone={userMoon.colorTone}
              brightness={userMoon.brightness}
              size={82}
              isUserMoon={true}
              showId={true}
              pulsing={true}
              onClick={() => {
                templeAudio.playBell(528, 2.0);
                setSelectedMoon(userMoon);
              }}
            />

            {row2Right.map((moon) => (
              <MoonTile
                key={moon.moonId}
                id={moon.moonId}
                colorTone={moon.colorTone}
                brightness={moon.brightness}
                size={76}
                showId={true}
                isResonant={activeResonantTarget?.moonId === moon.moonId}
                isHighlighted={selectedMoon?.moonId === moon.moonId}
                onClick={() => {
                  templeAudio.playBell(432, 1.8);
                  setSelectedMoon(moon);
                }}
              />
            ))}
          </div>

          {/* Row 3: 3 Tiles */}
          <div className="flex items-center justify-center -space-x-2">
            {row3.map((moon) => (
              <MoonTile
                key={moon.moonId}
                id={moon.moonId}
                colorTone={moon.colorTone}
                brightness={moon.brightness}
                size={76}
                showId={true}
                isHighlighted={selectedMoon?.moonId === moon.moonId}
                onClick={() => {
                  templeAudio.playBell(432, 1.8);
                  setSelectedMoon(moon);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION & RESONANCE CARD */}
      <div className="relative z-20 w-full max-w-sm mx-auto flex-shrink-0 px-4 pb-2">
        {displayTarget && (
          <div className="bg-[#FAF2E9]/95 rounded-xl p-2.5 sm:p-3 border border-[#AD6354]/30 shadow-md shadow-[#8B3327]/5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-tc text-xs font-semibold text-[#6C271B]">
                  {displayTarget.isUserMoon ? '你的月光 · 凝於殿堂' : `相近月光 · ${displayTarget.moonId}`}
                </span>
                {displayTarget.moonId === activeResonantTarget?.moonId && !displayTarget.isUserMoon && (
                  <span className="px-1.5 py-0.2 rounded-full bg-[#D74A3E]/10 text-[#D74A3E] text-[10px] font-serif-tc font-medium">
                    心念相近
                  </span>
                )}
              </div>

              <span className="text-[10px] font-serif-tc text-[#AD6354]">
                亮度 {Math.round(displayTarget.brightness * 100)}%
              </span>
            </div>

            <p className="font-serif-tc text-[11px] text-[#5D241C]/85 leading-snug">
              {displayTarget.isUserMoon
                ? '你的月光已靜靜嵌於月牆，等待一位遠方祈願者的光華相連。'
                : '這片月光的亮度與你的執香軌跡十分相近，點擊送出一道光，讓紅線悄然相繫。'}
            </p>

            {!displayTarget.isUserMoon ? (
              <button
                onClick={() => handleSendLight(displayTarget)}
                className="w-full py-2 px-3 rounded-xl bg-[#8B3327] hover:bg-[#6C271B] active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-1.5 text-[#FAF2E9] cursor-pointer"
              >
                <span className="font-serif-tc text-xs font-medium tracking-wider">
                  送出一道光 · 連接紅線 →
                </span>
                <span className="font-cormorant text-[10px] opacity-80">
                  Send Light
                </span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (activeResonantTarget) handleSendLight(activeResonantTarget);
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#8B3327]/15 hover:bg-[#8B3327]/25 text-[#8B3327] border border-[#8B3327]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="font-serif-tc text-xs font-medium tracking-wide">
                  向最近的共鳴月磚送出紅線
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

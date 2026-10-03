import React, { useState, useEffect } from 'react';
import { templeAudio } from '../utils/audio';
import { zenMusic } from '../utils/zenMusic';

interface DemoPanelProps {
  physicalIntensity: number;
  onIntensityChange: (val: number) => void;
  onGenerateMoon: () => void;
  onPlaceMoon: () => void;
  onShowResonantMoon: () => void;
  onCreateConnection: () => void;
  onSendNotification: () => void;
  onReset: () => void;
}

export const DemoPanel: React.FC<DemoPanelProps> = ({
  physicalIntensity,
  onIntensityChange,
  onGenerateMoon,
  onPlaceMoon,
  onShowResonantMoon,
  onCreateConnection,
  onSendNotification,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [ambientOn, setAmbientOn] = useState(false);

  useEffect(() => {
    const unsub = zenMusic.subscribe((playing) => {
      setAmbientOn(playing);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    templeAudio.enabled = next;
    if (next) templeAudio.playBell(528, 2.0);
  };

  const toggleAmbient = async () => {
    await zenMusic.toggle();
  };

  return (
    <div className="relative flex items-center z-50 select-none flex-shrink-0">
      {/* Trigger Button: ● 展示模式 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`px-2.5 py-1 rounded-full border text-[11px] font-serif-tc tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
          isOpen
            ? 'bg-[#8B3327] text-[#FAF2E9] border-[#8B3327]'
            : 'bg-[#FAF2E9]/80 backdrop-blur-md border-[#AD6354]/30 hover:border-[#8B3327]/60 text-[#8B3327] opacity-85 hover:opacity-100'
        }`}
        title="展示模式 (Demo Mode)"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-[#FAF2E9] animate-pulse' : 'bg-[#AD6354]'}`} />
        <span>展示模式</span>
      </button>

      {/* Presenter Control Popover Drawer */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-[#FAF2E9] rounded-2xl shadow-xl border border-[#AD6354]/40 p-4 animate-in fade-in zoom-in-95 duration-150 z-50 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-[#AD6354]/20">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D74A3E]" />
              <span className="font-serif-tc text-xs font-semibold text-[#6C271B] tracking-wider">
                展示模式 (Demo Mode)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                className="text-[10px] font-serif-tc px-1.5 py-0.5 rounded border border-[#AD6354]/30 text-[#8B3327]"
              >
                {soundOn ? '磬聲 開' : '磬聲 靜音'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#AD6354] hover:text-[#6C271B] text-xs px-1 cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Zen Temple Music Quick Switch */}
          <div className="my-2 py-1.5 px-2 rounded-lg bg-[#FAF2E9] border border-[#AD6354]/20 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${ambientOn ? 'bg-[#D74A3E] animate-pulse' : 'bg-[#AD6354]'}`} />
              <span className="text-[11px] font-serif-tc text-[#5D241C]">月下靜心禪樂 (Zen Music)</span>
            </div>
            <button
              onClick={toggleAmbient}
              className={`text-[10px] font-serif-tc px-2 py-0.5 rounded transition-colors cursor-pointer ${
                ambientOn ? 'bg-[#8B3327] text-[#FAF2E9]' : 'bg-[#E8D5C4] text-[#8B3327]'
              }`}
            >
              {ambientOn ? '播放中' : '開啟'}
            </button>
          </div>

          {/* Physical Intensity Slider (0 - 100) */}
          <div className="my-3">
            <div className="flex items-center justify-between text-[11px] font-serif-tc text-[#5D241C] mb-1">
              <span>生理強度 (Physical Intensity)</span>
              <span className="font-mono font-medium text-[#8B3327]">{physicalIntensity}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={physicalIntensity}
              onChange={(e) => onIntensityChange(Number(e.target.value))}
              className="w-full accent-[#8B3327] cursor-pointer h-1.5 bg-[#E8D5C4] rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-serif-tc text-[#AD6354] mt-0.5">
              <span>低 (月光較亮)</span>
              <span>高 (月光較柔)</span>
            </div>
          </div>

          {/* Preset Buttons required by prompt:
              Generate Moon, Place Moon, Show Resonant Moon, Create Connection, Send Notification, Reset
          */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <button
              onClick={() => {
                onGenerateMoon();
                setIsOpen(false);
              }}
              className="py-1.5 px-2 rounded-lg bg-[#FAF2E9] hover:bg-[#F3E4D6] border border-[#AD6354]/30 text-[11px] font-serif-tc text-[#6C271B] text-center cursor-pointer transition-colors"
            >
              Generate Moon
            </button>

            <button
              onClick={() => {
                onPlaceMoon();
                setIsOpen(false);
              }}
              className="py-1.5 px-2 rounded-lg bg-[#FAF2E9] hover:bg-[#F3E4D6] border border-[#AD6354]/30 text-[11px] font-serif-tc text-[#6C271B] text-center cursor-pointer transition-colors"
            >
              Place Moon
            </button>

            <button
              onClick={() => {
                onShowResonantMoon();
                setIsOpen(false);
              }}
              className="py-1.5 px-2 rounded-lg bg-[#FAF2E9] hover:bg-[#F3E4D6] border border-[#AD6354]/30 text-[11px] font-serif-tc text-[#6C271B] text-center cursor-pointer transition-colors"
            >
              Show Resonant
            </button>

            <button
              onClick={() => {
                onCreateConnection();
                setIsOpen(false);
              }}
              className="py-1.5 px-2 rounded-lg bg-[#8B3327] hover:bg-[#6C271B] text-[#FAF2E9] text-[11px] font-serif-tc text-center cursor-pointer transition-colors"
            >
              Create Connection
            </button>

            <button
              onClick={() => {
                onSendNotification();
                setIsOpen(false);
              }}
              className="py-1.5 px-2 rounded-lg bg-[#AD6354] hover:bg-[#8B3327] text-[#FAF2E9] text-[11px] font-serif-tc text-center cursor-pointer transition-colors"
            >
              Send Notification
            </button>

            <button
              onClick={() => {
                onReset();
                setIsOpen(false);
              }}
              className="py-1.5 px-2 rounded-lg bg-[#F3E4D6] hover:bg-[#EADCCF] text-[#8B3327] text-[11px] font-serif-tc text-center cursor-pointer transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


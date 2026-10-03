import React, { useState, useMemo } from 'react';
import { ScreenState, MoonTileData, ConnectionData } from './types';
import { INITIAL_MOON_WALL } from './data/initialMoons';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { PrayerScreen } from './screens/PrayerScreen';
import { YourMoonScreen } from './screens/YourMoonScreen';
import { MoonWallScreen } from './screens/MoonWallScreen';
import { ThreadConnectionAnimation } from './components/ThreadConnectionAnimation';
import { NotificationScreen } from './screens/NotificationScreen';
import { ReflectionScreen } from './screens/ReflectionScreen';
import { EthosScreen } from './screens/EthosScreen';
import { SensorConnectScreen } from './screens/SensorConnectScreen';
import { DemoPanel } from './components/DemoPanel';
import { AmbientAudioManager } from './components/AmbientAudioManager';
import { NavigationTabs, TabId } from './components/NavigationTabs';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('welcome');
  const [physicalIntensity, setPhysicalIntensity] = useState<number>(42);
  const [temperature, setTemperature] = useState<number>(35.6);
  const [wallMoons, setWallMoons] = useState<MoonTileData[]>(INITIAL_MOON_WALL);
  const [connections, setConnections] = useState<ConnectionData[]>([
    { id: 'c1', sourceMoonId: '月 008', targetMoonId: '月 014', timestamp: Date.now() - 3600000 },
    { id: 'c2', sourceMoonId: '月 014', targetMoonId: '月 021', timestamp: Date.now() - 1800000 },
  ]);
  const [activeConnectionTarget, setActiveConnectionTarget] = useState<MoonTileData | null>(null);

  // Derive User's Moon based on physical intensity
  // Higher physical intensity -> softer / dimmer moon
  // Lower physical intensity -> brighter moon
  const userBrightness = useMemo(() => {
    return Math.max(0.28, Math.min(0.92, 1 - (physicalIntensity / 135)));
  }, [physicalIntensity]);

  const userMoon: MoonTileData = useMemo(() => ({
    moonId: '月 027',
    number: 27,
    brightness: userBrightness,
    physicalIntensity: physicalIntensity,
    connectionsReceived: 1,
    colorTone: 'terracotta',
    x: 48,
    y: 26,
    isUserMoon: true,
  }), [userBrightness, physicalIntensity]);

  // Find a resonant moon with similar brightness
  const resonantMoon = useMemo(() => {
    const candidates = wallMoons.filter((m) => m.moonId !== userMoon.moonId);
    if (!candidates.length) return null;
    const sorted = [...candidates].sort(
      (a, b) => Math.abs(a.brightness - userMoon.brightness) - Math.abs(b.brightness - userMoon.brightness)
    );
    return sorted[0];
  }, [wallMoons, userMoon]);

  // Screen navigation handlers
  const handleBegin = () => setCurrentScreen('sensor-connect');
  const handleProceedToPrayer = () => setCurrentScreen('prayer');
  const handleFinishPrayer = () => setCurrentScreen('your-moon');
  const handlePlaceMoon = () => setCurrentScreen('moon-wall');

  const handleTriggerConnection = (target: MoonTileData) => {
    setActiveConnectionTarget(target);
    setCurrentScreen('connection');
  };

  const handleConnectionComplete = () => {
    if (activeConnectionTarget) {
      setConnections((prev) => [
        ...prev,
        {
          id: `conn-${Date.now()}`,
          sourceMoonId: userMoon.moonId,
          targetMoonId: activeConnectionTarget.moonId,
          timestamp: Date.now(),
        },
      ]);
      // Brighten target moon slightly as it received warmth
      setWallMoons((prev) =>
        prev.map((m) =>
          m.moonId === activeConnectionTarget.moonId
            ? { ...m, brightness: Math.min(0.95, m.brightness + 0.25), connectionsReceived: m.connectionsReceived + 1 }
            : m
        )
      );
    }
  };

  const handleProceedToNotification = () => setCurrentScreen('notification');
  const handleProceedToReflection = () => setCurrentScreen('reflection');
  const handlePassItForward = () => setCurrentScreen('moon-wall');

  // Simple tabs navigation handler
  const handleSelectTab = (tabId: TabId) => {
    switch (tabId) {
      case 'prayer':
        setCurrentScreen('welcome');
        break;
      case 'wall':
        setCurrentScreen('moon-wall');
        break;
      case 'echo':
        setCurrentScreen('notification');
        break;
      case 'ethos':
        setCurrentScreen('ethos');
        break;
    }
  };

  // Demo mode actions
  const handleIntensityChange = (val: number) => {
    setPhysicalIntensity(val);
  };

  const handleDemoGenerateMoon = () => setCurrentScreen('your-moon');
  const handleDemoPlaceMoon = () => setCurrentScreen('moon-wall');
  const handleDemoShowResonant = () => {
    setCurrentScreen('moon-wall');
  };
  const handleDemoCreateConnection = () => {
    if (resonantMoon) {
      setActiveConnectionTarget(resonantMoon);
      setCurrentScreen('connection');
    }
  };
  const handleDemoSendNotification = () => setCurrentScreen('notification');
  const handleDemoReset = () => {
    setCurrentScreen('welcome');
    setPhysicalIntensity(42);
    setWallMoons(INITIAL_MOON_WALL);
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full overflow-hidden bg-[#FAF2E9] text-[#5D241C] flex flex-col items-center">
      {/* Container constrained to mobile-first viewport while centered gracefully on wider screens */}
      <main className="w-full max-w-md h-[100dvh] max-h-[100dvh] overflow-hidden relative shadow-2xl sm:border-x sm:border-[#AD6354]/20 flex flex-col bg-[#FAF2E9]">
        {/* ROW 1 — GLOBAL CONTROLS (Clean, non-overlapping horizontal control bar) */}
        <header className="w-full flex-shrink-0 px-4 pt-3 pb-1 z-30 select-none">
          <div className="w-full flex items-center justify-between">
            {/* LEFT: ♪ 月下靜心 */}
            <AmbientAudioManager />

            {/* RIGHT: ● 展示模式 */}
            <DemoPanel
              physicalIntensity={physicalIntensity}
              onIntensityChange={handleIntensityChange}
              onGenerateMoon={handleDemoGenerateMoon}
              onPlaceMoon={handleDemoPlaceMoon}
              onShowResonantMoon={handleDemoShowResonant}
              onCreateConnection={handleDemoCreateConnection}
              onSendNotification={handleDemoSendNotification}
              onReset={handleDemoReset}
            />
          </div>
        </header>

        {/* Active Scene (Full Height Flex Item, Strictly No Overflow) */}
        <div className="flex-1 min-h-0 w-full overflow-hidden relative flex flex-col">
          {/* SCREEN 1: WELCOME */}
          {currentScreen === 'welcome' && (
            <WelcomeScreen onBegin={handleBegin} />
          )}

          {/* SCREEN 1.5: SENSOR CONNECTION (戴上你的心弦) */}
          {currentScreen === 'sensor-connect' && (
            <SensorConnectScreen
              gripStrength={physicalIntensity}
              temperature={temperature}
              onGripChange={(val) => setPhysicalIntensity(val)}
              onTemperatureChange={(val) => setTemperature(val)}
              onProceedToPrayer={handleProceedToPrayer}
              onBack={() => setCurrentScreen('welcome')}
            />
          )}

          {/* SCREEN 2: PRAYER */}
          {currentScreen === 'prayer' && (
            <PrayerScreen
              physicalIntensity={physicalIntensity}
              gripStrength={physicalIntensity}
              temperature={temperature}
              onFinishPrayer={handleFinishPrayer}
              onBack={() => setCurrentScreen('sensor-connect')}
            />
          )}

          {/* SCREEN 3: YOUR MOON */}
          {currentScreen === 'your-moon' && (
            <YourMoonScreen
              userMoon={userMoon}
              onPlaceMoon={handlePlaceMoon}
            />
          )}

          {/* SCREEN 4: MOON WALL */}
          {currentScreen === 'moon-wall' && (
            <MoonWallScreen
              userMoon={userMoon}
              wallMoons={wallMoons}
              resonantMoon={resonantMoon}
              connections={connections}
              onTriggerConnection={handleTriggerConnection}
              onSimulateIncomingNotice={handleDemoSendNotification}
            />
          )}

          {/* SCREEN 5: CONNECTION ANIMATION */}
          {currentScreen === 'connection' && activeConnectionTarget && (
            <ThreadConnectionAnimation
              userMoon={userMoon}
              targetMoon={activeConnectionTarget}
              onComplete={handleConnectionComplete}
              onProceedToNotification={handleProceedToNotification}
            />
          )}

          {/* SCREEN 6: SOMEONE NOTICED YOUR LIGHT */}
          {currentScreen === 'notification' && (
            <NotificationScreen
              userMoon={userMoon}
              onProceedToReflection={handleProceedToReflection}
            />
          )}

          {/* SCREEN 7: SIMPLE REFLECTION */}
          {currentScreen === 'reflection' && (
            <ReflectionScreen
              userMoon={userMoon}
              onPassItForward={handlePassItForward}
            />
          )}

          {/* SCREEN 8: ETHOS / ORIGIN */}
          {currentScreen === 'ethos' && (
            <EthosScreen
              onGoToPrayer={() => setCurrentScreen('prayer')}
              onGoToWall={() => setCurrentScreen('moon-wall')}
            />
          )}
        </div>

        {/* Permanent Bottom Navigation Tabs */}
        <NavigationTabs
          currentScreen={currentScreen}
          onSelectTab={handleSelectTab}
        />
      </main>
    </div>
  );
}

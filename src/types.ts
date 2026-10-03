export type ScreenState = 
  | 'welcome'
  | 'sensor-connect'
  | 'prayer'
  | 'your-moon'
  | 'moon-wall'
  | 'connection'
  | 'notification'
  | 'reflection'
  | 'ethos';

export type MoonColorTone = 'ivory' | 'cream' | 'terracotta' | 'dusty-rose' | 'temple-red';

export interface MoonTileData {
  moonId: string; // e.g. "月 027"
  number: number;
  brightness: number; // 0 to 1
  physicalIntensity: number; // 0 to 100
  connectionsReceived: number;
  colorTone: MoonColorTone;
  // Wall position in responsive coordinate percentages or grid offsets
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  size?: number;
  isUserMoon?: boolean;
  isResonantTarget?: boolean;
}

export interface ConnectionData {
  id: string;
  sourceMoonId: string;
  targetMoonId: string;
  timestamp: number;
}

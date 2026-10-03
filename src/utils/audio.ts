/**
 * Minimal Web Audio synthesizer for Taiwanese Yue Lao temple ambient sounds
 * Calibrated balance:
 * - UI interaction sounds: ~30–40% volume
 * - Important emotional sound moments: ~40–50% volume
 * - Automatically ducks Zen background music during playback
 */

import { zenMusic } from './zenMusic';

class TempleAudioPlayer {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx(): AudioContext | null {
    if (!this.ctx) {
      this.ctx = zenMusic.getAudioContext();
    }
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Soft temple singing bowl bell chime for UI interactions (30-40% volume)
   */
  playBell(freq = 432, duration = 3.5, gainLevel = 0.35) {
    if (!this.enabled) return;
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Automatically duck Zen background music slightly
      zenMusic.duck(0.07, 2.0);

      // Fundamental harmonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.76, now); // Metallic overtone

      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(freq * 5.4, now); // Shimmer

      // Subtle exponential decay calibrated to 30-40%
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      osc3.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
      osc3.stop(now + duration);
    } catch {
      // AudioContext unavailable
    }
  }

  /**
   * Harmonious chime for red thread connection (Emotional moment: 40-50% volume)
   */
  playThreadConnect() {
    if (!this.enabled) return;
    try {
      zenMusic.duck(0.05, 3.2);
      this.playBell(528, 4.2, 0.45); // 528Hz love frequency harmonic
      setTimeout(() => this.playBell(660, 3.8, 0.42), 220);
      setTimeout(() => this.playBell(792, 4.2, 0.45), 450);
    } catch {
      // AudioContext unavailable
    }
  }

  /**
   * Gentle soft touch tone for prayer completion (Emotional moment: 40-50% volume)
   */
  playPrayerComplete() {
    if (!this.enabled) return;
    try {
      zenMusic.duck(0.05, 3.0);
      this.playBell(396, 3.6, 0.45);
      setTimeout(() => this.playBell(528, 4.0, 0.46), 280);
    } catch {
      // AudioContext unavailable
    }
  }

  /**
   * Subtle whisper chime when receiving a stranger's light (Emotional moment: 40-50% volume)
   */
  playNoticedWhisper() {
    if (!this.enabled) return;
    try {
      zenMusic.duck(0.04, 3.5);
      this.playBell(660, 4.5, 0.46);
      setTimeout(() => this.playBell(880, 4.8, 0.48), 240);
    } catch {
      // AudioContext unavailable
    }
  }
}

export const templeAudio = new TempleAudioPlayer();

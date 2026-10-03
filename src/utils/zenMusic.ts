/**
 * Zen / Yue Lao Temple Atmosphere Background Music Engine
 * 
 * Continuous, subtle Zen soundscape for inner balance, stress relief, and relaxation:
 * - Soft guqin / guzheng strings in traditional pentatonic scale (D, G, A, C, D, E, G, A)
 * - Very light bamboo flute (Xiao / Dizi) with gentle breath & vibrato
 * - Gentle temple singing bowls & chimes (432Hz, 528Hz, 396Hz)
 * - Subtle breeze & rustling leaves ambience
 * - Soft wooden temple percussion (Muyu)
 * - Dynamic audio ducking when interaction sounds play
 * - Master balance: Zen music ~15–25%, UI ~30–40%, emotional moments ~40–50%
 */

class ZenTempleMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterZenGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private melodyGain: GainNode | null = null;
  private normalZenVolume = 0.20; // 20% volume baseline (15–25% recommended)
  private isDucked = false;
  private duckTimer: number | null = null;
  private melodyTimer: number | null = null;
  private fluteTimer: number | null = null;
  private bellTimer: number | null = null;
  private woodblockTimer: number | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private noiseNode: AudioBufferSourceNode | null = null;

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public getAudioContext(): AudioContext | null {
    this.ensureContext();
    return this.ctx;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
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

  private setupMasterBus() {
    if (!this.ctx) return;
    if (!this.masterZenGain) {
      this.masterZenGain = this.ctx.createGain();
      this.masterZenGain.gain.setValueAtTime(this.normalZenVolume, this.ctx.currentTime);
      this.masterZenGain.connect(this.ctx.destination);
    }
    if (!this.ambientGain) {
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
      this.ambientGain.connect(this.masterZenGain);
    }
    if (!this.melodyGain) {
      this.melodyGain = this.ctx.createGain();
      this.melodyGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.melodyGain.connect(this.masterZenGain);
    }
  }

  /**
   * 1. AMBIENT TEMPLE BED: Soft breeze, leaves rustle, warm low grounding drone
   */
  private startAmbientBed() {
    if (!this.ctx || !this.ambientGain) return;
    const ctx = this.ctx;

    // A. Warm 108Hz / 216Hz pure grounding drone (calming temple presence)
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(108, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.045, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneGain.connect(this.ambientGain);
    droneOsc.start();

    const droneHarmonic = ctx.createOscillator();
    const droneHarmonicGain = ctx.createGain();
    droneHarmonic.type = 'sine';
    droneHarmonic.frequency.setValueAtTime(216, ctx.currentTime);
    droneHarmonicGain.gain.setValueAtTime(0.025, ctx.currentTime);
    droneHarmonic.connect(droneHarmonicGain);
    droneHarmonicGain.connect(this.ambientGain);
    droneHarmonic.start();

    // B. Gentle wind & bamboo leaves whisper (soft pink noise with slow breathing bandpass filter)
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.05;
      b1 = 0.985 * b1 + white * 0.08;
      b2 = 0.95 * b2 + white * 0.12;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    this.noiseNode = ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(340, ctx.currentTime);
    windFilter.Q.setValueAtTime(1.4, ctx.currentTime);

    // LFO for breathing breeze swells
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(0.09, ctx.currentTime); // slow breathing cycle ~11s
    lfoGain.gain.setValueAtTime(140, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);
    lfo.start();

    const windGain = ctx.createGain();
    windGain.gain.setValueAtTime(0.06, ctx.currentTime);

    this.noiseNode.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.ambientGain);
    this.noiseNode.start();
  }

  /**
   * 2. GUQIN / GUZHENG STRINGS (古琴 · 傳統五聲音階)
   * Pentatonic scale: D3, G3, A3, C4, D4, E4, G4, A4
   */
  private playGuqinString(freq: number, duration = 4.5, velocity = 0.18) {
    if (!this.ctx || !this.melodyGain || !this.isPlaying) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Fundamental plucked tone
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // 2nd Harmonic (octave warm overtone)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // 3rd Harmonic (sweet fifth)
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.01, now);

    // Guqin wooden body filter
    const bodyFilter = ctx.createBiquadFilter();
    bodyFilter.type = 'lowpass';
    bodyFilter.frequency.setValueAtTime(Math.min(2200, freq * 4), now);
    bodyFilter.frequency.exponentialRampToValueAtTime(Math.max(280, freq * 1.5), now + duration);

    // String pluck envelope: fast attack, warm wood sustain, peaceful slow decay
    const stringGain = ctx.createGain();
    stringGain.gain.setValueAtTime(0.0001, now);
    stringGain.gain.linearRampToValueAtTime(velocity, now + 0.025);
    stringGain.gain.exponentialRampToValueAtTime(velocity * 0.45, now + 0.6);
    stringGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(bodyFilter);
    osc2.connect(bodyFilter);
    osc3.connect(bodyFilter);
    bodyFilter.connect(stringGain);
    stringGain.connect(this.melodyGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
    osc3.stop(now + duration + 0.1);
  }

  /**
   * 3. LIGHT BAMBOO FLUTE (蕭 / 笛 Xiao Breathy Tone)
   */
  private playBambooFlute(freq: number, duration = 4.8) {
    if (!this.ctx || !this.melodyGain || !this.isPlaying) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Gentle vibrato at 4.2Hz
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(4.2, now);
    vibratoGain.gain.setValueAtTime(freq * 0.012, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(now);
    vibrato.stop(now + duration);

    // Bamboo breath noise
    const noiseLen = ctx.sampleRate * duration;
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.03;
    }
    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(freq * 1.5, now);
    noiseFilter.Q.setValueAtTime(3.0, now);

    // Gentle swelling flute envelope
    const fluteGain = ctx.createGain();
    fluteGain.gain.setValueAtTime(0.0001, now);
    fluteGain.gain.linearRampToValueAtTime(0.09, now + 0.9); // slow tender attack
    fluteGain.gain.linearRampToValueAtTime(0.075, now + duration * 0.65);
    fluteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(fluteGain);
    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(fluteGain);
    fluteGain.connect(this.melodyGain);

    osc.start(now);
    noiseSrc.start(now);
    osc.stop(now + duration);
    noiseSrc.stop(now + duration);
  }

  /**
   * 4. TEMPLE BELL & CHIME RESONANCE (432Hz / 528Hz / 396Hz)
   */
  private playTempleSingingBowl(freq = 432, duration = 6.5) {
    if (!this.ctx || !this.melodyGain || !this.isPlaying) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Binaural beating warmth (0.8Hz difference for alpha wave relaxation)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq + 0.8, now);

    // Upper crystal harmonic
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 2.76, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.075, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(this.melodyGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  /**
   * 5. SOFT WOODEN PERCUSSION (Muyu 木魚)
   */
  private playSoftWoodblock() {
    if (!this.ctx || !this.melodyGain || !this.isPlaying) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.06);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(500, now);
    filter.Q.setValueAtTime(4.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.038, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.melodyGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Musical phrases composed in traditional pentatonic scale (宮商角徵羽)
   * Generates seamless, slow, meditative phrases with generous silence between notes
   */
  private scheduleMelodyLoops() {
    // Pentatonic scale frequencies in Hz
    // D3: 146.83, G3: 196.00, A3: 220.00, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00, C5: 523.25
    const guqinPhrases = [
      [220.00, 261.63, 293.66, 329.63],       // A3, C4, D4, E4
      [392.00, 329.63, 293.66, 220.00],       // G4, E4, D4, A3
      [196.00, 220.00, 293.66, 261.63],       // G3, A3, D4, C4
      [293.66, 392.00, 440.00, 523.25],       // D4, G4, A4, C5
      [329.63, 293.66, 220.00, 196.00, 146.83] // E4, D4, A3, G3, D3
    ];

    let phraseIndex = 0;

    const runGuqinCycle = () => {
      if (!this.isPlaying) return;
      const phrase = guqinPhrases[phraseIndex % guqinPhrases.length];
      phraseIndex++;

      phrase.forEach((note, idx) => {
        setTimeout(() => {
          if (this.isPlaying) {
            this.playGuqinString(note, 4.5 + Math.random() * 1.5, 0.12 + Math.random() * 0.05);
          }
        }, idx * 1800 + (Math.random() * 300));
      });

      // Spacious gap between phrases: 10 to 14 seconds
      const nextDelay = 10000 + Math.random() * 4000;
      this.melodyTimer = window.setTimeout(runGuqinCycle, nextDelay);
    };

    // Xiao bamboo flute melody loops (occasional tender breath)
    const fluteNotes = [392.00, 440.00, 329.63, 293.66]; // G4, A4, E4, D4
    let fluteIdx = 0;
    const runFluteCycle = () => {
      if (!this.isPlaying) return;
      const note = fluteNotes[fluteIdx % fluteNotes.length];
      fluteIdx++;
      this.playBambooFlute(note, 5.0);

      // Flute plays gently every 16 to 24 seconds
      const nextFlute = 16000 + Math.random() * 8000;
      this.fluteTimer = window.setTimeout(runFluteCycle, nextFlute);
    };

    // Delicate temple bowl resonance (432Hz / 528Hz)
    const runBellCycle = () => {
      if (!this.isPlaying) return;
      const bowls = [432, 528, 396];
      const selected = bowls[Math.floor(Math.random() * bowls.length)];
      this.playTempleSingingBowl(selected, 7.5);

      // Rings every 22 to 32 seconds
      const nextBell = 22000 + Math.random() * 10000;
      this.bellTimer = window.setTimeout(runBellCycle, nextBell);
    };

    // Soft Muyu wooden heartbeat click
    const runWoodblockCycle = () => {
      if (!this.isPlaying) return;
      this.playSoftWoodblock();
      // Wooden click every 9 to 14 seconds
      const nextWood = 9000 + Math.random() * 5000;
      this.woodblockTimer = window.setTimeout(runWoodblockCycle, nextWood);
    };

    // Start staggered sequence
    runGuqinCycle();
    this.fluteTimer = window.setTimeout(runFluteCycle, 4500);
    this.bellTimer = window.setTimeout(runBellCycle, 2000);
    this.woodblockTimer = window.setTimeout(runWoodblockCycle, 7000);
  }

  /**
   * AUDIO DUCKING SYSTEM
   * Automatically reduces Zen music slightly in volume whenever an important interaction sound plays,
   * then gently returns to its normal level (1.8s - 2.5s).
   */
  public duck(duckLevel = 0.07, restoreDuration = 2.0) {
    if (!this.ctx || !this.masterZenGain || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    if (this.duckTimer) {
      window.clearTimeout(this.duckTimer);
      this.duckTimer = null;
    }

    this.isDucked = true;
    // Rapid smooth duck down to duckLevel over 0.15s
    this.masterZenGain.gain.cancelScheduledValues(now);
    this.masterZenGain.gain.setValueAtTime(this.masterZenGain.gain.value, now);
    this.masterZenGain.gain.linearRampToValueAtTime(duckLevel, now + 0.15);

    // Gently return to normal level
    this.duckTimer = window.setTimeout(() => {
      if (this.ctx && this.masterZenGain && this.isPlaying) {
        const restoreNow = this.ctx.currentTime;
        this.masterZenGain.gain.cancelScheduledValues(restoreNow);
        this.masterZenGain.gain.setValueAtTime(this.masterZenGain.gain.value, restoreNow);
        this.masterZenGain.gain.linearRampToValueAtTime(this.normalZenVolume, restoreNow + restoreDuration);
        this.isDucked = false;
      }
    }, 450);
  }

  public async play(): Promise<void> {
    if (this.isPlaying) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    this.setupMasterBus();
    this.isPlaying = true;

    // Fade in master volume gently over 2.5s
    const now = ctx.currentTime;
    if (this.masterZenGain) {
      this.masterZenGain.gain.setValueAtTime(0.0001, now);
      this.masterZenGain.gain.linearRampToValueAtTime(this.normalZenVolume, now + 2.5);
    }

    this.startAmbientBed();
    this.scheduleMelodyLoops();
    this.notify();
  }

  public pause(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    // Clear timers
    if (this.melodyTimer) window.clearTimeout(this.melodyTimer);
    if (this.fluteTimer) window.clearTimeout(this.fluteTimer);
    if (this.bellTimer) window.clearTimeout(this.bellTimer);
    if (this.woodblockTimer) window.clearTimeout(this.woodblockTimer);
    if (this.duckTimer) window.clearTimeout(this.duckTimer);

    if (this.ctx && this.masterZenGain) {
      const now = this.ctx.currentTime;
      this.masterZenGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
    }

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // Ignored
      }
      this.noiseNode = null;
    }

    this.notify();
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public setVolume(val: number) {
    this.normalZenVolume = Math.max(0, Math.min(1, val));
    if (this.masterZenGain && this.ctx && !this.isDucked) {
      const now = this.ctx.currentTime;
      this.masterZenGain.gain.cancelScheduledValues(now);
      this.masterZenGain.gain.linearRampToValueAtTime(this.normalZenVolume, now + 0.1);
    }
  }

  public getVolume() {
    return this.normalZenVolume;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const zenMusic = new ZenTempleMusicEngine();

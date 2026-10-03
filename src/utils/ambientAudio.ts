/**
 * HTML5 Audio Ambient Soundscape Generator & Player
 * Synthesizes and loops a gentle, low-volume soundscape of:
 * - Distant temple bells (deep warm resonances with natural metallic decay)
 * - Wind chimes (delicate, high crystalline chimes ringing in the breeze)
 * - Faint, calm wind gusts (soft breathing breeze sweeping across temple eaves)
 */

function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataLength = buffer.length * blockAlign;
  const bufferLength = 44 + dataLength;

  const arrayBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(arrayBuffer);

  // RIFF header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(view, 8, 'WAVE');

  // fmt subchunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  // data subchunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataLength, true);

  // Write 16-bit mono PCM
  const channelData = buffer.getChannelData(0);
  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    const sample = Math.max(-1, Math.min(1, channelData[i]));
    const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
    view.setInt16(offset, intSample, true);
    offset += 2;
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

class TempleAmbientAudio {
  private audioElement: HTMLAudioElement | null = null;
  private isInitialized = false;
  private isPlaying = false;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private volume = 0.28; // Gentle, low-volume ambient baseline

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

  public async init(): Promise<HTMLAudioElement | null> {
    if (this.isInitialized && this.audioElement) return this.audioElement;
    if (typeof window === 'undefined') return null;

    try {
      const sampleRate = 22050;
      const durationSeconds = 20; // 20-second seamless loop
      const totalSamples = sampleRate * durationSeconds;

      const OfflineCtx = window.OfflineAudioContext || (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;
      if (!OfflineCtx) return null;

      const offlineCtx = new OfflineCtx(1, totalSamples, sampleRate);

      // ==========================================
      // 1. FAINT, CALM WIND GUSTS
      // ==========================================
      const noiseBuffer = offlineCtx.createBuffer(1, totalSamples, sampleRate);
      const noiseOut = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < totalSamples; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.997 * b0 + white * 0.04;
        b1 = 0.985 * b1 + white * 0.07;
        b2 = 0.95 * b2 + white * 0.1;
        noiseOut[i] = (b0 + b1 + b2) * 0.18;
      }

      const noiseSource = offlineCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      // Bandpass filter for gentle courtyard breeze
      const windFilter = offlineCtx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(240, 0);
      windFilter.Q.setValueAtTime(1.6, 0);

      // Periodic gentle wind gust swells (at 3s, 9s, 15s)
      for (let t = 0; t < durationSeconds; t += 1) {
        const swell = 220 + Math.sin((t / durationSeconds) * Math.PI * 4) * 75 + Math.sin(t * 0.5) * 30;
        windFilter.frequency.linearRampToValueAtTime(Math.max(160, swell), t);
      }

      const windGain = offlineCtx.createGain();
      windGain.gain.setValueAtTime(0.08, 0);
      // Gentle breathing envelope for wind
      windGain.gain.linearRampToValueAtTime(0.12, 4);
      windGain.gain.linearRampToValueAtTime(0.07, 8);
      windGain.gain.linearRampToValueAtTime(0.13, 14);
      windGain.gain.linearRampToValueAtTime(0.08, 20);

      noiseSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(offlineCtx.destination);
      noiseSource.start(0);

      // ==========================================
      // 2. DISTANT TEMPLE BELLS (Low, resonant gong/singing bowl)
      // ==========================================
      const addDistantBell = (time: number, baseFreq: number, gainLevel: number) => {
        const osc1 = offlineCtx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(baseFreq, time);

        // Metallic second overtone
        const osc2 = offlineCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(baseFreq * 2.756, time);

        // Third harmonic
        const osc3 = offlineCtx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(baseFreq * 5.404, time);

        const bellGain = offlineCtx.createGain();
        bellGain.gain.setValueAtTime(0, time);
        bellGain.gain.linearRampToValueAtTime(gainLevel, time + 0.05);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, time + 5.2);

        osc1.connect(bellGain);
        osc2.connect(bellGain);
        osc3.connect(bellGain);
        bellGain.connect(offlineCtx.destination);

        osc1.start(time);
        osc2.start(time);
        osc3.start(time);
        osc1.stop(time + 5.3);
        osc2.stop(time + 5.3);
        osc3.stop(time + 5.3);
      };

      // Bell chime 1: at 1.5s (432Hz deep meditative bell)
      addDistantBell(1.5, 432, 0.065);
      // Bell chime 2: at 11.2s (360Hz resonant bell)
      addDistantBell(11.2, 360, 0.055);

      // ==========================================
      // 3. DELICATE WIND CHIMES (High crystalline brass/bamboo tines)
      // ==========================================
      const addWindChime = (time: number, freq: number, intensity: number) => {
        const chimeOsc = offlineCtx.createOscillator();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, time);

        // Subtle shimmer overtone
        const shimmerOsc = offlineCtx.createOscillator();
        shimmerOsc.type = 'sine';
        shimmerOsc.frequency.setValueAtTime(freq * 3.01, time);

        const chimeGain = offlineCtx.createGain();
        chimeGain.gain.setValueAtTime(0, time);
        chimeGain.gain.linearRampToValueAtTime(intensity, time + 0.015);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, time + 2.8);

        chimeOsc.connect(chimeGain);
        shimmerOsc.connect(chimeGain);
        chimeGain.connect(offlineCtx.destination);

        chimeOsc.start(time);
        shimmerOsc.start(time);
        chimeOsc.stop(time + 2.9);
        shimmerOsc.stop(time + 2.9);
      };

      // Gentle cluster of wind chimes stirred by the breeze
      addWindChime(4.8, 1056, 0.035);
      addWindChime(5.1, 1320, 0.028);
      addWindChime(8.6, 1188, 0.032);
      addWindChime(15.4, 1408, 0.03);
      addWindChime(15.7, 1056, 0.025);
      addWindChime(18.2, 1267, 0.028);

      // Render offline buffer to audio
      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = audioBufferToWav(renderedBuffer);
      const audioUrl = URL.createObjectURL(wavBlob);

      // Create standard HTML5 Audio element
      this.audioElement = new Audio(audioUrl);
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.isInitialized = true;
      return this.audioElement;
    } catch {
      return null;
    }
  }

  public async play(): Promise<void> {
    if (!this.isInitialized || !this.audioElement) {
      await this.init();
    }
    if (this.audioElement) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.notify();
      } catch {
        // User gesture required in some browser policies
      }
    }
  }

  public pause(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.notify();
    }
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
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public getVolume() {
    return this.volume;
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const templeAmbient = new TempleAmbientAudio();

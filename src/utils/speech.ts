/**
 * Web Speech API wrapper for Indonesian educational narration
 * Kid-friendly, non-blocking, customizable
 */

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPaused: boolean = false;
  private isMuted: boolean = false;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isAvailable(): boolean {
    return this.synth !== null;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
    this.notify();
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !!(this.synth && this.synth.speaking && !this.synth.paused);
  }

  public getIsPaused(): boolean {
    return !!(this.synth && this.synth.paused);
  }

  public subscribe(cb: () => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.synth || this.isMuted) {
      onEnd?.();
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95; // Slightly slower, friendly pace for elementary students
    utterance.pitch = 1.05; // Cheerful, warm tone

    // Try finding an Indonesian voice if available
    const voices = this.synth.getVoices();
    const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('IND') || v.lang.includes('Indonesia'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => {
      this.currentUtterance = null;
      this.isPaused = false;
      this.notify();
      onEnd?.();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      this.isPaused = false;
      this.notify();
      onEnd?.();
    };

    this.currentUtterance = utterance;
    this.isPaused = false;
    this.synth.speak(utterance);
    this.notify();
  }

  public pause() {
    if (this.synth && this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
      this.isPaused = false;
      this.notify();
    }
  }
}

export const speechService = new SpeechService();

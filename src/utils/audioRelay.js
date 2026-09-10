/**
 * AudioRelay
 * Web Audio API synthesizer for 1970s mechanical solenoid and relay clicks.
 * Zero external audio files required. Runs on all standard modern browsers.
 */

let audioCtx = null;
let soundEnabled = true;

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

export const playRelayClick = (type = 'toggle') => {
  if (!soundEnabled || typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const t = audioCtx.currentTime;

    if (type === 'toggle') {
      // Dual-stage mechanical solenoid snap
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(4, t);

      osc.type = 'square';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.025);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(t);
      osc.stop(t + 0.04);

      // Rebound secondary tick
      setTimeout(() => {
        if (!audioCtx) return;
        const t2 = audioCtx.currentTime;
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(640, t2);
        gain2.gain.setValueAtTime(0.12, t2);
        gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.015);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(t2);
        osc2.stop(t2 + 0.02);
      }, 20);
    } else if (type === 'knob') {
      // Subtle Bakelite rotary detent click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, t);
      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.015);
    } else if (type === 'button') {
      // Heavy illuminated push button latch
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.04);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.055);
    }
  } catch {
    // Graceful fallback if audio context blocked before user gesture
  }
};

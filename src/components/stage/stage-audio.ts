"use client";

/**
 * Ambient grand-piano loop, synthesized with WebAudio (no assets):
 * a slow Cmaj7 → Am7 → Fmaj7 → G arpeggio through a lowpass and a
 * feedback delay for room feel. Autoplay-policy aware: start() resolves
 * false when the context can't run without a user gesture — callers
 * should then surface a play button.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let bar = 0;

const CHORDS = [
  [261.63, 329.63, 392.0, 493.88], // Cmaj7
  [220.0, 261.63, 329.63, 392.0], // Am7
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [196.0, 246.94, 293.66, 392.0], // G
];

const BAR_SECONDS = 3.6;

function playNote(freq: number, at: number, dur = 3.2, peak = 0.045) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1400;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(peak, at + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start(at);
  osc.stop(at + dur + 0.1);
  osc.onended = () => {
    osc.disconnect();
    filter.disconnect();
    gain.disconnect();
  };
}

function scheduleBar() {
  if (!ctx) return;
  const chord = CHORDS[bar % CHORDS.length];
  const t0 = ctx.currentTime + 0.08;
  chord.forEach((freq, i) => playNote(freq, t0 + i * 0.82));
  // An occasional high answer, one octave up.
  if (bar % 2 === 1) playNote(chord[(bar >> 1) % 4] * 2, t0 + 2.7, 2.2, 0.02);
  bar += 1;
}

export async function startStageAudio(): Promise<boolean> {
  try {
    ctx ??= new AudioContext();
    await ctx.resume();
  } catch {
    return false;
  }
  if (ctx.state !== "running") return false;
  if (timer !== null) return true;

  master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.5);
  // Room: feedback delay bleeding into the mix.
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.42;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.32;
  const wet = ctx.createGain();
  wet.gain.value = 0.35;
  master.connect(ctx.destination);
  master.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  bar = 0;
  scheduleBar();
  timer = window.setInterval(scheduleBar, BAR_SECONDS * 1000);
  return true;
}

export function stopStageAudio() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  if (ctx && master) {
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  }
}

export function stageAudioRunning() {
  return timer !== null;
}

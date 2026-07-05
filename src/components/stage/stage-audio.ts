"use client";

/**
 * Moonlight Sonata, 1st movement (Beethoven, Op. 27 No. 2) — opening
 * measures synthesized with WebAudio and looped: sustained bass
 * octaves under the famous C♯-minor triplets, with the repeated-G♯
 * melody entering in bar 5. Autoplay-policy aware: start() resolves
 * false when the context can't run without a user gesture.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: number | null = null;
let measureIndex = 0;
let nextMeasureAt = 0;

// f(n) = 440·2^((n−69)/12)
const freq = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

const QUARTER = 60 / 52; // adagio sostenuto
const MEASURE = QUARTER * 4;
const TRIPLET = QUARTER / 3;

type MelodyEvent = { beat: number; midi: number; beats: number };
type BassEvent = { beat: number; notes: number[]; beats: number };
type Measure = {
  bass: BassEvent[];
  /** One triplet (3 MIDI notes) per beat. */
  triplets: number[][];
  melody?: MelodyEvent[];
};

const rep = <T,>(x: T, n: number): T[] => Array.from({ length: n }, () => x);

// MIDI: C#2=37 C#3=49 B1=35 B2=47 A1=33 A2=45 F#1=30 F#2=42 G#1=32 G#2=44
//       G#3=56 A3=57 B#3(C4)=60 C#4=61 D4=62 D#4=63 E4=64 F#4=66 G#4=68
const MEASURES: Measure[] = [
  { bass: [{ beat: 0, notes: [37, 49], beats: 4 }], triplets: rep([56, 61, 64], 4) },
  { bass: [{ beat: 0, notes: [35, 47], beats: 4 }], triplets: rep([56, 61, 64], 4) },
  {
    bass: [
      { beat: 0, notes: [33, 45], beats: 2 },
      { beat: 2, notes: [30, 42], beats: 2 },
    ],
    triplets: [...rep([57, 61, 64], 2), ...rep([57, 62, 66], 2)],
  },
  {
    bass: [{ beat: 0, notes: [32, 44], beats: 4 }],
    triplets: [
      [56, 60, 66],
      [56, 60, 66],
      [56, 61, 64],
      [56, 61, 64],
    ],
  },
  {
    bass: [{ beat: 0, notes: [37, 49], beats: 4 }],
    triplets: rep([56, 61, 64], 4),
    // The repeated-note motif enters on beat 4: G#4 dotted-eighth + sixteenth.
    melody: [
      { beat: 3, midi: 68, beats: 0.75 },
      { beat: 3.75, midi: 68, beats: 0.25 },
    ],
  },
  {
    bass: [{ beat: 0, notes: [37, 49], beats: 4 }],
    triplets: rep([56, 61, 64], 4),
    melody: [{ beat: 0, midi: 68, beats: 4 }],
  },
];

function voice(
  midi: number,
  at: number,
  dur: number,
  peak: number,
  cutoff = 1500,
) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.value = freq(midi);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = cutoff;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(peak, at + 0.025);
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

function scheduleMeasure(measure: Measure, t0: number) {
  for (const b of measure.bass) {
    for (const n of b.notes) {
      voice(n, t0 + b.beat * QUARTER, b.beats * QUARTER * 1.1, 0.05, 900);
    }
  }
  measure.triplets.forEach((triplet, beat) => {
    triplet.forEach((n, k) => {
      voice(n, t0 + beat * QUARTER + k * TRIPLET, TRIPLET * 2.4, 0.024);
    });
  });
  for (const m of measure.melody ?? []) {
    voice(m.midi, t0 + m.beat * QUARTER, m.beats * QUARTER * 1.15, 0.055, 2200);
  }
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
  delay.delayTime.value = 0.38;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.3;
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  master.connect(ctx.destination);
  master.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  wet.connect(ctx.destination);

  measureIndex = 0;
  nextMeasureAt = ctx.currentTime + 0.1;
  // Look-ahead scheduler: keep ~1.5s of music queued.
  const tick = () => {
    if (!ctx) return;
    while (nextMeasureAt - ctx.currentTime < 1.5) {
      scheduleMeasure(MEASURES[measureIndex % MEASURES.length], nextMeasureAt);
      nextMeasureAt += MEASURE;
      measureIndex += 1;
    }
  };
  tick();
  timer = window.setInterval(tick, 400);
  return true;
}

export function stopStageAudio() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
  if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
  }
}

export function stageAudioRunning() {
  return timer !== null;
}

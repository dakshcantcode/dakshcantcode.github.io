"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lift } from "@/components/motion/lift";
import { TempoEyebrow } from "@/components/shell/notation";
import {
  stageAudioRunning,
  startStageAudio,
  stopStageAudio,
} from "@/components/stage/stage-audio";

// Keyboard trapezoid in perspective: front edge y=330, back edge y=292.
const KB = { fx0: 60, fx1: 400, fy: 330, bx0: 86, bx1: 392, by: 292 };
const WHITE_COUNT = 21;
// Black keys after white keys C,D,F,G,A per octave.
const BLACK_AFTER = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 19];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const frontX = (t: number) => lerp(KB.fx0, KB.fx1, t);
const backX = (t: number) => lerp(KB.bx0, KB.bx1, t);

/**
 * Blueprint grand: 3/4 top view with the lid up — visible strings fan
 * across the soundboard, keys drawn in perspective, and frequency
 * annotations plus the 12-TET pitch formula engraved along the rim.
 */
function GrandPiano({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lid-sheen" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="0.55" stopColor="rgba(255,255,255,0.07)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id="board-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.015)" />
        </linearGradient>
      </defs>

      {/* Open lid, hinged along the spine */}
      <path
        d="M86,292 L340,116 L430,30 L190,196 Z"
        fill="url(#lid-sheen)"
        stroke="rgba(255,255,255,0.38)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Lid prop */}
      <line x1="404" y1="150" x2="382" y2="66" stroke="rgba(255,255,255,0.42)" strokeWidth="2" />

      {/* Body top (soundboard) — spine to curved tail */}
      <path
        d="M86,292 L340,116 C420,84 540,88 582,148 C614,196 566,250 478,264 C440,270 412,276 392,292 L86,292 Z"
        fill="#0b0b0b"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M86,292 L340,116 C420,84 540,88 582,148 C614,196 566,250 478,264 C440,270 412,276 392,292 L86,292 Z"
        fill="url(#board-sheen)"
      />
      {/* Body depth: front skirt below the soundboard */}
      <path
        d="M86,292 L392,292 L392,308 L86,308 Z"
        fill="#090909"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="1"
      />

      {/* Strings: pin block to the far rim, long bass to short treble */}
      {Array.from({ length: 15 }).map((_, i) => {
        const t = i / 14;
        const x1 = lerp(112, 372, t);
        const y1 = lerp(286, 288, t);
        const x2 = lerp(330, 470, 1 - t * 0.2) + (1 - t) * 160;
        const y2 = lerp(132, 252, t);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={Math.min(x2, 566)}
            y2={y2}
            stroke={`rgba(255,255,255,${0.10 + 0.12 * (1 - Math.abs(t - 0.5))})`}
            strokeWidth={1.4 - t * 0.7}
          />
        );
      })}
      {/* Bridge crossing the strings */}
      <path
        d="M300,220 C370,196 440,186 500,196"
        fill="none"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.6"
      />

      {/* Frequency annotations + the pitch formula */}
      <text x="336" y="146" fill="rgba(255,255,255,0.30)" fontSize="9" fontFamily="var(--font-geist-mono), monospace" transform="rotate(-33 336 146)">
        27.50
      </text>
      <text x="380" y="196" fill="rgba(255,255,255,0.28)" fontSize="9" fontFamily="var(--font-geist-mono), monospace" transform="rotate(-18 380 196)">
        261.63
      </text>
      <text x="356" y="252" fill="rgba(255,255,255,0.26)" fontSize="9" fontFamily="var(--font-geist-mono), monospace" transform="rotate(-6 356 252)">
        4186.01
      </text>
      <text x="470" y="288" fill="rgba(255,255,255,0.34)" fontSize="11" fontStyle="italic" fontFamily="var(--font-geist-mono), monospace">
        f(n) = 440·2^((n−69)/12)
      </text>

      {/* Keyboard in perspective */}
      <path
        d={`M${KB.fx0},${KB.fy} L${KB.fx1},${KB.fy} L${KB.bx1},${KB.by} L${KB.bx0},${KB.by} Z`}
        fill="rgba(255,255,255,0.88)"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      {Array.from({ length: WHITE_COUNT - 1 }).map((_, i) => {
        const t = (i + 1) / WHITE_COUNT;
        return (
          <line
            key={i}
            x1={frontX(t)}
            y1={KB.fy}
            x2={backX(t)}
            y2={KB.by}
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="0.8"
          />
        );
      })}
      {BLACK_AFTER.map((after) => {
        const tc = (after + 1) / WHITE_COUNT;
        const w = 0.6 / WHITE_COUNT;
        const t0 = tc - w / 2;
        const t1 = tc + w / 2;
        // Black keys occupy the back 58% of the key depth.
        const myF = lerp(KB.by, KB.fy, 0.58);
        const fx = (t: number) => lerp(backX(t), frontX(t), 0.58);
        return (
          <path
            key={after}
            d={`M${fx(t0)},${myF} L${fx(t1)},${myF} L${backX(t1)},${KB.by} L${backX(t0)},${KB.by} Z`}
            fill="#0a0a0a"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="0.6"
          />
        );
      })}
      {/* Cheek blocks */}
      <path d={`M${KB.fx0 - 10},${KB.fy} L${KB.fx0},${KB.fy} L${KB.bx0},${KB.by} L${KB.bx0 - 8},${KB.by} Z`} fill="#0d0d0d" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      <path d={`M${KB.fx1},${KB.fy} L${KB.fx1 + 10},${KB.fy} L${KB.bx1 + 8},${KB.by} L${KB.bx1},${KB.by} Z`} fill="#0d0d0d" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />

      {/* Legs + casters */}
      {[
        { x: 92, y: 308, h: 78 },
        { x: 384, y: 308, h: 78 },
        { x: 520, y: 258, h: 66 },
      ].map((leg) => (
        <g key={leg.x}>
          <path
            d={`M${leg.x},${leg.y} L${leg.x + 11},${leg.y} L${leg.x + 8},${leg.y + leg.h} L${leg.x + 3},${leg.y + leg.h} Z`}
            fill="#0d0d0d"
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="1"
          />
          <circle cx={leg.x + 5.5} cy={leg.y + leg.h + 5} r="4.5" fill="#0b0b0b" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </g>
      ))}

      {/* Pedal lyre */}
      <line x1="236" y1="308" x2="236" y2="368" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <line x1="252" y1="308" x2="248" y2="368" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <rect x="220" y="366" width="46" height="9" rx="3" fill="#0e0e0e" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
      {[230, 242, 254].map((x) => (
        <rect key={x} x={x} y="369" width="6" height="3.5" rx="1" fill="rgba(255,255,255,0.55)" />
      ))}
    </svg>
  );
}

export function StageScene() {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  useEffect(() => {
    let entry: string | null = null;
    try {
      entry = sessionStorage.getItem("stage-entry");
      sessionStorage.removeItem("stage-entry");
    } catch {}
    setRevealed(true);

    // A click entry carries transient user activation across the SPA
    // navigation — try to start the room. Wheel-only entries usually
    // can't autoplay; fall back to an explicit prompt.
    startStageAudio().then((ok) => {
      setAudioOn(ok);
      setNeedsGesture(!ok);
    });
    void entry;

    return () => stopStageAudio();
  }, []);

  const toggleAudio = async () => {
    if (stageAudioRunning()) {
      stopStageAudio();
      setAudioOn(false);
      return;
    }
    const ok = await startStageAudio();
    setAudioOn(ok);
    setNeedsGesture(!ok);
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#070707] text-white">
      {/* Back wall */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,#101010,#070707_70%)]" />

      {/* Curtains */}
      {["left-0", "right-0"].map((side) => (
        <div
          key={side}
          aria-hidden="true"
          className={`absolute inset-y-0 ${side} w-[11%] bg-[repeating-linear-gradient(90deg,#161616_0_16px,#0b0b0b_16px_34px)] shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]`}
        />
      ))}

      {/* Spotlight cone */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.6, delay: 0.3 }}
        className="absolute left-1/2 top-0 h-[78%] w-[46%] -translate-x-1/2 bg-gradient-to-b from-white/15 via-white/[0.05] to-transparent blur-2xl [clip-path:polygon(46%_0,54%_0,86%_100%,14%_100%)]"
      />
      {/* Light pool on the boards */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 1.6, delay: 0.6 }}
        className="absolute bottom-[8%] left-1/2 h-28 w-[52%] -translate-x-1/2 rounded-[100%] bg-white/10 blur-3xl"
      />

      {/* Stage floor */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-b from-[#121212] to-[#050505] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]"
      />

      {/* The instrument + reflection */}
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={
          revealed ? { opacity: 1, y: 0, scale: 1 } : undefined
        }
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-[14%] left-1/2 w-[min(680px,78vw)] -translate-x-1/2"
      >
        <GrandPiano className="w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.8)]" />
        <GrandPiano className="w-full -scale-y-100 opacity-[0.10] [mask-image:linear-gradient(to_bottom,transparent_30%,black_95%)]" />
      </motion.div>

      {/* Copy + controls */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-6 px-6 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 1.1 }}
          >
            <TempoEyebrow tempo="The stage" className="[&_span]:text-white/60" />
            <p className="mt-2 max-w-md font-heading text-2xl italic sm:text-3xl">
              Where the practice goes.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 1.3 }}
            className="flex items-center gap-3"
          >
            {needsGesture && !audioOn && (
              <span className="font-heading text-sm italic text-white/50">
                the room is quiet —
              </span>
            )}
            <Lift>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAudio}
                className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                aria-label={audioOn ? "Stop the music" : "Play the room"}
              >
                {audioOn ? (
                  <Volume2 className="size-4" />
                ) : (
                  <VolumeX className="size-4" />
                )}
                {audioOn ? "Playing" : "Play the room"}
              </Button>
            </Lift>
            <Lift>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-white/70 hover:bg-white/10 hover:text-white"
              >
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Exit stage
                </Link>
              </Button>
            </Lift>
          </motion.div>
        </div>
      </div>

      {/* Entry blackout — completes the zoom handoff seamlessly */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0 : 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-20 bg-[#070707]"
      />
    </div>
  );
}

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

/** Stylized grand piano, side profile with the lid up. */
function GrandPiano({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 320" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lid-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
        <linearGradient id="body-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      {/* Open lid */}
      <path
        d="M150,148 L488,52 L540,150 Z"
        fill="url(#lid-sheen)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
      />
      {/* Lid prop stick */}
      <line
        x1="430"
        y1="98"
        x2="452"
        y2="152"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
      />

      {/* Body (rim), curved tail on the right */}
      <path
        d="M118,148 L540,150 C588,154 596,196 552,202 L168,206 C136,206 118,186 118,148 Z"
        fill="#0c0c0c"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.5"
      />
      <path
        d="M118,148 L540,150 C588,154 596,196 552,202 L168,206 C136,206 118,186 118,148 Z"
        fill="url(#body-sheen)"
      />

      {/* Keyboard block + keys */}
      <rect
        x="76"
        y="150"
        width="44"
        height="18"
        rx="2"
        fill="#101010"
        stroke="rgba(255,255,255,0.30)"
        strokeWidth="1.2"
      />
      <rect x="80" y="154" width="36" height="9" rx="1" fill="rgba(255,255,255,0.75)" />
      {[84, 90, 96, 102, 108].map((x) => (
        <rect key={x} x={x} y="154" width="2.4" height="5.5" fill="#0a0a0a" />
      ))}

      {/* Legs + casters */}
      {[
        { x: 128, h: 84 },
        { x: 316, h: 88 },
        { x: 520, h: 86 },
      ].map((leg) => (
        <g key={leg.x}>
          <path
            d={`M${leg.x},206 L${leg.x + 10},206 L${leg.x + 7},${206 + leg.h} L${leg.x + 3},${206 + leg.h} Z`}
            fill="#0e0e0e"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1"
          />
          <circle
            cx={leg.x + 5}
            cy={206 + leg.h + 5}
            r="4.5"
            fill="#0c0c0c"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* Pedal lyre */}
      <line x1="322" y1="206" x2="322" y2="264" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <rect x="306" y="262" width="34" height="8" rx="3" fill="#0e0e0e" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />

      {/* Bench */}
      <rect x="14" y="216" width="76" height="12" rx="3" fill="#0d0d0d" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
      <line x1="24" y1="228" x2="24" y2="278" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />
      <line x1="80" y1="228" x2="80" y2="278" stroke="rgba(255,255,255,0.22)" strokeWidth="3" />
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

"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PianoKey } from "@/components/piano/piano-key";

// Black keys at the classic octave joints (after C, D, F, G, A).
const BLACK_JOINTS = [0, 1, 3, 4, 5];
const WHITE_KEYS = 7;
// A gentle C-major arpeggio, played on the white keys in a loop.
const ARPEGGIO: number[] = [0, 2, 4, 6, 4, 2];

/**
 * Decorative one-octave keyboard that idly plays an arpeggio — one key
 * pressing at a time. Holds still under reduced motion. Literal piano
 * palette: it sits on the dark About band.
 */
export function PianoKeysVisual() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (reduceMotion) return;
    let step = 0;
    const id = setInterval(() => {
      setActive(ARPEGGIO[step % ARPEGGIO.length]);
      step += 1;
    }, 800);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto flex h-56 w-full max-w-sm items-stretch gap-1"
    >
      {Array.from({ length: WHITE_KEYS }).map((_, i) => (
        <PianoKey
          key={i}
          interactive={false}
          pressed={active === i}
          className="min-w-0 flex-1 border-neutral-300 bg-white shadow-[0_2px_0_0_#d4d4d4]"
        />
      ))}
      {BLACK_JOINTS.map((i) => (
        <PianoKey
          key={`black-${i}`}
          variant="black"
          interactive={false}
          className="absolute top-0 h-[58%] w-7 border border-t-0 border-neutral-800 bg-neutral-950"
          style={{ left: `calc(${((i + 1) * 100) / WHITE_KEYS}% - 0.875rem)` }}
        />
      ))}
    </div>
  );
}


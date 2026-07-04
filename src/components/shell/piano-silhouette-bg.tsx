"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Full-width two-octave keyboard rising from the bottom of the hero,
 * drawn from key frequencies in Hz — outlined keys make it read as a
 * piano, digits keep it mathematical. Fades upward into the page.
 */

const OCTAVE_FREQS = [
  "261.63",
  "293.66",
  "329.63",
  "349.23",
  "392.00",
  "440.00",
  "493.88",
];

// Black keys sit after white keys C, D, F, G, A in each octave.
const BLACK_FREQS = [
  { freq: "277.18", after: 0 },
  { freq: "311.13", after: 1 },
  { freq: "369.99", after: 3 },
  { freq: "415.30", after: 4 },
  { freq: "466.16", after: 5 },
];

const WHITE_KEYS = 14; // two octaves
const ROWS = 40;

function DigitStack({
  value,
  rows,
  className,
  style,
}: {
  value: string;
  rows: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i}>{value}</div>
      ))}
    </div>
  );
}

export function PianoSilhouetteBg() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[30svh] select-none overflow-hidden font-mono text-[10px] [mask-image:linear-gradient(to_top,black_55%,transparent)] sm:h-[42svh]"
    >
      <motion.div
        style={{ y: reduceMotion ? 0 : y }}
        className="relative flex h-full w-full"
      >
        {Array.from({ length: WHITE_KEYS }).map((_, i) => (
          <div
            key={i}
            className="min-w-0 flex-1 overflow-hidden rounded-t-md border-x border-t border-foreground/[0.07] text-center leading-[1.6] text-foreground/[0.05]"
          >
            <DigitStack value={OCTAVE_FREQS[i % 7]} rows={ROWS} />
          </div>
        ))}
        {Array.from({ length: 2 }).flatMap((_, octave) =>
          BLACK_FREQS.map(({ freq, after }) => {
            const boundary = octave * 7 + after + 1;
            return (
              <DigitStack
                key={`${octave}-${freq}`}
                value={freq}
                rows={Math.floor(ROWS * 0.62)}
                className="absolute top-0 h-[62%] w-[4.5%] overflow-hidden rounded-b-sm bg-foreground/[0.045] text-center leading-[1.15] text-foreground/[0.08]"
                style={{ left: `calc(${(boundary * 100) / WHITE_KEYS}% - 2.25%)` }}
              />
            );
          }),
        )}
      </motion.div>
    </div>
  );
}

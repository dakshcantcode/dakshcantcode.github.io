"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * One octave (C4–B4) rendered as columns of each key's frequency in Hz —
 * the keyboard silhouette emerges purely from digit density. White keys
 * are tall sparse columns; black keys are shorter, denser, darker columns
 * overlapping the gaps. Inherits the band's --foreground, so it adapts to
 * light and dark ThemedSections automatically.
 */

const WHITE_FREQS = [
  "261.63",
  "293.66",
  "329.63",
  "349.23",
  "392.00",
  "440.00",
  "493.88",
];

// Black keys sit on the boundary after white keys C, D, F, G, A.
const BLACK_KEYS = [
  { freq: "277.18", after: 0 },
  { freq: "311.13", after: 1 },
  { freq: "369.99", after: 3 },
  { freq: "415.30", after: 4 },
  { freq: "466.16", after: 5 },
];

const ROWS = 80;

function DigitColumn({
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

export function NumberKeyboardBg() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-[-4rem] hidden select-none overflow-hidden font-mono text-[10px] lg:block"
    >
      <motion.div
        style={{ y: reduceMotion ? 0 : y }}
        className="relative flex h-full"
      >
        {WHITE_FREQS.map((freq) => (
          <DigitColumn
            key={freq}
            value={freq}
            rows={ROWS}
            className="w-14 text-center leading-[1.6] text-foreground/[0.05]"
          />
        ))}
        {BLACK_KEYS.map(({ freq, after }) => (
          <DigitColumn
            key={freq}
            value={freq}
            rows={Math.floor(ROWS * 0.6)}
            className="absolute top-0 w-9 bg-background text-center leading-[1.15] text-foreground/[0.09]"
            // centered on the boundary between white key `after` and the next
            style={{ left: `calc(${(after + 1) * 3.5}rem - 1.125rem)` }}
          />
        ))}
      </motion.div>
    </div>
  );
}

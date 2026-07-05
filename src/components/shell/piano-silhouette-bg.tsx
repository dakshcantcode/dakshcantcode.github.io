"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Full-width two-octave keyboard rising from the bottom of the hero,
 * drawn from key frequencies in Hz. Dimensional pass: gradient key
 * faces, key-front lips, glossy black keys — plus micro-interactions:
 * individual keys dip under the cursor, a soft glow follows the
 * pointer, and the whole instrument floats on a slow idle drift.
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
}: {
  value: string;
  rows: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i}>{value}</div>
      ))}
    </div>
  );
}

type PianoSilhouetteBgProps = {
  /** Fires when the pointer enters/leaves the instrument. */
  onHoverChange?: (hovered: boolean) => void;
  /** Click / Enter / Space on the instrument (used to enter the stage). */
  onActivate?: () => void;
};

export function PianoSilhouetteBg({
  onHoverChange,
  onActivate,
}: PianoSilhouetteBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

  // Cursor glow, spring-smoothed.
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const glowX = useSpring(mx, { stiffness: 160, damping: 22 });
  const glowY = useSpring(my, { stiffness: 160, damping: 22 });

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label="Enter the stage"
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onPointerEnter={() => onHoverChange?.(true)}
      onPointerLeave={() => {
        mx.set(-9999);
        my.set(-9999);
        onHoverChange?.(false);
      }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate?.();
        }
      }}
      className="absolute inset-x-0 bottom-0 h-[38svh] cursor-pointer select-none overflow-hidden font-mono text-[10px] outline-none [mask-image:linear-gradient(to_top,black_62%,transparent)] focus-visible:ring-2 focus-visible:ring-foreground/30 sm:h-[54svh]"
    >
      <motion.div
        style={{ y: reduceMotion ? 0 : parallaxY }}
        className="relative h-full w-full [perspective:900px]"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-full w-full origin-bottom [transform:rotateX(38deg)] [transform-style:preserve-3d]"
        >
          {/* Fallboard gap at the far end + depth shading into the distance */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1.5 bg-foreground/15" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-foreground/[0.07] via-transparent to-transparent" />
          {Array.from({ length: WHITE_KEYS }).map((_, i) => (
            <div
              key={i}
              className="relative min-w-0 flex-1 overflow-hidden rounded-t-md border-x border-t border-foreground/[0.11] bg-gradient-to-b from-transparent via-transparent to-foreground/[0.05] text-center leading-[1.6] text-foreground/[0.06] shadow-[inset_-1px_0_0_rgba(0,0,0,0.04)] transition-[transform,background-color] duration-200 ease-out hover:translate-y-[3px] hover:bg-foreground/[0.03]"
            >
              <DigitStack value={OCTAVE_FREQS[i % 7]} rows={ROWS} />
              {/* Key-front lip */}
              <span className="absolute inset-x-0 bottom-0 h-2 rounded-b-sm bg-foreground/[0.06]" />
            </div>
          ))}
          {Array.from({ length: 2 }).flatMap((_, octave) =>
            BLACK_FREQS.map(({ freq, after }) => {
              const boundary = octave * 7 + after + 1;
              return (
                <div
                  key={`${octave}-${freq}`}
                  className="absolute top-0 h-[62%] w-[4.5%] overflow-hidden rounded-b-md bg-gradient-to-b from-foreground/[0.18] via-foreground/[0.10] to-foreground/[0.14] text-center leading-[1.15] text-foreground/[0.10] shadow-lg shadow-black/20 transition-transform duration-200 ease-out hover:translate-y-[3px]"
                  style={{
                    left: `calc(${(boundary * 100) / WHITE_KEYS}% - 2.25%)`,
                  }}
                >
                  <DigitStack value={freq} rows={Math.floor(ROWS * 0.62)} />
                </div>
              );
            }),
          )}
        </motion.div>

        {/* Cursor-following glow */}
        <motion.div
          style={{ x: glowX, y: glowY }}
          className="pointer-events-none absolute -left-32 -top-32 size-64 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.08),transparent_65%)]"
        />
      </motion.div>
    </div>
  );
}

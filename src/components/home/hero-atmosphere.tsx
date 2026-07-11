"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Floating eighth notes: [left%, top%, size, duration, delay, gold?]
const NOTES = [
  [16, 24, 18, 9, 0, false],
  [46, 12, 14, 11, 2.5, true],
  [68, 30, 22, 10, 1.2, false],
  [84, 16, 16, 12, 4, true],
  [30, 60, 15, 10.5, 5.5, false],
  [90, 58, 19, 9.5, 3, false],
] as const;

function EighthNote({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 16 24" width={size} height={size * 1.5} fill="currentColor">
      <ellipse cx="5" cy="19.5" rx="4.4" ry="3.2" transform="rotate(-18 5 19.5)" />
      <rect x="8.4" y="3" width="1.3" height="16.5" rx="0.6" />
      <path d="M9.7 3c2.6 1.4 4.6 3.4 4.9 6.4-1.7-1.7-3.3-2.4-4.9-2.7Z" />
    </svg>
  );
}

/**
 * Ambient music in the hero air: two faint staves drifting on scroll
 * parallax and a handful of eighth notes floating like dust, one or
 * two glinting gold. Transforms and opacity only.
 */
export function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const slow = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const slower = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* A stave drifting high right */}
      <motion.div
        style={{ y: reduceMotion ? 0 : slower }}
        className="absolute -right-24 top-[14%] w-[55%] -rotate-6 space-y-[10px] opacity-[0.55] [mask-image:linear-gradient(to_left,black_30%,transparent)]"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-px w-full bg-foreground/15" />
        ))}
      </motion.div>
      {/* And one low left */}
      <motion.div
        style={{ y: reduceMotion ? 0 : slow }}
        className="absolute -left-32 bottom-[18%] w-[48%] rotate-3 space-y-[10px] opacity-[0.45] [mask-image:linear-gradient(to_right,black_35%,transparent)]"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-px w-full bg-foreground/15" />
        ))}
      </motion.div>

      {/* Notes adrift */}
      {!reduceMotion &&
        NOTES.map(([left, top, size, dur, delay, gold]) => (
          <motion.span
            key={`${left}-${top}`}
            animate={{
              y: [0, -22, 0],
              x: [0, 8, 0],
              rotate: [0, gold ? 8 : -6, 0],
              opacity: [0.1, gold ? 0.5 : 0.3, 0.1],
            }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={
              gold
                ? "absolute text-grace"
                : "absolute text-foreground/60"
            }
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <EighthNote size={size} />
          </motion.span>
        ))}
    </div>
  );
}

const TICKER = [
  "PulmoScan",
  "NeuroSketch",
  "Satellite Change Detection",
  "AI @ Kissht",
  "CS @ Waterloo",
  "nine years of piano",
  "guitar & vocals",
  "Moonlight Sonata",
];

/** An engraved ribbon: credits rolling like a program leaflet. */
export function HeroTicker() {
  const reduceMotion = useReducedMotion();
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {TICKER.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground/80">
            {item}
          </span>
          <span aria-hidden="true" className="size-1 rotate-45 bg-grace/60" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="absolute inset-x-0 bottom-0 border-y border-grace/20 bg-background/40 py-3 backdrop-blur-[2px]">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        >
          {row("a")}
          {row("b")}
        </motion.div>
      </div>
    </div>
  );
}

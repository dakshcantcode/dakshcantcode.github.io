"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Stage dust: faint motes drifting through the dark bands, like dust
 * caught in a spotlight. Purely atmospheric.
 */

const MOTES = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 137) % 100,
  top: (i * 61) % 100,
  size: i % 3 ? 2 : 3,
  dur: 14 + (i % 7) * 3,
  delay: -(i * 2.3),
  drift: 12 + (i % 5) * 6,
}));

export function DustMotes() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {MOTES.map((m, i) => (
        <motion.span
          key={i}
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
          }}
          animate={{
            y: [0, -m.drift, 0],
            x: [0, m.drift / 2, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: m.dur,
            delay: m.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-[#c9b8e6]/60 blur-[1px]"
        />
      ))}
    </div>
  );
}

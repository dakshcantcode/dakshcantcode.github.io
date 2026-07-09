"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LINES = [
  "A wild ENGINEER appeared!",
  "DAKSH used MACHINE LEARNING… it's super effective!",
  "CS @ Waterloo · AI Engineer @ Kissht · 2× hackathon winner",
  "Click the piano below to enter the stage ♪",
];

/**
 * Retro RPG dialogue box: typewriter text, blinking continue arrow,
 * click/tap to advance. Reduced motion renders lines instantly.
 */
export function PixelDialogue({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const text = LINES[line % LINES.length];
  const done = reduceMotion || chars >= text.length;

  useEffect(() => {
    if (reduceMotion) return;
    setChars(0);
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= LINES[line % LINES.length].length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 32);
    return () => clearInterval(id);
  }, [line, reduceMotion]);

  return (
    <button
      type="button"
      onClick={() => setLine((l) => l + 1)}
      aria-label="Advance dialogue"
      className={`pixel-shadow relative block w-full max-w-xl cursor-pointer select-none border-2 border-foreground bg-background/95 px-5 py-4 text-left ${className ?? ""}`}
    >
      <span className="absolute -top-2.5 left-4 border-2 border-foreground bg-background px-2 font-pixel text-[8px] uppercase text-retro-gold">
        Daksh
      </span>
      <span className="block min-h-[3.75rem] font-pixel text-[10px] leading-[1.9] sm:text-[11px]">
        {reduceMotion ? text : text.slice(0, chars)}
        {!done && <span className="animate-pulse">▌</span>}
      </span>
      {done && (
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? undefined : { y: [0, 3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="absolute bottom-2 right-3 font-pixel text-[10px] text-retro-gold"
        >
          ▼
        </motion.span>
      )}
    </button>
  );
}

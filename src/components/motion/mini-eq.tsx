"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Four tiny equalizer bars in currentColor — the "now playing" tell. */
export function MiniEq({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-4 items-end gap-[2px]", className)}
    >
      {[0.6, 1, 0.45, 0.8].map((p, i) => (
        <motion.span
          key={i}
          animate={
            reduceMotion
              ? undefined
              : { scaleY: [0.3, p, 0.4, Math.min(1, p + 0.2), 0.3] }
          }
          transition={{
            duration: 0.8 + i * 0.13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.09,
          }}
          className="w-[3px] origin-bottom rounded-t-[1px] bg-current"
          style={{ height: `${p * 100}%` }}
        />
      ))}
    </span>
  );
}

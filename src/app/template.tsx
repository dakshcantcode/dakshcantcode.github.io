"use client";

import { motion, useReducedMotion } from "framer-motion";

// Five staff lines sweep off the page on every navigation — a page turn.
const STAFF_TOPS = [18, 34, 50, 66, 82];

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {!reduceMotion && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70]">
          {STAFF_TOPS.map((top, i) => (
            <motion.div
              key={top}
              initial={{ scaleX: 1, opacity: 0.7 }}
              animate={{ scaleX: 0, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.05 * i,
                ease: [0.76, 0, 0.24, 1],
              }}
              style={{ top: `${top}%`, originX: i % 2 ? 0 : 1 }}
              className="absolute inset-x-0 h-px bg-foreground"
            />
          ))}
        </div>
      )}
    </>
  );
}

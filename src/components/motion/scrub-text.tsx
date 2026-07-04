"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Word({
  progress,
  range,
  drift,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  drift: number;
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.06, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const x = useTransform(progress, range, [drift, 0]);
  const blur = useTransform(progress, range, [8, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.span
      style={{ opacity, y, x, filter }}
      className="inline-block whitespace-pre will-change-transform"
    >
      {children}{" "}
    </motion.span>
  );
}

type ScrubTextProps = {
  text: string;
  className?: string;
};

// Words animate in overlapping windows, so several are mid-flight at
// once — a wave of type settling into place rather than a hard sweep.
const OVERLAP = 4;

/**
 * Scroll-scrubbed "typesetting": each word rises out of a blur and
 * drifts into place from alternating angles as the paragraph moves
 * through the viewport. Fully scroll-linked — scrub back and forth.
 */
export function ScrubText({ text, className }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  const total = words.length + OVERLAP;
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / total, (i + OVERLAP) / total]}
          drift={i % 2 === 0 ? -12 : 12}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

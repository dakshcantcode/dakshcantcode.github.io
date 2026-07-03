"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextMaskRevealProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Apple-style line-by-line reveal: each line rises out of an
 * overflow-hidden mask with a long ease-out.
 *
 * The viewport observer lives on the outer wrapper — the masked lines
 * start fully clipped, so IntersectionObserver would never fire on them.
 */
export function TextMaskReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: TextMaskRevealProps) {
  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: {
                  duration: 0.9,
                  delay: delay + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

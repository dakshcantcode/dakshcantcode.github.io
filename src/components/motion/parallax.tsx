"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Max offset in px; the element drifts from -speed to +speed while crossing the viewport. */
  speed?: number;
};

export function Parallax({ children, className, speed = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <motion.div ref={ref} style={{ y: reduceMotion ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Micro-interaction wrapper for CTAs: a slight lift on hover and a
 * key-press dip on tap. Wrap around a Button (inline-block).
 */
export function Lift({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion)
    return (
      <span className={className ? `inline-block ${className}` : "inline-block"}>
        {children}
      </span>
    );
  return (
    <motion.span
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ y: 1, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={className ? `inline-block ${className}` : "inline-block"}
    >
      {children}
    </motion.span>
  );
}

"use client";

import { motion } from "framer-motion";

type StaggerGroupProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: React.ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 100, damping: 18, mass: 0.9 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * 12×14 trainer sprite with gold headphones, drawn entirely with
 * box-shadow pixels — no image assets, crisp at any scale.
 */

const PALETTE: Record<string, string> = {
  K: "#1a1a1a", // hair / outline / shoes
  S: "#e8b48c", // skin
  G: "#f0b429", // headphones + shirt (retro gold)
  D: "#2d2d2d", // pants
};

const GRID = [
  "...GGGGGG...",
  "...KKKKKK...",
  "..KKKKKKKK..",
  ".GKSSSSSSKG.",
  ".GKSKSSKSKG.",
  "..KSSSSSSK..",
  "...KSSSSK...",
  "....GGGG....",
  "..GGGGGGGG..",
  "..SGGGGGGS..",
  "....GGGG....",
  "....DDDD....",
  "....D..D....",
  "....K..K....",
];

const PX = 6;

const shadows = GRID.flatMap((row, y) =>
  row.split("").flatMap((ch, x) => {
    const color = PALETTE[ch];
    return color ? [`${x * PX}px ${y * PX}px 0 0 ${color}`] : [];
  }),
).join(", ");

export function PixelSprite({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      style={{
        width: GRID[0].length * PX,
        height: GRID.length * PX,
        imageRendering: "pixelated",
      }}
    >
      <div
        style={{
          width: PX,
          height: PX,
          marginLeft: -PX,
          marginTop: -PX,
          transform: `translate(${PX}px, ${PX}px)`,
          boxShadow: shadows,
        }}
      />
    </motion.div>
  );
}

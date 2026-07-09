"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * 14×18 trainer sprite — gold headphones, navy hoodie, standing on a
 * grass tile. Box-shadow pixels only; outlined so it sits cleanly on
 * the powder-blue environment.
 */

const PALETTE: Record<string, string> = {
  O: "#0f1d2e", // outline / hair
  S: "#e8b48c", // skin
  s: "#d69a72", // skin shade
  G: "#f0b429", // headphones (gold)
  N: "#16324f", // hoodie (navy)
  n: "#0f2740", // hoodie shade
  D: "#1d2b3a", // pants
  W: "#e8f2fb", // eye light
  g: "#4caf6d", // grass
  d: "#3a8f56", // grass shade
};

const GRID = [
  "....GGGGGG....",
  "...GOOOOOOG...",
  "..GOOOOOOOOG..",
  ".GGOOOOOOOOGG.",
  ".GOSSSSSSSSOG.",
  ".GOSWOSSOWSOG.",
  "..OSSSSSSSSO..",
  "..OSsSSSSsSO..",
  "...OSSSSSSO...",
  "....NNNNNN....",
  "..NNNNNNNNNN..",
  ".SNNNnNNnNNNS.",
  ".SNNNNNNNNNNS.",
  "..NNnNNNNnNN..",
  "....DDDDDD....",
  "....DD..DD....",
  "....OO..OO....",
  "gdgdgdgdgdgdgd",
];

const PX = 7;

const shadows = GRID.flatMap((row, y) =>
  row.split("").flatMap((ch, x) => {
    const color = PALETTE[ch];
    return color ? [`${x * PX}px ${y * PX}px 0 0 ${color}`] : [];
  }),
).join(", ");

export function PixelSprite({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className={className}>
      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
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
      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="mx-auto -mt-1 h-1.5 w-16 rounded-full bg-foreground/15 blur-[2px]"
      />
    </div>
  );
}

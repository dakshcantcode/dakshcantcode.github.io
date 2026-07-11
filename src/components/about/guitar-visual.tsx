"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Full-body acoustic guitar, stroke-drawn and strummable. Headstock,
 * fretted neck, dreadnought body with rosette, bridge — strings run
 * nut to bridge and oscillate on hover/tap.
 */

// Fret x-positions (rule of 18) along the neck, nut at 60, body joint ~560.
const FRETS = [113, 162, 209, 253, 295, 334, 371, 406, 439, 470, 500, 528, 554];
// Single inlays mid-fret at 3/5/7/9, double at 12.
const INLAYS = [(162 + 209) / 2, (253 + 295) / 2, (334 + 371) / 2, (406 + 439) / 2];
const INLAY_12 = (470 + 500) / 2;
const STRING_YS = [118, 122.8, 127.6, 132.4, 137.2, 142];
const GAUGES = [0.6, 0.8, 1.1, 1.4, 1.7, 2.0];

const stringPath = (y: number, bend = 0) => `M60,${y} Q420,${y + bend} 792,${y}`;

export function GuitarVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [strum, setStrum] = useState(0);
  const doStrum = () => {
    if (!reduceMotion) setStrum((s) => s + 1);
  };

  return (
    <svg
      viewBox="0 0 900 260"
      className={className}
      onPointerEnter={doStrum}
      onPointerDown={doStrum}
      role="img"
      aria-label="Acoustic guitar illustration"
    >
      {/* Body: dreadnought with waist */}
      <path
        d="M560,70 C610,52 640,50 668,64 C688,76 702,80 722,70 C760,50 832,55 862,95 C878,117 878,143 862,165 C832,205 760,210 722,190 C702,180 688,184 668,196 C640,210 610,208 560,190 Z"
        className="fill-foreground/[0.04] stroke-foreground/30"
        strokeWidth="1.5"
      />
      {/* Rosette + sound hole */}
      <circle cx="690" cy="130" r="40" className="fill-none stroke-foreground/20" />
      <circle
        cx="690"
        cy="130"
        r="33"
        className="fill-foreground/10 stroke-foreground/40"
      />
      {/* Bridge */}
      <rect x="786" y="110" width="12" height="40" rx="3" className="fill-foreground/30" />
      {/* Neck */}
      <rect
        x="60"
        y="110"
        width="500"
        height="40"
        rx="2"
        className="fill-foreground/[0.03] stroke-foreground/25"
      />
      {FRETS.map((x) => (
        <line key={x} x1={x} y1="111" x2={x} y2="149" className="stroke-foreground/20" />
      ))}
      {INLAYS.map((x) => (
        <circle key={x} cx={x} cy="130" r="2.5" className="fill-grace/60" />
      ))}
      <circle cx={INLAY_12} cy="121" r="2.5" className="fill-grace/60" />
      <circle cx={INLAY_12} cy="139" r="2.5" className="fill-grace/60" />
      {/* Headstock + tuners */}
      <path
        d="M60,110 L18,97 Q8,94 8,104 V156 Q8,166 18,163 L60,150 Z"
        className="fill-foreground/[0.03] stroke-foreground/30"
        strokeWidth="1.5"
      />
      {[104, 114.5, 125, 135, 145.5, 156].map((cy) => (
        <circle key={cy} cx="20" cy={cy} r="2.2" className="fill-foreground/35" />
      ))}
      {/* Nut */}
      <line x1="60" y1="108" x2="60" y2="152" className="stroke-foreground/50" strokeWidth="3" />
      {/* Strings */}
      {STRING_YS.map((y, i) => (
        <motion.path
          key={`${i}-${strum}`}
          d={stringPath(y)}
          initial={{ d: stringPath(y) }}
          animate={
            strum > 0
              ? {
                  d: [
                    stringPath(y),
                    stringPath(y, -5),
                    stringPath(y, 6),
                    stringPath(y, -3.5),
                    stringPath(y, 2.5),
                    stringPath(y),
                  ],
                }
              : undefined
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: (5 - i) * 0.045 }}
          className="stroke-foreground/60"
          strokeWidth={GAUGES[i]}
          fill="none"
        />
      ))}
    </svg>
  );
}

"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { focusAreas, type FocusArea } from "@/lib/resume";

// String gauges thicken top to bottom, like treble to bass.
const GAUGES = [0.8, 1.3, 1.9, 2.6];

const REST_PATH = "M0,12 Q500,12 1000,12";
// Decaying oscillation of the quadratic control point — a plucked string.
const PLUCK_PATHS = [
  REST_PATH,
  "M0,12 Q500,3 1000,12",
  "M0,12 Q500,20 1000,12",
  "M0,12 Q500,7 1000,12",
  "M0,12 Q500,16 1000,12",
  "M0,12 Q500,10 1000,12",
  REST_PATH,
];

function GuitarString({
  area,
  index,
  delay,
}: {
  area: FocusArea;
  index: number;
  delay: number;
}) {
  const reduceMotion = useReducedMotion();
  // Incrementing the counter remounts the path, restarting the keyframes.
  const [pluck, setPluck] = useState(0);
  const [introduced, setIntroduced] = useState(false);

  const strum = () => {
    if (!reduceMotion) setPluck((p) => p + 1);
  };

  return (
    <div
      className="group"
      onPointerEnter={strum}
      onPointerDown={strum}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-10">
        <div className="flex items-baseline gap-5">
          <span className="numeral text-sm italic text-muted-foreground">
            0{index + 1}
          </span>
          <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
            {area.title}
          </h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {area.description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="size-1.5 shrink-0 rounded-full bg-foreground/40" />
        <motion.svg
          viewBox="0 0 1000 24"
          preserveAspectRatio="none"
          className="h-5 w-full text-foreground/50 transition-colors duration-300 group-hover:text-foreground/80"
          initial={false}
          whileInView={
            reduceMotion || introduced ? undefined : { opacity: 1 }
          }
          viewport={{ once: true, margin: "-15% 0px" }}
          onViewportEnter={() => {
            if (reduceMotion || introduced) return;
            // Staggered introductory strum, one string after another.
            setTimeout(() => {
              setIntroduced(true);
              setPluck((p) => p + 1);
            }, delay * 1000);
          }}
        >
          <motion.path
            key={pluck}
            d={REST_PATH}
            initial={{ d: REST_PATH }}
            animate={pluck > 0 ? { d: PLUCK_PATHS } : undefined}
            transition={{ duration: 0.9, ease: "easeOut" }}
            stroke="currentColor"
            strokeWidth={GAUGES[index % GAUGES.length]}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </motion.svg>
      </div>
    </div>
  );
}

/**
 * The four focus areas as guitar strings — increasing gauge, plucked on
 * hover/tap, with one staggered introductory strum on scroll-in.
 */
export function FocusGrid() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="Focus areas" />
        <h2 className="mt-4 max-w-md text-3xl font-semibold sm:text-4xl">
          Four disciplines, one goal: software that ships.
        </h2>
      </Reveal>
      <div className="mt-10">
        {focusAreas.map((area, i) => (
          <GuitarString key={area.title} area={area} index={i} delay={i * 0.18} />
        ))}
      </div>
    </div>
  );
}

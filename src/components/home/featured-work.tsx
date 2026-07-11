"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { projects } from "@/lib/resume";
import { cn } from "@/lib/utils";

// Fret positions from the rule of 18 (12-TET), normalized so 13 frets
// span the neck — real guitar geometry, frets tightening toward the body.
const FRETS = [10.6, 20.6, 30.1, 39.0, 47.5, 55.4, 62.9, 70.0, 76.7, 83.0, 89.0, 94.6];
// Position-marker inlays sit mid-fret at 3, 5, 7, 9 (single) and 12 (double).
const INLAYS = [25.4, 43.3, 59.2, 73.4];
const INLAY_12 = 91.8;
// The three featured projects hang off the inlays at frets 3, 7 and 12.
const PROJECT_POS = [25.4, 59.2, 91.8];
// String gauges, treble (top) to bass (bottom).
const GAUGES = [0.7, 1.0, 1.4, 1.8, 2.1, 2.4];

const stringPath = (y: number, bend = 0) => `M0,${y} Q500,${y + bend} 1000,${y}`;

function Strings({ strum }: { strum: number }) {
  return (
    <svg
      viewBox="0 0 1000 160"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full text-foreground/50"
      aria-hidden="true"
    >
      {GAUGES.map((gauge, i) => {
        const y = 20 + i * 24;
        return (
          <motion.path
            key={`${i}-${strum}`}
            d={stringPath(y)}
            initial={{ d: stringPath(y) }}
            animate={
              strum > 0
                ? {
                    d: [
                      stringPath(y),
                      stringPath(y, -6),
                      stringPath(y, 7),
                      stringPath(y, -4),
                      stringPath(y, 3),
                      stringPath(y),
                    ],
                  }
                : undefined
            }
            // Downstrum: bass string first.
            transition={{ duration: 0.8, ease: "easeOut", delay: (5 - i) * 0.045 }}
            stroke="currentColor"
            strokeWidth={gauge}
            fill="none"
          />
        );
      })}
    </svg>
  );
}

function GuitarNeck() {
  const reduceMotion = useReducedMotion();
  const [strum, setStrum] = useState(0);
  const doStrum = () => {
    if (!reduceMotion) setStrum((s) => s + 1);
  };

  return (
    <motion.div
      className="mt-36 hidden md:flex md:items-stretch"
      onPointerEnter={doStrum}
      onPointerDown={doStrum}
      onViewportEnter={() => setTimeout(doStrum, 350)}
      viewport={{ once: true, margin: "-20% 0px" }}
    >
      {/* Headstock with six tuners */}
      <svg
        viewBox="0 0 32 120"
        className="h-40 w-auto shrink-0 text-foreground/25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M30 4 L8 16 Q1 20 1 30 V90 Q1 100 8 104 L30 116 Z" />
        {[20, 36, 52, 68, 84, 100].map((cy) => (
          <circle key={cy} cx="9" cy={cy} r="2.5" fill="currentColor" stroke="none" />
        ))}
      </svg>

      {/* Nut */}
      <div aria-hidden="true" className="h-40 w-1 shrink-0 bg-foreground/40" />

      {/* Neck: frets, inlays, strings, and the projects on their markers */}
      <div className="relative h-40 flex-1">
        {FRETS.map((x) => (
          <div
            key={x}
            aria-hidden="true"
            className="absolute inset-y-1 w-px bg-foreground/15"
            style={{ left: `${x}%` }}
          />
        ))}
        {INLAYS.map((x) => (
          <span
            key={x}
            aria-hidden="true"
            className="absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-grace/50"
            style={{ left: `${x}%` }}
          />
        ))}
        {[30, 70].map((top) => (
          <span
            key={top}
            aria-hidden="true"
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-grace/50"
            style={{ left: `${INLAY_12}%`, top: `${top}%` }}
          />
        ))}

        <Strings strum={strum} />

        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href="/experience"
            onPointerEnter={doStrum}
            className={cn(
              "group absolute bottom-[calc(100%+2.25rem)] block w-56",
              i === 0 && "-translate-x-6",
              i === 1 && "-translate-x-1/2",
              i === 2 && "-translate-x-[85%] text-right",
            )}
            style={{ left: `${PROJECT_POS[i]}%` }}
          >
            <span className="numeral text-xs italic text-muted-foreground">
              {project.index}
            </span>
            <span className="mt-0.5 block font-heading text-xl italic leading-tight transition-colors group-hover:text-foreground">
              {project.name}
            </span>
            <span className="mt-1 block text-xs leading-snug text-muted-foreground">
              {project.award ?? "Deep learning"}
            </span>
            {/* Stem down to the inlay */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-full h-7 w-px bg-foreground/25 transition-colors group-hover:bg-foreground/60",
                i === 0 && "left-6",
                i === 1 && "left-1/2",
                i === 2 && "left-[85%]",
              )}
            />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

/** Mobile: compact rows with string separators instead of the full neck. */
function ProjectRows() {
  return (
    <div className="mt-12 md:hidden">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href="/experience"
          className="group flex items-baseline justify-between gap-4 border-t border-foreground/15 py-6"
        >
          <div>
            <span className="numeral text-xs italic text-muted-foreground">
              {project.index}
            </span>
            <span className="mt-1 block font-heading text-2xl italic">
              {project.name}
            </span>
            <Badge variant="secondary" className="mt-3 font-normal">
              {project.award ?? "Deep learning"}
            </Badge>
          </div>
          <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </Link>
      ))}
    </div>
  );
}

export function FeaturedWork() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <TempoEyebrow tempo="Selected work" />
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Award-winning builds.
          </h2>
        </div>
        <Link
          href="/experience"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See all work
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <Reveal>
        <GuitarNeck />
      </Reveal>
      <ProjectRows />
    </div>
  );
}

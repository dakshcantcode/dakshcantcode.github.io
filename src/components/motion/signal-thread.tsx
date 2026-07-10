"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * The Signal: one continuous thread drawn down the page by scroll,
 * morphing between an analog sine (the music) and a digital square
 * wave (the code) section by section. White stroke + difference blend
 * keeps it legible across light and dark bands.
 */

export type SignalSeg = "sine" | "square";

const X = 20;
const AMP = 9;
const WAVE = 56;
const STEP = 30;

function buildPath(h: number, segs: SignalSeg[]) {
  const segH = h / segs.length;
  let d = `M ${X} 0`;
  let y = 0;
  for (const s of segs) {
    const end = y + segH;
    if (s === "sine") {
      while (y < end - 1) {
        const next = Math.min(y + WAVE, end);
        const q = (next - y) / 4;
        d += ` C ${X + AMP} ${y + q}, ${X + AMP} ${y + q}, ${X} ${y + 2 * q}`;
        d += ` C ${X - AMP} ${y + 3 * q}, ${X - AMP} ${y + 3 * q}, ${X} ${next}`;
        y = next;
      }
    } else {
      let side = 1;
      d += ` L ${X} ${y}`;
      while (y < end - 1) {
        const next = Math.min(y + STEP, end);
        d += ` L ${X + AMP * side} ${y} L ${X + AMP * side} ${next}`;
        y = next;
        side = -side;
      }
      d += ` L ${X} ${y}`;
    }
  }
  return d;
}

function Node({
  progress,
  f,
  cy,
}: {
  progress: MotionValue<number>;
  f: number;
  cy: number;
}) {
  const opacity = useTransform(progress, [f - 0.03, f], [0.25, 1]);
  const r = useTransform(progress, [f - 0.03, f], [2, 3.5]);
  return <motion.circle cx={X} cy={cy} style={{ opacity, r }} fill="currentColor" />;
}

export function SignalThread({ segments }: { segments: SignalSeg[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(() =>
      setH(Math.round(parent.getBoundingClientRect().height)),
    );
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.95"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  const path = h > 0 ? buildPath(h, segments) : "";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-5 hidden w-10 mix-blend-difference xl:block"
    >
      {h > 0 && (
        <svg
          width="40"
          height={h}
          viewBox={`0 0 40 ${h}`}
          className="text-white"
          fill="none"
        >
          {/* Faint score of the full journey */}
          <path d={path} stroke="currentColor" strokeWidth="1.5" opacity="0.14" />
          {/* The played part, drawn by scroll */}
          <motion.path
            d={path}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.75"
            style={{ pathLength: reduceMotion ? 1 : progress }}
          />
          {segments.map((_, i) => {
            const f = (i + 1) / segments.length;
            return <Node key={i} progress={progress} f={f} cy={f * h} />;
          })}
        </svg>
      )}
    </div>
  );
}

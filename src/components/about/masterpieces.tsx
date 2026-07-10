"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";

const PIECES = [
  { title: "Moonlight Sonata", composer: "L. v. Beethoven", key: "C♯ minor", rotate: -3 },
  { title: "Clair de Lune", composer: "C. Debussy", key: "D♭ major", rotate: 2.2 },
  { title: "Nocturne Op. 9 № 2", composer: "F. Chopin", key: "E♭ major", rotate: -1.6 },
  { title: "Für Elise", composer: "L. v. Beethoven", key: "A minor", rotate: 2.8 },
];

/** A hand-copied fragment: staff, clef squiggle, and a scatter of notes. */
function ScoreScrap({ seed }: { seed: number }) {
  const notes = Array.from({ length: 6 }, (_, j) => ({
    x: 46 + j * 22 + ((seed * 7 + j * 5) % 3) * 4,
    y: 14 + ((seed * 3 + j * 7) % 5) * 7,
  }));
  return (
    <svg viewBox="0 0 190 56" className="mt-4 w-full text-foreground/70" aria-hidden="true">
      {[10, 19, 28, 37, 46].map((y) => (
        <line key={y} x1="4" y1={y} x2="186" y2={y} stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
      ))}
      <g transform="translate(8 4) scale(1.5)" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.8">
        <path d="M12.5 2.5c2.6 2.2 3.4 4.6 1.3 7.2l-4.6 5.6c-2.3 2.8-1.6 6.3 1.1 7.7 2.5 1.3 5.4.4 6.4-1.9.9-2.1.1-4.5-2-5.4" />
      </g>
      {notes.map((n, j) => (
        <g key={j}>
          <ellipse cx={n.x} cy={n.y + 24} rx="3.4" ry="2.5" transform={`rotate(-18 ${n.x} ${n.y + 24})`} fill="currentColor" />
          <line x1={n.x + 3} y1={n.y + 22} x2={n.x + 3} y2={n.y + 4} stroke="currentColor" strokeWidth="0.9" />
        </g>
      ))}
    </svg>
  );
}

/** Famous pieces as manuscript scraps taped to the wall. */
export function Masterpieces() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="On the stand" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Scraps from the practice book.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PIECES.map((piece, i) => (
          <StaggerItem key={piece.title}>
            <motion.div
              style={{ rotate: reduceMotion ? 0 : piece.rotate }}
              whileHover={
                reduceMotion ? undefined : { rotate: 0, y: -8, scale: 1.03 }
              }
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative h-full rounded-sm border border-black/[0.06] bg-[#fcfaf2] p-5 shadow-[0_12px_28px_rgba(0,0,0,0.14)]"
            >
              {/* Tape */}
              <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 border-x border-black/5 bg-foreground/[0.08] backdrop-blur-[1px]"
              />
              <p className="font-heading text-lg font-semibold italic leading-tight text-neutral-900">
                {piece.title}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">{piece.composer}</p>
              <span className="text-neutral-800">
                <ScoreScrap seed={i} />
              </span>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                {piece.key}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

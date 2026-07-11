"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useStageAudio } from "@/components/stage/use-stage-audio";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Triplet timing matches the synth: quarter = 60/52s → eighth-triplet ≈ 0.385s.
const TRIPLET_S = 60 / 52 / 3;
const NOTE_COUNT = 12;
const CYCLE_S = TRIPLET_S * NOTE_COUNT;

const STAFF_YS = [60, 76, 92, 108, 124];
const GROUP_XS = [184, 248, 312, 376];
const NOTE_YS = [148, 136, 124]; // G♯–C♯–E ascending toward the staff

function TripletGroup({
  x0,
  group,
  playing,
  reduceMotion,
}: {
  x0: number;
  group: number;
  playing: boolean;
  reduceMotion: boolean;
}) {
  return (
    <g>
      {/* Beam */}
      <polygon
        points={`${x0 + 4},90 ${x0 + 43},84 ${x0 + 43},80 ${x0 + 4},86`}
        fill="currentColor"
        opacity="0.8"
      />
      <text
        x={x0 + 21}
        y={74}
        fontSize="12"
        fontStyle="italic"
        fill="currentColor"
        opacity="0.55"
        textAnchor="middle"
        fontFamily="var(--font-cormorant), serif"
      >
        3
      </text>
      {NOTE_YS.map((y, i) => {
        const x = x0 + i * 16;
        const idx = group * 3 + i;
        return (
          <motion.g
            key={i}
            animate={
              playing && !reduceMotion
                ? { opacity: [0.45, 1, 0.45] }
                : { opacity: 0.85 }
            }
            transition={
              playing && !reduceMotion
                ? {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: CYCLE_S - 0.5,
                    delay: idx * TRIPLET_S,
                  }
                : { duration: 0.3 }
            }
          >
            {/* Ledger line under the low G♯ */}
            {i === 0 && (
              <line
                x1={x - 8}
                y1={140}
                x2={x + 8}
                y2={140}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.6"
              />
            )}
            <ellipse
              cx={x}
              cy={y}
              rx="5.6"
              ry="4"
              transform={`rotate(-18 ${x} ${y})`}
              fill="currentColor"
            />
            <line
              x1={x + 5}
              y1={y - 2}
              x2={x + 5}
              y2={87 - i * 1.5}
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </motion.g>
        );
      })}
    </g>
  );
}

/**
 * The opening bar of Moonlight Sonata as an engraved score page.
 * Clicking it plays the piece; while playing, the triplets pulse in time.
 */
export function ScoreCard({ className }: { className?: string }) {
  const { playing, toggle } = useStageAudio();
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={
        playing ? "Pause Moonlight Sonata" : "Play Moonlight Sonata"
      }
      initial={{ opacity: 0, y: 24, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ delay: 1.05, duration: 0.9, ease }}
      whileHover={reduceMotion ? undefined : { rotate: -0.4, y: -5 }}
      className={cn(
        "gilt-top group block w-full cursor-pointer rounded-sm border border-border/70 bg-gradient-to-br from-card to-secondary/50 p-6 text-left text-foreground shadow-xl shadow-black/10 transition-shadow hover:shadow-2xl hover:shadow-black/15 sm:p-7",
        className,
      )}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-heading text-xl font-semibold italic leading-tight">
            Sonata quasi una Fantasia
          </p>
          <p className="shrink-0 text-xs uppercase tracking-widest text-muted-foreground">
            Op. 27 № 2
          </p>
        </div>
        <div className="mt-1 flex items-baseline justify-between gap-4">
          <p className="text-sm italic text-muted-foreground">
            Adagio sostenuto
          </p>
          <p className="text-xs text-muted-foreground">L. van Beethoven</p>
        </div>

        <svg
          viewBox="0 0 470 170"
          className={cn(
            "mt-4 w-full transition-colors duration-700",
            playing && "text-grace",
          )}
          aria-hidden="true"
        >
          <g transform="translate(0 -28)">
            {/* Staff */}
            {STAFF_YS.map((y) => (
              <line
                key={y}
                x1="14"
                y1={y}
                x2="458"
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.35"
              />
            ))}
            {/* Treble clef (same stylized glyph as the nav) */}
            <g
              transform="translate(16 42) scale(3)"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.85"
            >
              <path d="M12.5 2.5c2.6 2.2 3.4 4.6 1.3 7.2l-4.6 5.6c-2.3 2.8-1.6 6.3 1.1 7.7 2.5 1.3 5.4.4 6.4-1.9.9-2.1.1-4.5-2-5.4-1.5-.6-3-.3-4 .6" />
              <path d="M12.5 2.5c-.9 3.9-1.1 7.8-.6 11.7.4 3.4 1.1 6.7.9 10.1-.1 2-1.5 3.3-3.2 2.9-1.3-.3-2.1-1.6-1.8-2.8" />
            </g>
            {/* Key signature: four sharps (C♯ minor) */}
            {[
              [100, 66],
              [112, 90],
              [124, 58],
              [136, 82],
            ].map(([x, y]) => (
              <text
                key={x}
                x={x}
                y={y}
                fontSize="19"
                fill="currentColor"
                opacity="0.8"
                fontFamily="var(--font-cormorant), serif"
              >
                ♯
              </text>
            ))}
            {/* Common time */}
            <text
              x="150"
              y="101"
              fontSize="30"
              fontStyle="italic"
              fill="currentColor"
              opacity="0.8"
              fontFamily="var(--font-cormorant), serif"
            >
              C
            </text>
            {/* The four triplets of bar one */}
            {GROUP_XS.map((x0, g) => (
              <TripletGroup
                key={x0}
                x0={x0}
                group={g}
                playing={playing}
                reduceMotion={!!reduceMotion}
              />
            ))}
            {/* Final barline */}
            <line x1="449" y1="60" x2="449" y2="124" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="455" y1="60" x2="455" y2="124" stroke="currentColor" strokeWidth="3" opacity="0.7" />
          </g>
        </svg>

        <div className="mt-3 flex items-center gap-2">
          <motion.span
            animate={
              playing && !reduceMotion
                ? { opacity: [0.4, 1, 0.4], scale: [1, 1.25, 1] }
                : { opacity: 0.5, scale: 1 }
            }
            transition={
              playing && !reduceMotion
                ? { duration: 1.15, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
            className="size-1.5 rounded-full bg-grace"
          />
          <p className="text-xs italic text-muted-foreground transition-colors group-hover:text-foreground">
            {playing ? "now playing, tap to pause" : "tap to hear it"}
          </p>
        </div>
      </motion.div>
    </motion.button>
  );
}

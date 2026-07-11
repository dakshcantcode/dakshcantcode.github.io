"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { PianoKey } from "@/components/piano/piano-key";
import { TempoEyebrow } from "@/components/shell/notation";
import { skillGroups } from "@/lib/resume";
import { cn } from "@/lib/utils";

// Real octave layout: which positions are black keys (C# D# F# G# A#).
const OCTAVE_PATTERN = [
  "white",
  "black",
  "white",
  "black",
  "white",
  "white",
  "black",
  "white",
  "black",
  "white",
  "black",
  "white",
] as const;

/**
 * Each skill group is an "octave": skills map onto white and black keys,
 * and scrolling the row into view plays an ascending scale run — keys
 * press and release left to right via the PianoKey ripple variant.
 */
export function SkillsGrid() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="Toolbox" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Skills & technologies.
        </h2>
      </Reveal>

      <div className="gilt-top mt-14 rounded-2xl border border-border/60 bg-card/50 px-6 py-2 shadow-sm sm:px-10">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 gap-4 border-t border-border py-8 md:grid-cols-[220px_1fr]"
          >
            <p className="font-heading text-lg italic text-muted-foreground">
              {group.label}
            </p>
            <motion.div
              initial="rest"
              whileInView="played"
              viewport={{ once: true, margin: "-15% 0px" }}
              variants={{
                rest: {},
                played: { transition: { staggerChildren: 0.055 } },
              }}
              className="flex items-start overflow-x-auto pb-2"
            >
              {group.skills.map((skill, i) => {
                const variant = OCTAVE_PATTERN[i % OCTAVE_PATTERN.length];
                return (
                  <PianoKey
                    key={skill}
                    variant={variant}
                    interactive={false}
                    ripple
                    className={cn(
                      "shrink-0 p-2",
                      variant === "white"
                        ? "h-28 w-24"
                        : "-mx-3 h-[4.5rem] w-16",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[11px] leading-tight",
                        variant === "black" && "text-background",
                      )}
                    >
                      {skill}
                    </span>
                  </PianoKey>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

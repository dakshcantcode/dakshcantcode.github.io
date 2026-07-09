"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { PianoKey } from "@/components/piano/piano-key";
import { TempoEyebrow } from "@/components/shell/notation";
import { experience, type Experience } from "@/lib/resume";
import { cn } from "@/lib/utils";

// 8-key strip; entries sit on keys 2 and 6, the rest are decorative.
const ENTRY_KEYS: Record<number, number> = { 2: 0, 6: 1 };
const STRIP_KEYS = 8;
// Black keys at the classic octave joints (after C, D, F, G, A).
const BLACK_JOINTS = [0, 1, 3, 4, 5];

function JobEntry({ job }: { job: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <div className="md:sticky md:top-32 md:self-start">
        <h2 className="text-4xl font-semibold sm:text-5xl">{job.company}</h2>
        <p className="mt-3 text-lg text-muted-foreground">{job.role}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal">
            {job.dates}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {job.location}
          </Badge>
        </div>
      </div>

      <div className="relative md:pl-12">
        <div className="absolute inset-y-0 left-0 hidden w-px bg-border md:block" />
        <motion.div
          style={{ scaleY }}
          className="absolute inset-y-0 left-0 hidden w-px origin-top bg-foreground md:block"
        />
        <div className="space-y-12">
          {job.highlights.map((highlight, i) => (
            <div key={i}>
              <p className="numeral text-sm italic text-muted-foreground">
                0{i + 1}
              </p>
              <p className="mt-3 text-lg font-medium leading-relaxed">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkTimeline() {
  const [selected, setSelected] = useState(0);
  const job = experience[selected];

  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="Experience" />
      </Reveal>

      {/* Keyboard selector — literal piano palette on the dark band. */}
      <Reveal>
        <div className="relative mt-20 max-w-2xl">
          <div className="relative flex h-24 items-stretch gap-1 sm:h-28">
            {Array.from({ length: STRIP_KEYS }).map((_, i) => {
              const entryIdx = ENTRY_KEYS[i];
              const isEntry = entryIdx !== undefined;
              const entry = isEntry ? experience[entryIdx] : undefined;
              return (
                <div key={i} className="relative min-w-0 flex-1">
                  {entry && (
                    <>
                      <span className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-xs italic text-muted-foreground">
                        <span className="sm:hidden">{entry.company}</span>
                        <span className="hidden sm:inline">{entry.dates}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute -top-6 left-1/2 h-6 w-px bg-foreground/30"
                      />
                    </>
                  )}
                  <PianoKey
                    interactive={isEntry}
                    pressed={isEntry && selected === entryIdx}
                    onPress={
                      entry ? () => setSelected(entryIdx!) : undefined
                    }
                    aria-label={entry ? `Show ${entry.company}` : undefined}
                    className={cn(
                      "h-full w-full border-neutral-300 bg-white p-2 text-neutral-900 shadow-[0_2px_0_0_#d4d4d4]",
                      !isEntry && "opacity-40",
                    )}
                  >
                    {entry && (
                      <span className="hidden truncate font-heading text-xs italic sm:block sm:text-sm">
                        {entry.company}
                      </span>
                    )}
                  </PianoKey>
                </div>
              );
            })}
            {BLACK_JOINTS.map((i) => (
              <PianoKey
                key={`black-${i}`}
                variant="black"
                interactive={false}
                className="absolute top-0 h-[52%] w-5 border border-t-0 border-neutral-800 bg-neutral-950 opacity-70 sm:w-6"
                style={{
                  left: `calc(${((i + 1) * 100) / STRIP_KEYS}% - 0.75rem)`,
                }}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={job.company}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border/60 bg-card/50 p-8 shadow-lg shadow-black/10 backdrop-blur-sm sm:p-10"
          >
            <JobEntry job={job} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

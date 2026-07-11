"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MiniEq } from "@/components/motion/mini-eq";
import { Reveal } from "@/components/motion/reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { experience, type Experience } from "@/lib/resume";
import { cn } from "@/lib/utils";

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
          className="absolute inset-y-0 left-0 hidden w-px origin-top bg-grace md:block"
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

/** Mini "cover art": staff lines behind the company initial. */
function CoverArt({ initial }: { initial: string }) {
  return (
    <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-gradient-to-br from-secondary/80 to-background">
      <span
        aria-hidden="true"
        className="absolute inset-x-2 top-1/2 -translate-y-1/2 space-y-[5px]"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="block h-px w-full bg-foreground/15" />
        ))}
      </span>
      <span className="relative font-heading text-2xl font-semibold italic">
        {initial}
      </span>
    </span>
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

      {/* The discography: each role is a record — press play */}
      <Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {experience.map((entry, idx) => {
            const active = selected === idx;
            return (
              <button
                key={entry.company}
                type="button"
                onClick={() => setSelected(idx)}
                aria-pressed={active}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5",
                  active
                    ? "-translate-y-0.5 border-grace/60 bg-card shadow-xl shadow-black/25"
                    : "border-border/60 bg-card/40 hover:-translate-y-0.5 hover:bg-card/70 hover:shadow-lg hover:shadow-black/15",
                )}
              >
                <CoverArt initial={entry.company[0]} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-heading text-xl italic">
                    {entry.company}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                    {entry.role} · {entry.dates}
                  </span>
                </span>
                {active ? (
                  <MiniEq className="shrink-0 text-grace" />
                ) : (
                  <Play className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div className="mt-16">
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

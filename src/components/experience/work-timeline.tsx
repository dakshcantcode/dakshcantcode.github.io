"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/lib/resume";

export function WorkTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const job = experience[0];

  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Experience
        </p>
      </Reveal>

      <div ref={ref} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {job.company}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">{job.role}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary" className="font-normal">
                {job.dates}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {job.location}
              </Badge>
            </div>
          </Reveal>
        </div>

        <div className="relative md:pl-12">
          <div className="absolute inset-y-0 left-0 hidden w-px bg-border md:block" />
          <motion.div
            style={{ scaleY }}
            className="absolute inset-y-0 left-0 hidden w-px origin-top bg-foreground md:block"
          />
          <div className="space-y-12">
            {job.highlights.map((highlight, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <p className="font-mono text-xs text-muted-foreground">
                  0{i + 1}
                </p>
                <p className="mt-3 text-lg font-medium leading-relaxed tracking-tight">
                  {highlight}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { Separator } from "@/components/ui/separator";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { projects } from "@/lib/resume";
import { ProjectPanel } from "./project-panel";

function Dot({
  progress,
  index,
  count,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
}) {
  const opacity = useTransform(progress, (v) => {
    const active = Math.min(count - 1, Math.floor(v * count));
    return active === index ? 1 : 0.25;
  });
  return (
    <motion.span
      style={{ opacity }}
      className="size-1.5 rounded-full bg-foreground"
    />
  );
}

/**
 * Apple-style pinned showcase: the section is 300vh tall; an inner sticky
 * viewport translates the three panels horizontally as you scroll.
 * Falls back to a vertical stack below md and for reduced motion.
 */
export function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  if (!isDesktop || reduceMotion) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-32">
        <div className="space-y-24">
          {projects.map((project, i) => (
            <div key={project.slug}>
              {i > 0 && <Separator className="mb-24" />}
              <Reveal>
                <ProjectPanel project={project} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
          {projects.map((project) => (
            <div key={project.slug} className="w-screen shrink-0 px-6">
              <div className="mx-auto max-w-5xl">
                <ProjectPanel project={project} />
              </div>
            </div>
          ))}
        </motion.div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {projects.map((project, i) => (
            <Dot
              key={project.slug}
              progress={scrollYProgress}
              index={i}
              count={projects.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

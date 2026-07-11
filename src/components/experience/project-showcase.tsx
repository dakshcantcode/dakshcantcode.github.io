"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MiniEq } from "@/components/motion/mini-eq";
import { Reveal } from "@/components/motion/reveal";
import { StaffDivider } from "@/components/shell/notation";
import { usePianoAudio } from "@/components/piano/use-piano-audio";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { projects } from "@/lib/resume";
import { ProjectPanel } from "./project-panel";

// C4, E4, G4 — a rising major arpeggio across the three keys.
const KEY_FREQS = [261.63, 329.63, 392.0];
// Decorative track lengths for the queue chips.
const TRACK_TIMES = ["04:12", "03:47", "05:02"];

/**
 * The nav's sliding-note idea, reused as a progress indicator: a notehead
 * springs between three ascending staff positions as the active project
 * changes (C -> E -> G, matching the key pitches).
 */
function StaffProgress({ active, count }: { active: number; count: number }) {
  const STEP_X = 56;
  const width = STEP_X * count + 24;
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mb-6 hidden h-9 sm:block"
      style={{ width }}
    >
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 space-y-[6px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-px w-full bg-foreground/15" />
        ))}
      </div>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute size-2 -rotate-[20deg] scale-x-125 rounded-full bg-foreground/15"
          style={{ left: 12 + i * STEP_X, top: 20 - i * 6 }}
        />
      ))}
      <motion.span
        animate={{ x: active * STEP_X, y: -active * 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="absolute"
        style={{ left: 12, top: 20 }}
      >
        <span className="block size-2 -rotate-[20deg] scale-x-125 rounded-full bg-foreground" />
        <span className="absolute -top-3 right-0 h-3 w-px bg-foreground" />
      </motion.span>
    </div>
  );
}

/**
 * Scroll glissando: the section pins for 300vh; scrolling presses the three
 * giant piano keys in sequence, and the active key's project panel swaps in
 * above the keyboard. Vertical stack below md and for reduced motion.
 */
export function ProjectShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { enabled, setEnabled, play } = usePianoAudio();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // React re-renders only when the third changes, never per scroll frame.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.max(
      0,
      Math.min(projects.length - 1, Math.floor(v * projects.length)),
    );
    setActive((prev) => (prev === i ? prev : i));
  });

  if (!isDesktop || reduceMotion) {
    return (
      <div ref={ref} className="mx-auto max-w-5xl px-6 py-32">
        <div className="space-y-24">
          {projects.map((project, i) => (
            <div key={project.slug}>
              {i > 0 && <StaffDivider className="mb-24" />}
              <Reveal>
                <ProjectPanel project={project} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const jumpTo = (i: number) => {
    play(KEY_FREQS[i]);
    const el = ref.current;
    if (!el) return;
    // Land mid-third: scrollYProgress spans the section height minus one
    // viewport, so the pin releases exactly at the end.
    const scrollable = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + ((i + 0.5) / projects.length) * scrollable;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const project = projects[active];

  return (
    <div ref={ref} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-24">
        <div className="relative mx-auto w-full max-w-5xl flex-1 px-6">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectPanel project={project} compact />
            </motion.div>
          </AnimatePresence>

          <div className="absolute right-6 top-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEnabled(!enabled)}
              aria-label={enabled ? "Mute piano keys" : "Unmute piano keys"}
            >
              {enabled ? (
                <Volume2 className="size-4" />
              ) : (
                <VolumeX className="size-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-6 pb-10">
          <StaffProgress active={active} count={projects.length} />
          {/* Player timeline: scroll is playback */}
          <div className="relative mb-5 h-1 overflow-hidden rounded-full bg-foreground/15">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 origin-left rounded-full bg-grace"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => jumpTo(i)}
                aria-pressed={active === i}
                aria-label={`Show ${p.name}`}
                className={
                  active === i
                    ? "flex items-center gap-3 rounded-xl border border-grace/70 bg-card px-4 py-3 text-left shadow-lg shadow-black/20 transition-all duration-300"
                    : "flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/70"
                }
              >
                <span className="numeral text-sm italic text-muted-foreground">
                  {p.index}
                </span>
                <span className="min-w-0 flex-1 truncate font-heading text-base italic">
                  {p.name}
                </span>
                {active === i ? (
                  <MiniEq className="shrink-0 text-grace" />
                ) : (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {TRACK_TIMES[i]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

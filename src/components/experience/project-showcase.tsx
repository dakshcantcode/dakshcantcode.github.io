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
import { Reveal } from "@/components/motion/reveal";
import { StaffDivider } from "@/components/shell/notation";
import { PianoKey } from "@/components/piano/piano-key";
import { usePianoAudio } from "@/components/piano/use-piano-audio";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { projects } from "@/lib/resume";
import { ProjectPanel } from "./project-panel";

// C4, E4, G4 — a rising major arpeggio across the three keys.
const KEY_FREQS = [261.63, 329.63, 392.0];

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
    <div ref={ref} className="relative h-[300vh]">
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

        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="relative flex h-36 items-stretch gap-1 sm:h-44">
            {/* Literal piano palette (not band tokens): a real keyboard
                emerging from the black band reads instantly as a piano. */}
            {projects.map((p, i) => (
              <PianoKey
                key={p.slug}
                pressed={active === i}
                onPress={() => jumpTo(i)}
                aria-label={`Show ${p.name}`}
                className="min-w-0 flex-1 border-neutral-300 bg-white p-4 text-neutral-900 shadow-[0_2px_0_0_#d4d4d4]"
              >
                <span className="numeral text-sm italic text-neutral-500">
                  {p.index}
                </span>
                <span className="mt-1 block truncate font-heading text-base italic leading-tight">
                  {p.name}
                </span>
              </PianoKey>
            ))}
            {[0, 1].map((i) => (
              <PianoKey
                key={i}
                variant="black"
                interactive={false}
                className="absolute top-0 h-[55%] w-16 border border-t-0 border-neutral-800 bg-neutral-950"
                style={{ left: `calc(${((i + 1) * 100) / 3}% - 2rem)` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

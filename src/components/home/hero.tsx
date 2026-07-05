"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lift } from "@/components/motion/lift";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { PianoSilhouetteBg } from "@/components/shell/piano-silhouette-bg";
import { profile } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="relative flex min-h-svh items-center overflow-hidden">
      {/* Soft spotlight vignette behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_32%_38%,rgba(0,0,0,0.05),transparent_65%)]"
      />
      <PianoSilhouetteBg />
      {/* pointer-events-none lets the piano receive hovers through this
          layer; interactive children re-enable themselves. */}
      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="pointer-events-none relative mx-auto w-full max-w-5xl px-6 pt-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <TempoEyebrow tempo="Software · Machine Learning" />
        </motion.div>

        <h1 className="mt-6">
          <TextMaskReveal
            lines={["Daksh", "Agrawal"]}
            className="text-8xl font-semibold leading-[0.9] tracking-tight sm:text-[10rem]"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Computer Science @ {profile.school} — {profile.scholarship}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          className="pointer-events-auto mt-10 flex flex-wrap gap-3"
        >
          <Lift>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-b from-neutral-700 to-neutral-950 shadow-md shadow-black/20"
            >
              <Link href="/experience">View work</Link>
            </Button>
          </Lift>
          <Lift>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/60 shadow-sm shadow-black/5 backdrop-blur-sm"
            >
              <Link href="/about#contact">Get in touch</Link>
            </Button>
          </Lift>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.span>
      </motion.div>
    </div>
  );
}

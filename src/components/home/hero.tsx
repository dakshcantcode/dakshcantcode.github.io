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
import { MoonlightToggle } from "@/components/stage/moonlight-toggle";
import { HeroAtmosphere, HeroTicker } from "@/components/home/hero-atmosphere";
import { ScoreCard } from "@/components/home/score-card";
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_32%_38%,rgba(0,0,0,0.04),transparent_65%)]"
      />
      <HeroAtmosphere />

      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="relative mx-auto w-full max-w-5xl px-6 pt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-center lg:gap-14"
      >
        <div>
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
            className="text-7xl font-semibold leading-[0.95] tracking-tight sm:text-9xl"
          />
        </h1>

        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.9, ease }}
          className="mt-5 flex origin-left items-center gap-2"
        >
          <span className="h-px w-24 bg-gradient-to-r from-grace/80 to-transparent" />
          <span className="size-1.5 rotate-45 bg-grace/80" />
          <span className="h-px w-8 bg-gradient-to-r from-grace/40 to-transparent" />
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease }}
          className="mt-8 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Computer Science @ {profile.school}, {profile.scholarship}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Lift>
            <Button asChild size="lg" className="ring-1 ring-inset ring-grace/50">
              <Link href="/experience">View work</Link>
            </Button>
          </Lift>
          <Lift>
            <Button asChild size="lg" variant="outline" className="border-grace/50 hover:border-grace">
              <Link href="/about#contact">Get in touch</Link>
            </Button>
          </Lift>
          <MoonlightToggle className="text-muted-foreground hover:text-foreground" />
        </motion.div>
        </div>

        {/* The score: bar one of the piece the toggle plays */}
        <ScoreCard className="hidden lg:block" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.span>
      </motion.div>

      <HeroTicker />
    </div>
  );
}

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
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { profile } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <div className="relative flex min-h-svh items-center overflow-hidden">
      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="mx-auto w-full max-w-5xl px-6 pt-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <TempoEyebrow
            tempo="Allegro con brio"
            label="Software · Machine Learning"
          />
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
          className="mt-10 flex flex-wrap gap-3"
        >
          <Button asChild size="lg">
            <Link href="/experience">View work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about#contact">Get in touch</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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

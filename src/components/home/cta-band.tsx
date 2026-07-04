"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lift } from "@/components/motion/lift";
import { Reveal } from "@/components/motion/reveal";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { TempoEyebrow } from "@/components/shell/notation";

export function CtaBand() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-40 text-center">
      <Reveal>
        <TempoEyebrow tempo="Currently" className="mb-6" />
      </Reveal>
      <TextMaskReveal
        lines={["AI Engineer @ Kissht", "for Summer 2026."]}
        className="text-4xl font-heading font-semibold tracking-tight sm:text-6xl"
      />
      <Reveal delay={0.4}>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          Currently building AI for consumer lending — and open to future
          co-op terms. If you're building something ambitious, let's talk.
        </p>
        <Lift className="mt-10">
          <Button asChild size="lg">
            <Link href="/about#contact">Get in touch</Link>
          </Button>
        </Lift>
      </Reveal>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { TempoEyebrow } from "@/components/shell/notation";

export function CtaBand() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-40 text-center">
      <Reveal>
        <TempoEyebrow tempo="Coda" className="mb-6" />
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
        <Button asChild size="lg" className="mt-10">
          <Link href="/about#contact">Get in touch</Link>
        </Button>
      </Reveal>
    </div>
  );
}

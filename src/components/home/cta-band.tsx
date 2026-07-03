"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";

export function CtaBand() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-40 text-center">
      <TextMaskReveal
        lines={["Open to Summer 2026", "internships & co-ops."]}
        className="text-4xl font-semibold tracking-tighter sm:text-6xl"
      />
      <Reveal delay={0.4}>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">
          If you're building something ambitious and need an engineer who
          ships, let's talk.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/about#contact">Get in touch</Link>
        </Button>
      </Reveal>
    </div>
  );
}

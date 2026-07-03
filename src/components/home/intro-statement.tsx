"use client";

import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { profile } from "@/lib/resume";

export function IntroStatement() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-40">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          In short
        </p>
      </Reveal>
      <ScrubText
        text={profile.summary}
        className="mt-8 text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
      />
    </div>
  );
}

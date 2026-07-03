"use client";

import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { TempoEyebrow } from "@/components/shell/notation";
import { profile } from "@/lib/resume";

export function IntroStatement() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-40">
      <Reveal>
        <TempoEyebrow tempo="Andante" label="In short" />
      </Reveal>
      <ScrubText
        text={profile.summary}
        className="mt-8 font-heading text-3xl font-medium leading-snug sm:text-4xl"
      />
    </div>
  );
}

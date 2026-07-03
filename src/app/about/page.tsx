import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { TempoEyebrow } from "@/components/shell/notation";
import { NarrativeSection } from "@/components/about/narrative-section";
import { PianoKeysVisual, RingsVisual } from "@/components/about/visuals";
import { ContactSection } from "@/components/about/contact-section";
import { profile } from "@/lib/resume";

export const metadata: Metadata = {
  title: "About",
  description:
    "The discipline behind the code — piano, soccer, and the gym. Daksh Agrawal, CS @ University of Waterloo, AI Engineer @ Kissht for Summer 2026.",
};

export default function AboutPage() {
  return (
    <>
      <ThemedSection className="flex min-h-[60svh] items-end pb-24 pt-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <TextMaskReveal
            lines={["Beyond", "the code"]}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              The habits that make the engineering possible — practiced daily,
              measured honestly.
            </p>
          </Reveal>
        </div>
      </ThemedSection>

      <ThemedSection theme="dark">
        <NarrativeSection
          tempo="Adagio"
          label="Music"
          heading="Practice, every day."
          body="Years at the piano taught me what discipline actually is: showing up before motivation does, hearing the gap between good and precise, and closing it one repetition at a time. It's the same ear I bring to code — the difference between something that works and something that's right."
          visual={<PianoKeysVisual />}
        />
      </ThemedSection>

      <ThemedSection>
        <NarrativeSection
          flip
          tempo="Vivace"
          label="Sport"
          heading="Strong body, clear mind."
          body="Soccer taught me to think in systems — space, timing, and trusting teammates to be where they said they'd be. The gym taught me progressive overload: small, measured increments that compound into something you couldn't lift a year ago. Both keep me sharp for the long build."
          visual={<RingsVisual />}
        />
      </ThemedSection>

      <ThemedSection theme="dark">
        <div className="mx-auto max-w-4xl px-6 py-40">
          <Reveal>
            <TempoEyebrow tempo="Legato" label="The thread" />
          </Reveal>
          <ScrubText
            text="Piano scales, soccer drills, progressive overload, late-night debugging — the thread through all of it is the same: fall in love with the process, measure honestly, and let consistency do the compounding."
            className="mt-8 font-heading text-3xl font-medium leading-snug sm:text-4xl"
          />
        </div>
      </ThemedSection>

      <ThemedSection>
        <div className="mx-auto max-w-5xl px-6 py-32">
          <Reveal>
            <TempoEyebrow tempo="Tempo presente" label="Now" />
            <p className="mt-6 max-w-2xl font-heading text-2xl font-medium sm:text-3xl">
              {profile.program} @ {profile.school},{" "}
              {profile.scholarship} — GPA {profile.gpa}. AI Engineer @ Kissht
              for Summer 2026, open to future co-op terms.
            </p>
          </Reveal>
        </div>
      </ThemedSection>

      <ThemedSection theme="dark" id="contact">
        <ContactSection />
      </ThemedSection>
    </>
  );
}

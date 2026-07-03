import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { NarrativeSection } from "@/components/about/narrative-section";
import { PianoKeysVisual, RingsVisual } from "@/components/about/visuals";
import { ContactSection } from "@/components/about/contact-section";
import { profile } from "@/lib/resume";

export const metadata: Metadata = {
  title: "About",
  description:
    "The discipline behind the code — piano, soccer, and the gym. Daksh Agrawal, CS @ University of Waterloo, open to Summer 2026 internships & co-ops.",
};

export default function AboutPage() {
  return (
    <>
      <ThemedSection className="flex min-h-[60svh] items-end pb-24 pt-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <TextMaskReveal
            lines={["Beyond", "the code"]}
            className="text-5xl font-semibold tracking-tighter sm:text-7xl"
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
          eyebrow="Discipline · Music"
          heading="Practice, every day."
          body="Years at the piano taught me what discipline actually is: showing up before motivation does, hearing the gap between good and precise, and closing it one repetition at a time. It's the same ear I bring to code — the difference between something that works and something that's right."
          visual={<PianoKeysVisual />}
        />
      </ThemedSection>

      <ThemedSection>
        <NarrativeSection
          flip
          eyebrow="Discipline · Sport"
          heading="Strong body, clear mind."
          body="Soccer taught me to think in systems — space, timing, and trusting teammates to be where they said they'd be. The gym taught me progressive overload: small, measured increments that compound into something you couldn't lift a year ago. Both keep me sharp for the long build."
          visual={<RingsVisual />}
        />
      </ThemedSection>

      <ThemedSection theme="dark">
        <div className="mx-auto max-w-4xl px-6 py-40">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The thread
            </p>
          </Reveal>
          <ScrubText
            text="Piano scales, soccer drills, progressive overload, late-night debugging — the thread through all of it is the same: fall in love with the process, measure honestly, and let consistency do the compounding."
            className="mt-8 text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
          />
        </div>
      </ThemedSection>

      <ThemedSection>
        <div className="mx-auto max-w-5xl px-6 py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Now
            </p>
            <p className="mt-6 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
              {profile.program} @ {profile.school},{" "}
              {profile.scholarship} — GPA {profile.gpa}. Seeking Summer 2026
              internships & co-ops.
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

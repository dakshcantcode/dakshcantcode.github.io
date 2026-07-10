import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";
import { SignalThread } from "@/components/motion/signal-thread";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ScrubText } from "@/components/motion/scrub-text";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";
import { GuitarVisual } from "@/components/about/guitar-visual";
import { PianoKeysVisual } from "@/components/about/visuals";
import { ContactSection } from "@/components/about/contact-section";
import { Masterpieces } from "@/components/about/masterpieces";
import { NowPlaying } from "@/components/about/now-playing";
import { profile } from "@/lib/resume";

export const metadata: Metadata = {
  title: "About",
  description:
    "Game backends and machine learning by day; nine years of piano, plus guitar and vocals, after hours. Daksh Agrawal — CS @ Waterloo, AI Engineer @ Kissht.",
};

const facts = [
  { value: "09", label: "years of piano" },
  { value: "03", label: "instruments — piano, guitar, vocals" },
  { value: "02", label: "crafts — game backends & ML" },
  { value: "∞", label: "reps — soccer, gym, scales" },
];

export default function AboutPage() {
  return (
    <div className="relative">
      <SignalThread segments={["sine", "sine", "square", "sine", "sine", "square", "sine"]} />
      <ThemedSection className="flex min-h-[60svh] items-end pb-24 pt-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <TextMaskReveal
            lines={["Beyond", "the code"]}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Game backends and machine learning by day. Nine years of piano —
              plus guitar and vocals — after hours.
            </p>
          </Reveal>
        </div>
      </ThemedSection>

      <ThemedSection theme="dark">
        <div className="mx-auto max-w-5xl px-6 py-32">
          <Reveal>
            <TempoEyebrow tempo="Instruments" />
            <h2 className="mt-4 max-w-lg text-3xl font-semibold sm:text-4xl">
              Engineer by trade, musician by wiring.
            </h2>
          </Reveal>

          <Reveal className="mt-16">
            <GuitarVisual className="w-full text-foreground" />
            <p className="mt-3 text-right text-xs italic text-muted-foreground">
              go on — strum it
            </p>
          </Reveal>

          <StaggerGroup className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {facts.map((fact) => (
              <StaggerItem key={fact.label}>
                <p className="numeral text-5xl font-semibold">{fact.value}</p>
                <p className="mt-2 text-xs uppercase leading-relaxed tracking-widest text-muted-foreground">
                  {fact.label}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <div className="mt-24 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <PianoKeysVisual />
            <Reveal x={24} y={0}>
              <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                Piano came first — nine years of scales before the first line
                of code. The discipline transferred.
              </p>
            </Reveal>
          </div>
        </div>
      </ThemedSection>

      <ThemedSection>
        <div className="mx-auto max-w-4xl px-6 py-36">
          <Reveal>
            <TempoEyebrow tempo="The thread" />
          </Reveal>
          <ScrubText
            text="Backends for games, models for production, songs for the room — same craft: patterns, timing, and honest practice."
            className="mt-8 text-3xl font-medium leading-snug tracking-tight sm:text-4xl"
          />
        </div>
      </ThemedSection>

      <ThemedSection>
        <Masterpieces />
      </ThemedSection>

      <ThemedSection theme="dark">
        <NowPlaying />
      </ThemedSection>

      <ThemedSection>
        <div className="mx-auto max-w-5xl px-6 py-32">
          <Reveal>
            <TempoEyebrow tempo="Now" />
            <p className="mt-6 max-w-2xl text-2xl font-medium tracking-tight sm:text-3xl">
              {profile.program} @ {profile.school},{" "}
              {profile.scholarship} — GPA {profile.gpa}. AI Engineer @ Kissht
              for Summer 2026, open to future co-op terms.
            </p>
          </Reveal>
        </div>
      </ThemedSection>

      <ThemedSection theme="dark" id="contact" score>
        <ContactSection />
      </ThemedSection>
    </div>
  );
}

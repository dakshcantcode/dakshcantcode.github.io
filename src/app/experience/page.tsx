import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";
import { SignalThread } from "@/components/motion/signal-thread";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { Reveal } from "@/components/motion/reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { WorkTimeline } from "@/components/experience/work-timeline";
import { ProjectShowcase } from "@/components/experience/project-showcase";
import { SkillsGrid } from "@/components/experience/skills-grid";
import { CtaBand } from "@/components/home/cta-band";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="relative">
      <SignalThread segments={["square", "square", "sine", "square", "sine", "square"]} />
      <ThemedSection className="flex min-h-[60svh] items-end pb-24 pt-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <TextMaskReveal
            lines={["Work &", "Selected Projects"]}
            className="font-heading text-5xl font-semibold tracking-tight sm:text-7xl"
          />
          <Reveal delay={0.4}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Production systems, hackathon winners, and deep learning
              research. All of it shipped.
            </p>
          </Reveal>
        </div>
      </ThemedSection>

      <ThemedSection theme="dark">
        <WorkTimeline />
      </ThemedSection>

      <ThemedSection score className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <TempoEyebrow tempo="Selected projects" />
          </Reveal>
          <TextMaskReveal
            lines={["Three builds,", "two trophies."]}
            className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-6xl"
          />
        </div>
      </ThemedSection>

      <ThemedSection theme="dark">
        <ProjectShowcase />
      </ThemedSection>

      <ThemedSection>
        <SkillsGrid />
      </ThemedSection>

      <ThemedSection theme="dark" score atmosphere>
        <CtaBand />
      </ThemedSection>
    </div>
  );
}

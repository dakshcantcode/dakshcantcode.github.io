import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <>
      <ThemedSection className="flex min-h-[60svh] items-end pb-24 pt-32">
        <div className="mx-auto w-full max-w-5xl px-6">
          <TextMaskReveal
            lines={["Work &", "Selected Projects"]}
            className="text-5xl font-semibold tracking-tighter sm:text-7xl"
          />
        </div>
      </ThemedSection>

      <ThemedSection theme="dark" className="py-32">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Placeholder
            </p>
            <p className="mt-4 max-w-2xl text-2xl font-medium tracking-tight">
              The OptimaCore timeline and the scroll-jacked project showcase
              land here in Phase 3.
            </p>
          </Reveal>
        </div>
      </ThemedSection>
    </>
  );
}

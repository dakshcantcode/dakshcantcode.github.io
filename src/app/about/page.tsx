import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
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
        </div>
      </ThemedSection>

      <ThemedSection theme="dark" className="py-32" id="contact">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Placeholder
            </p>
            <p className="mt-4 max-w-2xl text-2xl font-medium tracking-tight">
              The piano / soccer / gym narrative and the contact section land
              here in Phase 4.
            </p>
          </Reveal>
        </div>
      </ThemedSection>
    </>
  );
}

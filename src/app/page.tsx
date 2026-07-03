import { ThemedSection } from "@/components/shell/themed-section";
import { Hero } from "@/components/home/hero";
import { IntroStatement } from "@/components/home/intro-statement";
import { FocusGrid } from "@/components/home/focus-grid";
import { StatsBand } from "@/components/home/stats-band";
import { FeaturedWork } from "@/components/home/featured-work";
import { CtaBand } from "@/components/home/cta-band";

export default function HomePage() {
  return (
    <>
      <ThemedSection>
        <Hero />
      </ThemedSection>
      <ThemedSection theme="dark">
        <IntroStatement />
      </ThemedSection>
      <ThemedSection>
        <FocusGrid />
      </ThemedSection>
      <ThemedSection theme="dark">
        <StatsBand />
      </ThemedSection>
      <ThemedSection>
        <FeaturedWork />
      </ThemedSection>
      <ThemedSection theme="dark">
        <CtaBand />
      </ThemedSection>
    </>
  );
}

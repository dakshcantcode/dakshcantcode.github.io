import type { Metadata } from "next";
import { ThemedSection } from "@/components/shell/themed-section";

export const metadata: Metadata = {
  title: "Stage",
  description: "The stage — a grand piano, a spotlight, and ambient keys.",
};

export default function StagePage() {
  return (
    <ThemedSection theme="dark" className="flex min-h-svh items-center">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-heading text-3xl italic">
          The stage is being set — Phase 4 arrives next.
        </p>
      </div>
    </ThemedSection>
  );
}

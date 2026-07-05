import type { Metadata } from "next";
import { StageScene } from "@/components/stage/stage-scene";

export const metadata: Metadata = {
  title: "Stage",
  description:
    "The stage — a grand piano under a spotlight, with ambient keys.",
};

export default function StagePage() {
  return <StageScene />;
}

"use client";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { cn } from "@/lib/utils";

type NarrativeSectionProps = {
  tempo: string;
  label?: string;
  heading: string;
  body: string;
  flip?: boolean;
  visual: React.ReactNode;
};

export function NarrativeSection({
  tempo,
  label,
  heading,
  body,
  flip = false,
  visual,
}: NarrativeSectionProps) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <Reveal x={flip ? 32 : -32} y={0} className={cn(flip && "md:order-2")}>
          <TempoEyebrow tempo={tempo} label={label} />
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">{body}</p>
        </Reveal>
        <Parallax speed={40} className={cn(flip && "md:order-1")}>
          {visual}
        </Parallax>
      </div>
    </div>
  );
}

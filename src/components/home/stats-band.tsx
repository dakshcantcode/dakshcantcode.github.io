"use client";

import { Counter } from "@/components/motion/counter";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";
import { stats } from "@/lib/resume";

export function StatsBand() {
  return (
    <div className="relative overflow-hidden">
      <Parallax
        speed={60}
        className="pointer-events-none absolute -right-24 top-1/2 size-[480px] -translate-y-1/2 rounded-full bg-foreground/[0.04]"
      >
        <span />
      </Parallax>
      <div className="mx-auto max-w-5xl px-6 pt-36">
        <Reveal>
          <TempoEyebrow tempo="By the numbers" />
        </Reveal>
      </div>
      <StaggerGroup className="relative mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-16 px-6 pb-36 pt-16 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Counter
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="numeral bg-gradient-to-b from-white via-neutral-200 to-neutral-500 bg-clip-text text-6xl font-semibold text-transparent sm:text-7xl"
            />
            <p className="mt-3 max-w-[16rem] text-xs uppercase leading-relaxed tracking-widest text-muted-foreground">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

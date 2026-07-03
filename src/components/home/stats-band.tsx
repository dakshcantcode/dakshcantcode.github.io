"use client";

import { Counter } from "@/components/motion/counter";
import { Parallax } from "@/components/motion/parallax";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
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
      <StaggerGroup className="relative mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-16 px-6 py-36 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label}>
            <Counter
              value={stat.value}
              decimals={stat.decimals}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="font-mono text-5xl font-semibold tracking-tight sm:text-6xl"
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

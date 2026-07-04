"use client";

import { Box, Brain, Code2, Layers } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Reveal } from "@/components/motion/reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { focusAreas, type FocusArea } from "@/lib/resume";

const icons: Record<FocusArea["icon"], typeof Code2> = {
  code: Code2,
  brain: Brain,
  layers: Layers,
  box: Box,
};

export function FocusGrid() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="Focus areas" />
        <h2 className="mt-4 max-w-md text-3xl font-semibold sm:text-4xl">
          Four disciplines, one goal: software that ships.
        </h2>
      </Reveal>
      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {focusAreas.map((area) => {
          const Icon = icons[area.icon];
          return (
            <StaggerItem key={area.title}>
              <Card className="h-full border-border/60 shadow-none transition-colors hover:border-foreground/20">
                <CardContent className="p-8">
                  <Icon className="size-6 text-muted-foreground" strokeWidth={1.5} />
                  <h3 className="mt-6 text-xl font-semibold">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}

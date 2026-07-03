"use client";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";
import { skillGroups } from "@/lib/resume";

export function SkillsGrid() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="Scherzo" label="Toolbox" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Skills & technologies.
        </h2>
      </Reveal>

      <div className="mt-14">
        {skillGroups.map((group) => (
          <div
            key={group.label}
            className="grid grid-cols-1 gap-4 border-t border-border py-8 md:grid-cols-[220px_1fr]"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {group.label}
            </p>
            <StaggerGroup stagger={0.03} className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <StaggerItem key={skill}>
                  <Badge variant="outline" className="font-normal">
                    {skill}
                  </Badge>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        ))}
      </div>
    </div>
  );
}

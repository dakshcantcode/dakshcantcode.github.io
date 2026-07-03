"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { projects } from "@/lib/resume";

export function FeaturedWork() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Award-winning builds.
          </h2>
        </div>
        <Link
          href="/experience"
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          See all work
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Link href="/experience" className="block h-full">
                <Card className="flex h-full flex-col border-border/60 shadow-none transition-shadow hover:shadow-lg">
                  <CardContent className="flex flex-1 flex-col p-8">
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.index}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.tagline}
                    </p>
                    <div className="mt-6">
                      <Badge variant="secondary" className="font-normal">
                        {project.award ?? "Deep learning"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

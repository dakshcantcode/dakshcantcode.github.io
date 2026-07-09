"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shell/brand-icons";
import { cn } from "@/lib/utils";
import { contact, type Project } from "@/lib/resume";

type ProjectPanelProps = {
  project: Project;
  /** Tighter spacing/type so the panel fits above the showcase keyboard. */
  compact?: boolean;
};

// Decorative impact bars per metric slot — crisp, Wealthsimple-clean.
const BAR_WIDTHS = [88, 64, 46];

export function ProjectPanel({ project, compact = false }: ProjectPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border/60 bg-card/70 shadow-lg shadow-black/[0.06] backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl",
        compact ? "p-6" : "p-8 sm:p-10",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "numeral pointer-events-none absolute right-6 select-none leading-none text-foreground/[0.06]",
          compact ? "top-4 text-[4.5rem]" : "top-6 text-[6rem] sm:text-[8rem]",
        )}
      >
        {project.index}
      </span>

      <Badge variant="secondary" className="font-normal">
        {project.award ?? "Deep Learning Project"}
      </Badge>
      <h3
        className={cn(
          "font-semibold tracking-tight",
          compact ? "mt-4 text-xl sm:text-2xl" : "mt-5 text-2xl sm:text-3xl",
        )}
      >
        {project.name}
      </h3>
      <p
        className={cn(
          "max-w-xl text-muted-foreground",
          compact ? "mt-2 text-base" : "mt-3 text-lg",
        )}
      >
        {project.tagline}
      </p>
      <p
        className={cn(
          "max-w-2xl text-sm leading-relaxed text-muted-foreground",
          compact ? "mt-2" : "mt-4",
        )}
      >
        {project.description}
      </p>

      <div
        className={cn(
          "grid max-w-3xl grid-cols-1 sm:grid-cols-3",
          compact ? "mt-5 gap-4" : "mt-8 gap-6",
        )}
      >
        {project.metrics.map((metric, i) => (
          <div key={metric.label}>
            <p
              className={cn(
                "numeral font-bold",
                compact ? "text-xl" : "text-2xl sm:text-3xl",
              )}
            >
              {metric.value}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {metric.label}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={
                  reduceMotion ? undefined : { width: 0 }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : { width: `${BAR_WIDTHS[i % BAR_WIDTHS.length]}%` }
                }
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1, delay: 0.15 * i, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-foreground/40 to-foreground/70"
                style={
                  reduceMotion
                    ? { width: `${BAR_WIDTHS[i % BAR_WIDTHS.length]}%` }
                    : undefined
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          compact ? "mt-5" : "mt-8",
        )}
      >
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline" className="font-normal">
            {tech}
          </Badge>
        ))}
      </div>

      <Button
        asChild
        variant="outline"
        size="sm"
        className={compact ? "mt-5" : "mt-8"}
      >
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="size-3.5" />
          View on GitHub
          <ArrowUpRight className="size-3.5" />
        </a>
      </Button>
    </div>
  );
}

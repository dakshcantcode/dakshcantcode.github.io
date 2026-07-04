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

export function ProjectPanel({ project, compact = false }: ProjectPanelProps) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className={cn(
          "numeral pointer-events-none absolute right-0 select-none italic leading-none text-foreground/[0.06]",
          compact
            ? "-top-10 text-[6rem]"
            : "-top-20 text-[8rem] sm:text-[11rem]",
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
          compact ? "mt-4 text-3xl sm:text-4xl" : "mt-6 text-4xl sm:text-5xl",
        )}
      >
        {project.name}
      </h3>
      <p
        className={cn(
          "max-w-xl text-muted-foreground",
          compact ? "mt-2 text-lg" : "mt-4 text-lg sm:text-xl",
        )}
      >
        {project.tagline}
      </p>
      <p
        className={cn(
          "max-w-2xl text-sm leading-relaxed text-muted-foreground",
          compact ? "mt-3" : "mt-4",
        )}
      >
        {project.description}
      </p>

      <div
        className={cn(
          "grid max-w-3xl grid-cols-1 sm:grid-cols-3",
          compact ? "mt-6 gap-4" : "mt-10 gap-6",
        )}
      >
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <p
              className={cn(
                "numeral font-semibold",
                compact ? "text-2xl" : "text-4xl",
              )}
            >
              {metric.value}
            </p>
            <p className="mt-2 text-xs uppercase leading-relaxed tracking-widest text-muted-foreground">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center gap-2",
          compact ? "mt-6" : "mt-10",
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
        className={compact ? "mt-6" : "mt-8"}
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

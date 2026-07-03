import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shell/brand-icons";
import { contact, type Project } from "@/lib/resume";

export function ProjectPanel({ project }: { project: Project }) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 select-none font-mono text-[8rem] leading-none text-foreground/[0.06] sm:text-[11rem]"
      >
        {project.index}
      </span>

      <Badge variant="secondary" className="font-normal">
        {project.award ?? "Deep Learning Project"}
      </Badge>
      <h3 className="mt-6 text-4xl font-semibold tracking-tighter sm:text-5xl">
        {project.name}
      </h3>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl">
        {project.tagline}
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <div className="mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <p className="font-mono text-3xl font-semibold tracking-tight">
              {metric.value}
            </p>
            <p className="mt-2 text-xs uppercase leading-relaxed tracking-widest text-muted-foreground">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech} variant="outline" className="font-normal">
            {tech}
          </Badge>
        ))}
      </div>

      <Button asChild variant="outline" size="sm" className="mt-8">
        <a href={contact.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="size-3.5" />
          View on GitHub
          <ArrowUpRight className="size-3.5" />
        </a>
      </Button>
    </div>
  );
}

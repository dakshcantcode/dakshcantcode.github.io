import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shell/brand-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { contact, profile } from "@/lib/resume";

export function SiteFooter() {
  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium tracking-tight">{profile.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {profile.program} · {profile.school}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button asChild variant="ghost" size="icon">
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Mail className="size-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-xs text-muted-foreground">
          © 2026 {profile.name}. {contact.cta}.
        </p>
      </div>
    </footer>
  );
}

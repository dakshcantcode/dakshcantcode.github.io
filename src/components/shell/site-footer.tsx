import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/shell/brand-icons";
import {
  DynamicsMark,
  FinalBarline,
  StaffDivider,
} from "@/components/shell/notation";
import { Button } from "@/components/ui/button";
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
        <div className="my-6 flex items-center gap-3">
          <StaffDivider className="flex-1" />
          <FinalBarline />
        </div>
        <p className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            © 2026 {profile.name}. {contact.cta}.
          </span>
          <DynamicsMark className="text-sm">pp</DynamicsMark>
        </p>
      </div>
    </footer>
  );
}

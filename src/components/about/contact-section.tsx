"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitHubIcon, LinkedInIcon } from "@/components/shell/brand-icons";
import { Lift } from "@/components/motion/lift";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";
import { contact } from "@/lib/resume";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = contact.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-svh items-center">
      <StaggerGroup className="mx-auto w-full max-w-5xl px-6 py-32 text-center">
        <StaggerItem>
          <TempoEyebrow tempo="Contact" />
        </StaggerItem>

        <StaggerItem>
          <a
            href={`mailto:${contact.email}`}
            className="group relative mt-8 inline-block break-all font-heading text-[clamp(1.5rem,5.5vw,4.25rem)] font-semibold tracking-tight"
          >
            {contact.email}
            <span className="absolute -bottom-1 left-0 hidden h-0.5 w-full origin-left scale-x-0 bg-grace transition-transform duration-500 ease-out group-hover:scale-x-100 sm:block" />
          </a>
        </StaggerItem>

        <StaggerItem>
          <p className="mx-auto mt-8 max-w-md text-muted-foreground">
            {contact.cta}. If you want to talk shop about ML, 3D, or shipping
            fast, my inbox is open.
          </p>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Lift>
              <Button asChild variant="outline">
                <a href={`mailto:${contact.email}`}>
                  <Mail className="size-4" />
                  Email
                </a>
              </Button>
            </Lift>
            <Lift>
              <Button asChild variant="outline">
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              </Button>
            </Lift>
            <Lift>
              <Button asChild variant="outline">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                  GitHub
                </a>
              </Button>
            </Lift>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {copied ? "Copied!" : "Copy email"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </div>
  );
}

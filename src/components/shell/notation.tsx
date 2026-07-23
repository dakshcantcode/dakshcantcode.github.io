"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Sheet-music ornaments. All server-safe pure markup; they inherit the
 * enclosing ThemedSection's tokens so they work on light and dark bands.
 */

export function StaffDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("w-full space-y-[6px]", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false, margin: "-10% 0px" }}
          transition={{
            duration: 0.9,
            delay: 0.08 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-px w-full origin-left bg-foreground/10"
        />
      ))}
    </div>
  );
}

type TempoEyebrowProps = {
  tempo: string;
  label?: string;
  className?: string;
};

/** Section eyebrow: an italic serif marking, e.g. "Experience". */
export function TempoEyebrow({ tempo, label, className }: TempoEyebrowProps) {
  return (
    <div className={cn("text-sm text-muted-foreground", className)}>
      <p>
        <span className="font-heading text-lg italic text-grace">{tempo}</span>
        {label && (
          <>
            <span aria-hidden="true" className="mx-2 text-foreground/30">
              ·
            </span>
            <span className="text-xs uppercase tracking-[0.25em]">{label}</span>
          </>
        )}
      </p>
      <span aria-hidden="true" className="mt-1.5 flex items-center gap-1.5">
        <span className="h-px w-8 bg-gradient-to-r from-grace/70 to-transparent" />
        <span className="size-1 rotate-45 bg-grace/70" />
      </span>
    </div>
  );
}

/** Thin+thick double bar that ends a piece. */
export function FinalBarline({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-6 shrink-0 items-stretch gap-1", className)}
    >
      <span className="w-px bg-grace/80" />
      <span className="w-1 bg-grace/80" />
    </span>
  );
}

/** Italic dynamics accent (pp, ff, sfz) — use at most 2–3 site-wide. */
export function DynamicsMark({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-heading text-lg font-semibold italic text-foreground/40",
        className,
      )}
    >
      {children}
    </span>
  );
}

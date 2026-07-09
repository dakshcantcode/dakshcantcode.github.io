import { cn } from "@/lib/utils";

/**
 * Sheet-music ornaments. All server-safe pure markup; they inherit the
 * enclosing ThemedSection's tokens so they work on light and dark bands.
 */

export function StaffDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("w-full space-y-[6px]", className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-px w-full bg-foreground/10" />
      ))}
    </div>
  );
}

type TempoEyebrowProps = {
  tempo: string;
  label?: string;
  className?: string;
};

/** Section eyebrow in the 8-bit voice: "▸ EXPERIENCE" with a gold cursor. */
export function TempoEyebrow({ tempo, label, className }: TempoEyebrowProps) {
  return (
    <p
      className={cn(
        "font-heading text-[11px] font-bold uppercase leading-relaxed tracking-widest text-muted-foreground",
        className,
      )}
    >
      <span aria-hidden="true" className="mr-2 text-retro-gold">
        ▸
      </span>
      <span>{tempo}</span>
      {label && (
        <>
          <span aria-hidden="true" className="mx-2 text-foreground/30">
            ·
          </span>
          <span>{label}</span>
        </>
      )}
    </p>
  );
}

/** Thin+thick double bar that ends a piece. */
export function FinalBarline({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex h-6 shrink-0 items-stretch gap-1", className)}
    >
      <span className="w-px bg-foreground/60" />
      <span className="w-1 bg-foreground/60" />
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

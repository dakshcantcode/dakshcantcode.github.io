import { NumberKeyboardBg } from "@/components/shell/number-keyboard-bg";
import { cn } from "@/lib/utils";

type ThemedSectionProps = {
  theme?: "light" | "dark";
  id?: string;
  className?: string;
  /**
   * Renders the number-keyboard background behind this band.
   * Adds relative+overflow-hidden — never combine with sticky children.
   */
  score?: boolean;
  children: React.ReactNode;
};

/**
 * Alternating monochrome band. `theme="dark"` scopes shadcn's `.dark`
 * variables to this section so every component inside inverts automatically.
 */
export function ThemedSection({
  theme = "light",
  id,
  className,
  score = false,
  children,
}: ThemedSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // Layered monochrome: subtle gradients + edge highlights keep the
        // palette black & white without reading flat.
        theme === "dark"
          ? "dark bg-background text-foreground bg-gradient-to-b from-[#181818] via-[#101010] to-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-background text-foreground bg-gradient-to-b from-white via-[#fbfbfa] to-[#f2f2f0]",
        score && "relative overflow-hidden",
        className,
      )}
    >
      {score && <NumberKeyboardBg />}
      {children}
    </section>
  );
}

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
        theme === "dark" && "dark",
        "bg-background text-foreground",
        score && "relative overflow-hidden",
        className,
      )}
    >
      {score && <NumberKeyboardBg />}
      {children}
    </section>
  );
}

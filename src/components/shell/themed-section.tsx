import { cn } from "@/lib/utils";

type ThemedSectionProps = {
  theme?: "light" | "dark";
  id?: string;
  className?: string;
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
  children,
}: ThemedSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        theme === "dark" && "dark",
        "bg-background text-foreground",
        className,
      )}
    >
      {children}
    </section>
  );
}

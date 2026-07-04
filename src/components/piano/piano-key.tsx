"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type PianoKeyProps = {
  variant?: "white" | "black";
  /** Controlled pressed state (e.g. scroll-driven). */
  pressed?: boolean;
  onPress?: () => void;
  /** false → decorative div (aria-hidden), no button semantics. */
  interactive?: boolean;
  /**
   * Opt into parent-driven variants ("rest" → "played"): the key presses
   * and releases once, for staggered scale-run animations.
   */
  ripple?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  children?: React.ReactNode;
};

const PRESS_SPRING = { type: "spring", stiffness: 500, damping: 32 } as const;

/**
 * A piano key that presses with a 3D top-hinged rotation. White keys use
 * band tokens, so keyboards invert automatically on dark ThemedSections.
 */
export function PianoKey({
  variant = "white",
  pressed = false,
  onPress,
  interactive = true,
  ripple = false,
  className,
  style,
  "aria-label": ariaLabel,
  children,
}: PianoKeyProps) {
  const reduceMotion = useReducedMotion();
  const Comp = interactive ? motion.button : motion.div;

  return (
    <Comp
      type={interactive ? "button" : undefined}
      onClick={interactive ? onPress : undefined}
      aria-pressed={interactive ? pressed : undefined}
      aria-hidden={interactive ? undefined : true}
      aria-label={ariaLabel}
      style={{
        transformPerspective: 800,
        transformOrigin: "top center",
        ...style,
      }}
      animate={
        ripple || reduceMotion
          ? undefined
          : { rotateX: pressed ? 7 : 0, y: pressed ? 3 : 0 }
      }
      variants={
        ripple && !reduceMotion
          ? {
              rest: { rotateX: 0, y: 0 },
              played: {
                rotateX: [0, 7, 0],
                y: [0, 3, 0],
                transition: { duration: 0.45, times: [0, 0.35, 1], ease: "easeOut" },
              },
            }
          : undefined
      }
      whileHover={
        interactive && !reduceMotion ? { rotateX: 3, y: 1 } : undefined
      }
      whileTap={interactive && !reduceMotion ? { rotateX: 8, y: 4 } : undefined}
      transition={PRESS_SPRING}
      className={cn(
        "relative flex flex-col justify-end text-left",
        variant === "white" &&
          "rounded-b-md border border-t-0 border-border bg-background text-foreground shadow-[0_2px_0_0_var(--border)]",
        variant === "black" &&
          "z-10 rounded-b-sm bg-foreground text-background shadow-md",
        // Reduced motion: communicate the pressed state without transforms.
        pressed && "border-foreground/30",
        pressed && reduceMotion && "bg-muted",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

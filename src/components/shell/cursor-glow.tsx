"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * A soft spotlight that trails the cursor — soft-light blended, so it
 * warms dark bands and all but disappears on white. Fine pointers only.
 */
export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const x = useSpring(mx, { stiffness: 90, damping: 22 });
  const y = useSpring(my, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, marginLeft: -180, marginTop: -180 }}
      className="pointer-events-none fixed left-0 top-0 z-[5] size-[360px] rounded-full bg-[radial-gradient(circle,rgba(233,198,124,0.5),transparent_62%)] mix-blend-soft-light"
    />
  );
}

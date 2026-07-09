"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lift } from "@/components/motion/lift";
import { TextMaskReveal } from "@/components/motion/text-mask-reveal";
import { TempoEyebrow } from "@/components/shell/notation";
import { PianoSilhouetteBg } from "@/components/shell/piano-silhouette-bg";
import { MoonlightToggle } from "@/components/stage/moonlight-toggle";
import { PixelDialogue } from "@/components/home/pixel-dialogue";
import { PixelSprite } from "@/components/home/pixel-sprite";

const ease = [0.22, 1, 0.36, 1] as const;

// Deterministic floating sparkles (x%, y%, delay, duration).
const SPARKLES = [
  [12, 22, 0, 3.4],
  [78, 16, 0.8, 4.1],
  [88, 42, 1.6, 3.2],
  [8, 55, 2.2, 3.8],
  [62, 8, 1.1, 4.4],
] as const;

export function Hero() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Click-to-enter zoom into the stage: 0 = resting, 1 = fullscreen.
  const zoom = useMotionValue(0);
  const pianoScale = useTransform(zoom, [0, 1], [1, 7]);
  const pianoZ = useTransform(zoom, (v) => (v > 0.02 ? 30 : 0));
  const contentFade = useTransform(zoom, [0, 0.4], [1, 0]);
  const overlayOpacity = useTransform(zoom, [0.55, 1], [0, 1]);
  const navigatingRef = useRef(false);
  const [hintVisible, setHintVisible] = useState(false);

  const enterStage = () => {
    if (navigatingRef.current) return;
    navigatingRef.current = true;
    try {
      sessionStorage.setItem("stage-entry", "click");
    } catch {}
    if (reduceMotion) {
      router.push("/stage");
      return;
    }
    animate(zoom, 1, { duration: 0.7, ease });
    setTimeout(() => router.push("/stage"), 720);
  };

  return (
    <div className="relative flex min-h-svh items-center overflow-hidden">
      {/* Soft spotlight vignette behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_32%_38%,rgba(0,0,0,0.05),transparent_65%)]"
      />

      {/* Floating pixel sparkles */}
      {!reduceMotion &&
        SPARKLES.map(([x, sy, delay, dur]) => (
          <motion.span
            key={`${x}-${sy}`}
            aria-hidden="true"
            animate={{ y: [0, -14, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{
              duration: dur,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute size-1.5 bg-retro-gold"
            style={{ left: `${x}%`, top: `${sy}%` }}
          />
        ))}

      <motion.div
        style={{
          scale: reduceMotion ? 1 : pianoScale,
          zIndex: pianoZ,
          transformOrigin: "50% 88%",
        }}
        className="absolute inset-0"
      >
        <PianoSilhouetteBg
          onHoverChange={setHintVisible}
          onActivate={enterStage}
        />
      </motion.div>

      {/* pointer-events-none lets the piano receive hovers through this
          layer; interactive children re-enable themselves. */}
      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className="pointer-events-none relative mx-auto w-full max-w-5xl px-6 pt-12"
      >
        <motion.div style={{ opacity: reduceMotion ? 1 : contentFade }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <TempoEyebrow tempo="Software · Machine Learning" />
          </motion.div>

          <h1 className="mt-6">
            <TextMaskReveal
              lines={["Daksh", "Agrawal"]}
              className="font-pixel text-3xl leading-[1.5] [text-shadow:4px_4px_0_var(--color-retro-gold)] sm:text-5xl sm:leading-[1.4]"
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="pointer-events-auto mt-8 flex max-w-xl items-end gap-4"
          >
            <PixelSprite className="hidden shrink-0 sm:block" />
            <PixelDialogue />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3"
          >
            <Lift>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-b from-neutral-700 to-neutral-950 shadow-md shadow-black/20"
              >
                <Link href="/experience">View work</Link>
              </Button>
            </Lift>
            <Lift>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/60 shadow-sm shadow-black/5 backdrop-blur-sm"
              >
                <Link href="/about#contact">Get in touch</Link>
              </Button>
            </Lift>
            <MoonlightToggle className="text-muted-foreground hover:text-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Hint while hovering the instrument */}
      <AnimatePresence>
        {hintVisible && !navigatingRef.current && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute bottom-20 left-1/2 z-40 -translate-x-1/2 font-pixel text-[9px] uppercase text-muted-foreground"
          >
            click the keys to take the stage
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity: reduceMotion ? undefined : contentFade }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.span>
      </motion.div>

      {/* Blackout that completes the zoom and hands off to /stage */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none fixed inset-0 z-[60] bg-[#070707]"
      />
    </div>
  );
}

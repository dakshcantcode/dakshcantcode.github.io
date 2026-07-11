"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";

// Elden Ring ground-message grammar, pointed at real life.
const MESSAGES = [
  { text: "piano ahead", appraisals: 1408 },
  { text: "try guitar", appraisals: 621 },
  { text: "merge conflict ahead, therefore despair", appraisals: 404 },
  { text: "victory ahead, praise the grind", appraisals: 999 },
];

const GOLD = "#d5b26a";

export function TarnishedMessages() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal>
        <TempoEyebrow tempo="Left by fellow Tarnished" />
        <h2 className="mt-4 max-w-lg text-3xl font-semibold sm:text-4xl">
          Messages on the ground.
        </h2>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Elden Ring players will recognize these. Everyone else, hover
          one anyway. Game worlds are half the reason I build backends.
        </p>
      </Reveal>

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MESSAGES.map((m) => (
          <StaggerItem key={m.text}>
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="group relative h-full"
            >
              {/* Ground glow the message rises from */}
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[100%] opacity-40 blur-md transition-opacity duration-500 group-hover:opacity-70"
                style={{ backgroundColor: GOLD }}
              />
              <div
                className="relative flex h-full flex-col justify-between rounded-lg border bg-card/60 p-5 backdrop-blur-sm transition-shadow duration-500"
                style={{
                  borderColor: `${GOLD}4d`,
                  boxShadow: `0 0 0px ${GOLD}00`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 32px ${GOLD}1f, 0 0 24px ${GOLD}26` }}
                />
                <p
                  className="font-heading text-xl italic leading-snug"
                  style={{ color: GOLD }}
                >
                  “{m.text}”
                </p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>message rated</span>
                  <span className="numeral" style={{ color: `${GOLD}cc` }}>
                    + {m.appraisals}
                  </span>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

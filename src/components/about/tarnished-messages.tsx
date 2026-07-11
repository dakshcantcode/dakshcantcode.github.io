"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

const GOLD = "#d5b26a";
const GOLD_LIGHT = "#f2e3bd";

// Short attributed lines from the game.
const QUOTES = [
  { q: "Put these foolish ambitions to rest.", by: "Margit, the Fell Omen" },
  { q: "I command thee, kneel!", by: "Godrick the Grafted" },
  {
    q: "Let strength be granted, so the world might be mended.",
    by: "a Site of Grace",
  },
];

/** The guidance of grace: a drifting golden wisp with orbiting tendrils. */
function GraceWisp() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden="true" className="relative mx-auto size-44">
      {/* Halo */}
      <motion.div
        animate={
          reduceMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.55, 0.9, 0.55] }
        }
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full blur-lg"
        style={{
          background: `radial-gradient(circle, ${GOLD}59, transparent 62%)`,
        }}
      />
      {/* Core */}
      <motion.span
        animate={reduceMotion ? undefined : { scale: [1, 1.3, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: GOLD_LIGHT,
          boxShadow: `0 0 22px 6px ${GOLD}b3`,
        }}
      />
      {/* Orbiting tendrils, two rings counter-rotating */}
      <motion.svg
        viewBox="0 0 176 176"
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        fill="none"
        stroke={GOLD}
        strokeLinecap="round"
      >
        <path d="M88 22 A66 66 0 0 1 154 88" strokeWidth="1.6" opacity="0.55" />
        <path d="M88 154 A66 66 0 0 1 22 88" strokeWidth="1.2" opacity="0.3" />
      </motion.svg>
      <motion.svg
        viewBox="0 0 176 176"
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        fill="none"
        stroke={GOLD}
        strokeLinecap="round"
      >
        <path d="M132 44 A62 62 0 0 1 148 100" strokeWidth="1" opacity="0.4" />
        <path d="M44 132 A62 62 0 0 1 28 76" strokeWidth="1.4" opacity="0.5" />
      </motion.svg>
      {/* Rising sparks */}
      {!reduceMotion &&
        [22, 48, 70, 84].map((x, i) => (
          <motion.span
            key={x}
            animate={{ y: [8, -34], opacity: [0, 0.8, 0] }}
            transition={{
              duration: 3.4 + i * 0.6,
              delay: i * 1.1,
              repeat: Infinity,
              ease: "easeOut",
            }}
            className="absolute size-1 rounded-full"
            style={{
              left: `${x}%`,
              top: "58%",
              backgroundColor: GOLD_LIGHT,
              boxShadow: `0 0 6px 1px ${GOLD}99`,
            }}
          />
        ))}
    </div>
  );
}

/** A faint Erdtree on the horizon, glowing behind the section. */
function Erdtree() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] overflow-hidden lg:block"
    >
      {/* Canopy glow */}
      <div
        className="absolute right-[8%] top-[8%] h-[55%] w-[80%] rounded-[100%] blur-3xl"
        style={{ background: `radial-gradient(ellipse, ${GOLD}26, transparent 65%)` }}
      />
      <svg
        viewBox="0 0 400 560"
        className="absolute inset-y-0 right-0 h-full"
        fill="none"
        stroke={GOLD}
        strokeLinecap="round"
        opacity="0.32"
      >
        {/* Trunk */}
        <path d="M210 560 C206 460 202 380 200 330 C198 290 196 260 200 230" strokeWidth="7" />
        <path d="M200 330 C185 300 170 285 148 272" strokeWidth="3.5" />
        <path d="M200 300 C218 272 236 258 262 248" strokeWidth="4" />
        {/* Boughs fanning into the canopy */}
        <path d="M200 230 C185 185 160 155 118 132" strokeWidth="3" />
        <path d="M200 230 C202 178 206 148 224 112" strokeWidth="3.2" />
        <path d="M200 230 C222 190 252 162 296 144" strokeWidth="2.8" />
        <path d="M148 272 C120 250 100 236 74 228" strokeWidth="2" />
        <path d="M262 248 C292 232 314 224 342 222" strokeWidth="2.2" />
        <path d="M224 112 C232 84 244 62 262 44" strokeWidth="2" />
        <path d="M118 132 C100 110 88 92 82 68" strokeWidth="1.8" />
        <path d="M296 144 C318 122 334 100 344 74" strokeWidth="1.8" />
        {/* Canopy wisps */}
        {[
          [66, 96], [118, 58], [176, 36], [238, 28], [298, 44], [344, 86],
          [96, 152], [200, 64], [330, 140],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3 + (i % 3)} fill={GOLD} stroke="none" opacity="0.35" />
        ))}
      </svg>
    </div>
  );
}

/** Ornamental rule: line, diamond, line. */
function GoldRule({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className ?? ""}`}>
      <span className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${GOLD}66)` }} />
      <span className="size-1.5 rotate-45" style={{ backgroundColor: `${GOLD}b3` }} />
      <span className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${GOLD}66)` }} />
    </div>
  );
}

export function TarnishedMessages() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <Erdtree />
      <div className="relative mx-auto max-w-5xl px-6 py-32">
        <Reveal>
          <p
            className="text-center text-xs uppercase tracking-[0.3em]"
            style={{ color: `${GOLD}b3` }}
          >
            From the Lands Between
          </p>
        </Reveal>

        {/* Screen-text heading, the way the game announces things */}
        <motion.h2
          initial={
            reduceMotion
              ? undefined
              : { opacity: 0, scale: 1.05, filter: "blur(8px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 bg-gradient-to-b from-[#f5e6c4] via-[#e2c078] to-[#a8863f] bg-clip-text text-center font-heading text-3xl font-medium uppercase tracking-[0.16em] text-transparent [filter:drop-shadow(0_0_20px_rgba(213,178,106,0.3))] sm:text-5xl"
        >
          Arise now, ye Tarnished
        </motion.h2>
        <p
          className="mt-3 text-center text-[11px] uppercase tracking-[0.25em]"
          style={{ color: `${GOLD}80` }}
        >
          Elden Ring, opening narration
        </p>

        <Reveal className="mt-10">
          <GraceWisp />
        </Reveal>

        <GoldRule className="mx-auto mt-12 max-w-2xl" />

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUOTES.map((quote) => (
            <StaggerItem key={quote.by}>
              <div
                className="group relative flex h-full flex-col justify-between p-7 backdrop-blur-sm transition-shadow duration-500"
                style={{
                  border: `1px solid ${GOLD}4d`,
                  backgroundColor: "rgba(10, 8, 4, 0.55)",
                }}
              >
                {/* Corner diamonds */}
                {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map(
                  (pos) => (
                    <span
                      key={pos}
                      aria-hidden="true"
                      className={`absolute ${pos} size-2 rotate-45`}
                      style={{ backgroundColor: `${GOLD}cc` }}
                    />
                  ),
                )}
                {/* Inner hairline + hover glow */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-1.5"
                  style={{ border: `1px solid ${GOLD}26` }}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 44px ${GOLD}21, 0 0 30px ${GOLD}1f` }}
                />
                <p
                  className="text-center font-heading text-xl italic leading-relaxed"
                  style={{ color: GOLD_LIGHT }}
                >
                  “{quote.q}”
                </p>
                <div>
                  <GoldRule className="mx-auto my-4 max-w-[120px]" />
                  <p
                    className="text-center text-[10px] uppercase tracking-[0.25em]"
                    style={{ color: `${GOLD}b3` }}
                  >
                    {quote.by}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-14">
          <p className="mx-auto max-w-md text-center text-sm text-muted-foreground">
            My favorite game, full stop. The worlds I want my backends to
            run look a lot like this one.
          </p>
        </Reveal>
      </div>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { label: "Backend", value: 92 },
  { label: "Machine Learning", value: 88 },
  { label: "Piano", value: 96 },
  { label: "Guitar", value: 74 },
  { label: "Vocals", value: 81 },
];

const TYPES = [
  { name: "Engineer", color: "#f0b429" },
  { name: "Musician", color: "#34d399" },
];

/**
 * Pokédex-style trainer entry — the sleek abstract data display that
 * lives where the piano used to be. Navy panel on powder blue, scanline
 * texture, blinking lens, animated stat bars.
 */
export function PokedexPanel({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className={className}>
      <div className="dark relative overflow-hidden rounded-[28px_8px_28px_8px] border border-white/10 bg-[#0e2036] p-6 text-foreground shadow-xl shadow-[#10233a]/30 sm:p-8">
        {/* Scanlines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(232,242,251,0.025)_3px_4px)]"
        />

        {/* Header: lens + title + status LED */}
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex size-8 items-center justify-center rounded-full border-2 border-white/25 bg-gradient-to-b from-[#5aa8e8] to-[#1d4d7d]">
              <span className="absolute left-1.5 top-1.5 size-2 rounded-full bg-white/70" />
            </span>
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-white/90">
              Pokédex // Trainer №001
            </p>
          </div>
          <div className="flex items-center gap-2">
            {TYPES.map((t) => (
              <span
                key={t.name}
                className="rounded-[10px_3px_10px_3px] border px-2.5 py-1 font-heading text-[10px] font-bold uppercase"
                style={{ borderColor: `${t.color}88`, color: t.color }}
              >
                {t.name}
              </span>
            ))}
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="ml-1 size-2.5 rounded-full bg-retro-green"
            />
          </div>
        </div>

        {/* Stat bars */}
        <div className="relative mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="w-36 shrink-0 font-heading text-[10px] font-bold uppercase text-white/60">
                {stat.label}
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={reduceMotion ? undefined : { width: 0 }}
                  whileInView={
                    reduceMotion ? undefined : { width: `${stat.value}%` }
                  }
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 * i,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-retro-gold to-retro-green"
                  style={
                    reduceMotion ? { width: `${stat.value}%` } : undefined
                  }
                />
              </div>
              <span className="numeral w-8 text-right text-sm font-bold text-white/85">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Flavor text */}
        <p className="relative mt-6 max-w-2xl text-sm leading-relaxed text-white/55">
          Known to debug production builds while humming Moonlight Sonata.
          Often found at fret three or middle C. Evolves under deadline
          pressure.
        </p>
      </div>
    </Reveal>
  );
}

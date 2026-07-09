"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TempoEyebrow } from "@/components/shell/notation";
import { stats } from "@/lib/resume";

// Deterministic sparkline shapes, one per tile.
const SPARKS = [
  "0,16 10,13 20,14 30,9 40,10 50,5 60,3",
  "0,17 10,15 20,10 30,12 40,7 50,8 60,2",
  "0,14 10,14 20,8 30,9 40,9 50,4 60,4",
  "0,18 10,12 20,13 30,7 40,9 50,6 60,1",
];

const DELTAS = ["▲ compounding", "▲ shipped", "▲ two for two", "▲ production"];

// Wealthsimple-style growth curve.
const AREA_LINE =
  "M0,92 C40,84 70,88 110,64 C150,42 185,56 225,36 C265,20 305,26 360,10";

export function DashboardStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <TempoEyebrow tempo="Portfolio" label="Dashboard" />
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
          The numbers, at a glance.
        </h2>
      </Reveal>

      <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StaggerItem key={stat.label}>
            <div className="group h-full rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06]">
              <p className="font-pixel text-[9px] uppercase leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-3">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="numeral text-4xl font-bold"
                />
              </p>
              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="text-xs font-medium text-retro-green">
                  {DELTAS[i % DELTAS.length]}
                </span>
                <svg
                  viewBox="0 0 60 20"
                  className="h-5 w-16 text-retro-gold opacity-70 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <polyline
                    points={SPARKS[i % SPARKS.length]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* The growth chart */}
      <Reveal className="mt-4">
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          <div className="flex items-baseline justify-between">
            <p className="font-pixel text-[9px] uppercase text-muted-foreground">
              Skill trajectory
            </p>
            <p className="text-xs text-muted-foreground">2022 → 2026</p>
          </div>
          <svg viewBox="0 0 360 100" className="mt-4 w-full" aria-hidden="true">
            <defs>
              <linearGradient id="ws-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f0b429" stopOpacity="0.25" />
                <stop offset="1" stopColor="#f0b429" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${AREA_LINE} L360,100 L0,100 Z`} fill="url(#ws-fill)" />
            <motion.path
              d={AREA_LINE}
              fill="none"
              stroke="#f0b429"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reduceMotion ? undefined : { pathLength: 0 }}
              whileInView={reduceMotion ? undefined : { pathLength: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <motion.circle
              cx="360"
              cy="10"
              r="3.5"
              fill="#34d399"
              initial={reduceMotion ? undefined : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
            />
          </svg>
          <div className="mt-2 flex justify-between font-pixel text-[8px] uppercase text-muted-foreground/70">
            <span>First keys</span>
            <span>First commit</span>
            <span>Waterloo</span>
            <span>Kissht</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

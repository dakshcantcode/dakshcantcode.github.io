"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lift } from "@/components/motion/lift";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { StaffDivider, TempoEyebrow } from "@/components/shell/notation";
import { playlistName, playlistUrl, tracks, type Track } from "@/lib/playlist";

const eaglesTracks = tracks.filter((t) => t.artist.includes("Eagles"));
const spotlight =
  eaglesTracks.find((t) => t.title.includes("Hotel California")) ??
  eaglesTracks[0];

// Grid of everything else — dedupe by album art so one album shows once.
const gridTracks = (() => {
  const seen = new Set<string>();
  const out: Track[] = [];
  for (const t of tracks) {
    if (t.artist.includes("Eagles") || seen.has(t.art)) continue;
    seen.add(t.art);
    out.push(t);
    if (out.length === 12) break;
  }
  return out;
})();

/** Spinning record with the album as its label. */
function Vinyl({ art, alt }: { art: string; alt: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      className="relative aspect-square w-full max-w-sm rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
      style={{
        background:
          "repeating-radial-gradient(circle at 50% 50%, #101010 0 2.5px, #1b1b1b 2.5px 5px)",
      }}
    >
      {/* Sheen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-[conic-gradient(from_140deg,transparent_0deg,rgba(255,255,255,0.08)_28deg,transparent_70deg,transparent_180deg,rgba(255,255,255,0.05)_215deg,transparent_260deg)]"
      />
      {/* Label = album art */}
      <div className="absolute left-1/2 top-1/2 w-[42%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-black/60">
        <Image src={art} alt={alt} width={220} height={220} className="w-full" />
      </div>
      {/* Spindle */}
      <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-[#070707]" />
    </motion.div>
  );
}

/** EQ bars that appear to react to the record. */
function Visualizer({ color }: { color: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="flex h-10 items-end gap-[3px]"
      style={{ color }}
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const idle = 0.25 + ((i * 13) % 7) / 12;
        return (
          <motion.span
            key={i}
            animate={
              reduceMotion
                ? undefined
                : { scaleY: [0.3, idle, 0.45, Math.min(1, idle + 0.35), 0.3] }
            }
            transition={{
              duration: 0.9 + ((i * 7) % 5) * 0.13,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 9) * 0.07,
            }}
            className="w-1 origin-bottom rounded-t-sm bg-current"
            style={{ height: `${idle * 100}%` }}
          />
        );
      })}
    </div>
  );
}

export function NowPlaying() {
  const reduceMotion = useReducedMotion();
  const [tint, setTint] = useState(spotlight?.color ?? "#8f6f56");

  return (
    <div className="relative">
      {/* Album-color wash — animates toward whichever cover you touch */}
      <motion.div
        aria-hidden="true"
        animate={{ backgroundColor: `${tint}33` }}
        transition={{ duration: reduceMotion ? 0 : 0.8 }}
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_65%_at_65%_18%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <TempoEyebrow tempo="Now playing" />
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              What's in my ears.
            </h2>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Nine years of piano plus guitar and vocals, and this playlist
              fuels all of it. Hover a cover and the room borrows its color.
            </p>
          </div>
          <Lift>
            <Button asChild variant="outline" size="sm">
              <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
                Open “{playlistName}” on Spotify
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          </Lift>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Top-artist spotlight: the Eagles, on vinyl */}
          <Reveal>
            <div className="relative inline-block w-full max-w-sm">
              <Badge className="absolute -top-3 left-4 z-10 gap-1">
                <Star className="size-3 fill-current" />
                Top artist
              </Badge>
              {spotlight && (
                <Vinyl
                  art={spotlight.art}
                  alt="Eagles, Hotel California album cover"
                />
              )}
            </div>
            <div className="mt-6 flex items-end justify-between gap-4">
              <h3 className="font-heading text-4xl font-semibold italic">
                Eagles
              </h3>
              <Visualizer color={tint} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {eaglesTracks.length} tracks on this playlist. No other artist
              is even close.
            </p>
            <StaffDivider className="mt-6 max-w-xs opacity-60" />
            <ul className="mt-6 space-y-3">
              {eaglesTracks.slice(0, 6).map((t) => (
                <li
                  key={t.title}
                  onPointerEnter={() => setTint(t.color)}
                  className="flex cursor-default items-center gap-3 rounded-lg px-2 py-1 transition-colors hover:bg-white/[0.04]"
                >
                  <Image
                    src={t.art}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 rounded-sm border border-border/40"
                  />
                  <span className="text-base font-medium">{t.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Everything else */}
          <div>
            <StaggerGroup
              stagger={0.05}
              className="grid grid-cols-3 gap-3 sm:grid-cols-4"
            >
              {gridTracks.map((t) => (
                <StaggerItem key={t.title}>
                  <div
                    onPointerEnter={() => setTint(t.color)}
                    className="group relative aspect-square overflow-hidden rounded-md border border-border/40 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={t.art}
                      alt={`${t.title} by ${t.artist}, album cover`}
                      fill
                      sizes="(max-width: 640px) 30vw, 160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent p-2.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-[11px] font-medium leading-tight text-white">
                        {t.title}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-tight text-white/60">
                        {t.artist}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
            <p className="mt-4 text-right text-xs italic text-muted-foreground">
              hover around, {tracks.length} tracks deep
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

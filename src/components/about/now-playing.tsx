"use client";

import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lift } from "@/components/motion/lift";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { StaffDivider, TempoEyebrow } from "@/components/shell/notation";
import { playlistName, playlistUrl, tracks } from "@/lib/playlist";

const eaglesTracks = tracks.filter((t) => t.artist.includes("Eagles"));
const spotlightArt =
  eaglesTracks.find((t) => t.title.includes("Hotel California"))?.art ??
  eaglesTracks[0]?.art;

// Grid of everything else — dedupe by album art so one album shows once.
const gridTracks = (() => {
  const seen = new Set<string>();
  const out: typeof tracks = [];
  for (const t of tracks) {
    if (t.artist.includes("Eagles") || seen.has(t.art)) continue;
    seen.add(t.art);
    out.push(t);
    if (out.length === 12) break;
  }
  return out;
})();

export function NowPlaying() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <TempoEyebrow tempo="Now playing" />
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            What's in my ears.
          </h2>
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
        {/* Top-artist spotlight: the Eagles */}
        <Reveal>
          <div className="relative inline-block">
            <Badge className="absolute -top-3 left-4 z-10 gap-1">
              <Star className="size-3 fill-current" />
              Top artist
            </Badge>
            {spotlightArt && (
              <Image
                src={spotlightArt}
                alt="Eagles — Hotel California album cover"
                width={520}
                height={520}
                className="w-full max-w-sm rounded-lg border border-border/60"
              />
            )}
          </div>
          <h3 className="mt-6 font-heading text-4xl font-semibold italic">
            Eagles
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {eaglesTracks.length} tracks on this playlist — more than any
            other artist. Not close.
          </p>
          <StaffDivider className="mt-6 max-w-xs opacity-60" />
          <ul className="mt-6 space-y-3">
            {eaglesTracks.slice(0, 6).map((t) => (
              <li key={t.title} className="flex items-center gap-3">
                <Image
                  src={t.art}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-sm border border-border/40"
                />
                <span className="font-heading text-base italic">{t.title}</span>
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
                <div className="group relative aspect-square overflow-hidden rounded-md border border-border/40">
                  <Image
                    src={t.art}
                    alt={`${t.title} — ${t.artist} album cover`}
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
            hover a cover — {tracks.length} tracks deep
          </p>
        </div>
      </div>
    </div>
  );
}

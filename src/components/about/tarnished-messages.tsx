"use client";

import { Reveal } from "@/components/motion/reveal";

/**
 * A quiet aside on the About page: my favorite game, and the one line
 * from it that stuck with me. Deliberately minimal — no fan art, no
 * lore dump, just the quote and a small mention.
 */
export function TarnishedMessages() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Off the clock
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <blockquote className="mt-8 font-heading text-3xl font-medium italic leading-snug sm:text-4xl">
          “O Death, become my blade once more.”
        </blockquote>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mx-auto mt-6 flex max-w-[200px] items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-grace/60" />
          <span aria-hidden="true" className="size-1 rotate-45 bg-grace/70" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-grace/60" />
        </div>
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-grace">
          Maliketh, the Black Blade
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-10 text-sm text-muted-foreground">
          Elden Ring is my favorite game.
        </p>
      </Reveal>
    </div>
  );
}

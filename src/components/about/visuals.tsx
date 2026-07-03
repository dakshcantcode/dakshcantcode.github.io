/**
 * Abstract monochrome visuals for the narrative bands. Pure divs —
 * they inherit the band's theme via foreground-opacity tokens.
 */

const keyHeights = [55, 80, 40, 95, 65, 100, 50, 85, 60, 90, 45, 70];

export function PianoKeysVisual() {
  return (
    <div
      aria-hidden="true"
      className="flex h-64 items-end justify-center gap-1.5"
    >
      {keyHeights.map((height, i) => (
        <div
          key={i}
          className={
            i === 5
              ? "w-5 rounded-t-sm bg-foreground/50 sm:w-6"
              : "w-5 rounded-t-sm bg-foreground/10 sm:w-6"
          }
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

export function RingsVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto size-64">
      {[0, 12.5, 25, 37.5].map((inset) => (
        <div
          key={inset}
          className="absolute rounded-full border border-foreground/15"
          style={{ inset: `${inset}%` }}
        />
      ))}
      <div className="absolute left-1/2 top-[6%] size-3 -translate-x-1/2 rounded-full bg-foreground/60" />
    </div>
  );
}

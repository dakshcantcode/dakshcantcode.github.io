"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStageAudio } from "@/components/stage/use-stage-audio";

/**
 * The one and only audio control: toggles the synthesized Moonlight
 * Sonata. Playback is module-global, so it survives SPA navigation —
 * but the switch lives on the landing page.
 */
export function MoonlightToggle({ className }: { className?: string }) {
  const { playing, toggle } = useStageAudio();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-pressed={playing}
      className={className}
    >
      {playing ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      <span className="font-heading italic">Moonlight Sonata</span>
    </Button>
  );
}

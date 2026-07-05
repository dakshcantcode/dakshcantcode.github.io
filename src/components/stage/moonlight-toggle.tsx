"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  stageAudioRunning,
  startStageAudio,
  stopStageAudio,
} from "@/components/stage/stage-audio";

/**
 * The one and only audio control: toggles the synthesized Moonlight
 * Sonata. Playback is module-global, so it survives SPA navigation
 * (e.g. onto the stage) — but the switch lives on the landing page.
 */
export function MoonlightToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);

  // Re-sync if the user navigates back while it's playing.
  useEffect(() => {
    setOn(stageAudioRunning());
  }, []);

  const toggle = async () => {
    if (stageAudioRunning()) {
      stopStageAudio();
      setOn(false);
      return;
    }
    setOn(await startStageAudio());
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-pressed={on}
      className={className}
    >
      {on ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
      <span className="font-heading italic">Moonlight Sonata</span>
    </Button>
  );
}

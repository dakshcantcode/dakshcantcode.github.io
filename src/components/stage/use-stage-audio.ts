"use client";

import { useCallback, useEffect, useState } from "react";
import {
  stageAudioRunning,
  startStageAudio,
  stopStageAudio,
  subscribeStageAudio,
} from "@/components/stage/stage-audio";

/** Shared Moonlight Sonata play state — any component stays in sync. */
export function useStageAudio() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setPlaying(stageAudioRunning());
    return subscribeStageAudio(setPlaying);
  }, []);

  const toggle = useCallback(async () => {
    if (stageAudioRunning()) {
      stopStageAudio();
      return;
    }
    await startStageAudio();
  }, []);

  return { playing, toggle };
}

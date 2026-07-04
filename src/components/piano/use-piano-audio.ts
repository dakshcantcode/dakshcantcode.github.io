"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Optional key sounds. Muted by default (localStorage "piano-audio").
 * The AudioContext is created lazily inside the first click handler, which
 * satisfies browser gesture-unlock; resume() on every play covers iOS.
 * Only ever fire from explicit clicks — never from scroll-driven presses.
 */
export function usePianoAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(false);
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    const on = localStorage.getItem("piano-audio") === "on";
    enabledRef.current = on;
    setEnabledState(on);
  }, []);

  const setEnabled = useCallback((on: boolean) => {
    enabledRef.current = on;
    setEnabledState(on);
    localStorage.setItem("piano-audio", on ? "on" : "off");
  }, []);

  const play = useCallback((freq: number) => {
    if (!enabledRef.current) return;
    try {
      ctxRef.current ??= new AudioContext();
      const ctx = ctxRef.current;
      void ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.55);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } catch {
      // Audio unavailable — stay silent.
    }
  }, []);

  return { enabled, setEnabled, play };
}

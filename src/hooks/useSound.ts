"use client";
// Sound effects via Web Audio API — no external files needed

import { useCallback, useRef } from "react";

export function useSound(enabled: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    if (!enabled) return null;
    if (typeof window === "undefined") return null;
    if (!ctxRef.current || ctxRef.current.state === "closed") {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, [enabled]);

  // Synth tone helper
  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine", gainVal = 0.3, startDelay = 0) => {
      const ctx = getCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime + startDelay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startDelay + duration);
      osc.start(ctx.currentTime + startDelay);
      osc.stop(ctx.currentTime + startDelay + duration);
    },
    [getCtx]
  );

  // Whoosh: arrow release
  const playShoot = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    // Noise-based whoosh
    const bufSize = ctx.sampleRate * 0.25;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.2);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }, [getCtx]);

  // Thud: bullseye hit
  const playBullseye = useCallback(() => {
    playTone(880, 0.15, "square", 0.25);
    playTone(1320, 0.2, "sine", 0.2, 0.05);
    playTone(1760, 0.3, "sine", 0.15, 0.1);
  }, [playTone]);

  // Hit: ring hit
  const playHit = useCallback(() => {
    playTone(440, 0.1, "sawtooth", 0.2);
    playTone(660, 0.15, "sine", 0.15, 0.05);
  }, [playTone]);

  // Miss: thunk
  const playMiss = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const bufSize = ctx.sampleRate * 0.1;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 200;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  }, [getCtx]);

  // Victory jingle
  const playVictory = useCallback(() => {
    const melody = [523, 659, 784, 1047];
    melody.forEach((freq, i) => playTone(freq, 0.25, "sine", 0.3, i * 0.18));
  }, [playTone]);

  // Round end
  const playRoundEnd = useCallback(() => {
    playTone(392, 0.15, "sine", 0.3);
    playTone(330, 0.2, "sine", 0.25, 0.15);
  }, [playTone]);

  return { playShoot, playHit, playBullseye, playMiss, playVictory, playRoundEnd };
}

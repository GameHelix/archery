"use client";
/**
 * PauseScreen — Pause overlay with resume / quit options.
 */

import { motion } from "framer-motion";

interface Props {
  onResume: () => void;
  onQuit: () => void;
  score: number;
}

export default function PauseScreen({ onResume, onQuit, score }: Props) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex flex-col items-center gap-6 glass-panel rounded-2xl p-10 max-w-xs w-full mx-4"
      >
        <div className="text-5xl">⏸</div>
        <h2 className="text-3xl font-extrabold text-white tracking-wide">Paused</h2>
        <div className="text-slate-400">
          Current score: <span className="text-amber-400 font-bold">{score}</span>
        </div>
        <button
          onClick={onResume}
          className="w-full py-3 rounded-xl font-bold text-lg neon-button hover:scale-105 active:scale-95 transition-transform"
        >
          Resume
        </button>
        <button
          onClick={onQuit}
          className="w-full py-3 rounded-xl font-bold text-lg bg-white/5 border border-slate-700 text-slate-300 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
        >
          Quit to Menu
        </button>
      </motion.div>
    </motion.div>
  );
}

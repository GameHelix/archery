"use client";
/**
 * RoundEndScreen — Shown between rounds with score summary.
 */

import { motion } from "framer-motion";
import { GameState } from "@/types/game";

interface Props {
  gameState: GameState;
  onNext: () => void;
  onQuit: () => void;
}

export default function RoundEndScreen({ gameState, onNext, onQuit }: Props) {
  const { round, maxRounds, score } = gameState;
  const isLast = round >= maxRounds;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-md z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="flex flex-col items-center gap-5 glass-panel rounded-2xl p-10 max-w-sm w-full mx-4 text-center"
      >
        <div className="text-5xl">{isLast ? "🏆" : "🎯"}</div>
        <h2 className="text-3xl font-extrabold text-white">
          {isLast ? "Game Over!" : `Round ${round} Done!`}
        </h2>
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Total Score</span>
            <span className="text-amber-400 font-bold text-xl">{score.total}</span>
          </div>
          {score.consecutiveHits >= 2 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Best Combo</span>
              <span className="text-purple-400 font-bold">×{score.multiplier}</span>
            </div>
          )}
          {!isLast && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Next Round</span>
              <span className="text-cyan-400 font-bold">{round + 1} / {maxRounds}</span>
            </div>
          )}
        </div>

        {!isLast ? (
          <button
            onClick={onNext}
            className="w-full py-3 rounded-xl font-bold text-lg neon-button hover:scale-105 active:scale-95 transition-transform mt-2"
          >
            Next Round →
          </button>
        ) : (
          <button
            onClick={onQuit}
            className="w-full py-3 rounded-xl font-bold text-lg neon-button hover:scale-105 active:scale-95 transition-transform mt-2"
          >
            Play Again
          </button>
        )}
        <button
          onClick={onQuit}
          className="w-full py-2 rounded-xl font-semibold text-sm bg-white/5 border border-slate-700 text-slate-400 hover:bg-white/10 transition-all"
        >
          Main Menu
        </button>
      </motion.div>
    </motion.div>
  );
}

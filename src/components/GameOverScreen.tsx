"use client";
/**
 * GameOverScreen — Final game over / victory screen.
 */

import { motion } from "framer-motion";
import { DIFFICULTY_SETTINGS, GameState } from "@/types/game";

interface Props {
  gameState: GameState;
  onRestart: () => void;
  onMenu: () => void;
}

const confettiColors = ["#fbbf24", "#a855f7", "#22c55e", "#ef4444", "#3b82f6"];

// Pre-compute random values so they are stable across re-renders
const CONFETTI_ITEMS = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  color: confettiColors[i % confettiColors.length],
  rotate: Math.random() * 720 - 360,
  x: Math.random() * 200 - 100,
  duration: 2 + Math.random() * 1.5,
  delay: Math.random() * 0.8,
}));

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {CONFETTI_ITEMS.map(item => (
        <motion.div
          key={item.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${item.left}%`, background: item.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: [1, 1, 0], rotate: item.rotate, x: item.x }}
          transition={{ duration: item.duration, delay: item.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}

export default function GameOverScreen({ gameState, onRestart, onMenu }: Props) {
  const { score, difficulty, highScores } = gameState;
  const isNewHigh = score.total > 0 && score.total >= highScores[difficulty];
  const settings = DIFFICULTY_SETTINGS[difficulty];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isNewHigh && <Confetti />}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-5 glass-panel rounded-2xl p-10 max-w-sm w-full mx-4 text-center relative z-10"
      >
        <motion.div
          className="text-6xl"
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          🏆
        </motion.div>

        <h2 className="text-4xl font-extrabold text-white tracking-wide">Game Over!</h2>

        {isNewHigh && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="bg-amber-500/20 border border-amber-500 rounded-lg px-4 py-2 text-amber-400 font-bold text-sm"
          >
            ⭐ New High Score!
          </motion.div>
        )}

        <div className="w-full space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-400">Final Score</span>
            <span className="text-amber-400 font-extrabold text-2xl">{score.total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Difficulty</span>
            <span className="font-bold" style={{ color: settings.color }}>{settings.label}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">High Score</span>
            <span className="text-purple-400 font-bold">{highScores[difficulty]}</span>
          </div>
        </div>

        <div className="w-full space-y-3 mt-2">
          <button
            onClick={onRestart}
            className="w-full py-3 rounded-xl font-bold text-lg neon-button hover:scale-105 active:scale-95 transition-transform"
          >
            Play Again
          </button>
          <button
            onClick={onMenu}
            className="w-full py-3 rounded-xl font-bold text-lg bg-white/5 border border-slate-700 text-slate-300 hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            Main Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

"use client";
/**
 * MenuScreen — Main menu with difficulty selection and high scores.
 */

import { motion } from "framer-motion";
import { Difficulty, DIFFICULTY_SETTINGS, GameState } from "@/types/game";

interface Props {
  gameState: GameState;
  onStart: (d: Difficulty) => void;
  onSetDifficulty: (d: Difficulty) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function MenuScreen({ gameState, onStart, onSetDifficulty }: Props) {
  const { difficulty, highScores } = gameState;

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-6 px-6 max-w-sm w-full"
      >
        {/* Title */}
        <motion.div variants={item} className="text-center">
          <div className="text-6xl mb-2">🏹</div>
          <h1 className="text-5xl font-extrabold neon-text tracking-tight">ARCHERY</h1>
          <p className="text-slate-400 mt-1 text-sm tracking-widest uppercase">Physics Challenge</p>
        </motion.div>

        {/* Difficulty selector */}
        <motion.div variants={item} className="w-full">
          <p className="text-xs text-slate-500 uppercase tracking-wider text-center mb-2">Select Difficulty</p>
          <div className="flex gap-2 justify-center">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => onSetDifficulty(d)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 border-2 ${
                  difficulty === d
                    ? "border-current scale-105 shadow-lg"
                    : "border-transparent bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
                style={difficulty === d ? { color: DIFFICULTY_SETTINGS[d].color, borderColor: DIFFICULTY_SETTINGS[d].color, boxShadow: `0 0 12px ${DIFFICULTY_SETTINGS[d].color}44` } : {}}
              >
                {DIFFICULTY_SETTINGS[d].label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* High scores */}
        <motion.div variants={item} className="w-full glass-panel rounded-xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 text-center">High Scores</p>
          <div className="space-y-2">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map(d => (
              <div key={d} className="flex justify-between items-center">
                <span className="text-sm" style={{ color: DIFFICULTY_SETTINGS[d].color }}>
                  {DIFFICULTY_SETTINGS[d].label}
                </span>
                <span className="font-bold text-white tabular-nums">
                  {highScores[d].toString().padStart(4, "0")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div variants={item} className="w-full">
          <button
            onClick={() => onStart(difficulty)}
            className="w-full py-4 rounded-xl font-extrabold text-xl tracking-wide neon-button transition-all duration-200 hover:scale-105 active:scale-95"
          >
            PLAY NOW
          </button>
        </motion.div>

        {/* Controls hint */}
        <motion.div variants={item} className="text-center text-xs text-slate-600 space-y-1">
          <p>🖱 Click &amp; drag on canvas to aim — release to shoot</p>
          <p>📱 Touch &amp; drag on mobile</p>
          <p>⌨️ Hold Space + mouse to aim, release Space to shoot</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

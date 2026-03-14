"use client";
/**
 * HUD — Heads-Up Display overlay showing score, wind, rounds, arrows left.
 */

import { motion, AnimatePresence } from "framer-motion";
import { GameState } from "@/types/game";

interface Props {
  gameState: GameState;
  onPause: () => void;
  onToggleSound: () => void;
}

function WindArrow({ direction, speed }: { direction: string; speed: number }) {
  const arrows = Array.from({ length: Math.max(1, Math.min(speed, 5)) });
  const isLeft = direction === "left";
  const isRight = direction === "right";

  return (
    <div className="flex items-center gap-1">
      {isLeft && arrows.map((_, i) => (
        <span key={i} className="text-cyan-400 text-lg font-bold animate-pulse">←</span>
      ))}
      {direction === "none" && <span className="text-slate-400 text-sm">Calm</span>}
      {isRight && arrows.map((_, i) => (
        <span key={i} className="text-cyan-400 text-lg font-bold animate-pulse">→</span>
      ))}
    </div>
  );
}

function ArrowIcons({ count, max }: { count: number; max: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-6 rounded-full transition-all duration-300 ${
            i < count ? "bg-amber-400 shadow-[0_0_6px_#fbbf24]" : "bg-slate-700"
          }`}
        />
      ))}
    </div>
  );
}

export default function HUD({ gameState, onPause, onToggleSound }: Props) {
  const { score, wind, round, maxRounds, arrowsLeft, soundEnabled, hitZone } = gameState;
  const maxArrows = 5; // display max

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {/* Top bar */}
      <div className="flex justify-between items-start p-3 gap-2">
        {/* Score */}
        <div className="glass-panel px-4 py-2 rounded-xl">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Score</div>
          <div className="text-2xl font-bold text-amber-400 tabular-nums">
            {score.total.toString().padStart(4, "0")}
          </div>
          {score.multiplier > 1 && (
            <div className="text-xs text-purple-400">×{score.multiplier} combo!</div>
          )}
        </div>

        {/* Round */}
        <div className="glass-panel px-4 py-2 rounded-xl text-center">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Round</div>
          <div className="text-xl font-bold text-white">
            {round} <span className="text-slate-500">/ {maxRounds}</span>
          </div>
        </div>

        {/* Wind */}
        <div className="glass-panel px-4 py-2 rounded-xl">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Wind</div>
          <WindArrow direction={wind.direction} speed={wind.displaySpeed} />
          <div className="text-xs text-slate-400 mt-0.5">
            {wind.displaySpeed === 0 ? "No wind" : `${wind.displaySpeed} km/h`}
          </div>
        </div>

        {/* Arrows */}
        <div className="glass-panel px-4 py-2 rounded-xl">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Arrows</div>
          <ArrowIcons count={arrowsLeft} max={maxArrows} />
        </div>

        {/* Controls (pointer-events on) */}
        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={onToggleSound}
            className="glass-panel w-10 h-10 rounded-xl flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle sound"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
          <button
            onClick={onPause}
            className="glass-panel w-10 h-10 rounded-xl flex items-center justify-center text-lg hover:bg-white/10 transition-colors"
            aria-label="Pause"
          >
            ⏸
          </button>
        </div>
      </div>

      {/* Hit zone popup */}
      <AnimatePresence>
        {hitZone && (
          <motion.div
            key={hitZone + score.total}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 1.2 }}
            transition={{ duration: 0.4 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 text-center pointer-events-none"
          >
            <div className="text-3xl font-extrabold text-amber-400 drop-shadow-lg">
              {hitZone === "Bullseye" ? "🎯 BULLSEYE!" : `✓ ${hitZone}`}
            </div>
            {score.lastHit !== null && (
              <div className="text-xl font-bold text-white mt-1">
                +{score.lastHit} pts
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Power bar hint bottom-left */}
      <div className="absolute bottom-4 left-4 text-xs text-slate-500">
        {gameState.status === "playing" && "Click & drag to aim · Release to shoot"}
      </div>
    </div>
  );
}

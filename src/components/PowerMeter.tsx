"use client";
/**
 * PowerMeter — Visual pull-back power indicator shown while aiming.
 */

import { motion } from "framer-motion";

interface Props {
  power: number; // 0-1
  visible: boolean;
}

export default function PowerMeter({ power, visible }: Props) {
  if (!visible) return null;

  const pct = Math.round(power * 100);
  const color =
    power < 0.35 ? "#22c55e" : power < 0.7 ? "#f59e0b" : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="absolute left-4 bottom-16 flex flex-col items-center gap-1 pointer-events-none"
    >
      <div className="text-xs text-slate-400 uppercase tracking-wider">Power</div>
      <div className="w-4 h-32 bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-full transition-all"
          style={{
            height: `${pct}%`,
            background: `linear-gradient(to top, ${color}, ${color}88)`,
            boxShadow: `0 0 8px ${color}`,
          }}
          animate={{ height: `${pct}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      <div
        className="text-sm font-bold tabular-nums"
        style={{ color }}
      >
        {pct}%
      </div>
    </motion.div>
  );
}

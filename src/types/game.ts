// Core game type definitions

export type Difficulty = "easy" | "medium" | "hard";
export type GameStatus = "menu" | "playing" | "paused" | "roundEnd" | "gameOver";

export interface Vector2 {
  x: number;
  y: number;
}

export interface Wind {
  speed: number;   // m/s equivalent, negative = left, positive = right
  direction: "left" | "right" | "none";
  displaySpeed: number; // 1-10 scale for UI
}

export interface Arrow {
  position: Vector2;
  velocity: Vector2;
  angle: number;
  isFlying: boolean;
  trail: Vector2[];
}

export interface Target {
  position: Vector2;
  rings: TargetRing[];
  radius: number;
}

export interface TargetRing {
  radius: number;
  color: string;
  points: number;
  label: string;
}

export interface AimState {
  isAiming: boolean;
  isDragging: boolean;
  startPos: Vector2;
  currentPos: Vector2;
  power: number;      // 0-1
  angle: number;      // radians
}

export interface Score {
  current: number;
  total: number;
  lastHit: number | null;
  multiplier: number;
  consecutiveHits: number;
}

export interface GameState {
  status: GameStatus;
  difficulty: Difficulty;
  round: number;
  maxRounds: number;
  score: Score;
  wind: Wind;
  arrow: Arrow | null;
  target: Target;
  highScores: Record<Difficulty, number>;
  soundEnabled: boolean;
  arrowsLeft: number;
  hitZone: string | null;   // label of zone hit, for feedback
}

export interface DifficultySettings {
  windMax: number;
  targetRadius: number;
  targetMoveSpeed: number;   // 0 = static
  arrowsPerRound: number;
  powerDecay: number;
  label: string;
  color: string;
}

export const DIFFICULTY_SETTINGS: Record<Difficulty, DifficultySettings> = {
  easy: {
    windMax: 2,
    targetRadius: 80,
    targetMoveSpeed: 0,
    arrowsPerRound: 5,
    powerDecay: 0.97,
    label: "Easy",
    color: "#22c55e",
  },
  medium: {
    windMax: 5,
    targetRadius: 60,
    targetMoveSpeed: 0.5,
    arrowsPerRound: 5,
    powerDecay: 0.96,
    label: "Medium",
    color: "#f59e0b",
  },
  hard: {
    windMax: 9,
    targetRadius: 45,
    targetMoveSpeed: 1.2,
    arrowsPerRound: 5,
    powerDecay: 0.95,
    label: "Hard",
    color: "#ef4444",
  },
};

export const TARGET_RINGS: Omit<TargetRing, "radius">[] = [
  { color: "#facc15", points: 10, label: "Bullseye" },
  { color: "#f97316", points: 8,  label: "Gold" },
  { color: "#ef4444", points: 6,  label: "Red" },
  { color: "#3b82f6", points: 4,  label: "Blue" },
  { color: "#1e293b", points: 2,  label: "Black" },
];

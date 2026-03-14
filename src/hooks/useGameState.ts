"use client";
// Central game state manager hook

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Arrow,
  AimState,
  Difficulty,
  DIFFICULTY_SETTINGS,
  GameState,
  GameStatus,
  TARGET_RINGS,
  Target,
  Vector2,
  Wind,
} from "@/types/game";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 540;
const GRAVITY = 0.18;
const ARROW_SPEED_SCALE = 18;
const HIGH_SCORE_KEY = "archery_highscores";

function buildTarget(difficulty: Difficulty, canvasW: number, canvasH: number): Target {
  const settings = DIFFICULTY_SETTINGS[difficulty];
  const r = settings.targetRadius;
  return {
    position: { x: canvasW * 0.78, y: canvasH * 0.5 },
    radius: r,
    rings: TARGET_RINGS.map((ring, i) => ({
      ...ring,
      radius: r * ((TARGET_RINGS.length - i) / TARGET_RINGS.length),
    })),
  };
}

function randomWind(difficulty: Difficulty): Wind {
  const max = DIFFICULTY_SETTINGS[difficulty].windMax;
  const speed = (Math.random() * 2 - 1) * max;
  return {
    speed,
    direction: speed < -0.1 ? "left" : speed > 0.1 ? "right" : "none",
    displaySpeed: Math.round(Math.abs(speed)),
  };
}

function loadHighScores(): Record<Difficulty, number> {
  if (typeof window === "undefined") return { easy: 0, medium: 0, hard: 0 };
  try {
    const raw = localStorage.getItem(HIGH_SCORE_KEY);
    return raw ? JSON.parse(raw) : { easy: 0, medium: 0, hard: 0 };
  } catch {
    return { easy: 0, medium: 0, hard: 0 };
  }
}

function saveHighScore(difficulty: Difficulty, score: number) {
  const scores = loadHighScores();
  if (score > scores[difficulty]) {
    scores[difficulty] = score;
    localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(scores));
  }
}

function calcHit(arrowPos: Vector2, target: Target): { points: number; zone: string } | null {
  const dx = arrowPos.x - target.position.x;
  const dy = arrowPos.y - target.position.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  for (const ring of target.rings) {
    if (dist <= ring.radius) return { points: ring.points, zone: ring.label };
  }
  return null;
}

const initialAimState = (): AimState => ({
  isAiming: false,
  isDragging: false,
  startPos: { x: 0, y: 0 },
  currentPos: { x: 0, y: 0 },
  power: 0,
  angle: 0,
});

export function useGameState(canvasWidth = CANVAS_WIDTH, canvasHeight = CANVAS_HEIGHT) {
  const [gameState, setGameState] = useState<GameState>(() => ({
    status: "menu",
    difficulty: "medium",
    round: 1,
    maxRounds: 5,
    score: { current: 0, total: 0, lastHit: null, multiplier: 1, consecutiveHits: 0 },
    wind: randomWind("medium"),
    arrow: null,
    target: buildTarget("medium", canvasWidth, canvasHeight),
    highScores: loadHighScores(),
    soundEnabled: true,
    arrowsLeft: DIFFICULTY_SETTINGS["medium"].arrowsPerRound,
    hitZone: null,
  }));

  const [aimState, setAimState] = useState<AimState>(initialAimState());
  const animFrameRef = useRef<number>(0);
  const arrowRef = useRef<Arrow | null>(null);
  const targetRef = useRef<Target>(gameState.target);
  const windRef = useRef<Wind>(gameState.wind);
  const difficultyRef = useRef<Difficulty>(gameState.difficulty);
  const roundRef = useRef(gameState.round);
  const scoreRef = useRef(gameState.score);
  const arrowsLeftRef = useRef(gameState.arrowsLeft);
  const statusRef = useRef<GameStatus>("menu");
  const targetDirRef = useRef(1);

  // Keep refs in sync
  useEffect(() => { targetRef.current = gameState.target; }, [gameState.target]);
  useEffect(() => { windRef.current = gameState.wind; }, [gameState.wind]);
  useEffect(() => { difficultyRef.current = gameState.difficulty; }, [gameState.difficulty]);
  useEffect(() => { roundRef.current = gameState.round; }, [gameState.round]);
  useEffect(() => { scoreRef.current = gameState.score; }, [gameState.score]);
  useEffect(() => { arrowsLeftRef.current = gameState.arrowsLeft; }, [gameState.arrowsLeft]);
  useEffect(() => { statusRef.current = gameState.status; }, [gameState.status]);

  const stopAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Arrow physics loop
  const startArrowAnimation = useCallback((arrow: Arrow) => {
    arrowRef.current = arrow;
    const difficulty = difficultyRef.current;
    const settings = DIFFICULTY_SETTINGS[difficulty];

    const step = () => {
      if (!arrowRef.current) return;
      const a = arrowRef.current;

      // Apply gravity and wind
      const windForce = windRef.current.speed * 0.015;
      const newVx = a.velocity.x + windForce;
      const newVy = a.velocity.y + GRAVITY;
      const newX = a.position.x + newVx;
      const newY = a.position.y + newVy;
      const newAngle = Math.atan2(newVy, newVx);
      const newTrail = [...a.trail.slice(-18), { x: newX, y: newY }];

      const updatedArrow: Arrow = {
        position: { x: newX, y: newY },
        velocity: { x: newVx, y: newVy },
        angle: newAngle,
        isFlying: true,
        trail: newTrail,
      };
      arrowRef.current = updatedArrow;

      // Move target on medium/hard
      if (settings.targetMoveSpeed > 0) {
        const t = targetRef.current;
        const minY = t.radius + 30;
        const maxY = canvasHeight - t.radius - 30;
        let newTY = t.position.y + settings.targetMoveSpeed * targetDirRef.current;
        if (newTY > maxY || newTY < minY) {
          targetDirRef.current *= -1;
          newTY = Math.max(minY, Math.min(maxY, newTY));
        }
        const newTarget = { ...t, position: { x: t.position.x, y: newTY } };
        targetRef.current = newTarget;
        setGameState(prev => ({ ...prev, arrow: updatedArrow, target: newTarget }));
      } else {
        setGameState(prev => ({ ...prev, arrow: updatedArrow }));
      }

      // Out of bounds check
      const outOfBounds =
        newX > canvasWidth + 50 || newX < -50 || newY > canvasHeight + 50;

      if (outOfBounds) {
        // Miss
        arrowRef.current = null;
        const newArrowsLeft = arrowsLeftRef.current - 1;
        const newScore = {
          ...scoreRef.current,
          lastHit: 0,
          consecutiveHits: 0,
          multiplier: 1,
        };
        arrowsLeftRef.current = newArrowsLeft;
        const nextStatus: GameStatus = newArrowsLeft <= 0 ? "roundEnd" : "playing";
        if (nextStatus === "roundEnd") {
          saveHighScore(difficultyRef.current, scoreRef.current.total);
        }
        setGameState(prev => ({
          ...prev,
          arrow: null,
          arrowsLeft: newArrowsLeft,
          score: newScore,
          status: nextStatus,
          highScores: loadHighScores(),
          hitZone: null,
        }));
        return;
      }

      // Hit check
      const hit = calcHit({ x: newX, y: newY }, targetRef.current);
      if (hit) {
        arrowRef.current = null;
        const newConsec = scoreRef.current.consecutiveHits + 1;
        const mult = newConsec >= 3 ? 2 : newConsec >= 2 ? 1.5 : 1;
        const earned = Math.round(hit.points * mult);
        const newTotal = scoreRef.current.total + earned;
        const newScore = {
          current: earned,
          total: newTotal,
          lastHit: earned,
          multiplier: mult,
          consecutiveHits: newConsec,
        };
        const newArrowsLeft = arrowsLeftRef.current - 1;
        arrowsLeftRef.current = newArrowsLeft;
        const nextStatus: GameStatus = newArrowsLeft <= 0 ? "roundEnd" : "playing";
        if (nextStatus === "roundEnd") {
          saveHighScore(difficultyRef.current, newTotal);
        }
        setGameState(prev => ({
          ...prev,
          arrow: { ...updatedArrow, isFlying: false },
          arrowsLeft: newArrowsLeft,
          score: newScore,
          status: nextStatus,
          highScores: loadHighScores(),
          hitZone: hit.zone,
        }));
        return;
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, [canvasWidth, canvasHeight]);

  const shoot = useCallback((aim: AimState) => {
    if (gameState.status !== "playing") return;
    if (gameState.arrowsLeft <= 0) return;
    if (arrowRef.current?.isFlying) return;

    stopAnimation();

    const power = Math.min(aim.power, 1);
    const speed = power * ARROW_SPEED_SCALE;
    const vx = Math.cos(aim.angle) * speed;
    const vy = Math.sin(aim.angle) * speed;

    const bowX = canvasWidth * 0.12;
    const bowY = canvasHeight * 0.5;

    const arrow: Arrow = {
      position: { x: bowX, y: bowY },
      velocity: { x: vx, y: vy },
      angle: aim.angle,
      isFlying: true,
      trail: [],
    };

    setAimState(initialAimState());
    startArrowAnimation(arrow);
  }, [gameState.status, gameState.arrowsLeft, canvasWidth, canvasHeight, stopAnimation, startArrowAnimation]);

  const startGame = useCallback((difficulty: Difficulty) => {
    stopAnimation();
    arrowRef.current = null;
    const target = buildTarget(difficulty, canvasWidth, canvasHeight);
    targetRef.current = target;
    const wind = randomWind(difficulty);
    windRef.current = wind;
    const settings = DIFFICULTY_SETTINGS[difficulty];
    setGameState(prev => ({
      ...prev,
      status: "playing",
      difficulty,
      round: 1,
      score: { current: 0, total: 0, lastHit: null, multiplier: 1, consecutiveHits: 0 },
      wind,
      arrow: null,
      target,
      arrowsLeft: settings.arrowsPerRound,
      hitZone: null,
    }));
    setAimState(initialAimState());
  }, [canvasWidth, canvasHeight, stopAnimation]);

  const nextRound = useCallback(() => {
    const { round, maxRounds, difficulty } = gameState;
    if (round >= maxRounds) {
      setGameState(prev => ({ ...prev, status: "gameOver" }));
      return;
    }
    const newRound = round + 1;
    const target = buildTarget(difficulty, canvasWidth, canvasHeight);
    targetRef.current = target;
    const wind = randomWind(difficulty);
    windRef.current = wind;
    const settings = DIFFICULTY_SETTINGS[difficulty];
    setGameState(prev => ({
      ...prev,
      status: "playing",
      round: newRound,
      wind,
      arrow: null,
      target,
      arrowsLeft: settings.arrowsPerRound,
      hitZone: null,
    }));
    setAimState(initialAimState());
  }, [gameState, canvasWidth, canvasHeight]);

  const goToMenu = useCallback(() => {
    stopAnimation();
    arrowRef.current = null;
    setGameState(prev => ({ ...prev, status: "menu", arrow: null }));
    setAimState(initialAimState());
  }, [stopAnimation]);

  const togglePause = useCallback(() => {
    setGameState(prev => {
      if (prev.status === "playing") return { ...prev, status: "paused" };
      if (prev.status === "paused") return { ...prev, status: "playing" };
      return prev;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setGameState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const setDifficulty = useCallback((d: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty: d }));
  }, []);

  // Cleanup on unmount
  useEffect(() => () => stopAnimation(), [stopAnimation]);

  return {
    gameState,
    aimState,
    setAimState,
    shoot,
    startGame,
    nextRound,
    goToMenu,
    togglePause,
    toggleSound,
    setDifficulty,
  };
}

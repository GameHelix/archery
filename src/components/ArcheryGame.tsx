"use client";
/**
 * ArcheryGame — Root game component that wires together canvas, HUD, and screens.
 * Manages aim input from mouse/touch and keyboard (Space = hold to aim).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AimState, Difficulty } from "@/types/game";
import { useGameState } from "@/hooks/useGameState";
import { useSound } from "@/hooks/useSound";
import GameCanvas from "@/components/GameCanvas";
import HUD from "@/components/HUD";
import PowerMeter from "@/components/PowerMeter";
import MenuScreen from "@/components/MenuScreen";
import PauseScreen from "@/components/PauseScreen";
import RoundEndScreen from "@/components/RoundEndScreen";
import GameOverScreen from "@/components/GameOverScreen";

const CANVAS_W = 900;
const CANVAS_H = 540;
const BOW_X = CANVAS_W * 0.12;
const BOW_Y = CANVAS_H * 0.5;
const MAX_PULL = 140; // pixels of drag for full power

export default function ArcheryGame() {
  const {
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
  } = useGameState(CANVAS_W, CANVAS_H);

  const sounds = useSound(gameState.soundEnabled);
  const prevHitZoneRef = useRef<string | null>(null);
  const prevArrowsLeft = useRef(gameState.arrowsLeft);
  const spaceHeld = useRef(false);
  const spaceDragStart = useRef<{ x: number; y: number } | null>(null);

  // Play sounds when hitZone changes
  useEffect(() => {
    const zone = gameState.hitZone;
    if (zone && zone !== prevHitZoneRef.current) {
      if (zone === "Bullseye") sounds.playBullseye();
      else sounds.playHit();
    } else if (
      gameState.arrowsLeft < prevArrowsLeft.current &&
      !gameState.hitZone &&
      prevHitZoneRef.current === null
    ) {
      sounds.playMiss();
    }
    prevHitZoneRef.current = zone;
    prevArrowsLeft.current = gameState.arrowsLeft;
  }, [gameState.hitZone, gameState.arrowsLeft, sounds]);

  // Play victory sound on game over
  const prevStatus = useRef(gameState.status);
  useEffect(() => {
    if (prevStatus.current !== "gameOver" && gameState.status === "gameOver") {
      sounds.playVictory();
    }
    if (prevStatus.current !== "roundEnd" && gameState.status === "roundEnd") {
      sounds.playRoundEnd();
    }
    prevStatus.current = gameState.status;
  }, [gameState.status, sounds]);

  // ─── Aim input helpers ───────────────────────────────────────────────────────

  const calcAim = useCallback(
    (startX: number, startY: number, currX: number, currY: number): Partial<AimState> => {
      const dx = startX - currX; // reversed: pulling back
      const dy = startY - currY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const power = Math.min(dist / MAX_PULL, 1);
      // Angle from bow to cursor on canvas
      const angle = Math.atan2(currY - BOW_Y, currX - BOW_X);
      return { power, angle };
    },
    []
  );

  const handleAimStart = useCallback(
    (pos: { x: number; y: number }) => {
      if (gameState.status !== "playing") return;
      if (gameState.arrow?.isFlying) return;
      setAimState({
        isAiming: true,
        isDragging: true,
        startPos: pos,
        currentPos: pos,
        power: 0,
        angle: Math.atan2(pos.y - BOW_Y, pos.x - BOW_X),
      });
    },
    [gameState.status, gameState.arrow, setAimState]
  );

  const handleAimMove = useCallback(
    (pos: { x: number; y: number }) => {
      setAimState(prev => {
        if (!prev.isDragging) return prev;
        const extra = calcAim(prev.startPos.x, prev.startPos.y, pos.x, pos.y);
        return { ...prev, currentPos: pos, ...extra };
      });
    },
    [setAimState, calcAim]
  );

  const handleAimEnd = useCallback(() => {
    setAimState(prev => {
      if (!prev.isDragging) return prev;
      if (prev.power > 0.05) {
        sounds.playShoot();
        shoot(prev);
      }
      return {
        isAiming: false,
        isDragging: false,
        startPos: { x: 0, y: 0 },
        currentPos: { x: 0, y: 0 },
        power: 0,
        angle: 0,
      };
    });
  }, [setAimState, shoot, sounds]);

  // ─── Keyboard: Space = hold to aim (aims toward target), release to shoot ───

  const [mousePos, setMousePos] = useState({ x: CANVAS_W * 0.78, y: CANVAS_H * 0.5 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const wrapper = document.getElementById("canvas-wrapper");
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scaleX = CANVAS_W / rect.width;
      const scaleY = CANVAS_H / rect.height;
      setMousePos({
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !spaceHeld.current && gameState.status === "playing") {
        e.preventDefault();
        spaceHeld.current = true;
        spaceDragStart.current = { x: mousePos.x, y: mousePos.y };
        setAimState({
          isAiming: true,
          isDragging: true,
          startPos: spaceDragStart.current,
          currentPos: mousePos,
          power: 0.5, // default half power for keyboard
          angle: Math.atan2(mousePos.y - BOW_Y, mousePos.x - BOW_X),
        });
      }
      if (e.code === "Escape") {
        togglePause();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" && spaceHeld.current) {
        e.preventDefault();
        spaceHeld.current = false;
        sounds.playShoot();
        setAimState(prev => {
          if (prev.power > 0.05) shoot(prev);
          return {
            isAiming: false,
            isDragging: false,
            startPos: { x: 0, y: 0 },
            currentPos: { x: 0, y: 0 },
            power: 0,
            angle: 0,
          };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [gameState.status, mousePos, setAimState, shoot, togglePause, sounds]);

  // Update space aim as mouse moves
  useEffect(() => {
    if (spaceHeld.current && spaceDragStart.current) {
      setAimState(prev => {
        if (!prev.isDragging) return prev;
        return {
          ...prev,
          currentPos: mousePos,
          angle: Math.atan2(mousePos.y - BOW_Y, mousePos.x - BOW_X),
        };
      });
    }
  }, [mousePos, setAimState]);

  return (
    <div className="relative w-full" style={{ maxWidth: CANVAS_W }}>
      {/* Canvas wrapper with aspect ratio */}
      <div
        id="canvas-wrapper"
        className="relative w-full rounded-xl overflow-hidden shadow-2xl shadow-purple-900/50 border border-purple-800/30"
        style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}
      >
        <GameCanvas
          gameState={gameState}
          aimState={aimState}
          canvasWidth={CANVAS_W}
          canvasHeight={CANVAS_H}
          onAimStart={handleAimStart}
          onAimMove={handleAimMove}
          onAimEnd={handleAimEnd}
        />

        {/* HUD (only when playing or paused) */}
        {(gameState.status === "playing" || gameState.status === "paused") && (
          <HUD
            gameState={gameState}
            onPause={togglePause}
            onToggleSound={toggleSound}
          />
        )}

        {/* Power meter */}
        <AnimatePresence>
          {aimState.isDragging && gameState.status === "playing" && (
            <PowerMeter power={aimState.power} visible />
          )}
        </AnimatePresence>

        {/* Overlays */}
        <AnimatePresence>
          {gameState.status === "menu" && (
            <MenuScreen
              key="menu"
              gameState={gameState}
              onStart={(d: Difficulty) => startGame(d)}
              onSetDifficulty={setDifficulty}
            />
          )}
          {gameState.status === "paused" && (
            <PauseScreen
              key="pause"
              onResume={togglePause}
              onQuit={goToMenu}
              score={gameState.score.total}
            />
          )}
          {gameState.status === "roundEnd" && (
            <RoundEndScreen
              key="roundEnd"
              gameState={gameState}
              onNext={nextRound}
              onQuit={goToMenu}
            />
          )}
          {gameState.status === "gameOver" && (
            <GameOverScreen
              key="gameOver"
              gameState={gameState}
              onRestart={() => startGame(gameState.difficulty)}
              onMenu={goToMenu}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Below-canvas controls for mobile */}
      {gameState.status === "playing" && (
        <div className="flex justify-center gap-3 mt-3 md:hidden">
          <button
            onClick={togglePause}
            className="glass-panel px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 active:scale-95 transition-all"
          >
            ⏸ Pause
          </button>
          <button
            onClick={toggleSound}
            className="glass-panel px-6 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/10 active:scale-95 transition-all"
          >
            {gameState.soundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      )}
    </div>
  );
}

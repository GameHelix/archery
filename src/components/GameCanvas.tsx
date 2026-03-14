"use client";
/**
 * GameCanvas — HTML5 Canvas renderer for the archery game.
 * Renders: background, target, archer/bow, arrow trail, flying arrow, aim line.
 */

import { useCallback, useEffect, useRef } from "react";
import { AimState, Arrow, GameState } from "@/types/game";

interface Props {
  gameState: GameState;
  aimState: AimState;
  canvasWidth: number;
  canvasHeight: number;
  onAimStart: (pos: { x: number; y: number }) => void;
  onAimMove: (pos: { x: number; y: number }) => void;
  onAimEnd: () => void;
}

const BOW_X_RATIO = 0.12;
const BOW_Y_RATIO = 0.5;

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#0f0c29");
  sky.addColorStop(0.6, "#302b63");
  sky.addColorStop(1, "#24243e");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  // Stars
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  const stars = [
    [80, 40], [160, 20], [300, 60], [450, 30], [580, 50], [720, 25],
    [820, 45], [50, 120], [400, 100], [650, 80], [750, 130], [200, 150],
    [500, 140], [130, 80], [350, 15], [700, 60], [860, 100],
  ];
  stars.forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, Math.random() < 0.3 ? 1.5 : 0.8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Ground
  const ground = ctx.createLinearGradient(0, h * 0.72, 0, h);
  ground.addColorStop(0, "#1a472a");
  ground.addColorStop(1, "#0d2818");
  ctx.fillStyle = ground;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.72);
  ctx.bezierCurveTo(w * 0.3, h * 0.68, w * 0.7, h * 0.75, w, h * 0.72);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fill();

  // Neon ground line
  ctx.strokeStyle = "rgba(0, 255, 150, 0.3)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.72);
  ctx.bezierCurveTo(w * 0.3, h * 0.68, w * 0.7, h * 0.75, w, h * 0.72);
  ctx.stroke();

  // Distant mountain silhouettes
  ctx.fillStyle = "rgba(20,15,40,0.7)";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.72);
  ctx.lineTo(w * 0.05, h * 0.52);
  ctx.lineTo(w * 0.12, h * 0.72);
  ctx.lineTo(w * 0.18, h * 0.45);
  ctx.lineTo(w * 0.27, h * 0.72);
  ctx.lineTo(w * 0.35, h * 0.55);
  ctx.lineTo(w * 0.45, h * 0.72);
  ctx.closePath();
  ctx.fill();
}

function drawTarget(ctx: CanvasRenderingContext2D, target: GameState["target"]) {
  const { position, rings } = target;

  // Pole
  ctx.strokeStyle = "#78716c";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(position.x, position.y + rings[0].radius + 2);
  ctx.lineTo(position.x, 420);
  ctx.stroke();

  // Glow
  const glow = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, rings[0].radius * 1.3);
  glow.addColorStop(0, "rgba(255,200,0,0.15)");
  glow.addColorStop(1, "rgba(255,200,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(position.x, position.y, rings[0].radius * 1.3, 0, Math.PI * 2);
  ctx.fill();

  // Rings (outermost first)
  [...rings].reverse().forEach(ring => {
    ctx.beginPath();
    ctx.arc(position.x, position.y, ring.radius, 0, Math.PI * 2);
    ctx.fillStyle = ring.color;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Bullseye dot
  ctx.beginPath();
  ctx.arc(position.x, position.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

function drawBow(ctx: CanvasRenderingContext2D, x: number, y: number, drawPull: number, angle: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const bowH = 70;
  const flex = drawPull * 18;

  // Bow limb glow
  ctx.shadowColor = "#a855f7";
  ctx.shadowBlur = 12;

  // Bow limbs
  ctx.strokeStyle = "#c084fc";
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, -bowH / 2);
  ctx.quadraticCurveTo(-flex, 0, 0, bowH / 2);
  ctx.stroke();

  // String
  ctx.shadowBlur = 6;
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -bowH / 2);
  ctx.lineTo(-flex - drawPull * 10, 0);
  ctx.lineTo(0, bowH / 2);
  ctx.stroke();

  // Arrow on string
  if (drawPull > 0.05) {
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#fbbf24";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(-flex - drawPull * 10, 0);
    ctx.lineTo(20, 0);
    ctx.stroke();
    // Arrowhead
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.moveTo(20, 0);
    ctx.lineTo(12, -4);
    ctx.lineTo(12, 4);
    ctx.fill();
  }

  ctx.restore();
}

function drawArcher(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Simple silhouette of an archer
  ctx.fillStyle = "#1e1b4b";
  ctx.strokeStyle = "#818cf8";
  ctx.lineWidth = 2;

  // Body
  ctx.beginPath();
  ctx.ellipse(x - 20, y + 15, 12, 22, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(x - 20, y - 14, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#312e81";
  ctx.fill();
  ctx.stroke();

  // Arm extended
  ctx.strokeStyle = "#818cf8";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 12, y + 5);
  ctx.lineTo(x + 5, y);
  ctx.stroke();
}

function drawArrowTrail(ctx: CanvasRenderingContext2D, trail: { x: number; y: number }[]) {
  if (trail.length < 2) return;
  for (let i = 1; i < trail.length; i++) {
    const t = i / trail.length;
    ctx.beginPath();
    ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
    ctx.lineTo(trail[i].x, trail[i].y);
    ctx.strokeStyle = `rgba(251,191,36,${t * 0.5})`;
    ctx.lineWidth = t * 3;
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

function drawFlyingArrow(ctx: CanvasRenderingContext2D, arrow: Arrow) {
  ctx.save();
  ctx.translate(arrow.position.x, arrow.position.y);
  ctx.rotate(arrow.angle);

  // Glow
  ctx.shadowColor = "#fbbf24";
  ctx.shadowBlur = 10;

  // Shaft
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();

  // Head
  ctx.fillStyle = "#e2e8f0";
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(4, -3);
  ctx.lineTo(4, 3);
  ctx.fill();

  // Fletching
  ctx.strokeStyle = "#f43f5e";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-18, 0);
  ctx.lineTo(-12, -5);
  ctx.moveTo(-18, 0);
  ctx.lineTo(-12, 5);
  ctx.stroke();

  ctx.restore();
}

function drawAimLine(
  ctx: CanvasRenderingContext2D,
  bowX: number,
  bowY: number,
  angle: number,
  power: number,
  wind: number
) {
  if (power < 0.05) return;
  const steps = 20;
  const speed = power * 18;
  let vx = Math.cos(angle) * speed;
  let vy = Math.sin(angle) * speed;
  let px = bowX;
  let py = bowY;
  const windForce = wind * 0.015;

  ctx.save();
  ctx.setLineDash([6, 8]);
  ctx.lineWidth = 1.5;

  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    ctx.strokeStyle = `rgba(167,139,250,${0.7 - t * 0.6})`;
    const nx = px + vx + windForce;
    const ny = py + vy + 0.18;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(nx, ny);
    ctx.stroke();
    px = nx;
    py = ny;
    vx += windForce;
    vy += 0.18;
    if (py > ctx.canvas.height || px > ctx.canvas.width) break;
  }
  ctx.restore();
}

export default function GameCanvas({
  gameState,
  aimState,
  canvasWidth,
  canvasHeight,
  onAimStart,
  onAimMove,
  onAimEnd,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bowX = canvasWidth * BOW_X_RATIO;
  const bowY = canvasHeight * BOW_Y_RATIO;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground(ctx, canvasWidth, canvasHeight);
    drawTarget(ctx, gameState.target);
    drawArcher(ctx, bowX, bowY);

    // Aim line when pulling
    if (aimState.isDragging && gameState.status === "playing") {
      drawAimLine(ctx, bowX, bowY, aimState.angle, aimState.power, gameState.wind.speed);
    }

    // Bow with pull amount
    const pull = aimState.isDragging ? aimState.power : 0;
    const bowAngle = gameState.status === "playing" ? aimState.angle : 0;
    drawBow(ctx, bowX, bowY, pull, bowAngle);

    // Arrow trail
    if (gameState.arrow?.trail) {
      drawArrowTrail(ctx, gameState.arrow.trail);
    }

    // Flying arrow
    if (gameState.arrow?.isFlying) {
      drawFlyingArrow(ctx, gameState.arrow);
    }
  }, [gameState, aimState, canvasWidth, canvasHeight, bowX, bowY]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Convert event positions to canvas-relative coords
  const getPos = useCallback(
    (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvasWidth / rect.width;
      const scaleY = canvasHeight / rect.height;
      if ("touches" in e) {
        const t = e.touches[0] || e.changedTouches[0];
        return {
          x: (t.clientX - rect.left) * scaleX,
          y: (t.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [canvasWidth, canvasHeight]
  );

  const isPlaying = gameState.status === "playing";

  return (
    <canvas
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
      className="w-full h-full object-contain rounded-xl touch-none"
      style={{ cursor: isPlaying ? "crosshair" : "default", display: "block" }}
      onMouseDown={e => { if (isPlaying) onAimStart(getPos(e)); }}
      onMouseMove={e => { if (isPlaying && aimState.isDragging) onAimMove(getPos(e)); }}
      onMouseUp={() => { if (isPlaying) onAimEnd(); }}
      onMouseLeave={() => { if (isPlaying && aimState.isDragging) onAimEnd(); }}
      onTouchStart={e => { e.preventDefault(); if (isPlaying) onAimStart(getPos(e)); }}
      onTouchMove={e => { e.preventDefault(); if (isPlaying) onAimMove(getPos(e)); }}
      onTouchEnd={e => { e.preventDefault(); if (isPlaying) onAimEnd(); }}
    />
  );
}

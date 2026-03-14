# 🏹 Archery Physics

A neon-themed archery browser game built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **HTML5 Canvas**. Pull back the bowstring, factor in the wind, and hit the bullseye!

---

## ✨ Features

- **Physics-based arrows** — projectile motion with gravity + real wind drift
- **Wind system** — randomized wind speed and direction each round (shown with animated arrows)
- **Pull & release mechanic** — click/drag to aim, drag distance = power; dotted trajectory preview
- **5 scoring zones** — Bullseye (×10), Gold (×8), Red (×6), Blue (×4), Black (×2)
- **Combo multipliers** — 2 consecutive hits = ×1.5, 3+ = ×2
- **3 difficulty levels** — Easy (big target, calm wind), Medium (moving target), Hard (tiny target, gusty wind)
- **5 rounds per game** — new wind every round
- **High scores** — stored in `localStorage` per difficulty
- **Sound effects** — Web Audio API synth sounds (whoosh, hit, bullseye, miss, victory jingle)
- **Fully responsive** — scales perfectly on desktop, tablet, and mobile
- **Touch controls** — swipe to aim and release on mobile
- **Keyboard support** — `Space` to aim + shoot, `Esc` to pause
- **Pause / Resume** — mid-game pause with score summary
- **Animated overlays** — Framer Motion transitions between screens
- **Confetti** on new high scores
- **Neon / glassmorphism** visual theme

---

## 🎮 Controls

| Input | Action |
|---|---|
| Click & drag on canvas | Aim (drag direction sets angle, drag length sets power) |
| Release mouse | Shoot |
| Touch & drag (mobile) | Aim |
| Release touch | Shoot |
| Hold `Space` + move mouse | Aim with keyboard |
| Release `Space` | Shoot |
| `Esc` | Pause / Resume |
| On-screen ⏸ button | Pause / Resume |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Rendering | HTML5 Canvas |
| Audio | Web Audio API (no external files) |
| State | React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) |
| Persistence | `localStorage` for high scores |
| Deploy | Vercel (zero-config) |

---

## 🚀 Run Locally

```bash
# 1. Clone
git clone https://github.com/your-username/archery.git
cd archery

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## ☁️ Deploy to Vercel

```bash
# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — GitHub integration
# Push to GitHub → import repo at vercel.com/new → Deploy (zero config needed)
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout, metadata, fonts
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles + custom utility classes
├── components/
│   ├── ArcheryGame.tsx  # Root game component (orchestrator)
│   ├── GameCanvas.tsx   # HTML5 Canvas renderer
│   ├── HUD.tsx          # Score, wind, arrows, controls overlay
│   ├── PowerMeter.tsx   # Pull-back power indicator
│   ├── MenuScreen.tsx   # Main menu with difficulty picker
│   ├── PauseScreen.tsx  # Pause overlay
│   ├── RoundEndScreen.tsx
│   └── GameOverScreen.tsx
├── hooks/
│   ├── useGameState.ts  # Central game state + physics loop
│   └── useSound.ts      # Web Audio API sound effects
└── types/
    └── game.ts          # All TypeScript types + constants
```

---

## 🎯 Scoring

| Zone | Points | Color |
|---|---|---|
| Bullseye | 10 | Yellow |
| Gold | 8 | Orange |
| Red | 6 | Red |
| Blue | 4 | Blue |
| Black | 2 | Dark |

**Combo bonus:** 2 hits in a row = ×1.5 · 3+ hits = ×2

---

## 📄 License

MIT

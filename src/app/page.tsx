import GameLoader from "@/components/GameLoader";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080614] flex flex-col items-center justify-center px-4 py-6 gap-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold neon-text tracking-tight">
          🏹 Archery Physics
        </h1>
        <p className="text-slate-500 text-sm mt-1 tracking-widest uppercase">
          Aim · Power · Wind · Bullseye
        </p>
      </div>

      {/* Game */}
      <div className="w-full flex justify-center">
        <GameLoader />
      </div>

      {/* Footer */}
      <p className="text-slate-700 text-xs">
        Built with Next.js · TypeScript · Canvas · Framer Motion
      </p>
    </main>
  );
}

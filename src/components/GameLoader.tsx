"use client";
/**
 * GameLoader — Client-side wrapper that dynamically imports ArcheryGame.
 * Required because next/dynamic with ssr:false must live in a Client Component.
 */

import dynamic from "next/dynamic";

const ArcheryGame = dynamic(() => import("@/components/ArcheryGame"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ aspectRatio: "900/540" }}>
      <div className="text-slate-500 text-sm animate-pulse">Loading game…</div>
    </div>
  ),
});

export default function GameLoader() {
  return <ArcheryGame />;
}

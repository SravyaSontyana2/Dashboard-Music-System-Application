"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ClusterScreen } from "@/components/cluster/cluster-screen";
import { HUDBackground } from "@/components/cluster/hud-background";
import { WelcomeOverlay } from "@/components/cluster/welcome-overlay";
import { MusicScreen } from "@/components/music/music-screen";

type View = "cluster" | "music";

export default function Page() {
  const [view, setView] = useState<View>("cluster");
  const [welcoming, setWelcoming] = useState(false);

  useEffect(() => {
    if (!welcoming) return;
    const id = setTimeout(() => {
      setWelcoming(false);
      setView("music");
    }, 2000);
    return () => clearTimeout(id);
  }, [welcoming]);

  const handleMusicClick = () => {
    setWelcoming(true);
  };

  const handleExitMusic = () => {
    setView("cluster");
  };

  return (
    <main className="dark relative min-h-screen w-full overflow-hidden bg-[#05060a] text-white">
      <HUDBackground />

      <div className="relative">
        <AnimatePresence mode="wait">
          {view === "cluster" ? (
            <ClusterScreen key="cluster" onMusicClick={handleMusicClick} />
          ) : (
            <MusicScreen key="music" onExit={handleExitMusic} />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{welcoming && <WelcomeOverlay />}</AnimatePresence>
    </main>
  );
}

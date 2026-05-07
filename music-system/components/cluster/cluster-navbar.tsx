"use client";

import { motion } from "framer-motion";
import { Map, Mic, Music, Phone, Settings, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DriveMode = "eco" | "comfort" | "sport";

interface ClusterNavbarProps {
  driveMode: DriveMode;
  onDriveModeChange: (mode: DriveMode) => void;
  onMusicClick: () => void;
}

interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  primary?: boolean;
  onClick?: () => void;
}

export function ClusterNavbar({
  driveMode,
  onDriveModeChange,
  onMusicClick,
}: ClusterNavbarProps) {
  const navItems: NavItem[] = [
    { id: "map", icon: Map, label: "Map" },
    { id: "phone", icon: Phone, label: "Phone" },
    { id: "music", icon: Music, label: "Music", primary: true, onClick: onMusicClick },
    { id: "voice", icon: Mic, label: "Voice" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full px-6 md:px-10 py-4 border-t border-white/5 bg-black/40 backdrop-blur-xl"
    >
      <div className="grid items-center gap-4 md:grid-cols-[auto_1fr_auto]">
        <DriveModeSelector mode={driveMode} onChange={onDriveModeChange} />

        <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
          {navItems.map(({ id, icon: Icon, label, primary, onClick }) => (
            <motion.button
              key={id}
              type="button"
              onClick={onClick}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "group flex flex-col items-center gap-1 px-3 md:px-4 py-2 rounded-2xl",
                "border bg-white/[0.02] transition-all",
                primary
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                  : "border-white/10 text-white/70 hover:text-white hover:border-cyan-300/30 hover:bg-cyan-400/5"
              )}
            >
              <Icon
                className={cn(
                  "size-5",
                  primary && "drop-shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                )}
              />
              <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
                {label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-end gap-2">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/80">
            All Systems Nominal
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function DriveModeSelector({
  mode,
  onChange,
}: {
  mode: DriveMode;
  onChange: (m: DriveMode) => void;
}) {
  const modes: { id: DriveMode; label: string }[] = [
    { id: "eco", label: "Eco" },
    { id: "comfort", label: "Comfort" },
    { id: "sport", label: "Sport" },
  ];
  const tones: Record<DriveMode, string> = {
    eco: "from-emerald-400/40 to-emerald-500/10 border-emerald-400/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]",
    comfort:
      "from-cyan-400/40 to-cyan-500/10 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    sport:
      "from-fuchsia-500/40 to-rose-600/10 border-fuchsia-400/50 shadow-[0_0_20px_rgba(217,70,239,0.3)]",
  };
  return (
    <div className="relative flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md w-fit">
      <span className="px-2 text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">
        Mode
      </span>
      {modes.map((m) => {
        const active = mode === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className="relative px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.3em]"
          >
            {active && (
              <motion.div
                layoutId="drive-mode-pill"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
                className={`absolute inset-0 rounded-full bg-linear-to-br border ${tones[m.id]}`}
              />
            )}
            <span
              className={cn(
                "relative",
                active ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              {m.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

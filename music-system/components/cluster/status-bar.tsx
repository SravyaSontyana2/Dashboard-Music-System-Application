"use client";

import { motion } from "framer-motion";
import {
  BatteryFull,
  Bluetooth,
  Cloud,
  Compass,
  Signal,
  Snowflake,
  Thermometer,
} from "lucide-react";

interface StatusBarProps {
  time: string;
  outsideTemp: number;
  range: number;
  gear: string;
  battery: number;
}

export function StatusBar({ time, outsideTemp, range, gear, battery }: StatusBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex items-center justify-between px-6 md:px-10 py-3 border-b border-white/5 bg-black/30 backdrop-blur-xl"
    >
      <div className="flex items-center gap-5 text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
        <div className="flex items-center gap-2">
          <Compass className="size-3.5 text-cyan-300/80" />
          <span>NE</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Cloud className="size-3.5 text-cyan-300/80" />
          <span>Clear</span>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="size-3.5 text-fuchsia-300/80" />
          <span>{outsideTemp}°C</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Snowflake className="size-3.5 text-cyan-300/80" />
          <span>21°C</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-200/90">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Mode</span>
          <span className="text-xs font-bold tracking-widest">SPORT+</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
            Gear
          </span>
          <span className="text-sm font-black text-white tabular-nums">{gear}</span>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
            Range
          </span>
          <span className="text-xs font-bold text-white tabular-nums">{range} km</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
        <Bluetooth className="size-3.5 text-cyan-300/80" />
        <Signal className="size-3.5 text-cyan-300/80" />
        <div className="flex items-center gap-1.5">
          <BatteryFull className="size-3.5 text-emerald-300/80" />
          <span className="tabular-nums">{battery}%</span>
        </div>
        <span className="text-white/85 text-sm font-mono tracking-[0.2em]">{time}</span>
      </div>
    </motion.div>
  );
}

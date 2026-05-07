"use client";

import { motion } from "framer-motion";
import { BatteryFull, Fuel, type LucideIcon } from "lucide-react";

interface FuelBatteryProps {
  fuel: number;
  battery: number;
}

export function FuelBattery({ fuel, battery }: FuelBatteryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-2 gap-2 w-full max-w-[280px]"
    >
      <Indicator
        icon={BatteryFull}
        label="Battery"
        value={battery}
        tone="cyan"
      />
      <Indicator icon={Fuel} label="Fuel" value={fuel} tone="fuchsia" />
    </motion.div>
  );
}

function Indicator({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  tone: "cyan" | "fuchsia";
}) {
  const palette =
    tone === "cyan"
      ? {
          border: "border-cyan-400/25",
          text: "text-cyan-200/90",
          bar: "from-cyan-400 to-cyan-200",
          glow: "shadow-[0_0_12px_rgba(34,211,238,0.6)]",
          ring: "shadow-[inset_0_0_24px_rgba(34,211,238,0.08)]",
        }
      : {
          border: "border-fuchsia-400/25",
          text: "text-fuchsia-200/90",
          bar: "from-fuchsia-400 to-pink-300",
          glow: "shadow-[0_0_12px_rgba(217,70,239,0.6)]",
          ring: "shadow-[inset_0_0_24px_rgba(217,70,239,0.08)]",
        };
  return (
    <div
      className={`rounded-xl border bg-white/[0.02] backdrop-blur-md p-3 ${palette.border} ${palette.ring}`}
    >
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1.5 ${palette.text}`}>
          <Icon className="size-3.5" />
          <span className="text-[9px] font-mono uppercase tracking-[0.3em]">
            {label}
          </span>
        </div>
        <span className="text-xs font-bold text-white tabular-nums">
          {value}%
        </span>
      </div>
      <div className="relative mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 rounded-full bg-linear-to-r ${palette.bar} ${palette.glow}`}
        />
      </div>
    </div>
  );
}

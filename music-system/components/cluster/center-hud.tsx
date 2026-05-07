"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Wind, Zap, type LucideIcon } from "lucide-react";

interface CenterHUDProps {
  time: string;
  date: string;
  modelName: string;
}

export function CenterHUD({ time, date, modelName }: CenterHUDProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center justify-center text-center px-4"
    >
      <div className="absolute -inset-x-4 top-2 flex justify-center pointer-events-none">
        <motion.div
          className="size-[300px] rounded-full border border-cyan-400/10"
          style={{
            background:
              "radial-gradient(circle, transparent 60%, rgba(34,211,238,0.06))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        />
      </div>
      <div className="absolute -inset-x-4 top-6 flex justify-center pointer-events-none">
        <motion.div
          className="size-[240px] rounded-full border border-fuchsia-400/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        />
      </div>

      <div className="relative">
        <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-cyan-300/70">
          {modelName}
        </div>
        <motion.h1
          initial={{ letterSpacing: "0.4em", opacity: 0 }}
          animate={{ letterSpacing: "0.05em", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mt-3 text-6xl md:text-7xl lg:text-8xl font-black tabular-nums text-white"
          style={{ textShadow: "0 0 40px rgba(34,211,238,0.45)" }}
        >
          {time}
        </motion.h1>
        <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.4em] text-white/50">
          {date}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-4 h-px w-40 origin-center bg-linear-to-r from-transparent via-cyan-400/70 to-transparent"
        />
      </div>

      <div className="relative mt-8 grid grid-cols-3 gap-2 w-full max-w-md">
        <HudStat icon={Zap} label="Power" value="240 kW" tone="cyan" />
        <HudStat icon={ShieldCheck} label="Auto Pilot" value="Ready" tone="fuchsia" />
        <HudStat icon={Wind} label="Drag" value="0.21 cd" tone="purple" />
      </div>
    </motion.div>
  );
}

function HudStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "cyan" | "fuchsia" | "purple";
}) {
  const accents = {
    cyan: "border-cyan-400/30 text-cyan-200/90 shadow-[inset_0_0_30px_rgba(34,211,238,0.07)]",
    fuchsia:
      "border-fuchsia-400/30 text-fuchsia-200/90 shadow-[inset_0_0_30px_rgba(217,70,239,0.07)]",
    purple:
      "border-purple-400/30 text-purple-200/90 shadow-[inset_0_0_30px_rgba(168,85,247,0.07)]",
  }[tone];
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-xl border bg-white/[0.02] backdrop-blur-md py-2 px-3 text-left ${accents}`}
    >
      <div className="flex items-center gap-1.5 text-white/50">
        <Icon className="size-3" />
        <span className="text-[9px] font-mono uppercase tracking-[0.3em]">
          {label}
        </span>
      </div>
      <div className="mt-1 text-sm font-bold tabular-nums">{value}</div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Car,
  Map,
  Mic,
  Phone,
  Settings,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";

const controls = [
  { id: "drive", icon: Car, label: "Drive" },
  { id: "nav", icon: Map, label: "Nav" },
  { id: "climate", icon: Sliders, label: "Climate" },
  { id: "voice", icon: Mic, label: "Voice", glow: true },
  { id: "phone", icon: Phone, label: "Phone" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export function BottomControls() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="w-full px-6 md:px-10 py-4 border-t border-white/5 bg-black/30 backdrop-blur-xl"
    >
      <div className="mx-auto flex items-center justify-center gap-2 md:gap-3 flex-wrap">
        {controls.map(({ id, icon: Icon, label, glow }) => (
          <motion.button
            key={id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className={cn(
              "group flex items-center gap-2 px-3 md:px-4 py-2 rounded-full",
              "border border-white/10 bg-white/[0.02] text-white/70",
              "hover:text-white hover:border-cyan-300/40 hover:bg-cyan-400/5",
              "transition-all duration-200",
              glow &&
                "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200 shadow-[0_0_20px_rgba(217,70,239,0.25)]"
            )}
          >
            <Icon className="size-4" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em]">
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

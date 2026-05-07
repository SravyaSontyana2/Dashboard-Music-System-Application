"use client";

import { motion } from "framer-motion";
import { LANGUAGES, type Lang } from "@/lib/musicData";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  active: Lang;
  onChange: (lang: Lang) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]"
    >
      <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-300/70 mr-2 shrink-0">
        Lang
      </span>
      {LANGUAGES.map((l) => {
        const isActive = active === l.id;
        return (
          <button
            key={l.id}
            type="button"
            onClick={() => onChange(l.id)}
            className="relative shrink-0 px-4 py-2 rounded-full transition"
          >
            {isActive && (
              <motion.div
                layoutId="lang-pill"
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="absolute inset-0 rounded-full border border-cyan-400/50 bg-linear-to-br from-cyan-400/25 via-fuchsia-400/15 to-purple-500/20 shadow-[0_0_22px_rgba(34,211,238,0.4)]"
              />
            )}
            <span className="relative flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-[0.3em]",
                  isActive ? "text-white" : "text-white/55"
                )}
              >
                {l.label}
              </span>
              <span
                className={cn(
                  "text-xs",
                  isActive ? "text-fuchsia-200/90" : "text-white/30"
                )}
              >
                {l.native}
              </span>
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

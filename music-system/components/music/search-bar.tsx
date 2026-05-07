"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
}

export function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full max-w-2xl"
    >
      <motion.div
        animate={{ opacity: focused ? 0.85 : 0.35 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-1 rounded-2xl blur-xl pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(34,211,238,0.5), rgba(217,70,239,0.5))",
        }}
      />
      <div
        className={`relative flex items-center gap-3 rounded-2xl border bg-white/[0.04] backdrop-blur-2xl px-5 py-3 transition-colors ${
          focused ? "border-cyan-400/60" : "border-white/10"
        }`}
      >
        <Search
          className={`size-4 transition-colors ${
            focused ? "text-cyan-300" : "text-white/50"
          }`}
        />
        <input
          type="text"
          placeholder="Search tracks, artists, albums…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit?.();
            } else if (e.key === "Escape") {
              onChange("");
            }
          }}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none font-mono tracking-wider"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="text-white/40 hover:text-white/80 transition"
          >
            <X className="size-4" />
          </button>
        )}
        <kbd className="hidden md:inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-white/50">
          {value ? "Enter" : "⌘K"}
        </kbd>
      </div>
    </motion.div>
  );
}

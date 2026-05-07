"use client";

import { motion } from "framer-motion";

interface EqualizerProps {
  active?: boolean;
  bars?: number;
  className?: string;
}

export function Equalizer({ active = true, bars = 20, className = "" }: EqualizerProps) {
  return (
    <div
      className={`flex items-end justify-center gap-[3px] h-12 ${className}`}
      aria-hidden
    >
      {Array.from({ length: bars }).map((_, i) => {
        const seed = (i * 37) % 11;
        const peak = 35 + seed * 6;
        const mid = 18 + ((i * 23) % 9) * 4;
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-linear-to-t from-cyan-500 via-cyan-300 to-fuchsia-300"
            style={{
              boxShadow: "0 0 8px rgba(34,211,238,0.5)",
            }}
            initial={{ height: 6 }}
            animate={
              active
                ? { height: [8, peak, mid, peak * 0.6, 12] }
                : { height: 6 }
            }
            transition={
              active
                ? {
                    duration: 0.9 + (i % 5) * 0.15,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: (i % 7) * 0.07,
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}

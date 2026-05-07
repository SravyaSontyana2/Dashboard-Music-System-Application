"use client";

import { motion } from "framer-motion";

interface SpeedometerProps {
  speed: number;
  maxSpeed?: number;
  unit?: string;
}

export function Speedometer({ speed, maxSpeed = 240, unit = "km/h" }: SpeedometerProps) {
  const progress = Math.min(Math.max(speed / maxSpeed, 0), 1);
  const arcLength = 518.36;
  const needleAngle = -135 + 270 * progress;

  const ticks = Array.from({ length: 13 }, (_, i) => {
    const angle = -135 + (270 / 12) * i;
    const isMajor = i % 2 === 0;
    return { angle, isMajor, value: Math.round((maxSpeed / 12) * i) };
  });

  return (
    <div className="relative w-[clamp(260px,30vw,360px)] aspect-square">
      <div className="absolute inset-2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl shadow-[inset_0_0_60px_rgba(34,211,238,0.08)]" />

      <svg viewBox="0 0 300 300" className="relative w-full h-full">
        <defs>
          <linearGradient id="speedGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a5f3fc" />
          </linearGradient>
          <filter id="speedGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M 72 228 A 110 110 0 1 1 228 228"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        <motion.path
          d="M 72 228 A 110 110 0 1 1 228 228"
          fill="none"
          stroke="url(#speedGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#speedGlow)"
          initial={{ strokeDasharray: `0 ${arcLength}` }}
          animate={{ strokeDasharray: `${arcLength * progress} ${arcLength}` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {ticks.map((tick, i) => {
          const rad = (tick.angle * Math.PI) / 180;
          const sin = Math.sin(rad);
          const cos = Math.cos(rad);
          const inner = tick.isMajor ? 78 : 88;
          const outer = 95;
          const x1 = 150 + sin * outer;
          const y1 = 150 - cos * outer;
          const x2 = 150 + sin * inner;
          const y2 = 150 - cos * inner;
          const lx = 150 + sin * 62;
          const ly = 150 - cos * 62;
          const reached = i / 12 <= progress;
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={reached ? "rgba(34,211,238,0.9)" : "rgba(255,255,255,0.25)"}
                strokeWidth={tick.isMajor ? 2 : 1}
                strokeLinecap="round"
              />
              {tick.isMajor && (
                <text
                  x={lx}
                  y={ly}
                  fill={reached ? "rgba(165,243,252,0.9)" : "rgba(255,255,255,0.4)"}
                  fontSize="10"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  fontWeight="600"
                >
                  {tick.value}
                </text>
              )}
            </g>
          );
        })}

        <circle cx="150" cy="150" r="12" fill="#0e7490" />
        <circle cx="150" cy="150" r="5" fill="#22d3ee" filter="url(#speedGlow)" />
      </svg>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ rotate: -135 }}
        animate={{ rotate: needleAngle }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="58"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#speedGlow)"
          />
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="170"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="mt-14 text-center">
          <div
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white tabular-nums leading-none tracking-tight"
            style={{ textShadow: "0 0 24px rgba(34,211,238,0.7)" }}
          >
            {Math.round(speed)}
          </div>
          <div className="mt-1 text-cyan-300/80 text-[10px] font-mono uppercase tracking-[0.4em]">
            {unit}
          </div>
        </div>
      </div>

      <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-cyan-400/30 backdrop-blur-md">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/90">
          Speed
        </span>
      </div>
    </div>
  );
}

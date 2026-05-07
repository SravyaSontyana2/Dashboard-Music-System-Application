"use client";

import { motion } from "framer-motion";

interface RPMGaugeProps {
  rpm: number;
  maxRpm?: number;
  redline?: number;
}

export function RPMGauge({ rpm, maxRpm = 8000, redline = 6500 }: RPMGaugeProps) {
  const progress = Math.min(Math.max(rpm / maxRpm, 0), 1);
  const arcLength = 518.36;
  const needleAngle = -135 + 270 * progress;
  const redlineProgress = redline / maxRpm;

  const ticks = Array.from({ length: 9 }, (_, i) => {
    const angle = -135 + (270 / 8) * i;
    const value = Math.round((maxRpm / 8) * i / 1000);
    const isRedline = (i / 8) >= redlineProgress;
    return { angle, value, isRedline };
  });

  return (
    <div className="relative w-[clamp(260px,30vw,360px)] aspect-square">
      <div className="absolute inset-2 rounded-full bg-fuchsia-500/10 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl shadow-[inset_0_0_60px_rgba(217,70,239,0.08)]" />

      <svg viewBox="0 0 300 300" className="relative w-full h-full">
        <defs>
          <linearGradient id="rpmGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id="rpmGlow" x="-50%" y="-50%" width="200%" height="200%">
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

        <path
          d="M 72 228 A 110 110 0 1 1 228 228"
          fill="none"
          stroke="rgba(244,63,94,0.18)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arcLength * (1 - redlineProgress)} ${arcLength}`}
          strokeDashoffset={`-${arcLength * redlineProgress}`}
        />

        <motion.path
          d="M 72 228 A 110 110 0 1 1 228 228"
          fill="none"
          stroke="url(#rpmGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#rpmGlow)"
          initial={{ strokeDasharray: `0 ${arcLength}` }}
          animate={{ strokeDasharray: `${arcLength * progress} ${arcLength}` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {ticks.map((tick, i) => {
          const rad = (tick.angle * Math.PI) / 180;
          const sin = Math.sin(rad);
          const cos = Math.cos(rad);
          const x1 = 150 + sin * 95;
          const y1 = 150 - cos * 95;
          const x2 = 150 + sin * 78;
          const y2 = 150 - cos * 78;
          const lx = 150 + sin * 62;
          const ly = 150 - cos * 62;
          const reached = i / 8 <= progress;
          const baseColor = tick.isRedline ? "rgba(244,63,94,0.95)" : "rgba(192,132,252,0.9)";
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={reached ? baseColor : "rgba(255,255,255,0.25)"}
                strokeWidth={2}
                strokeLinecap="round"
              />
              <text
                x={lx}
                y={ly}
                fill={
                  tick.isRedline
                    ? "rgba(252,165,165,0.95)"
                    : reached
                    ? "rgba(233,213,255,0.9)"
                    : "rgba(255,255,255,0.4)"
                }
                fontSize="11"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontWeight="600"
              >
                {tick.value}
              </text>
            </g>
          );
        })}

        <circle cx="150" cy="150" r="12" fill="#6b21a8" />
        <circle cx="150" cy="150" r="5" fill="#c084fc" filter="url(#rpmGlow)" />
      </svg>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ rotate: -135 }}
        animate={{ rotate: needleAngle }}
        transition={{ type: "spring", stiffness: 110, damping: 12 }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="58"
            stroke={rpm >= redline ? "#fb7185" : "#c084fc"}
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#rpmGlow)"
          />
          <line
            x1="150"
            y1="150"
            x2="150"
            y2="170"
            stroke="#c084fc"
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
            style={{
              textShadow:
                rpm >= redline
                  ? "0 0 24px rgba(251,113,133,0.8)"
                  : "0 0 24px rgba(192,132,252,0.7)",
            }}
          >
            {(rpm / 1000).toFixed(1)}
          </div>
          <div className="mt-1 text-fuchsia-300/80 text-[10px] font-mono uppercase tracking-[0.4em]">
            x1000 rpm
          </div>
        </div>
      </div>

      <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-fuchsia-400/30 backdrop-blur-md">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-fuchsia-300/90">
          Tach
        </span>
      </div>
    </div>
  );
}

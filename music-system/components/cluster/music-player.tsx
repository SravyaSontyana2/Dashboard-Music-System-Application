"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Equalizer } from "./equalizer";

interface Track {
  title: string;
  artist: string;
  album: string;
  duration: number;
  hue: number;
}

interface MusicPlayerProps {
  track: Track;
  progress: number;
  isPlaying: boolean;
  volume: number;
  onPlayToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (value: number) => void;
  onVolume: (value: number) => void;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function MusicPlayer({
  track,
  progress,
  isPlaying,
  volume,
  onPlayToggle,
  onNext,
  onPrev,
  onSeek,
  onVolume,
}: MusicPlayerProps) {
  const elapsed = (progress / 100) * track.duration;
  const remaining = track.duration - elapsed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[520px] mx-auto"
    >
      <div className="absolute -inset-6 rounded-[2rem] bg-linear-to-br from-cyan-500/15 via-transparent to-fuchsia-500/15 blur-2xl pointer-events-none" />

      <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 shadow-[0_20px_80px_-20px_rgba(34,211,238,0.25)]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-300/80">
              Now Playing
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <Shuffle className="size-3.5" />
            <Repeat className="size-3.5" />
            <ListMusic className="size-3.5" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <AlbumDisc hue={track.hue} isPlaying={isPlaying} />

          <AnimatePresence mode="wait">
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-6 text-center"
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-white tracking-tight"
                style={{ textShadow: "0 0 24px rgba(34,211,238,0.25)" }}
              >
                {track.title}
              </h2>
              <p className="mt-1 text-sm text-white/60">
                {track.artist} <span className="text-white/30">·</span>{" "}
                <span className="text-fuchsia-300/80">{track.album}</span>
              </p>
            </motion.div>
          </AnimatePresence>

          <Equalizer active={isPlaying} bars={24} className="mt-5" />

          <div className="w-full mt-5">
            <ProgressBar value={progress} onChange={onSeek} />
            <div className="flex justify-between mt-2 text-[11px] font-mono text-white/50 tabular-nums">
              <span>{formatTime(elapsed)}</span>
              <span>-{formatTime(remaining)}</span>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-6">
            <button
              type="button"
              className="size-10 grid place-items-center rounded-full text-white/70 hover:text-white hover:bg-white/5 transition"
              aria-label="Like"
            >
              <Heart className="size-4" />
            </button>

            <button
              type="button"
              onClick={onPrev}
              className="size-12 grid place-items-center rounded-full text-white/85 hover:text-white hover:bg-white/5 transition"
              aria-label="Previous"
            >
              <SkipBack className="size-5 fill-current" />
            </button>

            <motion.button
              type="button"
              onClick={onPlayToggle}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "size-16 grid place-items-center rounded-full",
                "bg-linear-to-br from-cyan-400 to-fuchsia-500 text-black",
                "shadow-[0_0_30px_rgba(34,211,238,0.55),0_0_60px_rgba(217,70,239,0.35)]",
                "ring-1 ring-white/30"
              )}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="size-6 fill-current" />
              ) : (
                <Play className="size-6 fill-current translate-x-[1px]" />
              )}
            </motion.button>

            <button
              type="button"
              onClick={onNext}
              className="size-12 grid place-items-center rounded-full text-white/85 hover:text-white hover:bg-white/5 transition"
              aria-label="Next"
            >
              <SkipForward className="size-5 fill-current" />
            </button>

            <div className="size-10 grid place-items-center rounded-full text-white/70">
              <Volume2 className="size-4" />
            </div>
          </div>

          <div className="w-full mt-5 flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
              Vol
            </span>
            <ProgressBar value={volume} onChange={onVolume} thin />
            <span className="text-[10px] font-mono text-white/60 tabular-nums w-7 text-right">
              {Math.round(volume)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AlbumDisc({ hue, isPlaying }: { hue: number; isPlaying: boolean }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70"
        style={{
          background: `conic-gradient(from 0deg, hsl(${hue} 90% 60%), hsl(${
            (hue + 60) % 360
          } 90% 60%), hsl(${(hue + 180) % 360} 90% 60%), hsl(${hue} 90% 60%))`,
        }}
      />
      <div
        className={cn(
          "relative size-44 md:size-52 rounded-full overflow-hidden",
          "ring-1 ring-white/20 shadow-[0_0_40px_rgba(34,211,238,0.35)]",
          isPlaying ? "[animation:spin_14s_linear_infinite]" : "[animation:spin_14s_linear_infinite] [animation-play-state:paused]"
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 200deg, hsl(${hue} 80% 55%), hsl(${
              (hue + 90) % 360
            } 80% 50%), hsl(${(hue + 200) % 360} 90% 55%), hsl(${hue} 80% 55%))`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0_2px,transparent_2px_5px)]" />
        <div className="absolute inset-0 grid place-items-center">
          <div className="size-10 rounded-full bg-black/80 ring-1 ring-white/15 grid place-items-center">
            <div className="size-2 rounded-full bg-white/60" />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan-300/30" />
    </div>
  );
}

function ProgressBar({
  value,
  onChange,
  thin = false,
}: {
  value: number;
  onChange: (v: number) => void;
  thin?: boolean;
}) {
  return (
    <div className={cn("relative w-full group", thin ? "h-1" : "h-1.5")}>
      <div className="absolute inset-0 rounded-full bg-white/10" />
      <div
        className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-cyan-400 to-fuchsia-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
        style={{ width: `${value}%` }}
      />
      <input
        type="range"
        min={0}
        max={100}
        step={0.1}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label="Progress"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] opacity-0 group-hover:opacity-100 transition pointer-events-none"
        style={{ left: `calc(${value}% - 6px)` }}
      />
    </div>
  );
}

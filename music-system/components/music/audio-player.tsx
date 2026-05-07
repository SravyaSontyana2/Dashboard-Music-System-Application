"use client";

import { motion } from "framer-motion";
import {
  Bookmark,
  Heart,
  Pause,
  Play,
  Repeat,
  Rewind,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { ReactNode } from "react";
import { Equalizer } from "@/components/cluster/equalizer";
import type { Album, Song } from "@/lib/musicData";
import { cn } from "@/lib/utils";
import { AlbumCover } from "./album-cover";

interface AudioPlayerProps {
  song: Song | null;
  album: Album | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  shuffle: boolean;
  repeat: boolean;
  volume: number;
  isFavorite: boolean;
  isLoading: boolean;
  onPlayToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onRewind: () => void;
  onSeek: (sec: number) => void;
  onVolume: (v: number) => void;
  onShuffle: () => void;
  onRepeat: () => void;
  onFavorite: () => void;
  onSave: () => void;
}

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function AudioPlayer({
  song,
  album,
  currentTime,
  duration,
  isPlaying,
  shuffle,
  repeat,
  volume,
  isFavorite,
  isLoading,
  onPlayToggle,
  onNext,
  onPrev,
  onRewind,
  onSeek,
  onVolume,
  onShuffle,
  onRepeat,
  onFavorite,
  onSave,
}: AudioPlayerProps) {
  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
  const hue = album?.hue ?? 195;
  const seekRatio = duration > 0 ? Math.max(0, Math.min(1, currentTime / duration)) : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full"
    >
      <div className="absolute -inset-2 rounded-3xl bg-linear-to-r from-cyan-500/20 via-transparent to-fuchsia-500/20 blur-2xl pointer-events-none" />
      <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.35)]">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-60"
              style={{
                background: `conic-gradient(from 0deg, hsl(${hue} 90% 60%), hsl(${
                  (hue + 180) % 360
                } 90% 60%), hsl(${hue} 90% 60%))`,
              }}
            />
            <div
              className={cn(
                "relative size-16 md:size-20 rounded-full overflow-hidden ring-1 ring-white/20",
                song && isPlaying
                  ? "[animation:spin_14s_linear_infinite]"
                  : "[animation:spin_14s_linear_infinite] [animation-play-state:paused]"
              )}
            >
              {album ? (
                <AlbumCover
                  image={album.image}
                  alt={album.title}
                  hue={album.hue}
                  variant="circular"
                  size="sm"
                  className="!ring-0 size-full"
                />
              ) : (
                <div className="size-full bg-white/5" />
              )}
            </div>
          </div>

          <div className="min-w-0 max-w-[220px]">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isPlaying
                    ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse"
                    : "bg-white/30"
                )}
              />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/80">
                {isLoading ? "Buffering…" : song ? "Now Playing" : "Idle"}
              </span>
            </div>
            <div
              className="mt-0.5 text-base md:text-lg font-bold text-white truncate"
              style={{ textShadow: "0 0 18px rgba(34,211,238,0.3)" }}
            >
              {song?.title ?? "Select a track"}
            </div>
            <div className="text-xs text-white/55 truncate">
              {song ? (
                <>
                  {song.artist}
                  {album && (
                    <>
                      {" "}
                      <span className="text-white/30">·</span>{" "}
                      <span className="text-fuchsia-300/70">{album.title}</span>
                    </>
                  )}
                </>
              ) : (
                "—"
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2.5 w-full">
          <div className="flex items-center gap-1 md:gap-2">
            <ControlBtn onClick={onShuffle} active={shuffle} label="Shuffle">
              <Shuffle className="size-4" />
            </ControlBtn>
            <ControlBtn onClick={onPrev} label="Previous">
              <SkipBack className="size-4 fill-current" />
            </ControlBtn>
            <ControlBtn onClick={onRewind} label="Rewind 10s">
              <Rewind className="size-4 fill-current" />
            </ControlBtn>
            <motion.button
              type="button"
              onClick={onPlayToggle}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={!song}
              className="size-12 grid place-items-center rounded-full bg-linear-to-br from-cyan-400 to-fuchsia-500 text-black shadow-[0_0_30px_rgba(34,211,238,0.55),0_0_60px_rgba(217,70,239,0.35)] ring-1 ring-white/30 disabled:opacity-40 disabled:shadow-none"
            >
              {isPlaying ? (
                <Pause className="size-5 fill-current" />
              ) : (
                <Play className="size-5 fill-current translate-x-[1px]" />
              )}
            </motion.button>
            <ControlBtn onClick={onNext} label="Next">
              <SkipForward className="size-4 fill-current" />
            </ControlBtn>
            <ControlBtn onClick={onRepeat} active={repeat} label="Repeat">
              <Repeat className="size-4" />
            </ControlBtn>
          </div>

          <div className="w-full flex items-center gap-3 px-2">
            <span className="text-[10px] font-mono text-white/50 tabular-nums w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <SeekBar
              value={seekRatio}
              onChange={(p) => onSeek(p * (duration || 0))}
              disabled={!song}
            />
            <span className="text-[10px] font-mono text-white/50 tabular-nums w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0 justify-end">
          <Equalizer active={isPlaying} bars={14} className="hidden md:flex !h-10" />
          <div className="hidden md:flex items-center gap-2 w-28">
            <VolumeIcon className="size-4 text-white/50 shrink-0" />
            <SeekBar value={volume} onChange={onVolume} thin tone="purple" />
          </div>
          <button
            type="button"
            onClick={onFavorite}
            aria-label="Favorite"
            aria-pressed={isFavorite}
            disabled={!song}
            className={cn(
              "p-2 rounded-full transition disabled:opacity-40",
              isFavorite
                ? "text-rose-300 bg-rose-500/10 shadow-[0_0_14px_rgba(244,63,94,0.45)]"
                : "text-white/60 hover:text-white"
            )}
          >
            <Heart className={cn("size-4", isFavorite && "fill-current")} />
          </button>
          <motion.button
            type="button"
            onClick={onSave}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            disabled={!song}
            className="flex items-center gap-2 px-3 py-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200 hover:bg-fuchsia-500/20 transition shadow-[0_0_18px_rgba(217,70,239,0.3)] disabled:opacity-40"
          >
            <Bookmark className="size-4" />
            <span className="hidden lg:inline text-[11px] font-mono uppercase tracking-[0.25em]">
              Save
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ControlBtn({
  children,
  onClick,
  active,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "size-9 grid place-items-center rounded-full transition-colors",
        active
          ? "text-cyan-300 bg-cyan-400/10 shadow-[0_0_14px_rgba(34,211,238,0.45)]"
          : "text-white/70 hover:text-white hover:bg-white/5"
      )}
    >
      {children}
    </motion.button>
  );
}

function SeekBar({
  value,
  onChange,
  thin = false,
  tone = "cyan",
  disabled = false,
}: {
  value: number;
  onChange: (v: number) => void;
  thin?: boolean;
  tone?: "cyan" | "purple";
  disabled?: boolean;
}) {
  const fill =
    tone === "purple"
      ? "from-fuchsia-400 to-purple-400 shadow-[0_0_10px_rgba(217,70,239,0.7)]"
      : "from-cyan-400 to-fuchsia-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]";
  const clamped = Math.max(0, Math.min(1, value));
  return (
    <div className={cn("relative w-full group", thin ? "h-1" : "h-1.5")}>
      <div className="absolute inset-0 rounded-full bg-white/10" />
      <div
        className={cn("absolute inset-y-0 left-0 rounded-full bg-linear-to-r", fill)}
        style={{ width: `${clamped * 100}%` }}
      />
      <input
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={clamped}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        aria-label="Seek"
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] opacity-0 group-hover:opacity-100 transition pointer-events-none"
        style={{ left: `calc(${clamped * 100}% - 6px)` }}
      />
    </div>
  );
}

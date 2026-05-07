"use client";

import { motion } from "framer-motion";
import { Bookmark, Clock, Heart, Pause, Play } from "lucide-react";
import type { Album, Song } from "@/lib/musicData";
import { cn } from "@/lib/utils";
import { AlbumCover } from "./album-cover";

interface SongListProps {
  album: Album;
  currentSongId: string | null;
  isPlaying: boolean;
  favorites: Set<string>;
  onPlaySong: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  onSaveSong: (song: Song) => void;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function SongList({
  album,
  currentSongId,
  isPlaying,
  favorites,
  onPlaySong,
  onToggleFavorite,
  onSaveSong,
}: SongListProps) {
  return (
    <motion.div
      key={album.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
    >
      <div className="flex items-center gap-4 px-5 py-4 border-b border-white/5 bg-linear-to-r from-cyan-400/5 via-transparent to-fuchsia-400/5">
        <AlbumCover image={album.image} alt={album.title} hue={album.hue} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-cyan-300/70">
              {album.lang}
            </span>
            <span className="size-1 rounded-full bg-white/30" />
            <span className="text-[10px] font-mono text-white/40">
              {album.year}
            </span>
          </div>
          <div className="mt-0.5 text-base md:text-lg font-bold text-white truncate">
            {album.title}
          </div>
          <div className="text-xs text-white/55 truncate">
            {album.artist} · {album.songs.length} tracks
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 text-white/40 text-[11px] font-mono">
          <Clock className="size-3" />
          <span>
            {formatTime(album.songs.reduce((acc, s) => acc + s.duration, 0))}
          </span>
        </div>
      </div>

      <div className="grid gap-1 p-2">
        {album.songs.map((song, i) => {
          const isCurrent = currentSongId === song.id;
          const isFav = favorites.has(song.id);
          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ x: 2 }}
              className={cn(
                "group flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors",
                isCurrent
                  ? "border-cyan-400/40 bg-cyan-400/5 shadow-[inset_0_0_16px_rgba(34,211,238,0.12)]"
                  : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
              )}
            >
              <span className="hidden sm:block w-7 text-center font-mono text-xs text-white/40 tabular-nums">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => onPlaySong(song)}
                aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
                className={cn(
                  "relative size-9 shrink-0 rounded-md overflow-hidden ring-1 transition",
                  isCurrent
                    ? "ring-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.4)]"
                    : "ring-white/10"
                )}
              >
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 size-full object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 grid place-items-center bg-black/55 backdrop-blur-[1px] transition",
                    isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  {isCurrent && isPlaying ? (
                    <Pause className="size-3.5 text-white fill-current" />
                  ) : (
                    <Play className="size-3.5 text-white fill-current translate-x-[1px]" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onPlaySong(song)}
                className="flex-1 min-w-0 text-left"
              >
                <div
                  className={cn(
                    "text-sm font-semibold truncate",
                    isCurrent ? "text-cyan-100" : "text-white"
                  )}
                >
                  {song.title}
                </div>
                <div className="text-[11px] text-white/50 truncate">
                  {song.artist}
                </div>
              </button>

              {isCurrent && isPlaying && (
                <span className="hidden sm:flex items-end gap-0.5 h-4">
                  {[0, 1, 2].map((j) => (
                    <motion.span
                      key={j}
                      className="w-[3px] rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(34,211,238,0.9)]"
                      animate={{ height: ["20%", "100%", "40%", "80%", "30%"] }}
                      transition={{
                        duration: 0.8 + j * 0.15,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: j * 0.1,
                      }}
                    />
                  ))}
                </span>
              )}

              <span className="hidden sm:inline text-[11px] font-mono text-white/40 tabular-nums w-10 text-right">
                {formatTime(song.duration)}
              </span>

              <button
                type="button"
                onClick={() => onToggleFavorite(song.id)}
                aria-label="Favorite"
                aria-pressed={isFav}
                className={cn(
                  "p-1.5 rounded-full transition",
                  isFav
                    ? "text-rose-300 bg-rose-500/10 shadow-[0_0_10px_rgba(244,63,94,0.4)]"
                    : "text-white/40 hover:text-white/80"
                )}
              >
                <Heart className={cn("size-3.5", isFav && "fill-current")} />
              </button>

              <button
                type="button"
                onClick={() => onSaveSong(song)}
                aria-label="Save to playlist"
                className="p-1.5 rounded-full text-white/40 hover:text-cyan-300 hover:bg-cyan-400/10 transition"
              >
                <Bookmark className="size-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

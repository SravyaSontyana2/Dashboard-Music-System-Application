"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Album } from "@/lib/musicData";
import { cn } from "@/lib/utils";
import { AlbumCover } from "./album-cover";

interface AlbumCardProps {
  album: Album;
  active?: boolean;
  onClick?: () => void;
}

export function AlbumCard({ album, active, onClick }: AlbumCardProps) {
  const totalSeconds = album.songs.reduce((acc, s) => acc + s.duration, 0);
  const totalMinutes = Math.round(totalSeconds / 60);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border p-3 text-left backdrop-blur-xl transition-colors",
        active
          ? "border-cyan-400/50 bg-cyan-400/5 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
          : "border-white/10 bg-white/[0.02] hover:border-cyan-400/30"
      )}
    >
      <div className="relative">
        <AlbumCover
          image={album.image}
          alt={album.title}
          hue={album.hue}
          size="md"
        />

        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md ring-1 ring-white/15">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/85">
            {album.lang}
          </span>
        </div>

        <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl bg-black/35">
          <motion.div
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
            className="size-12 rounded-full bg-white/20 backdrop-blur-md grid place-items-center ring-1 ring-white/30 shadow-[0_0_24px_rgba(34,211,238,0.5)]"
          >
            <Play className="size-5 text-white fill-current translate-x-[1px]" />
          </motion.div>
        </div>

        {active && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md ring-1 ring-cyan-300/50">
            <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-cyan-200">
              Playing
            </span>
          </div>
        )}
      </div>

      <div className="px-1 w-40 md:w-44">
        <div className="text-sm font-bold text-white truncate">{album.title}</div>
        <div className="text-xs text-white/50 truncate">{album.artist}</div>
        <div className="mt-1 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
          <span>{album.songs.length} tracks</span>
          <span className="size-0.5 rounded-full bg-white/30" />
          <span>{totalMinutes}m</span>
          <span className="size-0.5 rounded-full bg-white/30" />
          <span>{album.year}</span>
        </div>
      </div>
    </motion.button>
  );
}

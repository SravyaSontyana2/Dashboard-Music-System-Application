"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ListMusic, Play, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Playlist, Song } from "@/lib/musicData";
import { cn } from "@/lib/utils";

interface PlaylistManagerProps {
  open: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onCreate: (name: string) => void;
  onRemovePlaylist: (id: string) => void;
  onPlaySong: (song: Song) => void;
  onRemoveSong: (playlistId: string, songId: string) => void;
}

export function PlaylistManager({
  open,
  onClose,
  playlists,
  onCreate,
  onRemovePlaylist,
  onPlaySong,
  onRemoveSong,
}: PlaylistManagerProps) {
  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const active =
    playlists.find((p) => p.id === activeId) ?? playlists[0] ?? null;

  const submit = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-40">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-[#0a0c14]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_60px_rgba(34,211,238,0.25)] flex flex-col"
          >
            <div className="absolute inset-y-0 left-0 w-px bg-linear-to-b from-cyan-400/0 via-cyan-400/60 to-fuchsia-400/0" />

            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ListMusic className="size-4 text-cyan-300" />
                <h3 className="text-sm font-bold text-white tracking-wider uppercase">
                  My Playlists
                </h3>
              </div>
              <button
                onClick={onClose}
                type="button"
                aria-label="Close"
                className="text-white/50 hover:text-white transition"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="px-5 py-4 border-b border-white/5">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
                Create New
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  placeholder="Road Trip…"
                  className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
                />
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={submit}
                  disabled={!name.trim()}
                  className="px-3 py-2 rounded-lg bg-linear-to-br from-cyan-400 to-fuchsia-500 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.5)] disabled:opacity-40 disabled:shadow-none"
                  aria-label="Create playlist"
                >
                  <Plus className="size-4" />
                </motion.button>
              </div>
            </div>

            <div className="px-5 py-4 border-b border-white/5">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
                Playlists
              </div>
              <div className="grid gap-1.5 max-h-40 overflow-y-auto pr-1">
                {playlists.length === 0 ? (
                  <div className="text-xs text-white/40 italic px-1 py-2">
                    No playlists yet — create one above
                  </div>
                ) : (
                  playlists.map((p) => {
                    const isActive = (active?.id ?? null) === p.id;
                    return (
                      <div
                        key={p.id}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-lg border px-3 py-2 transition",
                          isActive
                            ? "border-cyan-400/40 bg-cyan-400/5"
                            : "border-white/5 bg-white/[0.02] hover:border-white/15"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveId(p.id)}
                          className="flex-1 min-w-0 text-left"
                        >
                          <div className="text-sm font-semibold text-white truncate">
                            {p.name}
                          </div>
                          <div className="text-[10px] font-mono text-white/40">
                            {p.songs.length} tracks
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onRemovePlaylist(p.id);
                            if (activeId === p.id) setActiveId(null);
                          }}
                          aria-label="Delete playlist"
                          className="text-white/30 hover:text-rose-300 p-1 rounded transition"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {active ? (
                <>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-fuchsia-300/70 mb-2">
                    Tracks · {active.name}
                  </div>
                  <div className="grid gap-1">
                    {active.songs.length === 0 ? (
                      <div className="text-xs text-white/40 italic px-1 py-2">
                        No tracks yet — save some from the player
                      </div>
                    ) : (
                      active.songs.map((s, i) => (
                        <motion.div
                          key={`${s.id}-${i}`}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 hover:bg-white/[0.04] transition"
                        >
                          <button
                            type="button"
                            onClick={() => onPlaySong(s)}
                            aria-label={`Play ${s.title}`}
                            className="flex items-center gap-3 flex-1 min-w-0 text-left"
                          >
                            <div className="size-7 grid place-items-center rounded-md bg-linear-to-br from-cyan-500 to-fuchsia-500 text-black font-bold text-[10px] tabular-nums shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                              <Play className="size-3 fill-current translate-x-[1px]" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-white truncate">
                                {s.title}
                              </div>
                              <div className="text-[11px] text-white/50 truncate">
                                {s.artist}
                              </div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveSong(active.id, s.id)}
                            aria-label="Remove from playlist"
                            className="text-white/30 hover:text-rose-300 p-1 transition"
                          >
                            <X className="size-3.5" />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

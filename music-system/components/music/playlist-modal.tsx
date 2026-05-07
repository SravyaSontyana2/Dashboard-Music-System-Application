"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Disc3, Plus, X } from "lucide-react";
import { useState } from "react";
import type { Playlist } from "@/lib/musicData";

interface PlaylistModalProps {
  open: boolean;
  onClose: () => void;
  playlists: Playlist[];
  onCreate: (name: string) => void;
  onAddToExisting: (id: string) => void;
  songTitle: string;
}

export function PlaylistModal({
  open,
  onClose,
  playlists,
  onCreate,
  onAddToExisting,
  songTitle,
}: PlaylistModalProps) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0c14]/90 backdrop-blur-2xl shadow-[0_30px_100px_-20px_rgba(34,211,238,0.45)]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/60 to-transparent" />

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Disc3 className="size-4 text-cyan-300" />
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Save to Playlist
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-white/50 hover:text-white transition"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
                Adding
              </div>
              <div className="text-base font-semibold text-white truncate">
                {songTitle}
              </div>

              <div className="mt-5">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
                  New Playlist
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    placeholder="Night Cruise…"
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none transition"
                  />
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCreate}
                    disabled={!name.trim()}
                    className="flex items-center gap-1.5 rounded-lg bg-linear-to-br from-cyan-400 to-fuchsia-500 px-4 py-2 text-sm font-bold text-black shadow-[0_0_20px_rgba(34,211,238,0.5)] disabled:opacity-40 disabled:shadow-none transition"
                  >
                    <Plus className="size-4" />
                    Create
                  </motion.button>
                </div>
              </div>

              {playlists.length > 0 && (
                <div className="mt-6">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">
                    Your Playlists
                  </div>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {playlists.map((p) => (
                      <motion.button
                        key={p.id}
                        type="button"
                        whileHover={{ x: 2 }}
                        onClick={() => onAddToExisting(p.id)}
                        className="w-full flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-left hover:border-cyan-400/30 hover:bg-cyan-400/5 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-md bg-linear-to-br from-cyan-500 to-fuchsia-500 grid place-items-center shadow-[0_0_12px_rgba(34,211,238,0.4)]">
                            <Disc3 className="size-4 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {p.name}
                            </div>
                            <div className="text-[10px] font-mono text-white/40">
                              {p.songs.length} tracks
                            </div>
                          </div>
                        </div>
                        <Plus className="size-4 text-white/40" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Heart, Library, Pause, Play, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ALBUMS,
  albumsForLang,
  findAlbum,
  searchSongs,
  type Album,
  type Lang,
  type Playlist,
  type Song,
} from "@/lib/musicData";
import { lookupPreview } from "@/lib/itunesLookup";
import { cn } from "@/lib/utils";
import { AlbumCard } from "./album-card";
import { AudioPlayer } from "./audio-player";
import { CategoryTabs } from "./category-tabs";
import { PlaylistManager } from "./playlist-manager";
import { PlaylistModal } from "./playlist-modal";
import { SearchBar } from "./search-bar";
import { SongList } from "./song-list";

interface MusicScreenProps {
  onExit: () => void;
}

function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export function MusicScreen({ onExit }: MusicScreenProps) {
  const [search, setSearch] = useState("");
  const [activeLang, setActiveLang] = useState<Lang>("english");

  const langAlbums = useMemo(() => albumsForLang(activeLang), [activeLang]);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(
    langAlbums[0]?.id ?? ALBUMS[0].id
  );

  useEffect(() => {
    if (!langAlbums.find((a) => a.id === selectedAlbumId)) {
      setSelectedAlbumId(langAlbums[0]?.id ?? ALBUMS[0].id);
    }
  }, [langAlbums, selectedAlbumId]);

  const selectedAlbum: Album =
    findAlbum(selectedAlbumId) ?? langAlbums[0] ?? ALBUMS[0];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { id: "p1", name: "Night Cruise", songs: [] },
  ]);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [pendingSaveSong, setPendingSaveSong] = useState<Song | null>(null);
  const [managerOpen, setManagerOpen] = useState(false);
  const [resolvedAudio, setResolvedAudio] = useState<Record<string, string>>({});
  const [unresolvedIds, setUnresolvedIds] = useState<Set<string>>(new Set());

  const audioSrc = currentSong
    ? currentSong.audio || resolvedAudio[currentSong.id]
    : undefined;
  const isUnresolved = !!currentSong && unresolvedIds.has(currentSong.id);

  const trimmedSearch = search.trim();
  const searchActive = trimmedSearch.length > 0;
  const searchResults = useMemo<Song[]>(
    () => (searchActive ? searchSongs(trimmedSearch) : []),
    [searchActive, trimmedSearch]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;
    if (!audioSrc) {
      audio.pause();
      return;
    }
    if (isPlaying) {
      const p = audio.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => setIsPlaying(false));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong, audioSrc]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const queue = currentAlbum?.songs ?? selectedAlbum.songs;
  const currentIndex = currentSong
    ? queue.findIndex((s) => s.id === currentSong.id)
    : -1;

  const ensureAudio = async (song: Song) => {
    if (song.audio || resolvedAudio[song.id]) return;
    const url = await lookupPreview(song.title, song.artist);
    if (url) {
      setResolvedAudio((prev) => ({ ...prev, [song.id]: url }));
      setUnresolvedIds((prev) => {
        if (!prev.has(song.id)) return prev;
        const next = new Set(prev);
        next.delete(song.id);
        return next;
      });
    } else {
      setUnresolvedIds((prev) => {
        const next = new Set(prev);
        next.add(song.id);
        return next;
      });
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handlePlaySong = (song: Song) => {
    const album = findAlbum(song.albumId) ?? selectedAlbum;
    if (currentSong?.id === song.id) {
      setIsPlaying((p) => !p);
      return;
    }
    setCurrentSong(song);
    setCurrentAlbum(album);
    setSelectedAlbumId(album.id);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setIsPlaying(true);
    void ensureAudio(song);
  };

  const handlePlayToggle = () => {
    if (!currentSong) {
      const first = selectedAlbum.songs[0];
      if (first) handlePlaySong(first);
      return;
    }
    setIsPlaying((p) => !p);
  };

  const handleNext = () => {
    if (queue.length === 0) return;
    let nextIndex: number;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
      if (queue.length > 1 && nextIndex === currentIndex) {
        nextIndex = (nextIndex + 1) % queue.length;
      }
    } else {
      nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % queue.length;
    }
    handlePlaySong(queue[nextIndex]);
  };

  const handlePrev = () => {
    if (queue.length === 0) return;
    if (currentTime > 4 && audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    const prevIndex =
      currentIndex < 0 ? 0 : (currentIndex - 1 + queue.length) % queue.length;
    handlePlaySong(queue[prevIndex]);
  };

  const handleRewind = () => {
    if (!audioRef.current) return;
    const t = Math.max(0, audioRef.current.currentTime - 10);
    audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleSeek = (sec: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = sec;
    setCurrentTime(sec);
  };

  const toggleFavorite = (songId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(songId)) next.delete(songId);
      else next.add(songId);
      return next;
    });
  };

  const openSaveDialog = (song: Song) => {
    setPendingSaveSong(song);
    setSaveModalOpen(true);
  };
  const closeSaveDialog = () => {
    setSaveModalOpen(false);
    setPendingSaveSong(null);
  };

  const createPlaylist = (name: string) => {
    const newId = `p${Date.now()}`;
    const songs = pendingSaveSong ? [pendingSaveSong] : [];
    setPlaylists((ps) => [...ps, { id: newId, name, songs }]);
    closeSaveDialog();
  };

  const addToPlaylist = (id: string) => {
    if (!pendingSaveSong) {
      closeSaveDialog();
      return;
    }
    const song = pendingSaveSong;
    setPlaylists((ps) =>
      ps.map((p) =>
        p.id === id && !p.songs.some((s) => s.id === song.id)
          ? { ...p, songs: [...p.songs, song] }
          : p
      )
    );
    closeSaveDialog();
  };

  const removePlaylist = (id: string) => {
    setPlaylists((ps) => ps.filter((p) => p.id !== id));
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists((ps) =>
      ps.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    );
  };

  const onAudioEnded = () => {
    if (repeat && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      return;
    }
    handleNext();
  };

  const handleSearchSubmit = () => {
    if (typeof document !== "undefined") {
      const active = document.activeElement;
      if (active instanceof HTMLElement) active.blur();
    }
  };

  return (
    <motion.div
      key="music-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-screen flex-col"
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setIsLoading(false);
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onEnded={onAudioEnded}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
        }}
      />

      <div className="flex items-center gap-3 md:gap-4 px-6 md:px-10 py-4 border-b border-white/5 bg-black/30 backdrop-blur-xl">
        <motion.button
          type="button"
          onClick={onExit}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-cyan-400/30 transition shrink-0"
        >
          <ChevronLeft className="size-4" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em]">
            Cluster
          </span>
        </motion.button>
        <SearchBar
          value={search}
          onChange={setSearch}
          onSubmit={handleSearchSubmit}
        />
        <motion.button
          type="button"
          onClick={() => setManagerOpen(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/5 text-fuchsia-200 hover:bg-fuchsia-500/15 transition shrink-0"
        >
          <Library className="size-4" />
          <span className="hidden md:inline text-[11px] font-mono uppercase tracking-[0.25em]">
            Library
          </span>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {searchActive ? (
          <motion.div
            key="search-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 px-6 md:px-10 py-6 overflow-y-auto"
          >
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-300/80">
                  <Search className="size-3" />
                  Results
                </div>
                <h2 className="mt-1 text-2xl md:text-3xl font-bold text-white">
                  “{trimmedSearch}”
                </h2>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">
                {searchResults.length}{" "}
                {searchResults.length === 1 ? "match" : "matches"}
              </div>
            </div>

            {searchResults.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl px-6 py-16 text-center">
                <div className="text-sm text-white/50">
                  No tracks match{" "}
                  <span className="text-white">“{trimmedSearch}”</span>
                </div>
                <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.3em] text-white/30">
                  Try a different keyword or press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/50">
                    Esc
                  </kbd>{" "}
                  to clear
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden">
                <div className="grid gap-1 p-2">
                  {searchResults.map((song, i) => {
                    const album = findAlbum(song.albumId);
                    const isCurrent = currentSong?.id === song.id;
                    const isFav = favorites.has(song.id);
                    return (
                      <motion.div
                        key={song.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.02 }}
                        whileHover={{ x: 2 }}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors",
                          isCurrent
                            ? "border-cyan-400/40 bg-cyan-400/5 shadow-[inset_0_0_16px_rgba(34,211,238,0.12)]"
                            : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => handlePlaySong(song)}
                          aria-label={
                            isCurrent && isPlaying ? "Pause" : "Play"
                          }
                          className={cn(
                            "relative size-10 shrink-0 rounded-md overflow-hidden ring-1 transition",
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
                              isCurrent
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            )}
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="size-4 text-white fill-current" />
                            ) : (
                              <Play className="size-4 text-white fill-current translate-x-[1px]" />
                            )}
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePlaySong(song)}
                          className="flex-1 min-w-0 text-left"
                        >
                          <div className="text-sm font-semibold text-white truncate">
                            {song.title}
                          </div>
                          <div className="text-[11px] text-white/55 truncate">
                            {song.artist}
                            {album && (
                              <>
                                {" "}
                                ·{" "}
                                <span className="text-fuchsia-300/70">
                                  {album.title}
                                </span>{" "}
                                ·{" "}
                                <span className="uppercase tracking-[0.2em]">
                                  {album.lang}
                                </span>
                              </>
                            )}
                          </div>
                        </button>
                        <span className="hidden sm:inline text-[11px] font-mono text-white/40 tabular-nums w-10 text-right">
                          {formatTime(song.duration)}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(song.id)}
                          aria-label="Favorite"
                          aria-pressed={isFav}
                          className={cn(
                            "p-1.5 rounded-full transition",
                            isFav
                              ? "text-rose-300 bg-rose-500/10"
                              : "text-white/40 hover:text-white/80"
                          )}
                        >
                          <Heart
                            className={cn("size-3.5", isFav && "fill-current")}
                          />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="px-6 md:px-10 pt-4">
              <CategoryTabs active={activeLang} onChange={setActiveLang} />
            </div>

            <div className="flex-1 px-6 md:px-10 py-5 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-end justify-between mb-4"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-fuchsia-300/70">
                    Library
                  </div>
                  <h2 className="mt-1 text-2xl md:text-3xl font-bold text-white capitalize">
                    {activeLang} Albums
                  </h2>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">
                  {langAlbums.length} albums
                </div>
              </motion.div>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeLang}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="flex gap-4 overflow-x-auto pb-3 -mx-6 md:-mx-10 px-6 md:px-10 snap-x [scrollbar-width:thin]"
                >
                  {langAlbums.map((album, i) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                      className="snap-start"
                    >
                      <AlbumCard
                        album={album}
                        active={album.id === selectedAlbumId}
                        onClick={() => setSelectedAlbumId(album.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <SongList
                    key={selectedAlbum.id}
                    album={selectedAlbum}
                    currentSongId={currentSong?.id ?? null}
                    isPlaying={isPlaying}
                    favorites={favorites}
                    onPlaySong={handlePlaySong}
                    onToggleFavorite={toggleFavorite}
                    onSaveSong={openSaveDialog}
                  />
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 md:px-10 pb-6">
        <AnimatePresence>
          {isUnresolved && (
            <motion.div
              key="unresolved-banner"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-amber-200 text-[11px] font-mono uppercase tracking-[0.25em]"
            >
              <span>Preview unavailable for “{currentSong?.title}”</span>
              <span className="text-amber-300/80 normal-case tracking-wider">
                Try the next track
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <AudioPlayer
          song={currentSong}
          album={currentAlbum}
          currentTime={currentTime}
          duration={duration || currentSong?.duration || 0}
          isPlaying={isPlaying}
          shuffle={shuffle}
          repeat={repeat}
          volume={volume}
          isFavorite={!!currentSong && favorites.has(currentSong.id)}
          isLoading={isLoading}
          onPlayToggle={handlePlayToggle}
          onNext={handleNext}
          onPrev={handlePrev}
          onRewind={handleRewind}
          onSeek={handleSeek}
          onVolume={setVolume}
          onShuffle={() => setShuffle((s) => !s)}
          onRepeat={() => setRepeat((r) => !r)}
          onFavorite={() => currentSong && toggleFavorite(currentSong.id)}
          onSave={() => currentSong && openSaveDialog(currentSong)}
        />
      </div>

      <PlaylistModal
        open={saveModalOpen}
        onClose={closeSaveDialog}
        playlists={playlists}
        onCreate={createPlaylist}
        onAddToExisting={addToPlaylist}
        songTitle={pendingSaveSong?.title ?? ""}
      />

      <PlaylistManager
        open={managerOpen}
        onClose={() => setManagerOpen(false)}
        playlists={playlists}
        onCreate={(name) =>
          setPlaylists((ps) => [
            ...ps,
            { id: `p${Date.now()}`, name, songs: [] },
          ])
        }
        onRemovePlaylist={removePlaylist}
        onPlaySong={handlePlaySong}
        onRemoveSong={removeSongFromPlaylist}
      />
    </motion.div>
  );
}


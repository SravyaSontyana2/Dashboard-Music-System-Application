"use client";

import { cn } from "@/lib/utils";

interface AlbumCoverProps {
  image: string;
  alt?: string;
  hue?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "card" | "circular";
  spinning?: boolean;
  className?: string;
}

const SIZES = {
  xs: "size-9",
  sm: "size-14",
  md: "size-40 md:size-44",
  lg: "size-44 md:size-52",
} as const;

export function AlbumCover({
  image,
  alt = "Album cover",
  hue = 200,
  size = "md",
  variant = "card",
  spinning = false,
  className,
}: AlbumCoverProps) {
  const shape = variant === "circular" ? "rounded-full" : "rounded-2xl";
  return (
    <div
      className={cn(
        "relative overflow-hidden ring-1 ring-white/15 bg-black/40",
        SIZES[size],
        shape,
        spinning && "[animation:spin_18s_linear_infinite]",
        className
      )}
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none"
        style={{
          background: `conic-gradient(from 220deg, transparent, hsl(${
            (hue + 90) % 360
          } 95% 70%), transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_75%,rgba(0,0,0,0.45),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_8px,rgba(0,0,0,0.05)_8px_9px)] opacity-60 pointer-events-none" />

      {variant === "circular" && (
        <>
          <div className="absolute inset-3 rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute inset-6 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="size-1/4 rounded-full bg-black/85 ring-1 ring-white/20 grid place-items-center">
              <div className="size-1/3 rounded-full bg-white/30" />
            </div>
          </div>
        </>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />
    </div>
  );
}

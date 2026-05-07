"use client";

import { motion } from "framer-motion";

export function HUDBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 18% 50%, rgba(34,211,238,0.18), transparent 70%), radial-gradient(ellipse 60% 50% at 82% 50%, rgba(217,70,239,0.18), transparent 70%), radial-gradient(ellipse 80% 40% at 50% 110%, rgba(168,85,247,0.18), transparent 70%)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,70,239,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
        animate={{ backgroundPositionY: ["0px", "60px"] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-fuchsia-400/40 to-transparent" />
      <motion.div
        className="pointer-events-none absolute inset-y-10 left-2 w-px bg-linear-to-b from-transparent via-cyan-400/30 to-transparent"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute inset-y-10 right-2 w-px bg-linear-to-b from-transparent via-fuchsia-400/30 to-transparent"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </>
  );
}

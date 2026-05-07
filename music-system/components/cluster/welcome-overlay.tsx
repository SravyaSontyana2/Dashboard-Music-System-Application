"use client";

import { motion } from "framer-motion";

export function WelcomeOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 grid place-items-center bg-[#05060a]/95 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1.4, opacity: 1 }}
        exit={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 50% 50%, rgba(217,70,239,0.18), transparent 70%)",
        }}
      />

      <div className="absolute inset-10 pointer-events-none">
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            className={`absolute size-20 border-cyan-300/60 ${cls}`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 top-[42%] h-[2px] overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="h-full w-full bg-linear-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.9)]"
        />
      </div>

      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[10px] font-mono uppercase tracking-[0.6em] text-cyan-300/80"
        >
          MBX // Driver Profile · 01
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black text-white"
          style={{
            textShadow:
              "0 0 60px rgba(34,211,238,0.85), 0 0 120px rgba(217,70,239,0.45)",
          }}
        >
          Welcome Back
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 mx-auto h-px w-72 origin-center bg-linear-to-r from-transparent via-cyan-300 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-4 text-[11px] font-mono uppercase tracking-[0.4em] text-white/50"
        >
          Loading Sound System…
        </motion.div>
      </div>
    </motion.div>
  );
}

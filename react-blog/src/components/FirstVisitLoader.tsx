"use client";
import { useEffect, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Total loader duration ≈ 2 000 ms
// We tick every 40 ms → 50 ticks to reach 100
const TICK_MS = 40;
const TOTAL_TICKS = 50; // 50 × 40 ms = 2 000 ms
const BAR_WIDTH = 20; // character width of the progress bar

interface Props {
  onDone: () => void;
}

function FirstVisitLoader({ onDone }: Props) {
  // Always start false on BOTH server and client — prevents hydration mismatch.
  // sessionStorage is checked in useEffect (client-only) after mount.
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0); // 0 – 100

  useEffect(() => {
    // Determine if this is actually a first visit (client-only)
    let isFirstVisit = false;
    try {
      isFirstVisit = !sessionStorage.getItem("siteLoaded");
    } catch {
      isFirstVisit = false;
    }

    if (!isFirstVisit) {
      // Return visitor — skip loader immediately
      onDone();
      return;
    }

    // First visit — show the loader and start progress
    setShow(true);

    let tick = 0;
    const id = setInterval(() => {
      tick += 1;
      const pct = Math.min(Math.round((tick / TOTAL_TICKS) * 100), 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(id);
        try {
          sessionStorage.setItem("siteLoaded", "true");
        } catch {}
        document.documentElement.removeAttribute("data-first-visit");
        // small pause so user sees 100% before fade-out
        setTimeout(() => {
          setShow(false);
          onDone();
        }, 260);
      }
    }, TICK_MS);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build the block-character bar
  const filled = Math.round((progress / 100) * BAR_WIDTH);
  const empty = BAR_WIDTH - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cyber-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#0a0a0a" }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, #000 3px, #000 4px)",
            }}
          />

          {/* Loader card */}
          <div className="relative w-full max-w-sm mx-6 font-mono text-center select-none">
            {/* Title */}
            <p
              className="text-xs tracking-widest mb-2 uppercase"
              style={{ color: "#00ff41", opacity: 0.6 }}
            >
              root@h45h-g4l4xy ~ %
            </p>

            <h1
              className="text-2xl md:text-3xl font-bold tracking-widest mb-8 leading-tight"
              style={{
                color: "#00ff41",
                textShadow:
                  "0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.2)",
                letterSpacing: "0.15em",
              }}
            >
              WELCOME TO
              <br />
              H45H G4L4XY
            </h1>

            {/* Progress bar row */}
            <div
              className="text-sm tracking-wider"
              style={{ color: "#00ff41" }}
            >
              <span style={{ opacity: 0.5 }}>[</span>
              <span style={{ color: "#00ff41" }}>{bar}</span>
              <span style={{ opacity: 0.5 }}>]</span>
              <span
                className="ml-3 tabular-nums"
                style={{ color: "#00ff41", opacity: 0.8 }}
              >
                {progress}%
              </span>
            </div>

            {/* Subtle glow line below */}
            <div
              className="mt-6 mx-auto"
              style={{
                height: 1,
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, rgba(0,255,65,0.4), transparent)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(FirstVisitLoader);

"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "HARSHITH";
const ALIAS = "H45H G4L4XY";

// Timing constants (ms)
const TYPE_SPEED_NAME = 90;
const TYPE_SPEED_ALIAS = 75;
const DELETE_SPEED = 55;
const PAUSE_AFTER_NAME = 650;
const PAUSE_BEFORE_ALIAS = 350;
const CURSOR_HOLD_AFTER_ALIAS = 1400;
const FADE_DURATION = 700;

type Phase =
  | "typing-name"
  | "deleting-name"
  | "typing-alias"
  | "cursor-hold"
  | "fading";

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("typing-name");
  const [nameText, setNameText] = useState("");
  const [aliasText, setAliasText] = useState("");
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Master sequencing effect
  useEffect(() => {
    clearTimer();

    switch (phase) {
      case "typing-name": {
        if (nameText.length < NAME.length) {
          timerRef.current = setTimeout(() => {
            setNameText(NAME.slice(0, nameText.length + 1));
          }, TYPE_SPEED_NAME);
        } else {
          // Pause briefly then go straight to deleting — no intermediate phase
          timerRef.current = setTimeout(
            () => setPhase("deleting-name"),
            PAUSE_AFTER_NAME,
          );
        }
        break;
      }

      case "deleting-name": {
        if (nameText.length > 0) {
          timerRef.current = setTimeout(() => {
            setNameText((t) => t.slice(0, -1));
          }, DELETE_SPEED);
        } else {
          // Pause briefly then go straight to typing alias — no intermediate phase
          timerRef.current = setTimeout(
            () => setPhase("typing-alias"),
            PAUSE_BEFORE_ALIAS,
          );
        }
        break;
      }

      case "typing-alias": {
        if (aliasText.length < ALIAS.length) {
          timerRef.current = setTimeout(() => {
            setAliasText(ALIAS.slice(0, aliasText.length + 1));
          }, TYPE_SPEED_ALIAS);
        } else {
          timerRef.current = setTimeout(
            () => setPhase("cursor-hold"),
            CURSOR_HOLD_AFTER_ALIAS,
          );
        }
        break;
      }

      case "cursor-hold": {
        setPhase("fading");
        break;
      }

      case "fading": {
        setVisible(false);
        timerRef.current = setTimeout(() => {
          onComplete();
        }, FADE_DURATION + 100);
        break;
      }
    }

    return clearTimer;
  }, [phase, nameText, aliasText, clearTimer, onComplete]);

  const showNameCursor = phase === "typing-name" || phase === "deleting-name";
  const showAliasCursor =
    phase === "typing-alias" || phase === "cursor-hold" || phase === "fading";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION / 1000, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Matrix rain background */}
          <MatrixRainBg />

          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
            }}
          />

          {/* Terminal box */}
          <div className="relative z-20 border border-[#00ff41] bg-black/90 p-8 md:p-12 rounded-lg shadow-[0_0_40px_#00ff4133] max-w-2xl w-full mx-4">
            {/* Title bar */}
            <div className="flex items-center gap-2 mb-8 border-b border-[#1a2a1a] pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[#4a7c4a] text-sm ml-2 font-mono">
                terminal — bash
              </span>
            </div>

            <div className="font-mono min-h-[4.5rem] flex flex-col gap-2">
              {/* Line 1: HARSHITH (green) — shown while name phase is active */}
              {(phase === "typing-name" || phase === "deleting-name") && (
                <div
                  className="text-5xl md:text-7xl font-bold leading-none"
                  style={{
                    color: "#00ff41",
                    textShadow: "0 0 20px #00ff4188",
                  }}
                >
                  {nameText}
                  {showNameCursor && (
                    <span className="inline-block w-[3px] h-[0.85em] bg-[#00ff41] ml-[2px] align-middle animate-[blink_0.75s_step-end_infinite]" />
                  )}
                </div>
              )}

              {/* Line 2: H45H G4L4XY (white) — shown during alias phases */}
              {(phase === "typing-alias" ||
                phase === "cursor-hold" ||
                phase === "fading") && (
                <div
                  className="text-4xl md:text-6xl font-bold leading-none tracking-wider"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 0 12px rgba(255,255,255,0.3)",
                  }}
                >
                  {aliasText}
                  {showAliasCursor && (
                    <span className="inline-block w-[3px] h-[0.8em] bg-white ml-[2px] align-middle animate-[blink_0.75s_step-end_infinite]" />
                  )}
                </div>
              )}
            </div>
          </div>

          <p className="relative z-20 mt-6 text-[#4a7c4a] text-sm animate-pulse font-mono">
            Initializing secure connection...
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Matrix rain background (unchanged from original) ──────────────────────
function MatrixRainBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF";
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const id = setInterval(draw, 40);
    return () => clearInterval(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
    />
  );
}

"use client";
import { useEffect, useRef, memo } from "react";

const NEON = "#00ff41";
const NEON_DARK = "rgba(0,0,0,0.55)";

// Uses refs + direct DOM manipulation so there are zero React re-renders
// while the cursor moves — eliminates all lag.
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Raw cursor position (updated on every mousemove — no setState)
    const raw = { x: -200, y: -200 };
    // Smoothed ring position (lerped every rAF)
    const smooth = { x: -200, y: -200 };
    let rafId: number;
    let isDown = false;

    const onMove = (e: MouseEvent) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      // Move the sharp dot instantly — zero lag, no lerp
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${raw.x}px, ${raw.y}px)`;
      }
    };

    const onDown = () => {
      isDown = true;
      if (dotRef.current) {
        dotRef.current.style.width = "14px";
        dotRef.current.style.height = "14px";
        dotRef.current.style.boxShadow = `0 0 0 2px ${NEON_DARK}, 0 0 14px ${NEON}, 0 0 26px ${NEON}88`;
      }
    };

    const onUp = () => {
      isDown = false;
      if (dotRef.current) {
        dotRef.current.style.width = "10px";
        dotRef.current.style.height = "10px";
        dotRef.current.style.boxShadow = `0 0 0 2px ${NEON_DARK}, 0 0 10px ${NEON}, 0 0 20px ${NEON}88`;
      }
    };

    const tick = () => {
      // Lerp ring toward raw position
      smooth.x += (raw.x - smooth.x) * 0.14;
      smooth.y += (raw.y - smooth.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${smooth.x}px, ${smooth.y}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/*
       * Sharp dot — always SOLID filled neon green.
       * Visible on ANY background: dark bg → bright neon fill; light bg → dark
       * outline ring creates contrast. Strong glow ensures it reads everywhere.
       * Uses translate(x,y) via style.transform (no left/top) → GPU composited.
       */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          width: 10,
          height: 10,
          marginLeft: -5,
          marginTop: -5,
          backgroundColor: NEON,
          // Dark outline → contrast on light backgrounds; glow → visible on dark
          boxShadow: `0 0 0 2px ${NEON_DARK}, 0 0 10px ${NEON}, 0 0 20px ${NEON}88`,
          willChange: "transform",
        }}
      />

      {/* Trailing ring — larger, semi-transparent, smoothly follows the dot */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          border: `2px solid ${NEON}`,
          boxShadow: `0 0 8px ${NEON}44, inset 0 0 8px ${NEON}11`,
          opacity: 0.6,
          willChange: "transform",
        }}
      />
    </>
  );
}

export default memo(CustomCursor);

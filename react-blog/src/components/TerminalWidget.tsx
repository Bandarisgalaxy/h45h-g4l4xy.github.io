"use client";
import { useEffect, useState } from "react";

const TERMINAL_LINES = [
  { text: "> Initializing SIEM dashboard...", delay: 0 },
  { text: "> Connected to threat feed.", delay: 700 },
  {
    text: "> [ALERT] Suspicious login attempt — 192.168.1.42",
    delay: 1500,
    alert: true,
  },
  { text: "> Starting packet capture on eth0...", delay: 2400 },
  { text: "> [INFO] 1,337 packets analyzed.", delay: 3200 },
  { text: "> Running correlation rules...", delay: 4000 },
  {
    text: "> [ALERT] Lateral movement detected — MITRE T1021",
    delay: 4900,
    alert: true,
  },
  { text: "> Escalating to Tier 2 analyst...", delay: 5800 },
  { text: "> [INFO] Threat contained. IOCs exported.", delay: 6700 },
  { text: "> SOC watchdog active ■", delay: 7500 },
];

export default function TerminalWidget() {
  const [shownLines, setShownLines] = useState<typeof TERMINAL_LINES>([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line) =>
      setTimeout(() => {
        setShownLines((prev) => [...prev, line]);
      }, line.delay),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Restart loop
  useEffect(() => {
    if (shownLines.length === TERMINAL_LINES.length) {
      const t = setTimeout(() => setShownLines([]), 3000);
      return () => clearTimeout(t);
    }
  }, [shownLines]);

  useEffect(() => {
    const id = setInterval(() => setCursor((c) => !c), 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative border border-[#00ff4133] rounded-lg bg-black/80 backdrop-blur-sm overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.1)] w-full max-w-xl">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-[#1a2a1a]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[#4a7c4a] text-xs">soc-monitor — bash</span>
      </div>

      {/* Terminal output */}
      <div className="p-4 font-mono text-sm space-y-1 min-h-[220px]">
        {shownLines.map((line, i) => (
          <div
            key={i}
            className={
              line.alert
                ? "text-[#ff4444]"
                : line.text.includes("[INFO]")
                  ? "text-[#00ccff]"
                  : "text-[#00ff41]"
            }
          >
            {line.text}
          </div>
        ))}
        {shownLines.length < TERMINAL_LINES.length && (
          <span className="text-[#00ff41]">{cursor ? "█" : " "}</span>
        )}
      </div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)",
        }}
      />
    </div>
  );
}

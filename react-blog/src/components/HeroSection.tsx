"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
const InteractiveTerminal = dynamic(() => import("./InteractiveTerminal"), {
  ssr: false,
});

// ── Rotating quotes ────────────────────────────────────────────────────────
const QUOTES = [
  {
    text: "The quieter you become, the more you are able to hear.",
    attr: "Kali Linux motto",
  },
  { text: "Security is not a product, but a process.", attr: "Bruce Schneier" },
  {
    text: "Programs must be written for people to read.",
    attr: "Harold Abelson",
  },
  {
    text: "The only truly secure system is one that is powered off.",
    attr: "Gene Spafford",
  },
  {
    text: "Hackers are breaking the systems for profit. Before, it was about intellectual curiosity.",
    attr: "Kevin Mitnick",
  },
  {
    text: "Privacy is not something that I\u2019m merely entitled to, it\u2019s an absolute prerequisite.",
    attr: "Marlon Brando",
  },
  { text: "Complexity is the enemy of security.", attr: "Bruce Schneier" },
];

function QuoteBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const q = QUOTES[idx];
  return (
    <div
      className="mb-6 border-l-2 pl-4 py-1"
      style={{
        borderColor: "var(--neon)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <p
        className="text-xs md:text-sm font-mono leading-relaxed quote-fade"
        style={{
          color: "var(--muted)",
          textShadow: "0 0 8px var(--neon-glow)",
        }}
      >
        &ldquo;{q.text}&rdquo;
      </p>
      <p className="text-[10px] mt-1" style={{ color: "var(--muted-dim)" }}>
        — {q.attr}
      </p>
    </div>
  );
}

// ── Alias typing animation — HARSHITH is always static, only alias loops ──
const ALIAS = "H45H G4L4XY";
const TYPE_SPEED = 80;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPED = 1200;
const PAUSE_BEFORE_DELETE = 300;

type Phase = "typing" | "pausing" | "deleting" | "waiting";

function HeroTyping() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [text, setText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    clear();

    switch (phase) {
      case "typing": {
        if (text.length < ALIAS.length) {
          timerRef.current = setTimeout(
            () => setText(ALIAS.slice(0, text.length + 1)),
            TYPE_SPEED,
          );
        } else {
          timerRef.current = setTimeout(
            () => setPhase("pausing"),
            PAUSE_AFTER_TYPED,
          );
        }
        break;
      }
      case "pausing": {
        setPhase("deleting");
        break;
      }
      case "deleting": {
        if (text.length > 0) {
          timerRef.current = setTimeout(
            () => setText((t) => t.slice(0, -1)),
            DELETE_SPEED,
          );
        } else {
          timerRef.current = setTimeout(
            () => setPhase("typing"),
            PAUSE_BEFORE_DELETE,
          );
        }
        break;
      }
      case "waiting": {
        timerRef.current = setTimeout(
          () => setPhase("typing"),
          PAUSE_BEFORE_DELETE,
        );
        break;
      }
    }
    return clear;
  }, [phase, text, clear]);

  return (
    <>
      {/* HARSHITH — always static, neon green */}
      <h1
        className="text-5xl md:text-7xl font-bold mb-2 tracking-tight"
        style={{
          color: "#00ff41",
          textShadow: "0 0 30px rgba(0,255,65,0.25)",
        }}
      >
        HARSHITH
      </h1>

      {/* "alias" label */}
      <div className="text-[var(--muted)] text-lg mb-1 font-mono">alias</div>

      {/* H45H G4L4XY — types and deletes in a loop, white text */}
      <div
        className="text-3xl md:text-5xl font-bold text-[var(--text)] mb-6 tracking-wider"
        style={{ minHeight: "1.2em" }}
      >
        {text}
        <span className="inline-block w-[3px] h-[0.8em] bg-[#00ff41] ml-[2px] align-middle animate-[blink_0.75s_step-end_infinite]" />
      </div>
    </>
  );
}

const STATS = [
  { label: "CTF Writeups", value: "25+", icon: "🚩" },
  { label: "SOC Articles", value: "10+", icon: "🛡️" },
  { label: "Projects", value: "5+", icon: "💻" },
  { label: "Tags", value: "50+", icon: "🏷️" },
];

const SKILLS = [
  "SIEM",
  "Network Monitoring",
  "CTF",
  "PicoCTF",
  "OSINT",
  "Cryptography",
  "Web Exploitation",
  "Python",
  "Nmap",
  "Wireshark",
];

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        {/* Left: Text content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Rotating quote bar */}
            <QuoteBar />

            {/* Typing animation — loops forever */}
            <HeroTyping />

            <p className="text-[var(--muted)] text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              Cybersecurity Researcher &nbsp;|&nbsp; SOC Analyst &nbsp;|&nbsp;
              CTF Player
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link
                href="/blog"
                className="px-5 py-2.5 rounded-lg bg-[#00ff41] text-black font-bold text-sm hover:bg-[#00cc33] transition-colors shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
              >
                Read Blog
              </Link>
              <Link
                href="/categories/picoctf"
                className="px-5 py-2.5 rounded-lg border border-[#00ff41] text-[#00ff41] font-bold text-sm hover:bg-[#00ff4115] transition-colors"
              >
                CTF Writeups
              </Link>
              <Link
                href="/about"
                className="px-5 py-2.5 rounded-lg border border-[#1a2a1a] text-[#4a7c4a] font-bold text-sm hover:border-[#3a5c3a] hover:text-[#ccffcc] transition-colors"
              >
                About Me
              </Link>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-1 rounded border border-[var(--border)] text-[var(--muted)] hover:border-[var(--neon)] hover:text-[var(--neon)] transition-colors cursor-default"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Terminal widget */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Interactive terminal */}
          <InteractiveTerminal />

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-[var(--border)] rounded-lg p-4 bg-[var(--card)] hover:border-[var(--neon)] hover:border-opacity-30 transition-colors"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-[var(--neon)] text-2xl font-bold">
                  {stat.value}
                </div>
                <div className="text-[var(--muted)] text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

// ── Boot sequence (each line has its own color) ────────────────────────────
interface BootLine {
  text: string;
  color: string;
}
const BOOT_LINES: BootLine[] = [
  { text: "Booting H45H G4L4XY cyber lab...", color: "#00ffff" },
  { text: "Initializing terminal...", color: "#ffff00" },
  { text: "Loading cybersecurity tools...", color: "#00ff41" },
  { text: "Practicing packet analysis...", color: "#5599ff" },
  { text: "Solving CTF challenges...", color: "#ff55ff" },
  { text: "Writing security blogs...", color: "#ff9900" },
  { text: "Learning never stops.", color: "#00ffaa" },
];

// ── Static command registry ────────────────────────────────────────────────
type CmdFn = (args: string[]) => string[];

const COMMANDS: Record<string, CmdFn> = {
  help: () => [
    "┌──────────────────────────────────────────────┐",
    "│            Available Commands                 │",
    "├──────────────────────────────────────────────┤",
    "│  help      — show this help message           │",
    "│  ls        — list directory contents          │",
    "│  pwd       — print working directory          │",
    "│  whoami    — display current user info        │",
    "│  about     — about H45H G4L4XY                │",
    "│  skills    — list skills & tools              │",
    "│  contact   — show contact information         │",
    "│  timeline  — view cybersecurity journey       │",
    "│  echo      — repeat text back                 │",
    "│  clear     — clear the terminal               │",
    "└──────────────────────────────────────────────┘",
  ],
  ls: () => [
    "drwxr-xr-x  blogs/",
    "drwxr-xr-x  ctf_writeups/",
    "drwxr-xr-x  soc_learning/",
    "drwxr-xr-x  projects/",
    "-rw-r--r--  notes.txt",
    "-rw-r--r--  README.md",
  ],
  pwd: () => ["/home/h45h_g4l4xy/cyber_lab"],
  whoami: () => [
    "Cybersecurity student | SOC learner | CTF player",
    "Alias: H45H G4L4XY",
  ],
  about: () => [
    "Hi, I'm Harshith (H45H G4L4XY)",
    "I document my cybersecurity learning journey through",
    "blogs and CTF writeups.",
    "",
    "Focus areas:",
    "  \u2022 SOC Operations & Log Analysis",
    "  \u2022 CTF Competitions (PicoCTF)",
    "  \u2022 Security Research & Projects",
  ],
  skills: () => [
    "Technical Skills:",
    "  \u2022 Linux & Bash scripting",
    "  \u2022 Networking & TCP/IP",
    "  \u2022 Burp Suite / Web exploitation",
    "  \u2022 Nmap / Wireshark",
    "  \u2022 SQL Injection",
    "  \u2022 Cryptography",
    "  \u2022 CTF problem solving",
    "  \u2022 SIEM & log analysis",
  ],
  contact: () => [
    "GitHub  : https://github.com/H45h-G4L4XY",
    "LinkedIn: (placeholder)",
    "Blog    : https://bandarisgalaxy.github.io",
  ],
  echo: (args) => [args.join(" ") || ""],
  clear: () => ["__CLEAR__"],
};

// ── Line types ─────────────────────────────────────────────────────────────
type LineKind = "boot" | "output" | "command" | "error" | "welcome";

interface TermLine {
  id: number;
  kind: LineKind;
  text: string;
  color?: string;
}

let lineId = 0;
const mkLine = (kind: LineKind, text: string, color?: string): TermLine => ({
  id: lineId++,
  kind,
  text,
  color,
});

// ── Component ──────────────────────────────────────────────────────────────
export default function InteractiveTerminal() {
  const router = useRouter();
  const [lines, setLines] = useState<TermLine[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [interactive, setInteractive] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const bootStarted = useRef(false); // prevent double-boot on re-render
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null); // outer wrapper — used for scrollIntoView

  // ── Blinking cursor ──────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  // ── Boot sequence — starts once the component mounts ─────────────────────
  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;

    // Reset in case of a React StrictMode fake-unmount/remount cycle
    setLines([]);
    setInteractive(false);

    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    BOOT_LINES.forEach((line, i) => {
      delay += i === 0 ? 0 : 350; // 350 ms between lines
      const d = delay;
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, mkLine("boot", line.text, line.color)]);
        }, d),
      );
    });

    // After last line: wait 1 500 ms → clear → welcome
    const clearDelay = delay + 1500;
    timers.push(
      setTimeout(() => {
        setLines([
          mkLine("welcome", "type help to see all available commands"),
        ]);
        setInteractive(true);
      }, clearDelay),
    );

    return () => {
      // Reset ref so a real remount (after StrictMode fake-unmount) runs correctly
      bootStarted.current = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  // ── Auto-scroll inside terminal + bring terminal into viewport ─────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // After command output, scroll terminal to top of viewport so the user
    // can read results (especially important on mobile where keyboard hides content)
    if (interactive) {
      setTimeout(() => {
        terminalRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }, [lines, interactive]);

  // preventScroll stops mobile browsers from jumping to the off-screen input.
  // After focus, wait 350ms for the keyboard animation then scroll terminal
  // to the top of the visible area so it isn't hidden behind the keyboard.
  const focusInput = useCallback(() => {
    inputRef.current?.focus({ preventScroll: true });
    setTimeout(() => {
      terminalRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 350);
  }, []);

  // ── Process command ───────────────────────────────────────────────────────
  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      setLines((prev) => [...prev, mkLine("command", trimmed)]);
      setHistory((h) => [trimmed, ...h.slice(0, 49)]);
      setHistIdx(-1);

      const [cmd, ...args] = trimmed.split(/\s+/);
      const lower = cmd.toLowerCase();

      // ── Special: timeline navigates the page ──
      if (lower === "timeline") {
        setLines((prev) => [
          ...prev,
          mkLine("output", "Opening cybersecurity timeline..."),
          mkLine("output", ""),
        ]);
        setTimeout(() => router.push("/timeline"), 600);
        return;
      }

      const fn = COMMANDS[lower];
      if (!fn) {
        setLines((prev) => [
          ...prev,
          mkLine("error", `${cmd}: command not found. Type "help".`),
        ]);
        return;
      }

      const result = fn(args);
      if (result[0] === "__CLEAR__") {
        setLines([]);
        return;
      }

      setLines((prev) => [
        ...prev,
        ...result.map((l) => mkLine("output", l)),
        mkLine("output", ""),
      ]);
    },
    [router],
  );

  // ── Keyboard handling ─────────────────────────────────────────────────────
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        runCommand(inputVal);
        setInputVal("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const nextIdx = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(nextIdx);
        setInputVal(history[nextIdx] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIdx = Math.max(histIdx - 1, -1);
        setHistIdx(nextIdx);
        setInputVal(nextIdx === -1 ? "" : (history[nextIdx] ?? ""));
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [inputVal, histIdx, history, runCommand],
  );

  // ── Render a single terminal line ─────────────────────────────────────────
  const renderLine = (line: TermLine) => {
    if (line.kind === "command") {
      return (
        <div key={line.id} className="leading-relaxed">
          <span style={{ color: "#2255cc" }} className="select-none">
            h45h@cyberlab:~${" "}
          </span>
          <span style={{ color: "#ffffff" }}>{line.text}</span>
        </div>
      );
    }
    if (line.kind === "boot") {
      return (
        <div
          key={line.id}
          className="leading-relaxed"
          style={{ color: line.color }}
        >
          {line.text}
        </div>
      );
    }
    if (line.kind === "welcome") {
      return (
        <div
          key={line.id}
          className="leading-relaxed font-semibold"
          style={{ color: "#00ff41" }}
        >
          {line.text}
        </div>
      );
    }
    if (line.kind === "error") {
      return (
        <div
          key={line.id}
          className="leading-relaxed"
          style={{ color: "#ff5555" }}
        >
          {line.text}
        </div>
      );
    }
    return (
      <div
        key={line.id}
        className="leading-relaxed"
        style={{ color: "#88cc88" }}
      >
        {line.text}
      </div>
    );
  };

  return (
    <div
      ref={terminalRef}
      className="relative rounded-lg overflow-hidden w-full font-mono text-sm flex flex-col"
      style={{
        minHeight: 340,
        maxHeight: 420,
        background: "#050505",
        border: "1px solid #1a2a1a",
        boxShadow:
          "0 0 30px rgba(0,255,65,0.08), inset 0 0 30px rgba(0,0,0,0.4)",
      }}
      onClick={focusInput}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
        style={{ background: "#0d0d0d", borderBottom: "1px solid #1a2a1a" }}
      >
        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_4px_#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_#28c840]" />
        <span
          className="ml-3 text-xs tracking-wide"
          style={{ color: "#4a7c4a" }}
        >
          h45h@cyberlab — bash
        </span>
        <span
          className="ml-auto text-[10px]"
          style={{ color: "#4a7c4a", opacity: 0.5 }}
        >
          {interactive ? "INTERACTIVE" : "BOOTING..."}
        </span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-0.5 relative"
      >
        {/* CRT scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, #000 3px, #000 4px)",
          }}
        />

        {lines.map(renderLine)}

        {/* Interactive prompt row */}
        {interactive && (
          <div className="flex items-center mt-1">
            {/* prompt + typed text + cursor — all inline, cursor hugs the text */}
            <div className="flex items-center flex-1 min-w-0 overflow-hidden">
              <span
                className="flex-shrink-0 select-none whitespace-nowrap"
                style={{ color: "#2255cc" }}
              >
                h45h@cyberlab:~${" "}
              </span>
              <span className="whitespace-pre" style={{ color: "#ffffff" }}>
                {inputVal}
              </span>
              <span
                className="flex-shrink-0 select-none"
                style={{ opacity: cursorBlink ? 1 : 0, color: "#00ff41" }}
              >
                &#x2588;
              </span>
            </div>
            {/* Mobile run button — always on the right */}
            <button
              className="md:hidden flex-shrink-0 ml-2 px-2 py-0.5 rounded text-xs font-bold select-none"
              style={{
                color: "#00ff41",
                border: "1px solid #00ff4155",
                background: "rgba(0,255,65,0.08)",
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                runCommand(inputVal);
                setInputVal("");
              }}
              aria-label="Run command"
            >
              &#x25b6;
            </button>
          </div>
        )}

        {/* Boot cursor */}
        {!interactive && (
          <span
            className="inline-block select-none"
            style={{ opacity: cursorBlink ? 1 : 0, color: "#00ff41" }}
          >
            █
          </span>
        )}
      </div>

      {/* Hidden real input. Off-screen (NOT zero-size) — width:0/height:0
          causes browsers to put the cursor at pos 0, reversing typed text.
          position:fixed left:-9999px keeps natural width → correct cursor. */}
      {interactive && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runCommand(inputVal);
            setInputVal("");
          }}
          style={{
            position: "fixed",
            left: "-9999px",
            top: "-9999px",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <input
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            aria-label="Terminal input"
          />
        </form>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import { Shield, Terminal, Cpu, Award, BookOpen, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About | H45H G4L4XY",
  description: "HARSHITH — Cybersecurity enthusiast | CTF Player",
};

const SKILLS = [
  {
    category: "SOC & Blue Team",
    items: [
      "Log Analysis",
      "SIEM (Splunk/ELK)",
      "DFIR",
      "Threat Hunting",
      "Network Monitoring",
    ],
  },
  {
    category: "CTF & Offensive",
    items: [
      "Web Exploitation",
      "Cryptography",
      "Steganography",
      "OSINT",
      "Reverse Engineering",
    ],
  },
  {
    category: "Tools",
    items: ["Nmap", "Wireshark", "Burp Suite", "Metasploit", "Volatility"],
  },
  {
    category: "Programming",
    items: ["Python", "Bash", "JavaScript", "SQL", "PowerShell"],
  },
];

const TIMELINE = [
  { date: "2025", event: "Started PicoCTF journey — first CTF competitions" },
  { date: "2025", event: "Built AI-Assisted Network Monitoring project" },
  { date: "2025", event: "Launched H45H G4L4XY cybersecurity blog" },
  { date: "2026", event: "Expanding SOC learning path — SIEM & DFIR" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-24 h-24 rounded-full border-2 border-[#00ff41] mx-auto mb-6 flex items-center justify-center bg-[#111] shadow-[0_0_20px_rgba(0,255,65,0.2)]">
          <Shield className="w-10 h-10 text-[#00ff41]" />
        </div>
        <h1
          className="text-4xl font-bold text-[#00ff41] mb-2"
          style={{ textShadow: "0 0 20px rgba(0,255,65,0.3)" }}
        >
          HARSHITH
        </h1>
        <p className="text-[#ccffcc] text-xl mb-2">
          alias <span className="text-[#00ff41]">H45H G4L4XY</span>
        </p>
        <p className="text-[#4a7c4a]">
          Cybersecurity Researcher | SOC Analyst | CTF Player
        </p>
      </div>

      {/* About text */}
      <section className="mb-12 border border-[#1a2a1a] rounded-lg p-6 bg-[#111]">
        <div className="flex items-center gap-2 mb-4 text-[#00ff41]">
          <Terminal className="w-5 h-5" />
          <h2 className="text-lg font-bold">whoami</h2>
        </div>
        <div className="space-y-4 text-[#ccffcc] leading-relaxed text-sm">
          <p>
            Hey! I&apos;m <strong className="text-[#00ff41]">HARSHITH</strong>,
            a cybersecurity enthusiast operating under the alias{" "}
            <strong className="text-[#00ff41]">H45H G4L4XY</strong>. I&apos;m
            passionate about breaking things apart to understand how to protect
            them.
          </p>
          <p>
            My journey spans SOC work — log analysis, SIEM engineering, DFIR
            investigations — and offensive security through CTF competitions
            like PicoCTF. I believe the best defenders think like attackers.
          </p>
          <p>
            This blog is my knowledge base — documenting CTF writeups, SOC
            learning paths, and security projects so others can follow along.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6 text-[#00ff41]">
          <Cpu className="w-5 h-5" />
          <h2 className="text-xl font-bold">Skills &amp; Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILLS.map(({ category, items }) => (
            <div
              key={category}
              className="border border-[#1a2a1a] rounded-lg p-4 bg-[#111]"
            >
              <h3 className="text-[#00ff41] text-sm font-semibold mb-3">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 rounded border border-[#1a2a1a] text-[#4a7c4a]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-6 text-[#00ff41]">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-xl font-bold">Timeline</h2>
        </div>
        <div className="space-y-3">
          {TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-[#00ff41] text-xs font-mono bg-[#00ff4115] border border-[#00ff4133] px-2 py-1 rounded whitespace-nowrap">
                {item.date}
              </span>
              <p className="text-[#ccffcc] text-sm pt-1">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="border border-[#00ff4133] rounded-lg p-6 bg-[#00ff4108] text-center">
        <Zap className="w-8 h-8 text-[#00ff41] mx-auto mb-3" />
        <h2 className="text-lg font-bold text-[#00ff41] mb-2">Get in Touch</h2>
        <p className="text-[#4a7c4a] text-sm mb-4">
          Open to collaboration, CTF teams, and discussions.
        </p>
        <a
          href="https://github.com/H45h-G4L4XY"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00ff41] text-black font-bold text-sm hover:bg-[#00cc33] transition-colors"
        >
          GitHub Profile
        </a>
      </section>
    </div>
  );
}

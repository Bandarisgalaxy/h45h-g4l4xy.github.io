import Link from "next/link";
import { Github, Linkedin, Shield, Terminal } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a2a1a] bg-[#0a0a0a] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-[#00ff41]" />
              <span className="text-[#00ff41] font-bold">H45H_G4L4XY</span>
            </div>
            <p className="text-[#3a5c3a] text-sm leading-relaxed">
              Cybersecurity Researcher | SOC Analyst | CTF Player.
              <br />
              Breaking things to understand how to protect them.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#00ff41] text-sm font-semibold mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[#3a5c3a]">
              {[
                ["Home", "/"],
                ["Blog", "/blog"],
                ["CTF Writeups", "/categories/picoctf"],
                ["SOC Learning", "/categories/soc"],
                ["About", "/about"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-[#00ff41] transition-colors"
                  >
                    &gt; {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-[#00ff41] text-sm font-semibold mb-3">
              Connect
            </h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/H45h-G4L4XY"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#1a2a1a] rounded-lg text-[#3a5c3a] hover:text-[#00ff41] hover:border-[#00ff4133] transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/bandari-harshith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#1a2a1a] rounded-lg text-[#3a5c3a] hover:text-[#00ff41] hover:border-[#00ff4133] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a2a1a] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[#2a3c2a] text-xs font-mono">
            © {year} HARSHITH (H45H G4L4XY). All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[#2a3c2a] text-xs font-mono">
            <Terminal className="w-3 h-3" />
            <span>Built with Next.js + ❤️ + caffeine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

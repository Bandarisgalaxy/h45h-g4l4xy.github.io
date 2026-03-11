"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Shield } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { NAV_ITEMS } from "@/lib/utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="w-7 h-7 text-[var(--neon)] group-hover:drop-shadow-[0_0_8px_var(--neon)] transition-all" />
            <Terminal className="w-3 h-3 text-[var(--neon)] absolute -bottom-1 -right-1" />
          </div>
          <span className="text-[var(--neon)] font-bold text-lg tracking-wider group-hover:drop-shadow-[0_0_8px_var(--neon)] transition-all">
            H45H_G4L4XY
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 relative group ${
                  active
                    ? "text-[var(--neon)] bg-[var(--neon)]/10"
                    : "text-[var(--muted)] hover:text-[var(--neon)] hover:bg-[var(--neon)]/5"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[var(--neon)] shadow-[0_0_8px_var(--neon)]" />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[var(--neon)] p-2 rounded hover:bg-[var(--neon)]/10 transition-colors"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg)]/95 border-b border-[var(--border)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 rounded text-sm transition-colors ${
                    pathname === item.href
                      ? "text-[var(--neon)] bg-[var(--neon)]/10"
                      : "text-[var(--muted)] hover:text-[var(--neon)] hover:bg-[var(--neon)]/5"
                  }`}
                >
                  &gt; {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

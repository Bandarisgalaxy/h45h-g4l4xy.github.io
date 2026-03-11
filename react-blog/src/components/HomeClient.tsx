"use client";
import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import BlogCard from "./BlogCard";
import SearchBar from "./SearchBar";
import Link from "next/link";
import type { PostMeta } from "@/types/post";
import { motion } from "framer-motion";

interface Props {
  recentPosts: PostMeta[];
  categories: { name: string; count: number }[];
  allPosts: PostMeta[];
}

const CAT_META: Record<
  string,
  { icon: string; desc: string; href: string; color: string }
> = {
  SOC: {
    icon: "🛡️",
    desc: "Log Analysis, SIEM, DFIR, Threat Hunting",
    href: "/categories/soc",
    color: "#00ff41",
  },
  PicoCTF: {
    icon: "🚩",
    desc: "Cryptography & Web Exploitation writeups",
    href: "/categories/picoctf",
    color: "#00ccff",
  },
  "CTF Tips & Tricks": {
    icon: "⚡",
    desc: "General CTF methodologies",
    href: "/categories/ctf-tips-tricks",
    color: "#ff9900",
  },
  Projects: {
    icon: "💻",
    desc: "AI-assisted security projects",
    href: "/categories/projects",
    color: "#cc00ff",
  },
};

export default function HomeClient({
  recentPosts,
  categories,
  allPosts,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen" aria-hidden="true" />;
  }

  return (
    <div className="relative">
      {/* Hero */}
      <HeroSection />

      {/* Search bar */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        <SearchBar posts={allPosts} />
      </section>

      {/* Recent Posts */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[var(--neon)]">
              <span className="text-[var(--muted)]">&gt;</span> Recent Posts
            </h2>
            <p className="text-[var(--muted)] text-sm mt-1">
              Latest writeups and articles
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[var(--neon)] border border-[var(--neon)] border-opacity-30 px-4 py-2 rounded-lg hover:bg-[var(--neon)] hover:bg-opacity-5 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 pb-20">
        <h2 className="text-2xl font-bold text-[var(--neon)] mb-8">
          <span className="text-[var(--muted)]">&gt;</span> Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(CAT_META).map(([name, meta]) => {
            const cat = categories.find((c) => c.name === name);
            return (
              <motion.div
                key={name}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={meta.href}
                  className="block border border-[var(--border)] rounded-lg p-5 bg-[var(--card)] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all h-full"
                >
                  <div className="text-3xl mb-3">{meta.icon}</div>
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: meta.color }}
                  >
                    {name}
                  </h3>
                  <p className="text-[var(--muted)] text-xs leading-relaxed mb-3">
                    {meta.desc}
                  </p>
                  {cat && (
                    <span className="text-[10px] text-[var(--muted)] opacity-60">
                      {cat.count} post{cat.count !== 1 ? "s" : ""}
                    </span>
                  )}
                  <div
                    className="mt-3 text-xs"
                    style={{ color: meta.color + "99" }}
                  >
                    Explore →
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

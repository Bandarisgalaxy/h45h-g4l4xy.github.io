"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Tag, ChevronRight } from "lucide-react";
import type { PostMeta } from "@/types/post";
import { formatDate, getCategoryColor } from "@/lib/utils";

interface Props {
  posts: PostMeta[];
}

/* ── single timeline node card ────────────────────────────────────────────── */
function TimelineCard({
  post,
  side,
}: {
  post: PostMeta;
  side: "left" | "right";
}) {
  const primaryCat = post.categories[0] ?? "Uncategorized";
  const color = getCategoryColor(primaryCat);

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
      className="group relative rounded-xl border bg-[var(--card)] p-5 transition-all duration-300
                 hover:border-[#00ff4133] hover:shadow-[0_0_24px_rgba(0,255,65,0.12)]
                 max-w-sm w-full"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-xl"
        style={{ backgroundColor: color }}
      />

      {/* Category tag */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {post.categories.map((c) => (
          <span
            key={c}
            className="text-[10px] px-2 py-0.5 rounded border font-semibold uppercase tracking-wider"
            style={{
              color,
              borderColor: color + "44",
              backgroundColor: color + "11",
            }}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3
        className="font-bold text-base mb-2 leading-snug group-hover:text-[#00ff41] transition-colors line-clamp-2"
        style={{ color: "var(--text)" }}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        className="text-xs leading-relaxed mb-4 line-clamp-2"
        style={{ color: "var(--muted)" }}
      >
        {post.excerpt}
      </p>

      {/* Footer */}
      <div
        className="flex items-center justify-between gap-2 text-[11px]"
        style={{ color: "var(--text-muted)" }}
      >
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(post.date)}
        </span>
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-0.5 text-[#00ff41] hover:drop-shadow-[0_0_4px_#00ff41] transition-all"
          prefetch
        >
          Read <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── glowing spine connector circle ─────────────────────────────────────── */
function SpineDot({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className="relative flex items-center justify-center flex-shrink-0"
    >
      {/* Outer glow ring */}
      <div
        className="absolute w-8 h-8 rounded-full opacity-20 animate-pulse"
        style={{ backgroundColor: "#00ff41" }}
      />
      {/* Main dot */}
      <div
        className="relative w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
        style={{
          borderColor: "#00ff41",
          backgroundColor: "#050505",
          boxShadow: "0 0 10px #00ff41, 0 0 20px rgba(0,255,65,0.3)",
        }}
      >
        <span className="text-[8px] font-bold" style={{ color: "#00ff41" }}>
          {index + 1}
        </span>
      </div>
    </motion.div>
  );
}

/* ── main timeline ────────────────────────────────────────────────────────── */
export default function TimelineClient({ posts }: Props) {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      {/* Page header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-xs uppercase tracking-[0.3em] mb-3"
            style={{ color: "var(--muted)" }}
          >
            &gt; Cybersecurity Learning Journey
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              color: "#00ff41",
              textShadow: "0 0 30px rgba(0,255,65,0.3)",
            }}
          >
            Progress Timeline
          </h1>
          <p
            className="text-sm max-w-md mx-auto"
            style={{ color: "var(--muted)" }}
          >
            {posts.length} milestones — from first writeup to latest research
          </p>
          {/* Progress bar */}
          <div
            className="mt-6 mx-auto h-1 rounded-full overflow-hidden max-w-xs"
            style={{ background: "var(--border)" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #00ff41, #00ffaa)" }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP zigzag (md+) ── */}
      <div className="hidden md:block max-w-5xl mx-auto">
        <div className="relative">
          {/* Vertical spine */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, #00ff41 8%, #00ff41 92%, transparent 100%)",
              boxShadow: "0 0 8px rgba(0,255,65,0.4)",
            }}
          />

          <div className="space-y-12">
            {posts.map((post, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={post.slug}
                  className="grid grid-cols-[1fr_48px_1fr] items-center gap-0"
                >
                  {/* Left column */}
                  <div className="flex justify-end pr-6">
                    {isLeft ? (
                      <TimelineCard post={post} side="left" />
                    ) : (
                      /* Empty spacer on right-side posts */
                      <div />
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="flex justify-center">
                    <SpineDot index={i} />
                  </div>

                  {/* Right column */}
                  <div className="pl-6">
                    {!isLeft ? (
                      <TimelineCard post={post} side="right" />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE vertical list ── */}
      <div className="md:hidden max-w-md mx-auto">
        <div className="relative">
          {/* Left spine */}
          <div
            className="absolute left-3 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, #00ff41 8%, #00ff41 92%, transparent 100%)",
              boxShadow: "0 0 6px rgba(0,255,65,0.3)",
            }}
          />

          <div className="space-y-8 pl-10">
            {posts.map((post, i) => (
              <div key={post.slug} className="relative">
                {/* Mobile dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="absolute -left-[34px] top-3 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: "#00ff41",
                    backgroundColor: "#050505",
                    boxShadow: "0 0 8px rgba(0,255,65,0.5)",
                  }}
                />
                <TimelineCard post={post} side="right" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

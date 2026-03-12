"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";
import type { PostMeta } from "@/types/post";
import { formatDate, getCategoryColor } from "@/lib/utils";
import { memo } from "react";

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

function BlogCard({ post, index = 0 }: BlogCardProps) {
  const primaryCat = post.categories[0] ?? "Uncategorized";
  const color = getCategoryColor(primaryCat);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--neon)]/30 transition-all duration-300 hover:shadow-[0_0_20px_var(--neon-glow)]"
    >
      {/* Top accent bar */}
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: color }}
      />

      <div className="p-5">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs px-2 py-1 rounded border font-semibold uppercase tracking-wider transition-colors"
              style={{
                color: getCategoryColor(cat),
                borderColor: getCategoryColor(cat) + "44",
                backgroundColor: getCategoryColor(cat) + "11",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-[var(--text)] font-bold text-lg mb-2 group-hover:text-[var(--neon)] transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 text-xs text-white">
          <div className="flex items-center gap-3">
            {post.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-[var(--neon)] hover:drop-shadow-[0_0_4px_var(--neon)] transition-all"
          >
            Read <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-[var(--border)]">
            {post.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-[10px] text-[var(--text-muted)] hover:text-[var(--neon)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Tag className="w-2.5 h-2.5 inline mr-0.5" />
                {tag}
              </Link>
            ))}
            {post.tags.length > 4 && (
              <span className="text-[10px] text-[var(--muted)]/60">
                +{post.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

// Export memoized version for better performance
export default memo(BlogCard);

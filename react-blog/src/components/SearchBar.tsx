"use client";
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import type { PostMeta } from "@/types/post";

export default function SearchBar({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostMeta[]>([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.categories.some((c) => c.toLowerCase().includes(q)),
    );
    setResults(filtered.slice(0, 8));
  }, [query, posts]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "var(--muted)" }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search posts, tags, categories..."
          className="w-full border rounded-lg pl-10 pr-10 py-3 outline-none transition-all duration-200 text-sm font-mono"
          style={{
            background: "var(--card)",
            color: "var(--text)",
            borderColor: focused ? "var(--neon)" : "var(--border)",
            boxShadow: focused ? "0 0 0 1px var(--neon-glow)" : "none",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[var(--neon)]"
            style={{ color: "var(--muted)" }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results dropdown — uses Next.js Link so basePath is auto-prepended */}
      {focused && results.length > 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 border rounded-lg overflow-hidden z-40 max-h-96 overflow-y-auto"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "0 0 20px var(--neon-glow)",
          }}
        >
          {results.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block px-4 py-3 border-b last:border-0 transition-colors hover:bg-[var(--card-hover)]"
              style={{ borderColor: "var(--border)" }}
            >
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                {post.title}
              </div>
              <div
                className="text-xs mt-0.5 line-clamp-1"
                style={{ color: "var(--muted)" }}
              >
                {post.excerpt}
              </div>
              <div className="flex gap-1 mt-1">
                {post.categories.map((c) => (
                  <span
                    key={c}
                    className="text-[10px]"
                    style={{ color: "var(--neon)" }}
                  >
                    [{c}]
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      {focused && query && results.length === 0 && (
        <div
          className="absolute top-full left-0 right-0 mt-2 border rounded-lg px-4 py-3 text-sm"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--muted)",
          }}
        >
          No results for &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

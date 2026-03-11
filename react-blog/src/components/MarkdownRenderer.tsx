"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef, memo, useCallback } from "react";
import "highlight.js/styles/github-dark.css";

// Prefix /images/... paths with the GitHub Pages basePath.
// NEXT_PUBLIC_BASE_PATH is injected at build time from next.config.js.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function resolveImageSrc(src?: string): string | undefined {
  if (!src) return undefined;
  // Prefix root-relative paths (e.g. /images/foo.png → /h45h-g4l4xy.github.io/images/foo.png)
  if (src.startsWith("/") && !src.startsWith("//")) {
    return `${BASE_PATH}${src}`;
  }
  return src;
}

interface Props {
  content: string;
}

// Simplified image component — native loading="lazy" is reliable cross-platform.
const LazyImage = memo(({ src, alt }: { src?: string; alt?: string }) => {
  const finalSrc = resolveImageSrc(src);

  if (!finalSrc) return null;

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={finalSrc}
        alt={alt || ""}
        className="rounded-lg border border-[var(--border)] w-full"
        loading="lazy"
        decoding="async"
      />
      {alt && (
        <figcaption className="text-center text-xs text-[var(--text-muted)] mt-2 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
});

LazyImage.displayName = "LazyImage";

// Table component
const TableWrapper = ({ children }: { children?: React.ReactNode }) => (
  <div className="overflow-x-auto my-6">
    <table className="min-w-full">{children}</table>
  </div>
);

// Blockquote component
const BlockquoteWrapper = ({ children }: { children?: React.ReactNode }) => (
  <blockquote className="border-l-4 border-[var(--neon)] pl-4 my-6 text-[var(--muted)] italic bg-[var(--neon)]/5 py-2 rounded-r-lg">
    {children}
  </blockquote>
);

function MarkdownRenderer({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const addCopyButtons = useCallback(() => {
    if (!ref.current) return;
    const pres = ref.current.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      pre.style.position = "relative";
      pre.classList.add("group");
      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-3 right-3 px-2 py-1 rounded text-xs border border-[var(--border)] bg-[var(--bg)]/80 text-[var(--muted)] hover:text-[var(--neon)] hover:border-[var(--neon)] transition-all opacity-0 group-hover:opacity-100 font-mono";
      btn.textContent = "copy";
      btn.onclick = async () => {
        const code = pre.querySelector("code")?.innerText ?? "";
        await navigator.clipboard.writeText(code);
        btn.textContent = "copied!";
        btn.style.color = "var(--neon)";
        setTimeout(() => {
          btn.textContent = "copy";
          btn.style.color = "";
        }, 2000);
      };
      pre.appendChild(btn);
    });
  }, []);

  useEffect(() => {
    addCopyButtons();
  }, [content, addCopyButtons]);

  return (
    // suppressHydrationWarning: rehypeHighlight can produce minor differences
    // between Node.js build output and browser runtime — this suppresses the
    // warning without affecting rendered output or functionality.
    <div ref={ref} className="prose" suppressHydrationWarning>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight, rehypeRaw]}
        components={{
          table: TableWrapper,
          blockquote: BlockquoteWrapper,
          h2: ({ children, id }) => (
            <h2 id={id} className="group flex items-center gap-2">
              <span className="text-[var(--muted)]">#</span>
              {children}
              {id && (
                <a
                  href={`#${id}`}
                  className="opacity-0 group-hover:opacity-50 text-[var(--muted)] text-base"
                >
                  ¶
                </a>
              )}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="group flex items-center gap-2">
              <span className="text-[var(--muted)]">##</span>
              {children}
            </h3>
          ),
          img: LazyImage,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default memo(MarkdownRenderer);

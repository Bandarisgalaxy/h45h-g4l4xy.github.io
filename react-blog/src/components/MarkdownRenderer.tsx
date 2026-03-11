"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef, memo, useCallback } from "react";
import "highlight.js/styles/github-dark.css";

interface Props {
  content: string;
}

// Memoized image component with lazy loading
const LazyImage = memo(({ src, alt }: { src?: string; alt?: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current || !src) return;

    // Native lazy loading
    imgRef.current.loading = "lazy";

    // Intersection Observer for more control
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = src;
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" },
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [src]);

  return (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        data-src={src}
        alt={alt || ""}
        className="rounded-lg border border-[var(--border)] w-full"
        loading="lazy"
        decoding="async"
        style={{ contentVisibility: "auto" }}
      />
      {alt && (
        <figcaption className="text-center text-xs text-[var(--text-muted)] mt-2">
          {alt}
        </figcaption>
      )}
    </figure>
  );
});

LazyImage.displayName = "LazyImage";

// Table component
const TableWrapper = ({ children }: { children?: React.ReactNode }) => (
  <div className="overflow-x-auto my-6" style={{ contentVisibility: "auto" }}>
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

  // Memoize the copy button handler
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
    <div ref={ref} className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight, rehypeRaw]}
        components={{
          table: TableWrapper,
          blockquote: BlockquoteWrapper,
          // Custom heading anchors
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

// Export memoized version
export default memo(MarkdownRenderer);

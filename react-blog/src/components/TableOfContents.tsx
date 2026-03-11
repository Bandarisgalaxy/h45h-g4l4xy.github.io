"use client";
import { useEffect, useState, memo } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function TableOfContents({ content }: { content: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    // Parse headings from markdown content
    const lines = content.split("\n");
    const parsed: Heading[] = [];
    lines.forEach((line) => {
      const m = line.match(/^(#{2,4})\s+(.+)$/);
      if (m) {
        const text = m[2].replace(/\*\*/g, "").replace(/`/g, "");
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        parsed.push({ id, text, level: m[1].length });
      }
    });
    setHeadings(parsed);
  }, [content]);

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 },
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="sticky top-24 border border-[#1a2a1a] rounded-lg bg-[#111] p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="flex items-center gap-2 mb-3 text-[#00ff41] font-semibold text-sm">
        <List className="w-4 h-4" />
        Contents
      </div>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id} style={{ paddingLeft: `${(level - 2) * 12}px` }}>
            <a
              href={`#${id}`}
              className={`block text-xs py-1 border-l-2 pl-2 transition-all duration-200 truncate ${
                active === id
                  ? "border-[#00ff41] text-[#00ff41]"
                  : "border-[#1a2a1a] text-[#4a7c4a] hover:text-[#ccffcc] hover:border-[#3a5c3a]"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default memo(TableOfContents);

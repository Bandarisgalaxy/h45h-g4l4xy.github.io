"use client";
import Link from "next/link";
import { getCategoryColor } from "@/lib/utils";

interface Props {
  categories: { name: string; count: number }[];
  active?: string;
}

export default function CategoryFilter({ categories, active }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
          !active
            ? "bg-[#00ff4115] border-[#00ff41] text-[#00ff41]"
            : "border-[#1a2a1a] text-[#4a7c4a] hover:border-[#3a5c3a] hover:text-[#ccffcc]"
        }`}
      >
        All ({categories.reduce((s, c) => s + c.count, 0)})
      </Link>
      {categories.map(({ name, count }) => {
        const color = getCategoryColor(name);
        const isActive = active === name.toLowerCase().replace(/\s+/g, "-");
        return (
          <Link
            key={name}
            href={`/categories/${name.toLowerCase().replace(/\s+/g, "-")}`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200"
            style={{
              color: isActive ? color : "#4a7c4a",
              borderColor: isActive ? color + "88" : "#1a2a1a",
              backgroundColor: isActive ? color + "15" : "transparent",
            }}
          >
            {name} ({count})
          </Link>
        );
      })}
    </div>
  );
}

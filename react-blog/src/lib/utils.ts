import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    SOC: "#00ff41",
    PicoCTF: "#00ccff",
    "CTF Tips & Tricks": "#ff9900",
    Projects: "#cc00ff",
    Cryptography: "#00ccff",
    "Web Exploitation": "#ff4444",
    "Log Analysis": "#00ff41",
    SIEM: "#00ff41",
    DFIR: "#00ff41",
    "Threat Hunting": "#00ff41",
  };
  return colors[category] ?? "#00ff41";
}

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "CTF Writeups", href: "/categories/picoctf" },
  { label: "SOC Learning", href: "/categories/soc" },
  { label: "Projects", href: "/categories/projects" },
  { label: "Timeline", href: "/timeline" },
  { label: "About", href: "/about" },
];

export const CATEGORY_TREE = {
  SOC: {
    color: "#00ff41",
    icon: "🛡️",
    description: "Security Operations Center learning path",
    subcategories: ["Log Analysis", "SIEM", "DFIR", "Threat Hunting"],
  },
  PicoCTF: {
    color: "#00ccff",
    icon: "🚩",
    description: "PicoCTF challenge writeups",
    subcategories: ["Cryptography", "Web Exploitation"],
  },
  "CTF Tips & Tricks": {
    color: "#ff9900",
    icon: "⚡",
    description: "General CTF tips and methodologies",
    subcategories: [],
  },
  Projects: {
    color: "#cc00ff",
    icon: "💻",
    description: "Personal cybersecurity projects",
    subcategories: ["AI Assisted Network Monitoring"],
  },
};

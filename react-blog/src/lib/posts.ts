import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "_posts");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const file = files.find(
    (f) => f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "") === slug,
  );
  if (!file) return null;

  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : "",
    categories: Array.isArray(data.categories) ? data.categories : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? "Harshith",
    description: data.description ?? "",
    toc: data.toc ?? false,
    content,
    readingTime: stats.text,
    excerpt:
      data.description ??
      content.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? new Date(data.date).toISOString() : "",
        categories: Array.isArray(data.categories) ? data.categories : [],
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author ?? "Harshith",
        description: data.description ?? "",
        toc: data.toc ?? false,
        readingTime: stats.text,
        excerpt:
          data.description ??
          content.slice(0, 160).replace(/[#*`]/g, "").trim() + "...",
      } as PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    p.categories.some((c) => c.toLowerCase() === category.toLowerCase()),
  );
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    p.categories.forEach((c) => {
      map.set(c, (map.get(c) ?? 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      map.set(t, (map.get(t) ?? 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  const all = getAllPosts().filter((p) => p.slug !== slug);
  return all
    .map((p) => {
      const sharedCats = p.categories.filter((c) =>
        post.categories.includes(c),
      ).length;
      const sharedTags = p.tags.filter((t) => post.tags.includes(t)).length;
      return { ...p, score: sharedCats * 2 + sharedTags };
    })
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, limit);
}

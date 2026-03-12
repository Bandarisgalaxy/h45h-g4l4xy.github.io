import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate, getCategoryColor } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, Clock, User, Tag, ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import BlogCard from "@/components/BlogCard";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | H45H G4L4XY`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(params.slug, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-[#4a7c4a] hover:text-[#00ff41] transition-colors text-sm mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-10">
        {/* Main content */}
        <article>
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs px-2.5 py-1 rounded border font-semibold uppercase tracking-wider transition-colors"
                style={{
                  color: getCategoryColor(cat),
                  borderColor: getCategoryColor(cat) + "44",
                  backgroundColor: getCategoryColor(cat) + "11",
                }}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#ccffcc] mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-[#4a7c4a] text-base mb-6 leading-relaxed border-l-4 border-[#1a2a1a] pl-4">
              {post.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-white mb-8 border-y border-[#1a2a1a] py-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            {post.date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime}
            </span>
          </div>

          {/* Markdown Content */}
          <MarkdownRenderer content={post.content} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[#1a2a1a]">
              <span className="text-xs text-[#3a5c3a] flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-xs px-2 py-1 rounded border border-[#1a2a1a] text-[#3a5c3a] hover:text-[#00ff41] hover:border-[#00ff4133] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-[#00ff41] mb-5">
                Related Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((p, i) => (
                  <BlogCard key={p.slug} post={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar ToC */}
        {post.toc && (
          <aside className="hidden xl:block">
            <TableOfContents content={post.content} />
          </aside>
        )}
      </div>
    </div>
  );
}

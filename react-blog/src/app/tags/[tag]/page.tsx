import { getAllTags, getPostsByTag } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  return getAllTags().map(({ name }) => ({ tag: name }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `#${params.tag} | H45H G4L4XY`,
    description: `Posts tagged with ${params.tag}`,
  };
}

export default function TagPage({ params }: Props) {
  const posts = getPostsByTag(params.tag);
  const allTags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold text-[#00ff41] mb-2">#{params.tag}</h1>
      <p className="text-[#4a7c4a] text-sm mb-8">
        {posts.length} post{posts.length !== 1 ? "s" : ""}
      </p>

      {/* All tags cloud */}
      <div className="flex flex-wrap gap-2 mb-10 p-4 border border-[#1a2a1a] rounded-lg bg-[#111]">
        {allTags.map(({ name, count }) => (
          <Link
            key={name}
            href={`/tags/${name}`}
            className={`text-xs px-2 py-1 rounded border transition-colors ${
              name === params.tag
                ? "border-[#00ff41] text-[#00ff41] bg-[#00ff4115]"
                : "border-[#1a2a1a] text-[#3a5c3a] hover:text-[#00ff41] hover:border-[#00ff4133]"
            }`}
          >
            #{name} ({count})
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#3a5c3a]">
          No posts with this tag.
        </div>
      )}
    </div>
  );
}

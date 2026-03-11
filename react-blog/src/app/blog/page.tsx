import { getAllPosts, getAllCategories } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | H45H G4L4XY",
  description:
    "All blog posts — CTF writeups, SOC learning, and cybersecurity projects.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#00ff41] mb-2">
          <span className="text-[#4a7c4a]">&gt;</span> All Posts
        </h1>
        <p className="text-[#4a7c4a] text-sm">
          {posts.length} article{posts.length !== 1 ? "s" : ""} published
        </p>
      </div>

      <div className="mb-6">
        <SearchBar posts={posts} />
      </div>

      <div className="mb-8">
        <CategoryFilter categories={categories} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-[#3a5c3a]">
          <p className="text-lg">No posts found.</p>
          <p className="text-sm mt-2">
            Run the migration script to import your posts.
          </p>
        </div>
      )}
    </div>
  );
}

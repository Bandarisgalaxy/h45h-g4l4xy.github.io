import { getAllCategories, getPostsByCategory } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | H45H G4L4XY",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold text-[#00ff41] mb-2">
        <span className="text-[#4a7c4a]">&gt;</span> Categories
      </h1>
      <p className="text-[#4a7c4a] text-sm mb-10">
        {categories.length} categories
      </p>

      <CategoryFilter categories={categories} />

      {/* Show all categories with their posts */}
      <div className="mt-12 space-y-14">
        {categories.map(({ name }) => {
          const posts = getPostsByCategory(name).slice(0, 4);
          return (
            <div key={name}>
              <h2 className="text-xl font-bold text-[#00ff41] mb-4">
                {name}{" "}
                <span className="text-[#3a5c3a] text-sm font-normal">
                  ({posts.length} posts)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {posts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { getAllPosts, getAllCategories } from "@/lib/posts";
import HomeClient from "@/components/HomeClient";

export default function HomePage() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 6);
  const categories = getAllCategories();
  return (
    <HomeClient
      recentPosts={recentPosts}
      categories={categories}
      allPosts={posts}
    />
  );
}

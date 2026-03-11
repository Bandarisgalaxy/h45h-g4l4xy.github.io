import { getAllCategories, getAllPosts, getPostsByCategory } from "@/lib/posts";
import { getCategoryColor } from "@/lib/utils";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { category: string };
}

const CAT_DESCRIPTIONS: Record<string, string> = {
  soc: "Security Operations Center — Log Analysis, SIEM, DFIR, and Threat Hunting articles.",
  picoctf:
    "PicoCTF challenge writeups covering Cryptography and Web Exploitation.",
  "ctf-tips-tricks":
    "General CTF tips, tricks, and methodologies for competitive hacking.",
  projects: "Personal cybersecurity projects including AI-assisted tools.",
  cryptography: "Cryptography challenges, ciphers, and encryption writeups.",
  "web-exploitation":
    "Web exploitation techniques and CTF challenge solutions.",
};

export async function generateStaticParams() {
  const cats = getAllCategories();
  const slugs = new Set<string>();
  cats.forEach(({ name }) => {
    slugs.add(name.toLowerCase().replace(/\s+/g, "-"));
  });
  return Array.from(slugs).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.category.replace(/-/g, " ");
  return {
    title: `${name.charAt(0).toUpperCase() + name.slice(1)} | H45H G4L4XY`,
    description:
      CAT_DESCRIPTIONS[params.category] ?? `Posts in ${name} category.`,
  };
}

export default function CategoryPage({ params }: Props) {
  const allPosts = getAllPosts();
  const categories = getAllCategories();

  // Find posts matching this category slug
  const catName = categories.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === params.category,
  )?.name;

  // Also handle parent categories that have subcategories (e.g. "soc" matches "SOC")
  const matchedCats = categories.filter((c) => {
    const slug = c.name.toLowerCase().replace(/\s+/g, "-");
    return slug === params.category || slug.startsWith(params.category);
  });

  const posts = allPosts.filter((p) =>
    p.categories.some((c) => {
      const slug = c.toLowerCase().replace(/\s+/g, "-");
      return (
        slug === params.category ||
        slug.startsWith(params.category) ||
        // Also match parent: "picoctf" matches posts with category "PicoCTF"
        c.toLowerCase() === params.category.replace(/-/g, " ")
      );
    }),
  );

  const displayName =
    catName ??
    params.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const color = getCategoryColor(displayName);
  const description = CAT_DESCRIPTIONS[params.category];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-24">
      {/* Header */}
      <div className="mb-10">
        <div
          className="inline-block text-xs px-3 py-1 rounded-full border mb-4 font-semibold uppercase tracking-wider"
          style={{
            color,
            borderColor: color + "44",
            backgroundColor: color + "11",
          }}
        >
          Category
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ color }}>
          {displayName}
        </h1>
        {description && (
          <p className="text-[#4a7c4a] text-sm max-w-xl">{description}</p>
        )}
        <p className="text-[#3a5c3a] text-xs mt-2">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="mb-6">
        <SearchBar posts={posts} />
      </div>

      <div className="mb-8">
        <CategoryFilter categories={categories} active={params.category} />
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#3a5c3a]">
          <p className="text-lg">No posts in this category yet.</p>
        </div>
      )}
    </div>
  );
}

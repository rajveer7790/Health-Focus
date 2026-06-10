import { getBlogPosts } from "@/lib/markdown";
import NewsCard from "@/components/NewsCard";

export const metadata = {
  title: "All Articles | Health Focus",
  description: "Browse all our evidence-based health, wellness, and nutrition articles.",
};

export default function BlogList() {
  const posts = getBlogPosts();

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-display font-bold mb-8">All Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <NewsCard key={post.slug} post={post} variant="default" />
        ))}
      </div>
    </div>
  );
}

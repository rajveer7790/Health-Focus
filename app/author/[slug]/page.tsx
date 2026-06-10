import { getBlogPosts, getAuthors, getAuthorBySlug } from "@/lib/markdown";
import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const authors = getAuthors();
  return authors.map(author => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};
  return {
    title: `${author.name} | Health Focus Authors`,
    description: author.bio,
  };
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const author = getAuthorBySlug(params.slug);
  
  if (!author) {
    notFound();
  }

  const posts = getBlogPosts().filter(p => p.author.toLowerCase().replace(/\s+/g, '-') === params.slug);

  return (
    <div className="container-custom py-16 max-w-4xl mx-auto">
      <div className="mb-16 p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        {author.avatar && (
          <img src={author.avatar} alt={author.name} className="w-32 h-32 rounded-full object-cover shadow-lg" />
        )}
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">{author.name}</h1>
          <p className="text-primary-600 font-bold mb-4">{author.role} {author.credentials && `| ${author.credentials}`}</p>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">{author.bio}</p>
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
        Articles by {author.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map(post => (
          <NewsCard key={post.slug} post={post} variant="default" />
        ))}
      </div>
      
      {posts.length === 0 && (
        <p className="text-neutral-500">No articles published yet.</p>
      )}
    </div>
  );
}

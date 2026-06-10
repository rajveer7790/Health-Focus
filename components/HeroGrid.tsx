import NewsCard from "./NewsCard";
import type { BlogPost } from "@/lib/markdown";

interface HeroGridProps {
  mainPost: BlogPost;
  leftPosts: BlogPost[];
  rightPosts: BlogPost[];
}

export default function HeroGrid({ mainPost, leftPosts, rightPosts }: HeroGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-b border-neutral-200 dark:border-neutral-800 pb-8 lg:pb-12 bg-white dark:bg-neutral-900 transition-colors duration-300">
      {/* LEFT COLUMN */}
      <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-4 border-t lg:border-t-0 lg:border-r border-neutral-200 dark:border-neutral-800 pt-6 lg:pt-0 lg:pr-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1 h-4 bg-primary-600"></span>
          <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
            More Top Stories
          </h3>
        </div>
        <div className="flex flex-col">
          {leftPosts.map((post) => (
            <NewsCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>
      </div>

      {/* CENTER COLUMN */}
      <div className="lg:col-span-6 order-1 lg:order-2">
        <NewsCard post={mainPost} variant="hero" imagePriority={true} />
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-3 order-3 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-6 lg:pt-0 lg:pl-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1 h-4 bg-neutral-900 dark:bg-neutral-500"></span>
          <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
            Don't Miss
          </h3>
        </div>
        <div className="flex flex-col gap-6">
          {rightPosts.map((post) => (
            <NewsCard key={post.slug} post={post} variant="default" />
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/markdown";

interface NewsCardProps {
  post: BlogPost;
  variant?: "default" | "horizontal" | "text-only" | "hero" | "compact" | "overlay" | "feature";
  className?: string;
  imagePriority?: boolean;
}

export default function NewsCard({
  post,
  variant = "default",
  className = "",
  imagePriority = false,
}: NewsCardProps) {
  const formattedDate = format(new Date(post.pubDate), "MMM d");
  const categoryName = post.category.replace(/-/g, " ");

  return (
    <Link href={`/blog/${post.slug}`} className={`group block ${className}`}>

      {/* ── HERO ── */}
      {variant === "hero" && (
        <div className="flex flex-col gap-5">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
            {post.image ? (
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading={imagePriority ? "eager" : "lazy"} />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800" />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-primary-600 dark:text-primary-400 font-bold uppercase text-xs tracking-widest">
              {categoryName}
            </span>
            <h2 className="font-display font-black text-3xl md:text-4xl xl:text-5xl leading-tight text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
              {post.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed line-clamp-3">
              {post.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium pt-1">
              <span className="font-bold text-neutral-700 dark:text-neutral-300">{post.author}</span>
              <span>·</span>
              <time dateTime={post.pubDate}>{format(new Date(post.pubDate), "MMM d, yyyy")}</time>
            </div>
          </div>
        </div>
      )}

      {/* ── FEATURE (large card with image left, text right) ── */}
      {variant === "feature" && (
        <div className="flex flex-col sm:flex-row gap-5 group">
          <div className="relative sm:w-48 md:w-56 aspect-video sm:aspect-square shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
            {post.image ? (
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/60 dark:to-primary-800/60" />
            )}
          </div>
          <div className="flex flex-col justify-center gap-2">
            <span className="text-primary-600 dark:text-primary-400 font-bold uppercase text-[11px] tracking-widest">{categoryName}</span>
            <h3 className="font-display font-black text-xl md:text-2xl leading-snug text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-3">
              {post.title}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">{post.description}</p>
            <span className="text-xs text-neutral-400 font-medium">{formattedDate}</span>
          </div>
        </div>
      )}

      {/* ── DEFAULT ── */}
      {variant === "default" && (
        <div className="flex flex-col gap-3 h-full group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            {post.image ? (
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700" />
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1 px-4 pb-5 pt-1">
            <span className="text-primary-600 dark:text-primary-400 font-bold uppercase text-[11px] tracking-widest">{categoryName}</span>
            <h3 className="font-display font-bold text-lg leading-snug text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 leading-relaxed">{post.description}</p>
            <span className="text-xs text-neutral-400 mt-auto pt-2 font-medium">{formattedDate}</span>
          </div>
        </div>
      )}

      {/* ── COMPACT ── */}
      {variant === "compact" && (
        <div className="flex gap-3 items-start py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0 group">
          <div className="relative w-20 h-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            {post.image ? (
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
            ) : (
              <div className="h-full w-full bg-neutral-200 dark:bg-neutral-700" />
            )}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-primary-600 dark:text-primary-400 font-bold uppercase text-[10px] tracking-wider">{categoryName}</span>
            <h4 className="font-display font-bold text-sm leading-snug text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">
              {post.title}
            </h4>
            <span className="text-[11px] text-neutral-400">{formattedDate}</span>
          </div>
        </div>
      )}

      {/* ── TEXT-ONLY ── */}
      {variant === "text-only" && (
        <div className="flex flex-col gap-1 py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
          <span className="text-primary-600 dark:text-primary-400 uppercase text-[10px] font-bold tracking-wider">{categoryName}</span>
          <h4 className="font-display font-bold text-base leading-snug text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-2">{post.title}</h4>
          <span className="text-[11px] text-neutral-400">{formattedDate}</span>
        </div>
      )}

      {/* ── OVERLAY ── */}
      {variant === "overlay" && (
        <div className="relative aspect-[3/4] overflow-hidden w-full rounded-2xl">
          <div className="absolute inset-0 bg-neutral-900">
            {post.image && (
              <img src={post.image} alt={post.title} className="h-full w-full object-cover opacity-75 group-hover:opacity-50 transition-opacity duration-300" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-5 text-white">
            <span className="bg-primary-600 text-white text-[10px] font-bold uppercase px-2 py-1 mb-3 inline-block rounded-sm tracking-wider">
              {categoryName}
            </span>
            <h3 className="font-display font-black text-xl leading-tight">{post.title}</h3>
          </div>
        </div>
      )}

    </Link>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Health Focus",
  description: "The page you're looking for doesn't exist. Browse our health and wellness articles.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated heart */}
        <div className="text-7xl mb-6 animate-heartbeat inline-block">❤️</div>

        <h1 className="text-8xl font-black text-primary-600 dark:text-primary-400 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
          The health article or page you're looking for has moved or doesn't exist. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            ← Back to Home
          </Link>
          <Link
            href="/blog"
            className="px-8 py-3 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white font-bold rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 transition-colors"
          >
            Browse All Articles
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-400 mb-4 uppercase tracking-wider font-semibold">Popular Topics</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: "Nutrition", slug: "nutrition" },
              { name: "Mental Health", slug: "mental-health" },
              { name: "Gut Health", slug: "gut-health" },
              { name: "Longevity", slug: "longevity" },
              { name: "Women's Health", slug: "womens-health" },
            ].map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-xs px-3 py-1.5 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-primary-400 hover:text-primary-600 transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

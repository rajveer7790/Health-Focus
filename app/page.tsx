import Link from "next/link";
import Reveal from "@/components/Reveal";
import NewsCard from "@/components/NewsCard";
import { getBlogPosts } from "@/lib/markdown";

const CATEGORIES = [
  { name: "Nutrition", slug: "nutrition", color: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800" },
  { name: "Mental Health", slug: "mental-health", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800" },
  { name: "Women's Health", slug: "womens-health", color: "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800" },
  { name: "Gut Health", slug: "gut-health", color: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800" },
  { name: "Longevity", slug: "longevity", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800" },
  { name: "Biohacking", slug: "biohacking", color: "bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800" },
  { name: "Heart Health", slug: "heart-health", color: "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800" },
  { name: "Hormone Health", slug: "hormone-health", color: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-800" },
];

export default function Home() {
  const allPosts = getBlogPosts();

  if (allPosts.length === 0) {
    return <div className="container-custom py-16 text-center text-xl font-bold">No posts found.</div>;
  }

  const heroPost = allPosts[0];
  const featuredPosts = allPosts.slice(1, 4);
  const sidebarPosts = allPosts.slice(4, 9);
  const latestPosts = allPosts.slice(9, 21);

  // Category sections — pick 3 posts each
  const categorySections = CATEGORIES.map(cat => ({
    ...cat,
    posts: allPosts.filter(p => p.category === cat.slug).slice(0, 3),
  })).filter(c => c.posts.length >= 2);

  // Lifestyle/wellness spotlight
  const wellnessPosts = allPosts.filter(p => p.category === "wellness" || p.category === "lifestyle").slice(0, 4);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* ── JSON-LD WebPage Schema — AEO / GEO structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Health Focus — Evidence-Based Health & Wellness",
            "description": "Expert-reviewed health articles on nutrition, mental health, gut health, hormone balance, longevity, and wellness for Americans.",
            "url": "https://healthfocus.fit",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Health Focus",
              "url": "https://healthfocus.fit"
            },
            "about": [
              { "@type": "MedicalCondition", "name": "Nutrition and Diet" },
              { "@type": "MedicalCondition", "name": "Mental Health" },
              { "@type": "MedicalCondition", "name": "Gut Health" },
              { "@type": "MedicalCondition", "name": "Hormonal Health" },
              { "@type": "MedicalCondition", "name": "Longevity" }
            ]
          })
        }}
      />

      {/* ── VISIBLE H1 — Google primary heading signal ── */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 py-6">
        <div className="container-custom text-center">
          <h1
            className="font-black text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight"
            style={{
              background: "linear-gradient(135deg, #16a34a 0%, #059669 40%, #0891b2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Health Focus — Evidence-Based Health &amp; Wellness
          </h1>
          <p className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
            Expert-Reviewed Articles · Nutrition · Mental Health · Longevity · Gut Health
          </p>
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
            {/* Main Hero Post */}
            <Reveal className="lg:col-span-7 xl:col-span-8">
              <NewsCard post={heroPost} variant="hero" imagePriority />
            </Reveal>
            {/* Sidebar: Top Stories */}
            <Reveal className="lg:col-span-5 xl:col-span-4 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800 pt-6 lg:pt-0 lg:pl-8" delay={150}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 bg-primary-600 rounded-full animate-heartbeat" />
                <h2 className="font-black text-sm uppercase tracking-widest text-neutral-900 dark:text-white">Top Stories</h2>
              </div>
              <div className="flex flex-col">
                {sidebarPosts.map(post => (
                  <NewsCard key={post.slug} post={post} variant="compact" />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── AEO / GEO: "What is Health Focus?" — AI citation signal ── */}
      <section
        aria-label="About Health Focus"
        className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800 py-8"
      >
        <div className="container-custom max-w-3xl mx-auto text-center px-4">
          <h2 className="sr-only">What is Health Focus?</h2>
          <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <strong className="text-neutral-900 dark:text-white">Health Focus</strong> is an evidence-based health and wellness publication dedicated to delivering accurate, science-backed information on nutrition, mental health, gut health, hormonal balance, and longevity.
            Every article is researched and written by a dedicated editorial team and reviewed by qualified medical professionals to ensure clinical accuracy.
            Our content is tailored for health-conscious Americans who want trustworthy, actionable guidance — without the noise.
          </p>
        </div>
      </section>

      {/* ── HEALTH STATS STRIP ── */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom py-5">
          <Reveal stagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "❤️", stat: "73+", label: "Health Articles", anim: "animate-heartbeat" },
              { icon: "🧬", stat: "100%", label: "Evidence Based", anim: "animate-float" },
              { icon: "🌿", stat: "8", label: "Topic Categories", anim: "animate-breathe" },
              { icon: "👩‍⚕️", stat: "USA", label: "English Content", anim: "animate-pulse-glow" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800">
                <span className={`text-2xl ${item.anim}`}>{item.icon}</span>
                <div>
                  <p className="font-black text-lg text-neutral-900 dark:text-white leading-none">{item.stat}</p>
                  <p className="text-xs text-neutral-500 font-medium">{item.label}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
      {/* ── BREAKING NEWS TICKER ── */}
      <div className="bg-primary-600 text-white py-2.5 overflow-hidden">
        <div className="container-custom flex items-center gap-4">
          <span className="shrink-0 font-black text-xs uppercase tracking-widest bg-white text-primary-600 px-3 py-1 rounded-full">New</span>
          <div className="flex gap-10 overflow-x-auto scrollbar-hide whitespace-nowrap text-sm font-medium">
            {allPosts.slice(0, 5).map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="hover:text-primary-200 transition-colors shrink-0">
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED TRIO ── */}
      <section className="bg-white dark:bg-neutral-900 py-12 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom">
          <Reveal className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1 h-6 bg-primary-600 rounded-full animate-heartbeat" />
              <h2 className="font-black text-xl uppercase tracking-widest text-neutral-900 dark:text-white">Editor's Picks</h2>
            </div>
            <Link href="/blog" className="text-sm font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider">
              View All →
            </Link>
          </Reveal>
          <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map(post => (
              <NewsCard key={post.slug} post={post} variant="default" />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── LATEST ARTICLES + SIDEBAR ── */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Latest Grid */}
            <div className="lg:col-span-8">
              <Reveal className="flex items-center gap-3 mb-8">
                <span className="w-1 h-6 bg-primary-600 rounded-full" />
                <h2 className="font-black text-xl uppercase tracking-widest text-neutral-900 dark:text-white">Latest Health Articles</h2>
              </Reveal>
              <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestPosts.map(post => (
                  <NewsCard key={post.slug} post={post} variant="default" />
                ))}
              </Reveal>
              <div className="mt-10 text-center">
                <Link href="/blog" className="inline-block px-10 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg uppercase tracking-wider text-sm">
                  Load More Articles →
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* Newsletter */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                  <h3 className="font-black text-lg mb-2">Your Weekly Health Dose</h3>
                  <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                    Evidence-based health insights, delivered to your inbox every week. Free.
                  </p>
                  <Link href="/contact" className="block w-full text-center bg-white text-primary-700 font-bold text-sm py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-sm">
                    Subscribe Free →
                  </Link>
                </div>

                {/* Browse Categories */}
                <Reveal className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1 h-5 bg-primary-600 rounded-full" />
                    <h3 className="font-black text-sm uppercase tracking-widest text-neutral-900 dark:text-white">Browse Topics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat, i) => (
                      <Link key={cat.slug} href={`/category/${cat.slug}`}
                        style={{ animationDelay: `${i * 0.3}s` }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all hover:scale-105 animate-breathe ${cat.color}`}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </Reveal>

                {/* Trending */}
                <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-1 h-5 bg-primary-600 rounded-full" />
                    <h3 className="font-black text-sm uppercase tracking-widest text-neutral-900 dark:text-white">Trending Now</h3>
                  </div>
                  <div className="space-y-1">
                    {allPosts.slice(0, 6).map((post, i) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-start gap-3 py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
                        <span className="text-2xl font-black text-neutral-200 dark:text-neutral-700 leading-none shrink-0 w-6 text-right">{i + 1}</span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">{post.category.replace(/-/g, ' ')}</span>
                          <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug mt-0.5">
                            {post.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CATEGORY SECTIONS ── */}
      {categorySections.slice(0, 4).map((cat, idx) => (
        <section key={cat.slug} className={`py-12 border-t border-neutral-200 dark:border-neutral-800 ${idx % 2 === 0 ? 'bg-white dark:bg-neutral-900' : 'bg-neutral-50 dark:bg-neutral-950'}`}>
          <div className="container-custom">
            <Reveal className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="w-1 h-6 bg-primary-600 rounded-full" />
                <h2 className="font-black text-xl uppercase tracking-widest text-neutral-900 dark:text-white">{cat.name}</h2>
              </div>
              <Link href={`/category/${cat.slug}`} className="text-sm font-bold text-primary-600 hover:text-primary-700 uppercase tracking-wider">
                More {cat.name} →
              </Link>
            </Reveal>
            <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cat.posts.map(post => (
                <NewsCard key={post.slug} post={post} variant="default" />
              ))}
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── WELLNESS OVERLAY SECTION ── */}
      {wellnessPosts.length >= 2 && (
        <section className="py-12 bg-neutral-900 dark:bg-black border-t border-neutral-800">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <span className="w-1 h-6 bg-primary-400 rounded-full" />
                <h2 className="font-black text-xl uppercase tracking-widest text-white">Wellness & Lifestyle</h2>
              </div>
              <Link href="/category/wellness" className="text-sm font-bold text-primary-400 hover:text-primary-300 uppercase tracking-wider">
                Explore All →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wellnessPosts.map(post => (
                <NewsCard key={post.slug} post={post} variant="overlay" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA BANNER ── */}
      <section className="py-16 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700">
        <Reveal className="container-custom text-center text-white">
          <span className="text-5xl animate-heartbeat inline-block mb-4">❤️</span>
          <h2 className="font-black text-3xl md:text-4xl mb-4">Take Control of Your Health Today</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of readers who get science-backed health insights every week — completely free.
          </p>
          <Link href="/contact" className="inline-block bg-white text-primary-700 font-black px-10 py-4 rounded-2xl text-base hover:bg-primary-50 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform animate-pulse-glow">
            Subscribe to Our Newsletter →
          </Link>
        </Reveal>
      </section>

    </div>
  );
}

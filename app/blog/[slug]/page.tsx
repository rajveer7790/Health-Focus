import { getBlogPosts, getBlogPostBySlug, getAuthorBySlug, getRelatedPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import type { Metadata } from "next";

const BASE_URL = "https://healthfocus.fit";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  // Trim description to max 155 chars for Google snippet
  const metaDesc = post.description.length > 155
    ? post.description.substring(0, 152) + "..."
    : post.description;

  return {
    title: post.title,
    description: metaDesc,
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: metaDesc,
      type: "article",
      publishedTime: post.pubDate,
      modifiedTime: post.updatedDate,
      authors: [`${BASE_URL}/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`],
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
      url: `${BASE_URL}/blog/${post.slug}`,
      siteName: "Health Focus",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: metaDesc,
      images: post.image ? [post.image] : [],
    },
  };
}

// Extract FAQ pairs from markdown content
function extractFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  // Match bold questions followed by answer text (common pattern in MDX)
  const faqRegex = /\*\*([^*?]+\?)\*\*\s*\n+([^\n*#]+(?:\n(?![#*\n])[^\n]+)*)/gm;
  let match;
  while ((match = faqRegex.exec(content)) !== null && faqs.length < 6) {
    const question = match[1].trim();
    const answer = match[2].replace(/\n/g, ' ').trim().substring(0, 500);
    if (question && answer.length > 30) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const author = getAuthorBySlug(post.author.toLowerCase().replace(/\s+/g, '-'));
  const relatedPosts = getRelatedPosts(post.slug, post.category, 3);
  const faqs = extractFAQs(post.content);
  const metaDesc = post.description.length > 155
    ? post.description.substring(0, 152) + "..."
    : post.description;

  // JSON-LD: Article Schema (upgraded for AEO/GEO — YMYL MedicalWebPage signal)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": ["Article", "MedicalWebPage"],
    "headline": post.title,
    "description": metaDesc,
    "image": post.image ? `${BASE_URL}${post.image}` : `${BASE_URL}/social-image.jpg`,
    "datePublished": post.pubDate,
    "dateModified": post.updatedDate || post.pubDate,
    "lastReviewed": post.updatedDate || post.pubDate,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${BASE_URL}/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`,
    },
    "reviewedBy": {
      "@type": "Person",
      "name": "Dr. Priya Sharma",
      "jobTitle": "Endocrinologist & Medical Reviewer",
      "url": "https://healthfocus.fit/about",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Health Focus",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    "url": `${BASE_URL}/blog/${post.slug}`,
    "keywords": post.tags?.join(", "),
    "articleSection": post.category.replace(/-/g, ' '),
    "inLanguage": "en-US",
    "specialty": "Nutrition, Mental Health, and Wellness",
    "citation": [
      "https://www.ncbi.nlm.nih.gov/",
      "https://www.who.int/",
    ],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".article-summary", "h2"],
    },
  };

  // JSON-LD: BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": post.category.replace(/-/g, ' '), "item": `${BASE_URL}/category/${post.category}` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  // JSON-LD: FAQPage Schema (only if FAQs found)
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  return (
    <div className="bg-white dark:bg-neutral-950 min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="container-custom mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-12">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-8 text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-2 font-semibold flex-wrap">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <Link href={`/category/${post.category}`} className="hover:text-primary-600 transition-colors capitalize">
            {post.category.replace(/-/g, ' ')}
          </Link>
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <span className="text-neutral-400 truncate max-w-[240px]">{post.title.substring(0, 45)}{post.title.length > 45 ? '...' : ''}</span>
        </nav>

        {/* Main 2-Column Grid: Article + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* ── LEFT: Main Article ── */}
          <article className="flex-1 min-w-0">

            {/* Category Tag */}
            <div className="mb-5">
              <Link
                href={`/category/${post.category}`}
                className="inline-block bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-primary-100 transition-colors"
              >
                {post.category.replace(/-/g, ' ')}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-neutral-900 dark:text-white leading-tight mb-6">
              {post.title}
            </h1>

            {/* Byline Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-neutral-200 dark:border-neutral-800 mb-8">
              <div className="flex items-center gap-3">
                {author?.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={`${author.name} - Health Focus author`}
                    width={44}
                    height={44}
                    className="w-11 h-11 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">{post.author}</p>
                  <p className="text-xs text-neutral-500">
                    Published <time dateTime={post.pubDate}>{format(new Date(post.pubDate), "MMMM d, yyyy")}</time>
                    {post.updatedDate && (
                      <> · Updated <time dateTime={post.updatedDate}>{format(new Date(post.updatedDate), "MMM d, yyyy")}</time></>
                    )}
                  </p>
                </div>
              </div>
              {/* Trust badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Evidence Based badge */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Evidence Based
                </div>
                {/* Medically Reviewed badge */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
                  🩺 Medically Reviewed by Dr. Priya Sharma
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="relative mb-10 rounded-2xl overflow-hidden shadow-md aspect-video bg-neutral-100 dark:bg-neutral-900">
                <Image
                  src={post.image}
                  alt={`${post.title} - Health Focus`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Lead / Description — article-summary class for speakable targeting */}
            <p className="article-summary text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif italic mb-10 pl-5 border-l-4 border-primary-500">
              {post.description}
            </p>

            {/* Article Body */}
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-neutral-900 dark:prose-h2:text-white
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-neutral-800 dark:prose-p:text-neutral-300
              prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-900 dark:prose-strong:text-white
              prose-ul:my-4 prose-li:my-1
              prose-blockquote:border-l-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-900/20 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-4
              prose-img:rounded-2xl prose-img:shadow-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags — now linked to category */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider self-center mr-2">Topics:</span>
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Medical Disclaimer Box */}
            <div
              style={{
                backgroundColor: '#fffbeb',
                border: '1px solid #fcd34d',
                borderRadius: '12px',
                padding: '14px 18px',
                marginTop: '32px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
              className="dark:bg-amber-900/20 dark:border-amber-700/50"
              role="note"
              aria-label="Medical Disclaimer"
            >
              <span style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>⚕️</span>
              <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.6', color: '#92400e', fontWeight: 500 }} className="dark:text-amber-300">
                <strong>Medical Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider.
              </p>
            </div>

            {/* Visible FAQ Section for AEO */}
            {faqs.length > 0 && (
              <div className="mt-12 mb-8 bg-neutral-50 dark:bg-neutral-900 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl font-display font-bold text-neutral-900 dark:text-white mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-2">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{faq.question}</h3>
                      <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Card */}
            {author && (
              <div className="mt-8 p-6 md:p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col sm:flex-row gap-6 items-start">
                {author.avatar && (
                  <Image
                    src={author.avatar}
                    alt={`${author.name} - Health Focus`}
                    width={80}
                    height={80}
                    className="w-20 h-20 shrink-0 rounded-full object-cover shadow border-2 border-white dark:border-neutral-800"
                  />
                )}
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1 font-semibold">Written by</p>
                  <h2 className="font-display font-black text-xl text-neutral-900 dark:text-white mb-1">{author.name}</h2>
                  {author.credentials && (
                    <p className="text-xs font-bold text-primary-600 dark:text-primary-400 mb-3 uppercase tracking-wider">{author.credentials}</p>
                  )}
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">{author.bio}</p>
                </div>
              </div>
            )}

            {/* Related Posts (mobile) */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 lg:hidden">
                <h2 className="text-xl font-display font-black text-neutral-900 dark:text-white mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {relatedPosts.map(related => (
                    <Link key={related.slug} href={`/blog/${related.slug}`} className="group flex gap-4 items-start p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all bg-white dark:bg-neutral-900">
                      {related.image && (
                        <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                          <Image src={related.image} alt={related.title} fill sizes="80px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">{related.category.replace(/-/g, ' ')}</span>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug mt-1 group-hover:text-primary-600 transition-colors line-clamp-2">{related.title}</h3>
                        <p className="text-xs text-neutral-500 mt-1">{format(new Date(related.pubDate), "MMM d, yyyy")}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <aside className="hidden lg:block w-80 xl:w-96 shrink-0" aria-label="Sidebar">
            <div className="sticky top-32 space-y-8">

              {/* Related Articles Sidebar */}
              {relatedPosts.length > 0 && (
                <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                  <h2 className="text-sm font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-5 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary-500 rounded-full inline-block"></span>
                    Related Articles
                  </h2>
                  <div className="space-y-5">
                    {relatedPosts.map(related => (
                      <Link key={related.slug} href={`/blog/${related.slug}`} className="group flex gap-3 items-start">
                        {related.image && (
                          <div className="relative w-16 h-14 shrink-0 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700">
                            <Image src={related.image} alt={related.title} fill sizes="64px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">{related.category.replace(/-/g, ' ')}</span>
                          <h3 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 leading-snug mt-0.5 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">{related.title}</h3>
                          <p className="text-[10px] text-neutral-400 mt-1">{format(new Date(related.pubDate), "MMM d, yyyy")}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/blog" className="mt-6 block text-center text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 uppercase tracking-wider py-2 border border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                    View All Articles →
                  </Link>
                </div>
              )}

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white">
                <h3 className="font-display font-black text-lg mb-2">Stay Healthy &amp; Informed</h3>
                <p className="text-primary-100 text-sm mb-4 leading-relaxed">Get evidence-based health tips delivered to your inbox weekly.</p>
                <Link href="/contact" className="block w-full text-center bg-white text-primary-700 font-bold text-sm py-2.5 rounded-xl hover:bg-primary-50 transition-colors">
                  Subscribe Free →
                </Link>
              </div>

              {/* Browse Categories */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary-500 rounded-full inline-block"></span>
                  Browse Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    {name:'Nutrition', slug:'nutrition'},
                    {name:'Mental Health', slug:'mental-health'},
                    {name:'Gut Health', slug:'gut-health'},
                    {name:'Hormone Health', slug:'hormone-health'},
                    {name:'Longevity', slug:'longevity'},
                    {name:'Biohacking', slug:'biohacking'},
                    {name:'Women\'s Health', slug:'womens-health'},
                    {name:'Men\'s Health', slug:'mens-health'},
                    {name:'Wellness', slug:'wellness'},
                  ].map(cat => (
                    <Link key={cat.slug} href={`/category/${cat.slug}`} className="text-xs px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-neutral-200 dark:border-neutral-700">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

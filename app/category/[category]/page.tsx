import { getBlogPosts } from "@/lib/markdown";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://healthfocus.fit";

// Rich keyword-targeted descriptions per category
const CATEGORY_META: Record<string, { title: string; description: string; heading: string; subheading: string }> = {
  "nutrition": {
    title: "Nutrition Articles & Science-Backed Diet Tips | Health Focus",
    description: "Evidence-based nutrition guides on protein, gut health, metabolic health & healthy eating for Americans. Expert-reviewed diet science, updated 2026.",
    heading: "Nutrition",
    subheading: "Science-backed food and diet insights for a healthier you.",
  },
  "mental-health": {
    title: "Mental Health Articles & Wellness Guides | Health Focus",
    description: "Expert-reviewed mental health resources covering anxiety, depression, stress, nervous system regulation & burnout for Americans. Updated 2026.",
    heading: "Mental Health",
    subheading: "Evidence-based mental wellness resources to help you thrive.",
  },
  "womens-health": {
    title: "Women's Health Articles — Hormones, PCOS & More | Health Focus",
    description: "Women's health guides on hormones, PCOS, perimenopause, cycle syncing, fertility & postpartum care. Written for American women, reviewed by experts.",
    heading: "Women's Health",
    subheading: "Expert health guides for every stage of a woman's life.",
  },
  "mens-health": {
    title: "Men's Health Articles — Testosterone, Longevity & Fitness | Health Focus",
    description: "Men's health guides on testosterone, prostate health, longevity habits & biohacking for men over 35. Evidence-based, updated 2026.",
    heading: "Men's Health",
    subheading: "Science-backed health strategies built for men.",
  },
  "gut-health": {
    title: "Gut Health Guides — Microbiome, Digestion & More | Health Focus",
    description: "Complete gut health resources: microbiome science, digestive issues, the gut-brain connection & anti-inflammatory diets. Expert-reviewed, 2026.",
    heading: "Gut Health",
    subheading: "Unlock the power of your microbiome for whole-body wellness.",
  },
  "hormone-health": {
    title: "Hormone Health Articles — Balance & Optimization | Health Focus",
    description: "Expert guides on hormone balance, estrogen, progesterone, cortisol & perimenopause for women and men. Evidence-based hormone health, updated 2026.",
    heading: "Hormone Health",
    subheading: "Understand and optimize your hormones at every age.",
  },
  "longevity": {
    title: "Longevity & Healthy Aging Articles | Health Focus",
    description: "Science-backed longevity strategies, anti-aging research, blue zone habits & healthspan optimization. Expert-reviewed guides for living longer, better.",
    heading: "Longevity",
    subheading: "Live longer, better — with science on your side.",
  },
  "biohacking": {
    title: "Biohacking Guides — Optimize Your Health & Performance | Health Focus",
    description: "Evidence-based biohacking: cold plunge, sleep optimization, HRV, red light therapy & performance nutrition. Science-reviewed guides for 2026.",
    heading: "Biohacking",
    subheading: "Upgrade your biology with evidence-based optimization strategies.",
  },
  "metabolic-health": {
    title: "Metabolic Health Articles — Insulin, Blood Sugar & More | Health Focus",
    description: "Expert guides on metabolic health: insulin resistance, blood sugar regulation, metabolic syndrome & GLP-1 drugs. Evidence-based, updated 2026.",
    heading: "Metabolic Health",
    subheading: "Master your metabolism for lasting energy and weight health.",
  },
  "heart-health": {
    title: "Heart Health Articles — Cardiovascular Wellness | Health Focus",
    description: "Cardiovascular health guides on heart disease prevention, cholesterol, hypertension & heart-healthy diets for Americans. Expert-reviewed, 2026.",
    heading: "Heart Health",
    subheading: "Protect your heart with science-backed strategies.",
  },
  "nervous-system": {
    title: "Nervous System Health & Regulation Guides | Health Focus",
    description: "Expert guides on nervous system regulation, vagus nerve, somatic exercises & stress recovery. Evidence-based techniques for calm and resilience.",
    heading: "Nervous System",
    subheading: "Regulate your nervous system for lasting calm and resilience.",
  },
  "skin-longevity": {
    title: "Skin Longevity & Anti-Aging Articles | Health Focus",
    description: "Inside-out skin health guides: collagen, gut-skin axis, anti-aging nutrition & skincare routines for women over 35. Expert-reviewed, 2026.",
    heading: "Skin Longevity",
    subheading: "Nourish glowing, healthy skin from the inside out.",
  },
  "wellness": {
    title: "Wellness Articles — Healthy Living & Lifestyle | Health Focus",
    description: "Holistic wellness guides covering cold plunge, GLP-1 trends, healthy habits & longevity lifestyle practices. Evidence-based wellness for Americans.",
    heading: "Wellness",
    subheading: "Whole-life wellness strategies backed by modern science.",
  },
  "lifestyle": {
    title: "Healthy Lifestyle Articles | Health Focus",
    description: "Practical lifestyle guides on digital detox, screen time, sleep habits & sustainable wellness routines for busy Americans. Updated 2026.",
    heading: "Lifestyle",
    subheading: "Build healthy habits that actually stick.",
  },
  "healthy-habits": {
    title: "Healthy Habits & Daily Routines | Health Focus",
    description: "Evidence-based guides on building healthy daily habits, avoiding microplastics, and creating sustainable wellness routines for Americans.",
    heading: "Healthy Habits",
    subheading: "Small daily habits, big long-term health wins.",
  },
  "environmental-health": {
    title: "Environmental Health Articles — Toxins & Clean Living | Health Focus",
    description: "Guides on environmental health: PFAS, microplastics, water quality & reducing toxic exposure for American families. Expert-reviewed, 2026.",
    heading: "Environmental Health",
    subheading: "Protect your health from hidden environmental threats.",
  },
};

function getCategoryMeta(slug: string) {
  if (CATEGORY_META[slug]) return CATEGORY_META[slug];
  const name = slug.replace(/-/g, ' ');
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return {
    title: `${capitalized} Articles & Guides | Health Focus`,
    description: `Expert-reviewed ${name} articles with evidence-based insights for Americans. Explore all ${name} guides on Health Focus.`,
    heading: capitalized,
    subheading: `Evidence-based ${name} guides for better health.`,
  };
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  const categories = new Set(posts.map(p => p.category));
  return Array.from(categories).map(category => ({ category }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const meta = getCategoryMeta(params.category);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${BASE_URL}/category/${params.category}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${BASE_URL}/category/${params.category}`,
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const posts = getBlogPosts().filter(p => p.category === params.category);
  if (posts.length === 0) notFound();

  const meta = getCategoryMeta(params.category);

  // JSON-LD for category page
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": meta.title,
    "description": meta.description,
    "url": `${BASE_URL}/category/${params.category}`,
    "hasPart": posts.slice(0, 10).map(p => ({
      "@type": "Article",
      "headline": p.title,
      "url": `${BASE_URL}/blog/${p.slug}`,
      "datePublished": p.pubDate,
    })),
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Category Hero */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="container-custom py-10 md:py-14">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-5 text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-2 font-semibold">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-neutral-400 capitalize">{params.category.replace(/-/g, ' ')}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <span className="w-1.5 h-8 bg-primary-600 rounded-full" />
            <h1 className="text-4xl md:text-5xl font-display font-black text-neutral-900 dark:text-white capitalize">
              {meta.heading}
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 ml-6 max-w-2xl">{meta.subheading}</p>
          <p className="text-sm text-neutral-400 ml-6 mt-2">{posts.length} articles</p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <NewsCard key={post.slug} post={post} variant="default" />
          ))}
        </div>
      </div>
    </div>
  );
}

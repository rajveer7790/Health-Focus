import { getBlogPosts } from "@/lib/markdown";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const BASE_URL = "https://healthfocus.fit";

// Rich keyword-targeted descriptions per category
const CATEGORY_META: Record<string, { title: string; description: string; heading: string; subheading: string; intro: string; medicalTopic: string; specialty: string }> = {
  "nutrition": {
    title: "Nutrition Articles & Science-Backed Diet Tips | Health Focus",
    description: "Evidence-based nutrition guides on protein, gut health, metabolic health & healthy eating for Americans. Expert-reviewed diet science, updated 2026.",
    heading: "Nutrition",
    subheading: "Science-backed food and diet insights for a healthier you.",
    intro: "Nutrition is the foundation of physical health, influencing everything from energy levels and immune function to chronic disease risk. Science-backed dietary choices—centered on whole foods, balanced macronutrients, and adequate micronutrients—are among the most powerful tools for long-term wellbeing.",
    medicalTopic: "Nutrition",
    specialty: "Dietetics",
  },
  "mental-health": {
    title: "Mental Health Articles & Wellness Guides | Health Focus",
    description: "Expert-reviewed mental health resources covering anxiety, depression, stress, nervous system regulation & burnout for Americans. Updated 2026.",
    heading: "Mental Health",
    subheading: "Evidence-based mental wellness resources to help you thrive.",
    intro: "Mental health encompasses emotional, psychological, and social wellbeing, shaping how we think, feel, and handle stress. Understanding and actively supporting mental wellness through evidence-based practices—including therapy, lifestyle changes, and community connection—is essential for a fulfilling life.",
    medicalTopic: "Mental Health",
    specialty: "Psychiatry",
  },
  "womens-health": {
    title: "Women's Health Articles — Hormones, PCOS & More | Health Focus",
    description: "Women's health guides on hormones, PCOS, perimenopause, cycle syncing, fertility & postpartum care. Written for American women, reviewed by experts.",
    heading: "Women's Health",
    subheading: "Expert health guides for every stage of a woman's life.",
    intro: "Women's health addresses the unique physiological and hormonal changes women experience across all life stages, from puberty through menopause. Expert guidance on conditions like PCOS, perimenopause, and hormonal imbalance empowers women to make informed decisions for their long-term vitality.",
    medicalTopic: "Women's Health",
    specialty: "Obstetrics and Gynecology",
  },
  "mens-health": {
    title: "Men's Health Articles — Testosterone, Longevity & Fitness | Health Focus",
    description: "Men's health guides on testosterone, prostate health, longevity habits & biohacking for men over 35. Evidence-based, updated 2026.",
    heading: "Men's Health",
    subheading: "Science-backed health strategies built for men.",
    intro: "Men's health focuses on the specific biological and lifestyle factors that affect male longevity, hormone balance, and chronic disease prevention. Evidence-based strategies around testosterone optimization, cardiovascular fitness, and prostate care are critical for men looking to age with strength and vitality.",
    medicalTopic: "Men's Health",
    specialty: "Urology",
  },
  "gut-health": {
    title: "Gut Health Guides — Microbiome, Digestion & More | Health Focus",
    description: "Complete gut health resources: microbiome science, digestive issues, the gut-brain connection & anti-inflammatory diets. Expert-reviewed, 2026.",
    heading: "Gut Health",
    subheading: "Unlock the power of your microbiome for whole-body wellness.",
    intro: "Gut health refers to the balance and function of the gastrointestinal tract, which houses trillions of microbes collectively known as the microbiome. A healthy gut influences digestion, immunity, mood, and inflammation—making it one of the most researched frontiers in modern preventive medicine.",
    medicalTopic: "Gastrointestinal Health",
    specialty: "Gastroenterology",
  },
  "hormone-health": {
    title: "Hormone Health Articles — Balance & Optimization | Health Focus",
    description: "Expert guides on hormone balance, estrogen, progesterone, cortisol & perimenopause for women and men. Evidence-based hormone health, updated 2026.",
    heading: "Hormone Health",
    subheading: "Understand and optimize your hormones at every age.",
    intro: "Hormone health involves maintaining the proper production, balance, and signaling of key hormones like estrogen, testosterone, cortisol, and thyroid hormones. Imbalances can impact mood, weight, sleep, and fertility, making hormone optimization a cornerstone of preventive and functional medicine.",
    medicalTopic: "Endocrine Disorders",
    specialty: "Endocrinology",
  },
  "longevity": {
    title: "Longevity & Healthy Aging Articles | Health Focus",
    description: "Science-backed longevity strategies, anti-aging research, blue zone habits & healthspan optimization. Expert-reviewed guides for living longer, better.",
    heading: "Longevity",
    subheading: "Live longer, better — with science on your side.",
    intro: "Longevity science explores the biological mechanisms of aging and identifies lifestyle interventions that extend both lifespan and healthspan. From blue zone habits and senolytic research to exercise and caloric restriction, modern science is rapidly advancing our ability to age with vitality.",
    medicalTopic: "Aging and Longevity",
    specialty: "Geriatrics",
  },
  "biohacking": {
    title: "Biohacking Guides — Optimize Your Health & Performance | Health Focus",
    description: "Evidence-based biohacking: cold plunge, sleep optimization, HRV, red light therapy & performance nutrition. Science-reviewed guides for 2026.",
    heading: "Biohacking",
    subheading: "Upgrade your biology with evidence-based optimization strategies.",
    intro: "Biohacking is the practice of using science-based interventions—ranging from cold exposure and light therapy to HRV monitoring and precision nutrition—to optimize human performance and resilience. When grounded in evidence, these strategies can meaningfully enhance energy, cognition, and recovery.",
    medicalTopic: "Human Performance Optimization",
    specialty: "Sports Medicine",
  },
  "metabolic-health": {
    title: "Metabolic Health Articles — Insulin, Blood Sugar & More | Health Focus",
    description: "Expert guides on metabolic health: insulin resistance, blood sugar regulation, metabolic syndrome & GLP-1 drugs. Evidence-based, updated 2026.",
    heading: "Metabolic Health",
    subheading: "Master your metabolism for lasting energy and weight health.",
    intro: "Metabolic health refers to how efficiently the body processes and uses energy, with key markers including blood sugar, insulin sensitivity, triglycerides, and waist circumference. Poor metabolic health is a root driver of type 2 diabetes, cardiovascular disease, and obesity—making it a central focus of modern preventive care.",
    medicalTopic: "Metabolic Syndrome",
    specialty: "Endocrinology",
  },
  "heart-health": {
    title: "Heart Health Articles — Cardiovascular Wellness | Health Focus",
    description: "Cardiovascular health guides on heart disease prevention, cholesterol, hypertension & heart-healthy diets for Americans. Expert-reviewed, 2026.",
    heading: "Heart Health",
    subheading: "Protect your heart with science-backed strategies.",
    intro: "Heart health encompasses the prevention and management of cardiovascular conditions including hypertension, coronary artery disease, and high cholesterol. As the leading cause of death in the United States, cardiovascular disease is largely preventable through evidence-based diet, exercise, and lifestyle modifications.",
    medicalTopic: "Cardiovascular Disease",
    specialty: "Cardiology",
  },
  "nervous-system": {
    title: "Nervous System Health & Regulation Guides | Health Focus",
    description: "Expert guides on nervous system regulation, vagus nerve, somatic exercises & stress recovery. Evidence-based techniques for calm and resilience.",
    heading: "Nervous System",
    subheading: "Regulate your nervous system for lasting calm and resilience.",
    intro: "The nervous system governs the body's stress response, emotional regulation, and autonomic functions like heart rate and digestion. Techniques such as vagus nerve stimulation, breathwork, and somatic exercises are emerging as evidence-based tools for building resilience and recovering from chronic stress.",
    medicalTopic: "Nervous System Disorders",
    specialty: "Neurology",
  },
  "skin-longevity": {
    title: "Skin Longevity & Anti-Aging Articles | Health Focus",
    description: "Inside-out skin health guides: collagen, gut-skin axis, anti-aging nutrition & skincare routines for women over 35. Expert-reviewed, 2026.",
    heading: "Skin Longevity",
    subheading: "Nourish glowing, healthy skin from the inside out.",
    intro: "Skin longevity focuses on preserving and restoring the skin's structural integrity over time by addressing internal factors like collagen synthesis, gut health, inflammation, and nutrition. Emerging research on the gut-skin axis and anti-aging compounds is transforming how we approach healthy, youthful skin from the inside out.",
    medicalTopic: "Dermatological Health",
    specialty: "Dermatology",
  },
  "wellness": {
    title: "Wellness Articles — Healthy Living & Lifestyle | Health Focus",
    description: "Holistic wellness guides covering cold plunge, GLP-1 trends, healthy habits & longevity lifestyle practices. Evidence-based wellness for Americans.",
    heading: "Wellness",
    subheading: "Whole-life wellness strategies backed by modern science.",
    intro: "Wellness is a holistic concept that encompasses physical, mental, emotional, and social health—going beyond the mere absence of disease. Building sustainable wellness practices, informed by modern science and tailored to individual needs, is the most reliable path to long-term vitality and life satisfaction.",
    medicalTopic: "Preventive Health",
    specialty: "Preventive Medicine",
  },
  "lifestyle": {
    title: "Healthy Lifestyle Articles | Health Focus",
    description: "Practical lifestyle guides on digital detox, screen time, sleep habits & sustainable wellness routines for busy Americans. Updated 2026.",
    heading: "Lifestyle",
    subheading: "Build healthy habits that actually stick.",
    intro: "Lifestyle choices—including sleep quality, physical activity, digital habits, and social connection—are the most impactful determinants of long-term health outcomes. Evidence-based lifestyle medicine offers practical, sustainable strategies to help busy people make meaningful improvements to their daily routines.",
    medicalTopic: "Lifestyle Medicine",
    specialty: "Preventive Medicine",
  },
  "healthy-habits": {
    title: "Healthy Habits & Daily Routines | Health Focus",
    description: "Evidence-based guides on building healthy daily habits, avoiding microplastics, and creating sustainable wellness routines for Americans.",
    heading: "Healthy Habits",
    subheading: "Small daily habits, big long-term health wins.",
    intro: "Healthy habits are the small, consistent behaviors that compound over time to produce dramatic improvements in health and wellbeing. Research in behavioral science shows that habit stacking, environment design, and identity-based change are the most effective methods for building routines that last.",
    medicalTopic: "Behavioral Health",
    specialty: "Preventive Medicine",
  },
  "environmental-health": {
    title: "Environmental Health Articles — Toxins & Clean Living | Health Focus",
    description: "Guides on environmental health: PFAS, microplastics, water quality & reducing toxic exposure for American families. Expert-reviewed, 2026.",
    heading: "Environmental Health",
    subheading: "Protect your health from hidden environmental threats.",
    intro: "Environmental health examines how exposure to toxins, pollutants, and synthetic chemicals in our surroundings affects human biology and disease risk. Growing evidence links everyday exposures to PFAS, microplastics, and endocrine disruptors with hormonal disruption, cancer, and chronic inflammation—making awareness and mitigation critical.",
    medicalTopic: "Environmental Toxicology",
    specialty: "Environmental Medicine",
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
    intro: `${capitalized} is an important area of health and wellness that affects overall quality of life. Explore our evidence-based articles to learn practical strategies for improving your ${name.toLowerCase()} and long-term wellbeing.`,
    medicalTopic: capitalized,
    specialty: "Preventive Medicine",
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
  const categoryName = meta.heading;

  // Enhanced JSON-LD: CollectionPage with medical context
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": meta.title,
    "description": meta.description,
    "url": `${BASE_URL}/category/${params.category}`,
    "numberOfItems": posts.length,
    "about": {
      "@type": "MedicalCondition",
      "name": meta.medicalTopic,
    },
    "specialty": meta.specialty,
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Health Focus",
      "url": BASE_URL,
    },
    "hasPart": posts.slice(0, 10).map(p => ({
      "@type": "Article",
      "headline": p.title,
      "url": `${BASE_URL}/blog/${p.slug}`,
      "datePublished": p.pubDate,
    })),
  };

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": BASE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryName,
        "item": `${BASE_URL}/category/${params.category}`,
      },
    ],
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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

          {/* AEO-optimized intro paragraph */}
          <p className="text-neutral-600 dark:text-neutral-400 ml-6 mt-3 max-w-2xl text-base leading-relaxed">
            {meta.intro}
          </p>

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

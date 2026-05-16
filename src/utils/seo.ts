export const SITE_CONFIG = {
    title: 'Health Focus',
    description: 'Practical guidance for building sustainable fitness and healthy habits in real life.',
    url: 'https://healthfocus.fit',
    author: 'Health Focus Team',
    defaultImage: '/android-chrome-512x512.png',
    twitterHandle: '@healthfocus',
};

export const CATEGORIES = [
    { name: 'Mental Health', slug: 'mental-health', icon: '🧠', color: 'primary' },
    { name: 'Nutrition', slug: 'nutrition', icon: '🥗', color: 'success' },
    { name: 'Fitness', slug: 'fitness', icon: '💪', color: 'accent' },
    { name: 'Sleep', slug: 'sleep', icon: '😴', color: 'primary' },
    { name: 'Healthy Habits', slug: 'healthy-habits', icon: '✅', color: 'success' },
    { name: 'Wellness', slug: 'wellness', icon: '🌿', color: 'primary' },
    { name: 'Women\'s Health', slug: 'womens-health', icon: '🌸', color: 'accent' },
    { name: 'Longevity', slug: 'longevity', icon: '⏳', color: 'success' },
    { name: 'Gut Health', slug: 'gut-health', icon: '🦠', color: 'primary' },
    { name: 'Biohacking', slug: 'biohacking', icon: '⚡', color: 'accent' },
    { name: 'Lifestyle', slug: 'lifestyle', icon: '🌟', color: 'success' },
    { name: 'Hormone Health', slug: 'hormone-health', icon: '🌿', color: 'primary' },
    { name: 'Metabolic Health', slug: 'metabolic-health', icon: '🔥', color: 'success' },
    { name: 'Nervous System', slug: 'nervous-system', icon: '🧠', color: 'accent' },
    { name: 'Skin Longevity', slug: 'skin-longevity', icon: '✨', color: 'primary' },
    { name: 'Men\'s Health', slug: 'mens-health', icon: '💪', color: 'accent' },
    { name: 'Heart Health', slug: 'heart-health', icon: '❤️', color: 'primary' },
    { name: 'Environmental Health', slug: 'environmental-health', icon: '🌎', color: 'success' },
];

export function toAbsoluteUrl(value?: string) {
    if (!value) return SITE_CONFIG.url;

    try {
        const absoluteUrl = new URL(value, SITE_CONFIG.url);
        absoluteUrl.hash = '';
        return absoluteUrl.toString();
    } catch {
        return SITE_CONFIG.url;
    }
}

export function toCanonicalUrl(value?: string) {
    const canonicalUrl = new URL(toAbsoluteUrl(value));
    canonicalUrl.search = '';
    canonicalUrl.hash = '';
    return canonicalUrl.toString();
}

function formatSEOTitle(title?: string) {
    if (!title) return SITE_CONFIG.title;
    return title.includes(SITE_CONFIG.title) ? title : `${title} | ${SITE_CONFIG.title}`;
}

export function generateSEO({
    title,
    description,
    image,
    article = false,
    publishedTime,
    modifiedTime,
    author,
    tags = [],
    url,
}: {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    url?: string;
}) {
    const seoTitle = formatSEOTitle(title);
    const seoDescription = description || SITE_CONFIG.description;
    const seoImage = toAbsoluteUrl(image || SITE_CONFIG.defaultImage);
    const seoUrl = toCanonicalUrl(url || SITE_CONFIG.url);

    return {
        title: seoTitle,
        description: seoDescription,
        canonical: seoUrl,
        openGraph: {
            basic: {
                title: seoTitle,
                type: article ? 'article' : 'website',
                image: seoImage,
                url: seoUrl,
            },
            optional: {
                description: seoDescription,
                siteName: SITE_CONFIG.title,
            },
            article: article
                ? {
                    publishedTime,
                    modifiedTime,
                    author: [author || SITE_CONFIG.author],
                    tags,
                }
                : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            site: SITE_CONFIG.twitterHandle,
            creator: SITE_CONFIG.twitterHandle,
            title: seoTitle,
            description: seoDescription,
            image: seoImage,
        },
    };
}

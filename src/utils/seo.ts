export const SITE_CONFIG = {
    title: 'Health Focus',
    description: 'Practical guidance for building sustainable fitness and healthy habits in real life.',
    url: 'https://healthfocus.fit',
    author: 'Health Focus Team',
    defaultImage: '/og-image.jpg',
    twitterHandle: '@healthfocus',
};

export const CATEGORIES = [
    { name: 'Mental Health', slug: 'mental-health', icon: '🧠', color: 'primary' },
    { name: 'Nutrition', slug: 'nutrition', icon: '🥗', color: 'success' },
    { name: 'Fitness', slug: 'fitness', icon: '💪', color: 'accent' },
    { name: 'Sleep', slug: 'sleep', icon: '😴', color: 'primary' },
    { name: 'Healthy Habits', slug: 'healthy-habits', icon: '✨', color: 'accent' },
    { name: 'Lifestyle', slug: 'lifestyle', icon: '🌟', color: 'success' },
];

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
    const seoTitle = title ? `${title} | ${SITE_CONFIG.title}` : SITE_CONFIG.title;
    const seoDescription = description || SITE_CONFIG.description;
    const seoImage = image || SITE_CONFIG.defaultImage;
    const seoUrl = url || SITE_CONFIG.url;

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

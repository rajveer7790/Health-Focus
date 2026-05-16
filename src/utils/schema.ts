import { SITE_CONFIG } from './seo';

interface ArticleSchema {
    '@context': string;
    '@type': string;
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: {
        '@type': string;
        name: string;
    };
    publisher: {
        '@type': string;
        name: string;
        logo: {
            '@type': string;
            url: string;
        };
    };
}

export function generateArticleSchema({
    title,
    description,
    image,
    datePublished,
    dateModified,
    author,
}: {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author?: string;
}): ArticleSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image,
        datePublished,
        dateModified,
        author: {
            '@type': 'Person',
            name: author || SITE_CONFIG.author,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.title,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}/android-chrome-512x512.png`,
            },
        },
    };
}

interface FAQItem {
    question: string;
    answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}


export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.title,
        url: SITE_CONFIG.url,
        potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
        }
    };
}

export function generateCollectionPageSchema({
    name,
    description,
    url
}: {
    name: string;
    description: string;
    url: string;
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url,
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.title,
            logo: {
                '@type': 'ImageObject',
                url: `${SITE_CONFIG.url}/android-chrome-512x512.png`,
            }
        }
    };
}

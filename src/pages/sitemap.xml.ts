import { getCollection } from 'astro:content';
import { CATEGORIES, SITE_CONFIG } from '../utils/seo';

const staticPages = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/about/', changefreq: 'monthly', priority: '0.7' },
    { path: '/contact/', changefreq: 'yearly', priority: '0.5' },
    { path: '/blog/', changefreq: 'daily', priority: '0.9' },
    { path: '/disclaimer/', changefreq: 'yearly', priority: '0.4' },
    { path: '/editorial-policy/', changefreq: 'yearly', priority: '0.4' },
    { path: '/privacy-policy/', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms/', changefreq: 'yearly', priority: '0.3' },
];

function toSitemapDate(date: Date) {
    return date.toISOString().split('T')[0];
}

function escapeXml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export const GET = async () => {
    const [blogs, authors] = await Promise.all([
        getCollection('blog', ({ data }) => !data.draft),
        getCollection('authors'),
    ]);

    const today = toSitemapDate(new Date());

    const urls = [
        ...staticPages.map((page) => ({
            loc: `${SITE_CONFIG.url}${page.path}`,
            lastmod: today,
            changefreq: page.changefreq,
            priority: page.priority,
        })),
        ...blogs.map((post) => ({
            loc: `${SITE_CONFIG.url}/blog/${post.slug}/`,
            lastmod: toSitemapDate(post.data.updatedDate || post.data.pubDate),
            changefreq: 'weekly',
            priority: post.data.featured ? '0.9' : '0.8',
        })),
        ...authors.map((author) => ({
            loc: `${SITE_CONFIG.url}/author/${author.slug}/`,
            lastmod: today,
            changefreq: 'monthly',
            priority: '0.6',
        })),
        ...CATEGORIES.map((category) => ({
            loc: `${SITE_CONFIG.url}/category/${category.slug}/`,
            lastmod: today,
            changefreq: 'weekly',
            priority: '0.7',
        })),
    ];

    const uniqueUrls = Array.from(new Map(urls.map((url) => [url.loc, url])).values());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls
            .map(
                (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
};

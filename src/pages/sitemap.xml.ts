import { getCollection } from 'astro:content';

export const GET = async () => {
    const blogs = await getCollection('blog');

    const siteUrl = 'https://healthfocus.fit';

    // Define static pages manually
    const staticPages = [
        '',
        '/about/',
        '/contact/',
        '/blog/',
        '/disclaimer/',
        '/editorial-policy/',
        '/privacy-policy/',
        '/terms/'
    ];

    // Dynamic pages for blogs
    const blogPages = blogs.map((post) => `/blog/${post.slug}/`);

    // Author pages
    const authorPages = [
        '/author/alex-rivera/',
        '/author/balanced-life-hubs-editorial-team/',
        '/author/dr-sarah-chen/'
    ];

    // Category pages
    const categoryPages = [
        '/category/biohacking/',
        '/category/fitness/',
        '/category/gut-health/',
        '/category/hormone-health/',
        '/category/lifestyle/',
        '/category/longevity/',
        '/category/mens-health/',
        '/category/mental-health/',
        '/category/metabolic-health/',
        '/category/nervous-system/',
        '/category/nutrition/',
        '/category/skin-longevity/',
        '/category/sleep/',
        '/category/womens-health/'
    ];

    const allPages = [
        ...staticPages,
        ...blogPages,
        ...authorPages,
        ...categoryPages
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
            .map(
                (page) => `
    <url>
      <loc>${siteUrl}${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `
            )
            .join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
};

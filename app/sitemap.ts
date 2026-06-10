import { MetadataRoute } from 'next';
import { getBlogPosts, getAuthors } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://healthfocus.fit';
  const posts = getBlogPosts();
  const authors = getAuthors();
  const categories = Array.from(new Set(posts.map((p) => p.category)));

  const staticUrls: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/editorial-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1.0 : 0.7,
  }));

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.pubDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const authorUrls: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticUrls, ...postUrls, ...categoryUrls, ...authorUrls];
}

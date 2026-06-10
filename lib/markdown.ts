import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');
const blogDir = path.join(contentDir, 'blog');
const authorsDir = path.join(contentDir, 'authors');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  featured: boolean;
  draft: boolean;
  content: string;
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  credentials?: string;
};

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title || '',
        description: data.description || '',
        pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : '',
        updatedDate: data.updatedDate ? new Date(data.updatedDate).toISOString() : undefined,
        author: data.author || 'Health Focus Team',
        category: data.category || '',
        tags: data.tags || [],
        image: data.image,
        featured: data.featured || false,
        draft: data.draft || false,
        content,
      } as BlogPost;
    })
    .filter(post => !post.draft)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return posts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getBlogPosts();
  return posts.find(post => post.slug === slug);
}

export function getAuthors(): Author[] {
  if (!fs.existsSync(authorsDir)) return [];
  const files = fs.readdirSync(authorsDir);
  return files
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(authorsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      return {
        slug: file.replace(/\.mdx?$/, ''),
        name: data.name || '',
        role: data.role || '',
        bio: data.bio || '',
        avatar: data.avatar,
        social: data.social,
        credentials: data.credentials,
      } as Author;
    });
}

export function getAuthorBySlug(slug: string): Author | undefined {
  const authors = getAuthors();
  return authors.find(author => author.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  // First try to get same-category posts
  const sameCategory = posts.filter(p => p.slug !== currentSlug && p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  // If not enough same-category, backfill with any other posts
  const others = posts.filter(p => p.slug !== currentSlug && p.category !== category);
  return [...sameCategory, ...others].slice(0, limit);
}

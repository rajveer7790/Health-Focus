import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const blogDir = path.join(repoRoot, 'src', 'content', 'blog');
const configPath = path.join(repoRoot, 'src', 'content', 'config.ts');
const seoPath = path.join(repoRoot, 'src', 'utils', 'seo.ts');
const publishingGuidePath = path.join(repoRoot, 'docs', 'blog-publishing-guide.md');
const markerStarts = ['<'.repeat(7), '='.repeat(7), '>'.repeat(7)];
const conflictMarkerPattern = new RegExp(`^(${markerStarts.map(escapeRegExp).join('|')})(?:\\s|$)`, 'm');

const read = (filePath) => readFileSync(filePath, 'utf8');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walkMdx(dir) {
  return readdirSync(dir)
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry);
      if (statSync(fullPath).isDirectory()) return walkMdx(fullPath);
      return fullPath.endsWith('.mdx') ? [fullPath] : [];
    })
    .sort();
}

function extractConfiguredCategories() {
  const source = read(configPath);
  const enumMatch = source.match(/category:\s*z\.enum\(\[([\s\S]*?)\]\)/);
  if (!enumMatch) throw new Error('Could not find the blog category enum in src/content/config.ts.');
  return new Set([...enumMatch[1].matchAll(/'([^']+)'/g)].map((match) => match[1]));
}

function extractDisplayCategories() {
  const source = read(seoPath);
  return new Set([...source.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]));
}

function extractFrontmatter(source) {
  const match = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function readScalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return '';
  return match[1].trim().replace(/^['"]|['"]$/g, '');
}

const allowedCategories = extractConfiguredCategories();
const displayCategories = extractDisplayCategories();
const mdxFiles = walkMdx(blogDir);
const slugs = new Set();
const errors = [];

for (const category of allowedCategories) {
  if (!displayCategories.has(category)) errors.push(`src/utils/seo.ts: missing CATEGORIES display mapping for allowed category "${category}".`);
}

for (const filePath of mdxFiles) {
  const relativePath = path.relative(repoRoot, filePath);
  const source = read(filePath);
  const slug = path.basename(filePath, '.mdx');

  if (conflictMarkerPattern.test(source)) errors.push(`${relativePath}: unresolved merge conflict marker found.`);

  if (slugs.has(slug)) errors.push(`${relativePath}: duplicate slug "${slug}".`);
  slugs.add(slug);

  const frontmatter = extractFrontmatter(source);
  if (!frontmatter) {
    errors.push(`${relativePath}: missing frontmatter block.`);
    continue;
  }

  for (const key of ['title', 'description', 'pubDate', 'category']) {
    if (!new RegExp(`^${key}:`, 'm').test(frontmatter)) errors.push(`${relativePath}: missing schema-required frontmatter key "${key}".`);
  }

  const category = readScalar(frontmatter, 'category');
  if (category && !allowedCategories.has(category)) errors.push(`${relativePath}: category "${category}" is not allowed by src/content/config.ts.`);
  if (category && !displayCategories.has(category)) errors.push(`${relativePath}: category "${category}" is missing from src/utils/seo.ts CATEGORIES display mapping.`);

  const image = readScalar(frontmatter, 'image');
  if (image) {
    const resolvedImagePath = path.resolve(path.dirname(filePath), image);
    if (!existsSync(resolvedImagePath)) errors.push(`${relativePath}: image path does not exist: ${image}.`);
  }
}

if (existsSync(publishingGuidePath) && conflictMarkerPattern.test(read(publishingGuidePath))) {
  errors.push('docs/blog-publishing-guide.md: unresolved merge conflict marker found.');
}

if (errors.length > 0) {
  console.error('Blog content audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Blog content audit passed for ${mdxFiles.length} posts.`);

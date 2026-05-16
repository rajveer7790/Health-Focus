import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(repoRoot, 'dist');
const siteUrl = 'https://healthfocus.fit';
const errors = [];

const read = (filePath) => readFileSync(filePath, 'utf8');

function walkHtml(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry);
    if (statSync(fullPath).isDirectory()) return walkHtml(fullPath);
    return fullPath.endsWith('.html') ? [fullPath] : [];
  });
}

function getAttr(html, selectorPattern) {
  const match = html.match(selectorPattern);
  return match?.[1] || '';
}

function distPathForUrl(urlString) {
  const url = new URL(urlString);
  if (url.origin !== siteUrl) return '';

  if (url.pathname === '/') return path.join(distDir, 'index.html');
  if (url.pathname.endsWith('/')) return path.join(distDir, url.pathname, 'index.html');
  return path.join(distDir, url.pathname);
}

if (!existsSync(distDir)) {
  errors.push('dist/ does not exist. Run `npm run build` before `npm run audit:seo`.');
} else {
  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const robotsPath = path.join(distDir, 'robots.txt');

  if (!existsSync(sitemapPath)) errors.push('dist/sitemap.xml is missing.');
  if (!existsSync(robotsPath)) errors.push('dist/robots.txt is missing.');

  if (existsSync(robotsPath)) {
    const robots = read(robotsPath);
    if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) errors.push('robots.txt does not reference the canonical sitemap URL.');
  }

  const sitemapLocs = new Set();
  if (existsSync(sitemapPath)) {
    const sitemap = read(sitemapPath);
    const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    if (locs.length === 0) errors.push('sitemap.xml does not contain any <loc> entries.');

    for (const loc of locs) {
      if (sitemapLocs.has(loc)) errors.push(`sitemap.xml contains duplicate URL: ${loc}`);
      sitemapLocs.add(loc);

      const url = new URL(loc);
      if (url.origin !== siteUrl) errors.push(`sitemap.xml URL is not on ${siteUrl}: ${loc}`);
      if (url.search || url.hash) errors.push(`sitemap.xml URL should not include query strings or hashes: ${loc}`);

      const pagePath = distPathForUrl(loc);
      if (pagePath && !existsSync(pagePath)) errors.push(`sitemap.xml URL has no matching built page: ${loc}`);
    }
  }

  if (existsSync(distDir)) {
    for (const htmlPath of walkHtml(distDir)) {
      const html = read(htmlPath);
      const relativePath = path.relative(distDir, htmlPath);
      const is404 = relativePath === '404.html';
      const robots = getAttr(html, /<meta\s+name="robots"\s+content="([^"]+)"/);

      if (!is404) {
        const title = getAttr(html, /<title>([^<]*)<\/title>/);
        const description = getAttr(html, /<meta\s+name="description"\s+content="([^"]*)"/);
        const canonical = getAttr(html, /<link\s+rel="canonical"\s+href="([^"]+)"/);
        const ogUrl = getAttr(html, /<meta\s+property="og:url"\s+content="([^"]+)"/);
        const ogImage = getAttr(html, /<meta\s+property="og:image"\s+content="([^"]+)"/);

        if (!title) errors.push(`${relativePath}: missing <title>.`);
        if (!description) errors.push(`${relativePath}: missing meta description.`);
        if (!canonical) errors.push(`${relativePath}: missing canonical URL.`);
        if (canonical) {
          const canonicalUrl = new URL(canonical);
          if (canonicalUrl.origin !== siteUrl) errors.push(`${relativePath}: canonical is not on ${siteUrl}: ${canonical}`);
          if (canonicalUrl.search || canonicalUrl.hash) errors.push(`${relativePath}: canonical contains query/hash: ${canonical}`);
        }
        if (ogUrl && canonical && ogUrl !== canonical) errors.push(`${relativePath}: og:url does not match canonical.`);
        if (ogImage && !/^https?:\/\//.test(ogImage)) errors.push(`${relativePath}: og:image is not absolute: ${ogImage}`);
        if (robots && robots.includes('noindex')) errors.push(`${relativePath}: non-404 page is marked noindex.`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error('SEO audit failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('SEO audit passed for built HTML pages, sitemap.xml, and robots.txt.');

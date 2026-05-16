# Blog publishing guide

Use this checklist when adding or editing Health Focus blog posts.

## Where blog posts live

Blog posts are Astro content collection entries in `src/content/blog/`. Each post should be a single `.mdx` file. The filename becomes the public URL slug, so `morning-sunlight-circadian-rhythm-reset.mdx` publishes at `/blog/morning-sunlight-circadian-rhythm-reset/`.

## Required frontmatter

Every blog post needs the fields enforced by `src/content/config.ts`:

```yaml
---
title: "Clear reader-facing title"
description: "SEO summary shown in listings and metadata."
pubDate: 2026-05-16
author: "Health Focus Team"
image: "../../assets/images/example.png"
category: "wellness"
tags: ["tag one", "tag two"]
featured: false
draft: false
---
```

## Category rules

The allowed category values are defined in `src/content/config.ts`. The blog cards display friendly category names from `src/utils/seo.ts`, so any new allowed category must also be added to the `CATEGORIES` array there.

Currently supported category slugs are:

- `mental-health`
- `nutrition`
- `fitness`
- `sleep`
- `healthy-habits`
- `lifestyle`
- `wellness`
- `longevity`
- `gut-health`
- `biohacking`
- `womens-health`
- `hormone-health`
- `metabolic-health`
- `nervous-system`
- `skin-longevity`
- `mens-health`
- `heart-health`
- `environmental-health`

## Image rules

Use an existing local image from `src/assets/images/` or `src/assets/images/blog/`, and make the path relative to the `.mdx` file. Example: `../../assets/images/sleep-hygiene.png`.

Do not point the `image` field to missing files. The build will fail if Astro cannot resolve the asset.

## How the site picks up new posts

No route file needs to be edited for a normal new blog post:

1. `src/pages/blog/[slug].astro` creates one page per blog entry.
2. `src/pages/blog/index.astro` lists all non-draft posts sorted by `pubDate`.
3. Category pages use the same content collection and will include matching posts automatically.

## Validation commands

Run these before committing blog content changes:

```bash
npm run audit:blog
npm run build
npm run audit:seo
```

`npm run audit:blog` checks that each MDX post has required metadata, uses an allowed category, has a category display mapping, avoids duplicate slugs, and points to an existing image asset.

`npm run audit:seo` should be run after `npm run build`. It checks the generated HTML, `sitemap.xml`, and `robots.txt` for core SEO problems such as missing titles/descriptions/canonicals, non-absolute Open Graph images, duplicate sitemap URLs, and sitemap URLs without matching built pages.

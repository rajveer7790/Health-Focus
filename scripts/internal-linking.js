const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../src/content/blog');
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

const posts = files.map(file => {
  const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
  const slug = file.replace('.mdx', '');
  
  const stopwords = new Set(['the','a','an','is','and','to','for','what','say','it','does','your','how','why','in','are','on','of','with','about','guide','tips','best','new','this','that','from','into']);
  const words = slug.split('-').filter(w => !stopwords.has(w) && w.length > 3);
  
  let keywords = [];
  if (words.length >= 2) {
    for(let i=0; i<words.length-1; i++) {
      keywords.push(words[i] + ' ' + words[i+1]);
    }
  }
  // add strong single words
  keywords.push(...words.filter(w => w.length >= 6 || ['pcos', 'glp1', 'pfas', 'sleep', 'gut', 'diet'].includes(w)));
  
  // Sort by length descending so we match longer phrases first
  keywords.sort((a, b) => b.length - a.length);
  
  return { file, slug, keywords, fullContent: content };
});

console.log(`Found ${posts.length} posts. Generating internal links...`);

let totalLinksAdded = 0;

posts.forEach(post => {
  let modifiedContent = post.fullContent;
  let linksAddedThisPost = 0;
  const maxLinks = 4;
  
  // Find where frontmatter ends
  const fmMatch = modifiedContent.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return;
  const fmLength = fmMatch[0].length;
  
  let frontmatter = modifiedContent.substring(0, fmLength);
  let body = modifiedContent.substring(fmLength);
  
  const linkedSlugs = new Set();
  
  // Shuffle posts to get random internal links rather than always linking to the first ones
  const shuffledTargets = [...posts].sort(() => 0.5 - Math.random());
  
  for (const target of shuffledTargets) {
    if (linksAddedThisPost >= maxLinks) break;
    if (target.slug === post.slug) continue; // don't link to self
    if (linkedSlugs.has(target.slug)) continue;
    
    for (const keyword of target.keywords) {
      // Very basic regex to find word not inside brackets
      const regex = new RegExp(`(?<!\\[[^\\]]*)\\b(${keyword})\\b(?![^\\[]*\\])`, 'i');
      
      const match = body.match(regex);
      if (match) {
        // Ensure it's not in a heading line or an image tag
        const beforeMatch = body.substring(0, match.index);
        const lastNewline = beforeMatch.lastIndexOf('\n');
        const lineStart = lastNewline === -1 ? beforeMatch : beforeMatch.substring(lastNewline + 1);
        
        if (!lineStart.trim().startsWith('#') && !lineStart.includes('![')) {
          body = body.substring(0, match.index) + 
                 `[${match[1]}](/blog/${target.slug})` + 
                 body.substring(match.index + match[1].length);
          linksAddedThisPost++;
          linkedSlugs.add(target.slug);
          totalLinksAdded++;
          break; // move to next target post once we linked to this one
        }
      }
    }
  }
  
  if (linksAddedThisPost > 0) {
    fs.writeFileSync(path.join(contentDir, post.file), frontmatter + body, 'utf-8');
    console.log(`Linked ${linksAddedThisPost} phrases in ${post.slug}`);
  }
});

console.log(`Done! Added ${totalLinksAdded} internal links across the site for SEO.`);

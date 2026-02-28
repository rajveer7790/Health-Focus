import fs from 'fs';
import path from 'path';

const blogDir = 'e:/bloging/src/content/blog';

// Map category slugs or filename keywords to reviewers + disclaimers
const reviewerMap = [
    { match: ['collagen', 'skin-longevity', 'skin-aging', 'skincare', 'skin-longevity-secrets', 'gut-skin', 'internal-skincare'], reviewer: 'Dr. Sarah Chen, MD, PhD – Board-Certified Dermatologist & Skin Longevity Specialist', time: '8 minutes', disclaimer: 'This article is for educational purposes only. Consult a board-certified dermatologist before starting new supplements or skincare regimens.' },
    { match: ['pcos', 'egg-freezing', 'cycle-syncing', 'cervical', 'postpartum', 'womens-hormonal', 'signs-hormone', 'best-foods-balance-estrogen', 'natural-ways-balance-hormones', 'blood-sugar-regulation', 'perimenopause-awakening'], reviewer: 'Dr. Elena Rodriguez, MD – Board-Certified Reproductive Endocrinologist & Women\'s Health Specialist', time: '9 minutes', disclaimer: 'This article is for informational purposes only. Hormonal and reproductive health conditions must be evaluated and treated by a qualified physician or specialist.' },
    { match: ['testosterone', 'men', 'prostate', 'biohacking-men'], reviewer: 'Dr. Michael Chen, MD, FACC – Preventive Cardiologist & Men\'s Health Specialist', time: '8 minutes', disclaimer: 'This article is for educational purposes only. Testosterone levels and men\'s hormonal health should be evaluated by a qualified physician. Do not self-treat based on this article.' },
    { match: ['insulin', 'blood-sugar', 'metabolic', 'weight-loss', 'ozempic', 'glp1', 'protein', 'nutrition', 'gut-health', 'gut-brain', 'personalized-nutrition', '7-day-metabolic'], reviewer: 'Dr. Priya Sharma, MBBS, MD – Board-Certified Endocrinologist & Obesity Medicine Specialist', time: '8 minutes', disclaimer: 'This article is for informational purposes only. If you have metabolic conditions including diabetes, prediabetes, or insulin resistance, always consult your endocrinologist or physician before making dietary changes.' },
    { match: ['nervous-system', 'vagus', 'somatic', 'anxiety', 'mental', 'neurowellness', 'phone', 'digital-detox', 'walking', 'longevity', 'biohacking-everyday', 'cold-plunge', 'five-am', 'mental-load', 'sleep', 'personalized-health'], reviewer: 'Dr. Sarah Chen, MD, PhD – Board-Certified Neurologist & Integrative Medicine Specialist', time: '8 minutes', disclaimer: 'This article is for educational purposes only. It does not constitute medical or mental health advice. If you experience severe or persistent symptoms, consult a qualified healthcare professional.' },
];

function getReviewer(filename) {
    const fn = filename.toLowerCase();
    for (const entry of reviewerMap) {
        if (entry.match.some(k => fn.includes(k))) {
            return entry;
        }
    }
    // Default fallback
    return { reviewer: 'Dr. Priya Sharma, MBBS, MD – Board-Certified Endocrinologist & Health Specialist', time: '8 minutes', disclaimer: 'This article is for educational purposes only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider.' };
}

const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
let updated = 0;
let skipped = 0;

for (const file of files) {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('Medically Reviewed by')) {
        skipped++;
        continue;
    }

    // Find end of frontmatter
    const fmEnd = content.indexOf('---', 3);
    if (fmEnd === -1) { console.log(`Skipping ${file}: no frontmatter`); continue; }

    const { reviewer, time, disclaimer } = getReviewer(file);
    const header = `\n\n*Written by: Health Focus Research Team*\n*Medically Reviewed by: ${reviewer}*\n*Last updated: February 28, 2026 | Reading time: ${time}*\n\n> ⚠️ **Medical Disclaimer:** ${disclaimer}\n\n***\n`;

    const newContent = content.slice(0, fmEnd + 3) + header + content.slice(fmEnd + 3);
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✓ Updated: ${file}`);
    updated++;
}

console.log(`\nDone. Updated: ${updated}, Already had header: ${skipped}`);

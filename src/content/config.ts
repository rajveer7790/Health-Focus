import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.date(),
        updatedDate: z.date().optional(),
        author: z.string().default('Health Focus Team'),
        category: z.enum([
            'mental-health',
            'nutrition',
            'fitness',
            'sleep',
            'healthy-habits',
            'lifestyle',
            'wellness',
            'longevity',
            'gut-health',
            'biohacking',
            'womens-health',
            'hormone-health',
            'metabolic-health',
            'nervous-system',
            'skin-longevity',
            'mens-health'
        ]),
        tags: z.array(z.string()).default([]),
        image: image().optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
    }),
});

const authorsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        role: z.string(),
        bio: z.string(),
        avatar: z.string().optional(),
        social: z.object({
            twitter: z.string().optional(),
            linkedin: z.string().optional(),
            website: z.string().optional(),
        }).optional(),
        credentials: z.string().optional(),
    }),
});

export const collections = {
    blog: blogCollection,
    authors: authorsCollection,
};

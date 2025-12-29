import { getCollection } from 'astro:content';

export async function getRelatedPosts(currentPost) {
    const allPosts = await getCollection('blog');

    return allPosts
        .filter(post =>
            !post.data.draft &&
            post.slug !== currentPost.slug &&
            (post.data.category === currentPost.data.category ||
                post.data.tags.some(tag => currentPost.data.tags.includes(tag)))
        )
        .sort((a, b) => {
            // Prioritize same category, then matching tags count
            const aScore = (a.data.category === currentPost.data.category ? 2 : 0) +
                a.data.tags.filter(tag => currentPost.data.tags.includes(tag)).length;
            const bScore = (b.data.category === currentPost.data.category ? 2 : 0) +
                b.data.tags.filter(tag => currentPost.data.tags.includes(tag)).length;
            return bScore - aScore;
        })
        .slice(0, 3); // Return top 3 related posts
}

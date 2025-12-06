import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { BlogPostStatus } from "../../../../models/blog-post";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");

  const { q, tag, limit = "10", offset = "0" } = req.query;

  const [posts, count] = await blogService.listPosts({
    q: q as string,
    tag: tag as string,
    status: BlogPostStatus.PUBLISHED,
    limit: parseInt(limit as string, 10),
    offset: parseInt(offset as string, 10),
  });

  res.json({
    posts: posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      hero_image_url: post.hero_image_url,
      published_at: post.published_at,
      tags: post.tags?.map((t) => ({ id: t.id, slug: t.slug, name: t.name })) || [],
    })),
    count,
    limit: parseInt(limit as string, 10),
    offset: parseInt(offset as string, 10),
  });
};

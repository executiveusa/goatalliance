import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { BlogPostStatus } from "../../../../../models/blog-post";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");
  const { slug } = req.params;

  const post = await blogService.retrievePostBySlug(slug);

  if (!post || post.status !== BlogPostStatus.PUBLISHED) {
    res.status(404).json({ message: "Blog post not found" });
    return;
  }

  res.json({
    post: {
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      body_markdown: post.body_markdown,
      hero_image_url: post.hero_image_url,
      published_at: post.published_at,
      seo_title: post.seo_title,
      seo_description: post.seo_description,
      tags: post.tags?.map((t) => ({ id: t.id, slug: t.slug, name: t.name })) || [],
    },
  });
};

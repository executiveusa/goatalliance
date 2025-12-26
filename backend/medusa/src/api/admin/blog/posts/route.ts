import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { BlogPostStatus } from "../../../../models/blog-post";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");

  const { q, tag, status, limit = "20", offset = "0" } = req.query;

  const [posts, count] = await blogService.listPosts({
    q: q as string,
    tag: tag as string,
    status: status as BlogPostStatus,
    limit: parseInt(limit as string, 10),
    offset: parseInt(offset as string, 10),
  });

  res.json({
    posts,
    count,
    limit: parseInt(limit as string, 10),
    offset: parseInt(offset as string, 10),
  });
};

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");

  const post = await blogService.createPost(req.body);

  res.status(201).json({ post });
};

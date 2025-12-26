import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const PATCH = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");
  const { id } = req.params;

  const post = await blogService.updatePost(id, req.body);

  res.json({ post });
};

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");
  const { id } = req.params;

  await blogService.deletePost(id);

  res.status(200).json({ id, deleted: true });
};

import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const blogService = req.scope.resolve("blogService");

  const tags = await blogService.listTags();

  res.json({
    tags: tags.map((tag) => ({
      id: tag.id,
      slug: tag.slug,
      name: tag.name,
    })),
  });
};

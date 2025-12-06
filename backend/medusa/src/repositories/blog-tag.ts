import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { BlogTag } from "../models/blog-tag";

export const BlogTagRepository = dataSource.getRepository(BlogTag);

export default BlogTagRepository;

import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { BlogPost } from "../models/blog-post";

export const BlogPostRepository = dataSource.getRepository(BlogPost);

export default BlogPostRepository;

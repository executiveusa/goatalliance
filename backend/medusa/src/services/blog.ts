import { TransactionBaseService } from "@medusajs/medusa";
import { BlogPost, BlogPostStatus } from "../models/blog-post";
import { BlogTag } from "../models/blog-tag";
import BlogPostRepository from "../repositories/blog-post";
import BlogTagRepository from "../repositories/blog-tag";
import { FindManyOptions, ILike, In } from "typeorm";

type InjectedDependencies = {
  blogPostRepository: typeof BlogPostRepository;
  blogTagRepository: typeof BlogTagRepository;
};

type ListBlogPostsParams = {
  q?: string;
  tag?: string;
  status?: BlogPostStatus;
  limit?: number;
  offset?: number;
};

type CreateBlogPostData = {
  slug: string;
  title: string;
  excerpt?: string;
  body_markdown: string;
  status?: BlogPostStatus;
  published_at?: Date;
  author_id?: string;
  hero_image_url?: string;
  seo_title?: string;
  seo_description?: string;
  tag_slugs?: string[];
};

type UpdateBlogPostData = Partial<CreateBlogPostData>;

class BlogService extends TransactionBaseService {
  protected blogPostRepository_: typeof BlogPostRepository;
  protected blogTagRepository_: typeof BlogTagRepository;

  constructor({ blogPostRepository, blogTagRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.blogPostRepository_ = blogPostRepository;
    this.blogTagRepository_ = blogTagRepository;
  }

  async listPosts({
    q,
    tag,
    status,
    limit = 10,
    offset = 0,
  }: ListBlogPostsParams = {}): Promise<[BlogPost[], number]> {
    const postRepo = this.activeManager_.withRepository(this.blogPostRepository_);

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (q) {
      where.title = ILike(`%${q}%`);
    }

    const options: FindManyOptions<BlogPost> = {
      where,
      relations: ["tags"],
      take: limit,
      skip: offset,
      order: {
        published_at: "DESC",
        created_at: "DESC",
      },
    };

    const [posts, count] = await postRepo.findAndCount(options);

    // Filter by tag if needed
    if (tag) {
      const filtered = posts.filter((post) =>
        post.tags?.some((t) => t.slug === tag)
      );
      return [filtered, filtered.length];
    }

    return [posts, count];
  }

  async retrievePostBySlug(slug: string): Promise<BlogPost | null> {
    const postRepo = this.activeManager_.withRepository(this.blogPostRepository_);
    return postRepo.findOne({
      where: { slug },
      relations: ["tags"],
    });
  }

  async retrievePost(id: string): Promise<BlogPost | null> {
    const postRepo = this.activeManager_.withRepository(this.blogPostRepository_);
    return postRepo.findOne({
      where: { id },
      relations: ["tags"],
    });
  }

  async createPost(data: CreateBlogPostData): Promise<BlogPost> {
    return this.atomicPhase_(async (manager) => {
      const postRepo = manager.withRepository(this.blogPostRepository_);
      const tagRepo = manager.withRepository(this.blogTagRepository_);

      let tags: BlogTag[] = [];
      if (data.tag_slugs && data.tag_slugs.length > 0) {
        tags = await tagRepo.find({
          where: { slug: In(data.tag_slugs) },
        });
      }

      const post = postRepo.create({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt || null,
        body_markdown: data.body_markdown,
        status: data.status || BlogPostStatus.DRAFT,
        published_at: data.published_at || null,
        author_id: data.author_id || null,
        hero_image_url: data.hero_image_url || null,
        seo_title: data.seo_title || null,
        seo_description: data.seo_description || null,
        tags,
      });

      return postRepo.save(post);
    });
  }

  async updatePost(id: string, data: UpdateBlogPostData): Promise<BlogPost> {
    return this.atomicPhase_(async (manager) => {
      const postRepo = manager.withRepository(this.blogPostRepository_);
      const tagRepo = manager.withRepository(this.blogTagRepository_);

      const post = await postRepo.findOne({
        where: { id },
        relations: ["tags"],
      });

      if (!post) {
        throw new Error(`BlogPost with id ${id} not found`);
      }

      if (data.tag_slugs) {
        const tags = await tagRepo.find({
          where: { slug: In(data.tag_slugs) },
        });
        post.tags = tags;
      }

      Object.assign(post, data);
      return postRepo.save(post);
    });
  }

  async deletePost(id: string): Promise<void> {
    return this.atomicPhase_(async (manager) => {
      const postRepo = manager.withRepository(this.blogPostRepository_);
      await postRepo.delete(id);
    });
  }

  async listTags(): Promise<BlogTag[]> {
    const tagRepo = this.activeManager_.withRepository(this.blogTagRepository_);
    return tagRepo.find({
      order: {
        name: "ASC",
      },
    });
  }

  async createTag(slug: string, name: string): Promise<BlogTag> {
    return this.atomicPhase_(async (manager) => {
      const tagRepo = manager.withRepository(this.blogTagRepository_);
      const tag = tagRepo.create({ slug, name });
      return tagRepo.save(tag);
    });
  }
}

export default BlogService;

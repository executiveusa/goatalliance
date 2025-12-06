/**
 * Medusa Blog Module Client
 * TypeScript client for fetching blog posts and tags
 */

export interface BlogTag {
  id: string;
  slug: string;
  name: string;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  hero_image_url: string | null;
  published_at: string | null;
  tags: BlogTag[];
}

export interface BlogPost extends BlogPostSummary {
  body_markdown: string;
  seo_title: string | null;
  seo_description: string | null;
}

export interface BlogPostsResponse {
  posts: BlogPostSummary[];
  count: number;
  limit: number;
  offset: number;
}

export interface BlogPostResponse {
  post: BlogPost;
}

export interface BlogTagsResponse {
  tags: BlogTag[];
}

/**
 * Client for Medusa blog module
 */
export class MedusaBlogClient {
  private baseUrl: string;

  constructor(medusaUrl: string) {
    this.baseUrl = medusaUrl;
  }

  /**
   * List published blog posts
   */
  async listPosts(params?: {
    q?: string;
    tag?: string;
    limit?: number;
    offset?: number;
  }): Promise<BlogPostsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params?.q) searchParams.append("q", params.q);
    if (params?.tag) searchParams.append("tag", params.tag);
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.offset) searchParams.append("offset", params.offset.toString());

    const url = `${this.baseUrl}/store/blog/posts?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Get a single blog post by slug
   */
  async getPostBySlug(slug: string): Promise<BlogPost> {
    const url = `${this.baseUrl}/store/blog/posts/${slug}`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Blog post not found");
      }
      throw new Error(`Failed to fetch blog post: ${response.status}`);
    }

    const data: BlogPostResponse = await response.json();
    return data.post;
  }

  /**
   * List all blog tags
   */
  async listTags(): Promise<BlogTag[]> {
    const url = `${this.baseUrl}/store/blog/tags`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch blog tags: ${response.status}`);
    }

    const data: BlogTagsResponse = await response.json();
    return data.tags;
  }
}

/**
 * Helper function to create a pre-configured blog client
 */
export function createBlogClient(medusaUrl?: string): MedusaBlogClient {
  const url = medusaUrl || import.meta.env.VITE_MEDUSA_URL || "http://localhost:9000";
  return new MedusaBlogClient(url);
}

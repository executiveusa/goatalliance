import React, { useEffect, useState } from "react";
import { createBlogClient, BlogPostSummary } from "../lib/medusa-blog";

interface BlogListProps {
  medusaUrl?: string;
  limit?: number;
  tag?: string;
  onPostClick?: (slug: string) => void;
  className?: string;
}

export function BlogList({
  medusaUrl,
  limit = 10,
  tag,
  onPostClick,
  className = "",
}: BlogListProps) {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const client = createBlogClient(medusaUrl);
        const response = await client.listPosts({ tag, limit });
        setPosts(response.posts);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [medusaUrl, tag, limit]);

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-800 border border-slate-700 rounded-lg p-6 animate-pulse"
          >
            <div className="h-6 bg-slate-700 rounded w-3/4 mb-4" />
            <div className="h-4 bg-slate-700 rounded w-full mb-2" />
            <div className="h-4 bg-slate-700 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-red-900/20 border border-red-700 rounded-lg p-6 ${className}`}>
        <p className="text-red-400">Error loading blog posts: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`bg-slate-800 border border-slate-700 rounded-lg p-6 ${className}`}>
        <p className="text-slate-400">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden hover:border-[#00B39F] transition-colors cursor-pointer"
          onClick={() => onPostClick?.(post.slug)}
        >
          {post.hero_image_url && (
            <div className="aspect-video bg-slate-800">
              <img
                src={post.hero_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 bg-[#3C494E] text-[#EBC017] text-xs font-medium rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 hover:text-[#00B39F] transition-colors">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-slate-300 mb-4 line-clamp-3" title={post.excerpt}>
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center justify-between text-sm text-slate-400">
              <time dateTime={post.published_at || undefined}>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Draft"}
              </time>
              <span className="text-[#00B39F] hover:text-[#00997f] font-medium">
                Read more →
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

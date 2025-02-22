import { useEffect, useState } from 'react';
import type { RSSItem } from '../../lib/blog/rssParser';
import { BlogCard } from './BlogCard';

export function BlogList() {
  const [posts, setPosts] = useState<RSSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch('/api/rss');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch blog posts');
        }
        
        setPosts(data.posts);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`ブログ記事の取得に失敗しました: ${errorMessage}`);
        console.error('Failed to fetch blog posts:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  const pageLayout = (content: React.ReactNode) => (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-teal-800 sm:text-4xl">
          技術ブログ
        </h2>
        {content}
      </div>
    </div>
  );

  if (isLoading) {
    return pageLayout(
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-lg border border-border/40 bg-card p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-muted"></div>
                  <div className="h-6 w-16 rounded-full bg-primary/10"></div>
                </div>
                <div className="h-6 w-3/4 rounded bg-muted"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full rounded bg-muted"></div>
                  <div className="h-4 w-5/6 rounded bg-muted"></div>
                  <div className="h-4 w-4/6 rounded bg-muted"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 rounded-full bg-muted"></div>
                  <div className="ml-2 h-4 w-20 rounded bg-muted"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return pageLayout(
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500 text-center">
          <p className="mb-2">{error}</p>
          <p className="text-sm opacity-75">詳細はコンソールをご確認ください。</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return pageLayout(
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-muted-foreground">
          記事がありません。
        </div>
      </div>
    );
  }

  return pageLayout(
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.link} post={post} />
      ))}
    </div>
  );
}

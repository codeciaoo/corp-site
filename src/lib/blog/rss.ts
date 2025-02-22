// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

// Cache interface
interface Cache<T> {
  data: T;
  timestamp: number;
}

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  description: string;
  thumbnail?: string;
  categories?: string[];
}

// Cache storage
let postsCache: Cache<BlogPost[]> | null = null;

export async function fetchZennPosts(): Promise<BlogPost[]> {
  // Check cache
  if (postsCache && Date.now() - postsCache.timestamp < CACHE_DURATION) {
    console.log('Returning cached posts');
    return postsCache.data;
  }

  try {
    const response = await fetch('/api/rss');
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch RSS feed');
    }

    // Update cache
    postsCache = {
      data: data.posts,
      timestamp: Date.now()
    };
    return data.posts;
  } catch (error) {
    console.error('Failed to fetch Zenn posts:', error);
    // Return cached posts if available during error
    if (postsCache?.data) {
      console.log('Returning cached posts during error');
      return postsCache.data;
    }
    throw new Error('Failed to fetch blog posts');
  }
}

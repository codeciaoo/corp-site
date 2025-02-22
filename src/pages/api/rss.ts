import type { APIRoute } from 'astro';
import { parseRSS, type RSSItem } from '../../lib/blog/rssParser';

const ZENN_RSS_URL = 'https://zenn.dev/p/codeciao/feed';

// メモリキャッシュ
const CACHE_DURATION = 60 * 60 * 1000; // 1時間
let cachedResponse: { data: RSSItem[]; timestamp: number } | null = null;

export const GET: APIRoute = async () => {
  try {
    // キャッシュチェック
    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
      console.log('Returning cached RSS feed data');
      return new Response(JSON.stringify({
        success: true,
        posts: cachedResponse.data
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('Fetching RSS feed from:', ZENN_RSS_URL);
    const response = await fetch(ZENN_RSS_URL, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'CodeCiao RSS Reader'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    console.log('RSS feed fetched, parsing content...');
    const feed = await parseRSS(xml);
    
    // キャッシュを更新
    cachedResponse = {
      data: feed.items,
      timestamp: Date.now()
    };

    console.log(`Parsed ${feed.items.length} items from RSS feed`);
    return new Response(JSON.stringify({
      success: true,
      posts: feed.items
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Failed to fetch or parse RSS feed:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch RSS feed'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

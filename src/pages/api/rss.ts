import type { APIRoute } from 'astro';
import { parseRSS, type RSSItem } from '../../lib/blog/rssParser';

const ZENN_RSS_URL = 'https://zenn.dev/p/codeciao/feed';
const DEFAULT_PAGE_SIZE = 15; // 1ページあたりの記事数

// メモリキャッシュ
const CACHE_DURATION = 60 * 60 * 1000; // 1時間
let cachedResponse: { data: RSSItem[]; timestamp: number } | null = null;

export const GET: APIRoute = async ({ url }) => {
  try {
    // ページネーションパラメータの取得
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || String(DEFAULT_PAGE_SIZE), 10);
    
    // パラメータの検証
    if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid pagination parameters'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // キャッシュチェック
    let items: RSSItem[] = [];
    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
      console.log('Returning cached RSS feed data');
      items = cachedResponse.data;
    } else {
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
      items = feed.items;
      
      // キャッシュを更新
      cachedResponse = {
        data: items,
        timestamp: Date.now()
      };
      console.log(`Parsed ${items.length} items from RSS feed`);
    }

    // ページネーション処理
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / pageSize);

    return new Response(JSON.stringify({
      success: true,
      posts: paginatedItems,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: items.length,
        totalPages
      }
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

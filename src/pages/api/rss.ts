import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

const ZENN_RSS_URL = 'https://zenn.dev/p/codeciao/feed';

export const GET: APIRoute = async () => {
  try {
    console.log('Fetching RSS feed from server side...');
    const parser = new Parser({
      customFields: {
        item: [
          ['media:thumbnail', 'thumbnail'],
          ['category', 'categories'],
        ],
      },
    });

    // Fetch RSS feed using web standard fetch
    const response = await fetch(ZENN_RSS_URL, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'User-Agent': 'CodeCiao RSS Reader'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }
    
    const feedContent = await response.text();
    console.log('RSS feed content length:', feedContent.length);
    console.log('RSS feed content preview:', feedContent.substring(0, 200));

    // Parse the feed content
    const feed = await parser.parseString(feedContent);
    console.log('Parsed feed items count:', feed.items.length);
    
    return new Response(JSON.stringify({
      success: true,
      posts: feed.items.map(item => ({
        title: item.title || '',
        link: item.link || '',
        pubDate: item.pubDate || '',
        author: item.creator || 'CodeCiao',
        description: item.contentSnippet || '',
        thumbnail: item.thumbnail || undefined,
        categories: item.categories || [],
      }))
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Server-side RSS fetch error:', error);
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

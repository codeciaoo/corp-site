export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  categories?: string[];
}

export interface RSSFeed {
  items: RSSItem[];
}

function extractTag(xml: string, tag: string): string {
  const start = xml.indexOf(`<${tag}>`) + tag.length + 2;
  const end = xml.indexOf(`</${tag}>`);
  return start > -1 && end > -1 ? xml.substring(start, end).trim() : '';
}

function extractCDATA(xml: string): string {
  const start = xml.indexOf('<![CDATA[') + 9;
  const end = xml.indexOf(']]>');
  return start > -1 && end > -1 ? xml.substring(start, end).trim() : xml.trim();
}

export async function parseRSS(xml: string): Promise<RSSFeed> {
  // アイテムごとに分割
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const items: RSSItem[] = [];
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    // タイトルの抽出（CDATA対応）
    const titleTag = itemXml.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
    const title = extractCDATA(titleTag);

    // リンクの抽出
    const link = extractTag(itemXml, 'link');

    // 説明の抽出（CDATA対応）
    const descriptionTag = itemXml.match(/<description>([\s\S]*?)<\/description>/)?.[1] || '';
    const description = extractCDATA(descriptionTag);

    // 日付の抽出
    const pubDate = extractTag(itemXml, 'pubDate');

    // 著者の抽出
    const author = extractTag(itemXml, 'dc:creator') || extractTag(itemXml, 'creator');

    // カテゴリーの抽出
    const categoryRegex = /<category>([\s\S]*?)<\/category>/g;
    const categories: string[] = [];
    let categoryMatch;
    while ((categoryMatch = categoryRegex.exec(itemXml)) !== null) {
      categories.push(extractCDATA(categoryMatch[1]));
    }

    items.push({
      title,
      link,
      description,
      pubDate,
      author: author || undefined,
      categories: categories.length > 0 ? categories : undefined
    });
  }

  return { items };
}

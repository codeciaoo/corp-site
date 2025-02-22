import type { RSSItem } from '../../lib/blog/rssParser';
import { Card, CardContent, CardHeader } from '../ui/card';

interface BlogCardProps {
  post: RSSItem;
}

export function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.pubDate).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform hover:scale-[1.02]"
    >
      <Card className="h-full bg-card hover:bg-accent/5">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{date}</span>
            {post.categories && post.categories.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                {post.categories[0]}
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">{post.description}</p>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {post.author || 'CodeCiao'}
            </span>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

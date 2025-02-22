import type { RSSItem } from '../../lib/blog/rssParser';
import { Card } from '../ui/card';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

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
      className="group block no-underline transform transition-all duration-300 hover:scale-[1.02]"
    >
      <Card className="relative flex h-full flex-col overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl">
        <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45 bg-gradient-to-br from-teal-400/80 to-teal-600/80 transition-all duration-300 group-hover:scale-150" aria-hidden="true" />
        <div className="relative flex h-full flex-col p-6">
          <div className="mb-4 flex items-center space-x-2">
            <Tag className="h-4 w-4 text-teal-600" aria-hidden="true" />
            {post.categories && post.categories.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label="タグリスト" role="list">
                {post.categories.map((category, index) => (
                  <li
                    key={index}
                    className="inline-flex items-center rounded-full bg-sky-600/5 px-2.5 py-0.5 text-xs font-medium text-teal-800"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="flex-grow">
            <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-teal-600">
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {post.description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="flex items-center">
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post.author || 'CodeCiao'}</span>
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
                  <time dateTime={new Date(post.pubDate).toISOString()}>
                    {date}
                  </time>
                </span>
              </div>
            </div>
            <div 
              className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </a>
  );
}

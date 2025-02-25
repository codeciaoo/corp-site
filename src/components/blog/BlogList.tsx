import { useEffect, useState } from 'react';
import type { RSSItem } from '../../lib/blog/rssParser';
import { BlogCard } from './BlogCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

export function BlogList() {
  const [posts, setPosts] = useState<RSSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationProps | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/rss?page=${currentPage}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch blog posts');
        }
        
        setPosts(data.posts);
        setPagination(data.pagination);
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
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
      // ページトップにスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;
    
    // 表示するページ番号の範囲を計算
    const MAX_VISIBLE_PAGES = 5;
    let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    let endPage = Math.min(pagination.totalPages, startPage + MAX_VISIBLE_PAGES - 1);
    
    // ページ数が少ない場合は調整
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
      startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center gap-1" aria-label="ページナビゲーション">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
            aria-label="前のページ"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100"
                aria-label="1ページ目"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
              )}
            </>
          )}
          
          {pageNumbers.map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex h-10 w-10 items-center justify-center rounded-md font-medium ${
                page === currentPage
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100'
              }`}
              aria-label={`${page}ページ目`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
          
          {endPage < pagination.totalPages && (
            <>
              {endPage < pagination.totalPages - 1 && (
                <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100"
                aria-label={`${pagination.totalPages}ページ目`}
              >
                {pagination.totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white"
            aria-label="次のページ"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    );
  };

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

  if (isLoading && currentPage === 1) {
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

  // ページ読み込み中のオーバーレイ
  const loadingOverlay = isLoading && (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
      <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return pageLayout(
    <>
      <div className="relative">
        {loadingOverlay}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.link} post={post} />
          ))}
        </div>
      </div>
      
      {pagination && (
        <div className="mt-4 text-center text-sm text-gray-600">
          全 {pagination.totalItems} 件中 {(pagination.currentPage - 1) * pagination.pageSize + 1} - {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} 件を表示
        </div>
      )}
      
      {renderPagination()}
    </>
  );
}

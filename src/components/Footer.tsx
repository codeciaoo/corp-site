import { Button } from "./ui/button"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NextGen Solutions</h3>
            <p className="text-muted-foreground">
              戦略と技術で、ビジネスの未来を創造する
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">クイックリンク</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">サービス</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">強み</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">実績</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">会社情報</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">ニュースレター登録</h3>
            <p className="text-muted-foreground mb-4">最新の技術トレンドや事例をお届けします</p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="メールアドレス"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">登録</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
          <p>&copy; 2023 NextGen Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 
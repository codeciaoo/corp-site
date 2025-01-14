import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-white py-12">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">CodeCiao</h3>
            <p className="text-muted-foreground">
              戦略と技術で、ビジネスの未来を創造する
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">クイックリンク</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  サービス
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  強み
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  実績
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  会社情報
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">ニュースレター登録</h3>
            <p className="text-muted-foreground mb-4">
              最新の技術トレンドや事例をお届けします
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="メールアドレス"
                className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                登録
              </Button>
            </form>
          </div>
        </div>
        <div className="border-muted-foreground/20 text-muted-foreground mt-8 border-t pt-8 text-center">
          <p>&copy; 2024 CodeCiao. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

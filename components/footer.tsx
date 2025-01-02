import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-secondary py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">NextGen Solutions</h2>
            <p className="text-muted-foreground mb-4">
              戦略と技術で、ビジネスの未来を創造する。お客様の成功が私たちの使命です。
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">クイックリンク</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">サービス</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">強み</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">実績</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">会社情報</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">ニュースレター登録</h3>
            <p className="text-muted-foreground mb-4">最新の技術トレンドや事例をお届けします</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="メールアドレス" />
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


import { useState } from 'react'
import { Button } from "./ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <img 
              src="/corp_logo.png" 
              alt="Code Ciao" 
              className="h-6 w-40"
            />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {["サービス", "強み", "実績", "会社情報"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">
              お問い合わせ
            </Button>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "閉じる" : "メニュー"}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {["サービス", "強み", "実績", "会社情報"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">
              お問い合わせ
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
} 
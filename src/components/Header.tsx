import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: '会社概要', href: '/about' },
  { name: 'サービス', href: '/services' },
  { name: 'ニュース', href: '/news' },
  { name: '採用情報', href: '/careers' },
  { name: 'お問い合わせ', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img 
                src="/corp_logo.png" 
                alt="Code Ciao" 
                className="h-6 w-40"
              />
            </a>
          </div>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* モバイルナビゲーション */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 
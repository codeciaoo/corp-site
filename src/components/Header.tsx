import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: '会社概要', href: '/about' },
  { name: 'サービス', href: '/services' },
  { name: 'メンバー', href: '/members' },
  { name: 'お問い合わせ', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <a href="/" className="flex items-center">
          <img src="/corp_logo.png" alt="Code Ciao" className="h-6 w-40" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-20 bg-white py-4 md:hidden">
            <div className="mx-auto max-w-7xl space-y-4 px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 transition-colors hover:text-gray-900"
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
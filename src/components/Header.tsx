import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { name: "会社概要", href: "/about" },
  { name: "サービス", href: "/services" },
  { name: "メンバー", href: "/members" },
  { name: "お問い合わせ", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 10);
      setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white backdrop-blur-sm transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <a href="/" className="flex items-center">
          <img src="/corp_logo.png" alt="Code Ciao" className="h-7" />
        </a>

        <div className="hidden md:flex md:gap-8">
          {/* <ThemeToggle /> */}
          {navigation.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center text-gray-700 transition-colors hover:text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {isOpen && isVisible && (
          <div className="fixed left-0 right-0 top-14 bg-white py-4 shadow-lg md:hidden">
            <div className="mx-auto max-w-7xl space-y-4 px-4">
              {/* <ThemeToggle /> */}

              {navigation.map(item => (
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
  );
}

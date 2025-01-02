"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-secondary rounded"></div>
          <h1 className="text-2xl font-bold">
            NextGen Solutions
          </h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          {["サービス", "強み", "実績", "会社情報"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
          <Button className="bg-primary hover:bg-primary/90 transition-colors duration-200">
            お問い合わせ
          </Button>
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {["サービス", "強み", "実績", "会社情報"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item}
              </Link>
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


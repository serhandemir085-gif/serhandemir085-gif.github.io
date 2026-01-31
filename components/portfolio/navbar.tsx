'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              serhan<span className="text-primary">885</span>
            </span>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              Ana Sayfa
            </a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projeler
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              Hakkımda
            </a>
            <Button asChild variant="default" size="sm">
              <a href="https://www.itemsatis.com/p/CodeHub" target="_blank" rel="noopener noreferrer">
                Mağaza
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <a
              href="#home"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ana Sayfa
            </a>
            <a
              href="#projects"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projeler
            </a>
            <a
              href="#about"
              className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hakkımda
            </a>
            <Button asChild variant="default" size="sm" className="w-full">
              <a href="https://www.itemsatis.com/p/CodeHub" target="_blank" rel="noopener noreferrer">
                Mağaza
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

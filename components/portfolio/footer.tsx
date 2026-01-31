import { ShoppingCart, MessageCircle, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">
              serhan<span className="text-primary">885</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              CodeHub Yazılım & Otomasyon Çözümleri
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">
                  Projeler
                </a>
              </li>
              <li>
                <a href="https://www.itemsatis.com/p/CodeHub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Mağaza
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Sosyal Medya</h4>
            <div className="flex gap-3">
              <a
                href="https://www.itemsatis.com/p/CodeHub"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} serhan885. Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}

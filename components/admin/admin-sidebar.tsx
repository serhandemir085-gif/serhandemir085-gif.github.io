'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Image, 
  Link2, 
  Code2, 
  Settings, 
  MessageSquare,
  BarChart3,
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Projeler', href: '/admin/projects', icon: FolderKanban },
  { name: 'Görseller', href: '/admin/images', icon: Image },
  { name: 'Teknolojiler', href: '/admin/technologies', icon: Code2 },
  { name: 'Yetenekler', href: '/admin/skills', icon: Award },
  { name: 'Linkler', href: '/admin/links', icon: Link2 },
  { name: 'Mesajlar', href: '/admin/messages', icon: MessageSquare },
  { name: 'Analitik', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Ayarlar', href: '/admin/settings', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r border-border">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <h1 className="text-xl font-bold">
          serhan<span className="text-primary">885</span>
        </h1>
        <div className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
          Admin
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-1">Sistem Durumu</h3>
          <p className="text-xs text-muted-foreground">Tüm sistemler çalışıyor</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

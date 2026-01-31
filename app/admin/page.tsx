import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderKanban, Image, MessageSquare, TrendingUp, Code2, Link2 } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch stats
  const [
    { count: projectCount },
    { count: imageCount },
    { count: messageCount },
    { count: techCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('images').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('technologies').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      title: 'Toplam Proje',
      value: projectCount || 0,
      description: 'Yayınlanmış projeler',
      icon: FolderKanban,
      color: 'text-blue-500',
    },
    {
      title: 'Görsel',
      value: imageCount || 0,
      description: 'Medya dosyaları',
      icon: Image,
      color: 'text-purple-500',
    },
    {
      title: 'Mesaj',
      value: messageCount || 0,
      description: 'İletişim talepleri',
      icon: MessageSquare,
      color: 'text-green-500',
    },
    {
      title: 'Teknoloji',
      value: techCount || 0,
      description: 'Kullanılan teknolojiler',
      icon: Code2,
      color: 'text-orange-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Web sitenizin genel durumunu görüntüleyin ve yönetin
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hızlı Eylemler</CardTitle>
            <CardDescription>Sık kullanılan işlemler</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a 
              href="/admin/projects"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <FolderKanban className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Yeni Proje Ekle</p>
                <p className="text-sm text-muted-foreground">Portföyünüze proje ekleyin</p>
              </div>
            </a>
            <a 
              href="/admin/images"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <Image className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Görsel Yükle</p>
                <p className="text-sm text-muted-foreground">Yeni medya dosyası ekleyin</p>
              </div>
            </a>
            <a 
              href="/admin/technologies"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
            >
              <Code2 className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Teknoloji Ekle</p>
                <p className="text-sm text-muted-foreground">Yeni teknoloji veya araç ekleyin</p>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistem Bilgisi</CardTitle>
            <CardDescription>Platform durumu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Veritabanı</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Bağlı</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Depolama</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Aktif</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Çalışıyor</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

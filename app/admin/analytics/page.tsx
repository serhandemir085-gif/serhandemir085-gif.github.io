import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, MousePointer, TrendingUp } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const [
    { count: totalViews },
    { data: recentEvents },
  ] = await Promise.all([
    supabase.from('analytics').select('*', { count: 'exact', head: true }),
    supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analitik</h1>
        <p className="text-muted-foreground">
          Web sitenizin performans istatistikleri
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Görüntüleme</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Tüm zamanlar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Aktif Projeler</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground mt-1">Son 30 gün</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground mt-1">Önceki aya göre</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
          <CardDescription>
            En son {recentEvents?.length || 0} etkinlik
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentEvents && recentEvents.length > 0 ? (
            <div className="space-y-2">
              {recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{event.event_type}</p>
                    <p className="text-sm text-muted-foreground">{event.page_path}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.created_at).toLocaleString('tr-TR')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Henüz aktivite yok</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

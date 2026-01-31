import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SettingsForm from '@/components/admin/settings-form'

export default async function SettingsPage() {
  const supabase = await createClient()
  
  const { data: settings, error } = await supabase
    .from('site_settings')
    .select('*')

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Site Ayarları</h1>
        <p className="text-muted-foreground">
          Web sitenizin genel ayarlarını yapılandırın
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Genel Ayarlar</CardTitle>
          <CardDescription>
            Site başlığı, açıklama ve diğer bilgiler
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-destructive text-sm mb-4">
              Ayarlar yüklenirken hata oluştu: {error.message}
            </div>
          )}
          {settings && <SettingsForm settings={settings} />}
        </CardContent>
      </Card>
    </div>
  )
}

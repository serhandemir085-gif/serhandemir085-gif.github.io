import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TechnologyForm from '@/components/admin/technology-form'
import TechnologyList from '@/components/admin/technology-list'

export default async function TechnologiesPage() {
  const supabase = await createClient()
  
  const { data: technologies, error } = await supabase
    .from('technologies')
    .select('*')
    .order('name')

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Teknolojiler</h1>
        <p className="text-muted-foreground">
          Kullandığınız teknoloji ve araçları yönetin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Yeni Teknoloji Ekle</CardTitle>
            <CardDescription>
              Python, Node.js, React vb.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TechnologyForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teknoloji Listesi</CardTitle>
            <CardDescription>
              {technologies?.length || 0} teknoloji bulundu
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="text-destructive text-sm">
                Teknolojiler yüklenirken hata oluştu: {error.message}
              </div>
            )}
            {technologies && <TechnologyList technologies={technologies} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

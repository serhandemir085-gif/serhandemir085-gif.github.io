import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProjectForm from '@/components/admin/project-form'

export default async function NewProjectPage() {
  const supabase = await createClient()
  
  const [
    { data: technologies },
    { data: images }
  ] = await Promise.all([
    supabase.from('technologies').select('*').order('name'),
    supabase.from('images').select('*').order('created_at', { ascending: false })
  ])

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Yeni Proje Ekle</h1>
        <p className="text-muted-foreground">
          Portföyünüze yeni bir proje ekleyin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proje Bilgileri</CardTitle>
          <CardDescription>
            Projenizin detaylarını girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm 
            technologies={technologies || []} 
            images={images || []}
          />
        </CardContent>
      </Card>
    </div>
  )
}

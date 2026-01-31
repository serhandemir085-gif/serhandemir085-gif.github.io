import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ProjectForm from '@/components/admin/project-form'
import { notFound } from 'next/navigation'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { id } = await params
  
  const [
    { data: project },
    { data: technologies },
    { data: images }
  ] = await Promise.all([
    supabase
      .from('projects')
      .select(`
        *,
        project_technologies (
          technology_id
        ),
        project_images (
          image_id
        )
      `)
      .eq('id', id)
      .single(),
    supabase.from('technologies').select('*').order('name'),
    supabase.from('images').select('*').order('created_at', { ascending: false })
  ])

  if (!project) {
    notFound()
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Projeyi Düzenle</h1>
        <p className="text-muted-foreground">
          {project.title}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proje Bilgileri</CardTitle>
          <CardDescription>
            Projenizin detaylarını güncelleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm 
            technologies={technologies || []} 
            images={images || []}
            initialData={project}
          />
        </CardContent>
      </Card>
    </div>
  )
}

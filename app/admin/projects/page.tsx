import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import ProjectList from '@/components/admin/project-list'
import Link from 'next/link'

export default async function ProjectsPage() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_technologies (
        technologies (*)
      ),
      project_images (
        images (*)
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projeler</h1>
          <p className="text-muted-foreground">
            Portföyünüzdeki tüm projeleri yönetin
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Projeler</CardTitle>
          <CardDescription>
            {projects?.length || 0} proje bulundu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-destructive text-sm">
              Projeler yüklenirken hata oluştu: {error.message}
            </div>
          )}
          {projects && <ProjectList projects={projects} />}
        </CardContent>
      </Card>
    </div>
  )
}

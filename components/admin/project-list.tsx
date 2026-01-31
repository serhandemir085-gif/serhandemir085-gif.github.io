'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type Project = {
  id: string
  title: string
  description: string
  status: string
  featured: boolean
  created_at: string
  project_technologies?: { technologies: { name: string } }[]
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeleting(id)
    const { error } = await supabase.from('projects').delete().eq('id', id)
    
    if (error) {
      console.error('[v0] Error deleting project:', error)
      alert('Proje silinirken hata oluştu')
    } else {
      router.refresh()
    }
    setDeleting(null)
  }

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    const { error } = await supabase
      .from('projects')
      .update({ featured: !currentValue })
      .eq('id', id)
    
    if (error) {
      console.error('[v0] Error updating project:', error)
      alert('Proje güncellenirken hata oluştu')
    } else {
      router.refresh()
    }
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Henüz proje eklenmemiş</p>
        <Link href="/admin/projects/new">
          <Button>İlk Projenizi Ekleyin</Button>
        </Link>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Başlık</TableHead>
          <TableHead>Durum</TableHead>
          <TableHead>Öne Çıkan</TableHead>
          <TableHead>Teknolojiler</TableHead>
          <TableHead>Tarih</TableHead>
          <TableHead className="text-right">İşlemler</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.title}</TableCell>
            <TableCell>
              <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                {project.status === 'published' ? 'Yayında' : 'Taslak'}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFeatured(project.id, project.featured)}
              >
                {project.featured ? (
                  <Eye className="h-4 w-4 text-primary" />
                ) : (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </TableCell>
            <TableCell>
              <div className="flex gap-1 flex-wrap">
                {project.project_technologies?.slice(0, 3).map((pt: any, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {pt.technologies.name}
                  </Badge>
                ))}
                {(project.project_technologies?.length || 0) > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{(project.project_technologies?.length || 0) - 3}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {new Date(project.created_at).toLocaleDateString('tr-TR')}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Link href={`/admin/projects/${project.id}`}>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled={deleting === project.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Projeyi silmek istediğinize emin misiniz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu işlem geri alınamaz. Proje kalıcı olarak silinecektir.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>İptal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(project.id)}>
                        Sil
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

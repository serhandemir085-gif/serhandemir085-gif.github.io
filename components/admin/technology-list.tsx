'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trash2 } from 'lucide-react'
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

type Technology = {
  id: string
  name: string
  icon_url: string | null
  color: string
}

export default function TechnologyList({ technologies }: { technologies: Technology[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeleting(id)
    const { error } = await supabase.from('technologies').delete().eq('id', id)
    
    if (error) {
      console.error('[v0] Error deleting technology:', error)
      alert('Teknoloji silinirken hata oluştu')
    } else {
      router.refresh()
    }
    setDeleting(null)
  }

  if (!technologies || technologies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">Henüz teknoloji eklenmemiş</p>
      </div>
    )
  }

  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {technologies.map((tech) => (
        <div key={tech.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
          <div className="flex items-center gap-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: tech.color }}
            />
            <span className="font-medium">{tech.name}</span>
            {tech.icon_url && (
              <img src={tech.icon_url} alt={tech.name} className="w-5 h-5" />
            )}
          </div>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                disabled={deleting === tech.id}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Teknolojiyi silmek istediğinize emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu işlem geri alınamaz. Teknoloji kalıcı olarak silinecektir.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(tech.id)}>
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  )
}

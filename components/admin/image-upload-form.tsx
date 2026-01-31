'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Upload } from 'lucide-react'

export default function ImageUploadForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    alt_text: '',
    url: '',
    category: 'project',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('images').insert({
        title: formData.title,
        alt_text: formData.alt_text,
        url: formData.url,
        category: formData.category,
      })

      if (error) throw error

      setFormData({ title: '', alt_text: '', url: '', category: 'project' })
      router.refresh()
    } catch (error: any) {
      console.error('[v0] Error uploading image:', error)
      alert('Görsel eklenirken hata oluştu: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Başlık *</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Proje ekran görüntüsü"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">Görsel URL *</Label>
          <Input
            id="url"
            type="url"
            required
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alt_text">Alt Text (Erişilebilirlik)</Label>
        <Input
          id="alt_text"
          value={formData.alt_text}
          onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
          placeholder="Görselin kısa açıklaması"
        />
      </div>

      {formData.url && (
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">Önizleme:</p>
          <img 
            src={formData.url} 
            alt={formData.alt_text || 'Preview'}
            className="max-h-48 rounded object-contain"
            onError={(e) => {
              e.currentTarget.src = ''
              e.currentTarget.alt = 'Görsel yüklenemedi'
            }}
          />
        </div>
      )}

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Upload className="mr-2 h-4 w-4" />
        Görsel Ekle
      </Button>
    </form>
  )
}

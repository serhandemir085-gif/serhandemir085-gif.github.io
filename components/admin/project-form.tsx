'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

type Technology = {
  id: string
  name: string
}

type Image = {
  id: string
  title: string
  url: string
}

type ProjectFormProps = {
  technologies: Technology[]
  images: Image[]
  initialData?: any
}

export default function ProjectForm({ technologies, images, initialData }: ProjectFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    long_description: initialData?.long_description || '',
    demo_url: initialData?.demo_url || '',
    purchase_url: initialData?.purchase_url || '',
    github_url: initialData?.github_url || '',
    price: initialData?.price || '',
    status: initialData?.status || 'draft',
    featured: initialData?.featured || false,
    thumbnail_image_id: initialData?.thumbnail_image_id || '',
    selectedTechnologies: initialData?.project_technologies?.map((pt: any) => pt.technology_id) || [],
    selectedImages: initialData?.project_images?.map((pi: any) => pi.image_id) || [],
    features: initialData?.features?.join('\n') || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const projectData = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formData.description,
        long_description: formData.long_description,
        demo_url: formData.demo_url || null,
        purchase_url: formData.purchase_url || null,
        github_url: formData.github_url || null,
        price: formData.price || null,
        status: formData.status,
        featured: formData.featured,
        thumbnail_image_id: formData.thumbnail_image_id || null,
        features: formData.features.split('\n').filter(f => f.trim()),
      }

      let projectId = initialData?.id

      if (initialData) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', initialData.id)
        
        if (error) throw error

        // Delete existing relationships
        await supabase.from('project_technologies').delete().eq('project_id', initialData.id)
        await supabase.from('project_images').delete().eq('project_id', initialData.id)
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert(projectData)
          .select()
          .single()
        
        if (error) throw error
        projectId = data.id
      }

      // Insert technology relationships
      if (formData.selectedTechnologies.length > 0) {
        const techRelations = formData.selectedTechnologies.map(techId => ({
          project_id: projectId,
          technology_id: techId,
        }))
        
        const { error } = await supabase.from('project_technologies').insert(techRelations)
        if (error) throw error
      }

      // Insert image relationships
      if (formData.selectedImages.length > 0) {
        const imageRelations = formData.selectedImages.map((imgId, index) => ({
          project_id: projectId,
          image_id: imgId,
          display_order: index,
        }))
        
        const { error } = await supabase.from('project_images').insert(imageRelations)
        if (error) throw error
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (error: any) {
      console.error('[v0] Error saving project:', error)
      alert('Proje kaydedilirken hata oluştu: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Proje Başlığı *</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Örn: Discord Üye Botu"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="discord-uye-botu (Boş bırakılırsa otomatik oluşturulur)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Kısa Açıklama *</Label>
        <Textarea
          id="description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Projenin kısa açıklaması (1-2 cümle)"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="long_description">Detaylı Açıklama</Label>
        <Textarea
          id="long_description"
          value={formData.long_description}
          onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
          placeholder="Projenin detaylı açıklaması"
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Özellikler (Her satıra bir özellik)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Otomatik üye toplama&#10;7/24 çalışma&#10;Kolay kurulum"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input
            id="demo_url"
            type="url"
            value={formData.demo_url}
            onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
            placeholder="https://demo.example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchase_url">Satın Alma URL</Label>
          <Input
            id="purchase_url"
            type="url"
            value={formData.purchase_url}
            onChange={(e) => setFormData({ ...formData, purchase_url: e.target.value })}
            placeholder="https://itemsatis.com/..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            type="url"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            placeholder="https://github.com/..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Fiyat</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="99 TL"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Durum</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Taslak</SelectItem>
              <SelectItem value="published">Yayında</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="thumbnail">Kapak Görseli</Label>
          <Select 
            value={formData.thumbnail_image_id} 
            onValueChange={(value) => setFormData({ ...formData, thumbnail_image_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Görsel seçin" />
            </SelectTrigger>
            <SelectContent>
              {images.map((img) => (
                <SelectItem key={img.id} value={img.id}>
                  {img.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="featured" 
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Öne çıkan proje olarak işaretle
        </Label>
      </div>

      <div className="space-y-2">
        <Label>Teknolojiler</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 border rounded-lg">
          {technologies.map((tech) => (
            <div key={tech.id} className="flex items-center space-x-2">
              <Checkbox
                id={`tech-${tech.id}`}
                checked={formData.selectedTechnologies.includes(tech.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({
                      ...formData,
                      selectedTechnologies: [...formData.selectedTechnologies, tech.id]
                    })
                  } else {
                    setFormData({
                      ...formData,
                      selectedTechnologies: formData.selectedTechnologies.filter(id => id !== tech.id)
                    })
                  }
                }}
              />
              <Label htmlFor={`tech-${tech.id}`} className="cursor-pointer text-sm">
                {tech.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Galeri Görselleri</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 border rounded-lg max-h-96 overflow-y-auto">
          {images.map((img) => (
            <div key={img.id} className="relative">
              <Checkbox
                id={`img-${img.id}`}
                checked={formData.selectedImages.includes(img.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFormData({
                      ...formData,
                      selectedImages: [...formData.selectedImages, img.id]
                    })
                  } else {
                    setFormData({
                      ...formData,
                      selectedImages: formData.selectedImages.filter(id => id !== img.id)
                    })
                  }
                }}
                className="absolute top-2 left-2 z-10"
              />
              <Label htmlFor={`img-${img.id}`} className="cursor-pointer">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-24 object-cover rounded border-2 hover:border-primary transition-colors"
                />
                <p className="text-xs mt-1 truncate">{img.title}</p>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? 'Güncelle' : 'Kaydet'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.push('/admin/projects')}
        >
          İptal
        </Button>
      </div>
    </form>
  )
}

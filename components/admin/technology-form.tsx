'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Plus } from 'lucide-react'

export default function TechnologyForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    icon_url: '',
    color: '#3b82f6',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from('technologies').insert({
        name: formData.name,
        icon_url: formData.icon_url || null,
        color: formData.color,
      })

      if (error) throw error

      setFormData({ name: '', icon_url: '', color: '#3b82f6' })
      router.refresh()
    } catch (error: any) {
      console.error('[v0] Error creating technology:', error)
      alert('Teknoloji eklenirken hata oluştu: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Teknoloji Adı *</Label>
        <Input
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Python"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon_url">İkon URL</Label>
        <Input
          id="icon_url"
          type="url"
          value={formData.icon_url}
          onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
          placeholder="https://cdn.example.com/python.svg"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Renk</Label>
        <div className="flex gap-2">
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            className="w-20 h-10"
          />
          <Input
            type="text"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            placeholder="#3b82f6"
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Plus className="mr-2 h-4 w-4" />
        Teknoloji Ekle
      </Button>
    </form>
  )
}

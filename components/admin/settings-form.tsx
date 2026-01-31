'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2, Save } from 'lucide-react'

type Setting = {
  key: string
  value: string | null
  type: string
}

export default function SettingsForm({ settings }: { settings: Setting[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<Record<string, string>>(
    settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value || ''
      return acc
    }, {} as Record<string, string>)
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updates = Object.entries(formData).map(([key, value]) => ({
        key,
        value,
      }))

      for (const update of updates) {
        const { error } = await supabase
          .from('site_settings')
          .update({ value: update.value })
          .eq('key', update.key)

        if (error) throw error
      }

      router.refresh()
      alert('Ayarlar başarıyla güncellendi')
    } catch (error: any) {
      console.error('[v0] Error updating settings:', error)
      alert('Ayarlar güncellenirken hata oluştu: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getValue = (key: string) => formData[key] || ''
  const setValue = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="site_title">Site Başlığı</Label>
        <Input
          id="site_title"
          value={getValue('site_title')}
          onChange={(e) => setValue('site_title', e.target.value)}
          placeholder="serhan885 | CodeHub"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="site_description">Site Açıklaması</Label>
        <Textarea
          id="site_description"
          value={getValue('site_description')}
          onChange={(e) => setValue('site_description', e.target.value)}
          placeholder="Python, Node.js ve AI altyapıları ile..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero_title">Hero Başlık</Label>
        <Input
          id="hero_title"
          value={getValue('hero_title')}
          onChange={(e) => setValue('hero_title', e.target.value)}
          placeholder="OTOMASYON ÇÖZÜMLERI"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hero_subtitle">Hero Alt Başlık</Label>
        <Textarea
          id="hero_subtitle"
          value={getValue('hero_subtitle')}
          onChange={(e) => setValue('hero_subtitle', e.target.value)}
          placeholder="Python, Node.js ve AI altyapıları ile..."
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            id="email"
            type="email"
            value={getValue('email')}
            onChange={(e) => setValue('email', e.target.value)}
            placeholder="contact@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            type="url"
            value={getValue('github_url')}
            onChange={(e) => setValue('github_url', e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="store_url">Mağaza URL</Label>
        <Input
          id="store_url"
          type="url"
          value={getValue('store_url')}
          onChange={(e) => setValue('store_url', e.target.value)}
          placeholder="https://www.itemsatis.com/p/..."
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <Save className="mr-2 h-4 w-4" />
        Ayarları Kaydet
      </Button>
    </form>
  )
}

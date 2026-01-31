import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import ImageGallery from '@/components/admin/image-gallery'
import ImageUploadForm from '@/components/admin/image-upload-form'

export default async function ImagesPage() {
  const supabase = await createClient()
  
  const { data: images, error } = await supabase
    .from('images')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Görseller</h1>
          <p className="text-muted-foreground">
            Medya dosyalarınızı yönetin
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yeni Görsel Yükle</CardTitle>
          <CardDescription>
            URL ile görsel ekleyin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUploadForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Görsel Galerisi</CardTitle>
          <CardDescription>
            {images?.length || 0} görsel bulundu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-destructive text-sm">
              Görseller yüklenirken hata oluştu: {error.message}
            </div>
          )}
          {images && <ImageGallery images={images} />}
        </CardContent>
      </Card>
    </div>
  )
}

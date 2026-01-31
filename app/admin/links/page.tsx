import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LinksPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Linkler</h1>
        <p className="text-muted-foreground">
          Sosyal medya ve harici bağlantılarınızı yönetin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Link Yönetimi</CardTitle>
          <CardDescription>
            Yakında eklenecek
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Bu özellik şu anda geliştirilme aşamasındadır.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

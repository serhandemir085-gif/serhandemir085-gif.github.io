import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SkillsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Yetenekler</h1>
        <p className="text-muted-foreground">
          Beceri ve yetkinliklerinizi yönetin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yetenek Yönetimi</CardTitle>
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

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function MessagesPage() {
  const supabase = await createClient()

  const { data: messages, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">İletişim Mesajları</h1>
        <p className="text-muted-foreground">
          Ziyaretçilerden gelen tüm mesajlar
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tüm Mesajlar</CardTitle>
          <CardDescription>
            {messages?.length || 0} mesaj bulundu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-destructive text-sm">
              Mesajlar yüklenirken hata oluştu: {error.message}
            </div>
          )}
          {messages && messages.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>İsim</TableHead>
                  <TableHead>E-posta</TableHead>
                  <TableHead>Konu</TableHead>
                  <TableHead>Mesaj</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate">{message.message}</TableCell>
                    <TableCell>
                      <Badge variant={message.status === 'unread' ? 'default' : 'secondary'}>
                        {message.status === 'unread' ? 'Okunmadı' : 'Okundu'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString('tr-TR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Henüz mesaj gelmedi</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

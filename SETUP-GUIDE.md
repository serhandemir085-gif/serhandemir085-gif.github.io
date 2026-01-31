# 🚀 Profesyonel Portföy Web Sitesi Kurulum Rehberi

## 📋 İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Kurulum Adımları](#kurulum-adımları)
3. [Admin Panel Kullanımı](#admin-panel-kullanımı)
4. [Veritabanı Yapısı](#veritabanı-yapısı)
5. [Özellikler](#özellikler)

---

## 🎯 Genel Bakış

Bu profesyonel portföy web sitesi aşağıdaki özelliklere sahiptir:

### Ana Özellikler
- ✅ **Tam Otomasyonlu Admin Panel** - Kod yazmadan içerik yönetimi
- ✅ **Modern Tasarım** - Next.js 16 + Tailwind CSS + shadcn/ui
- ✅ **Güvenli Authentication** - Supabase Auth ile giriş sistemi
- ✅ **Veritabanı Entegrasyonu** - PostgreSQL ile tam veri yönetimi
- ✅ **Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- ✅ **SEO Optimizasyonu** - Arama motorları için optimize edilmiş
- ✅ **Hızlı Performans** - Server-side rendering ve optimizasyon

### Teknolojiler
- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **Deployment**: Vercel

---

## 🛠 Kurulum Adımları

### 1. Veritabanını Hazırlayın

#### Supabase Dashboard'da:
1. Supabase projenize gidin
2. Sol menüden **SQL Editor** seçin
3. `scripts/setup-database.sql` dosyasını açın
4. İçeriği kopyalayın ve SQL Editor'e yapıştırın
5. **RUN** butonuna basın

Bu işlem şunları oluşturur:
- `images` - Görsel yönetimi
- `projects` - Proje bilgileri
- `technologies` - Teknoloji listesi
- `skills` - Yetenekler
- `links` - Sosyal medya linkleri
- `contact_messages` - İletişim formları
- `analytics` - Ziyaretçi istatistikleri
- `site_settings` - Site ayarları

### 2. Admin Hesabı Oluşturun

1. Tarayıcınızda `/auth/login` adresine gidin
2. İlk kullanıcı kaydını oluşturun (bu otomatik olarak admin olur)
3. E-posta onayını yapın
4. Giriş yapın

### 3. Admin Panele Erişin

Giriş yaptıktan sonra `/admin` adresine gidin. Burada:
- Dashboard - Genel istatistikler
- Projeler - Tüm projelerinizi yönetin
- Görseller - Medya dosyalarını yükleyin
- Teknolojiler - Kullandığınız araçları ekleyin
- Yetenekler - Becerilerinizi listeleyin
- Linkler - Sosyal medya bağlantıları
- Mesajlar - İletişim formundan gelen mesajlar
- Analitik - Ziyaretçi istatistikleri
- Ayarlar - Site yapılandırması

---

## 🎮 Admin Panel Kullanımı

### Proje Ekleme

1. **Admin Panel** → **Projeler** → **Yeni Proje**
2. Proje bilgilerini doldurun:
   - **Başlık**: Projenizin adı
   - **Açıklama**: Kısa tanım (1-2 cümle)
   - **Detaylı Açıklama**: Uzun açıklama
   - **Özellikler**: Her satıra bir özellik
   - **Fiyat**: Ücretli ise fiyat
   - **URL'ler**: Demo, satın alma, GitHub linkleri
   
3. **Görsel Seçin**:
   - Kapak görseli
   - Galeri görselleri
   
4. **Teknolojileri Seçin**:
   - Python, Node.js, React vb.
   
5. **Durum Belirleyin**:
   - **Taslak**: Sadece sizin görebileceğiniz
   - **Yayında**: Herkesin görebileceği
   
6. **Öne Çıkan**: ✅ işaretleyin (isteğe bağlı)

### Görsel Yükleme

1. **Admin Panel** → **Görseller**
2. Görsel bilgilerini girin:
   - **Başlık**: Görselin adı
   - **URL**: Görselin web adresi
   - **Alt Text**: Erişilebilirlik için açıklama

> **Not**: Görseller harici URL olarak eklenir. Vercel Blob, Imgur, veya kendi sunucunuz kullanabilirsiniz.

### Teknoloji Ekleme

1. **Admin Panel** → **Teknolojiler**
2. Form doldurun:
   - **Teknoloji Adı**: Python, JavaScript vb.
   - **İkon URL**: (İsteğe bağlı) İkon linki
   - **Renk**: Badge rengi için hex kod

### İçerik Güncelleme

Tüm içerikler **gerçek zamanlı** olarak güncellenir:
- Proje ekle/düzenle/sil
- Görselleri yönet
- Teknolojileri düzenle
- Ayarları değiştir

**Kod yazmaya gerek yok!** Her şey admin panelden yapılır.

---

## 🗄 Veritabanı Yapısı

### Ana Tablolar

#### `projects` - Projeler
```sql
- id: UUID
- title: Başlık
- slug: URL için slug
- description: Kısa açıklama
- long_description: Detaylı açıklama
- features: Özellikler (dizi)
- featured: Öne çıkan mı?
- status: draft | published
- price: Fiyat
- demo_url, purchase_url, github_url
- thumbnail_image_id: Kapak görseli
```

#### `images` - Görseller
```sql
- id: UUID
- title: Başlık
- url: Görsel URL
- alt_text: Alternatif metin
- category: project | hero | about
```

#### `technologies` - Teknolojiler
```sql
- id: UUID
- name: İsim
- icon_url: İkon URL
- color: Hex renk kodu
```

#### `project_technologies` - Proje-Teknoloji İlişkisi
```sql
- project_id: Proje ID
- technology_id: Teknoloji ID
```

#### `project_images` - Proje-Görsel İlişkisi
```sql
- project_id: Proje ID
- image_id: Görsel ID
- display_order: Sıralama
```

### Güvenlik (Row Level Security)

- **Public kullanıcılar**:
  - Yayınlanmış projeleri görür
  - Görselleri görür
  - Teknolojileri görür
  
- **Admin kullanıcılar** (authenticated):
  - Her şeyi ekleyebilir
  - Her şeyi düzenleyebilir
  - Her şeyi silebilir

---

## ✨ Özellikler

### Frontend (Public Website)

#### Ana Sayfa
- Hero bölümü (animasyonlu yazı efekti)
- İstatistikler (otomatik sayaç)
- Proje kartları
- Teknoloji filtreleme
- Responsive navbar
- Footer

#### Proje Detayları
- Modal popup
- Galeri görselleri
- Teknoloji badge'leri
- Satın alma/demo linkleri
- Özellik listesi

### Backend (Admin Panel)

#### Dashboard
- Toplam proje sayısı
- Görsel sayısı
- Mesaj sayısı
- Teknoloji sayısı
- Hızlı eylemler
- Sistem durumu

#### Proje Yönetimi
- CRUD operasyonları
- Sürükle-bırak sıralama
- Toplu düzenleme
- Filtreleme ve arama
- Öne çıkan proje işaretleme

#### Görsel Yönetimi
- URL ile görsel ekleme
- Galeri görünümü
- Kopyala butonu
- Silme işlemi
- Kategorileme

#### Teknoloji Yönetimi
- Hızlı ekleme
- Renk seçici
- İkon desteği
- Silme işlemi

---

## 🎨 Tasarım Özellikleri

- **Dark Mode**: Modern karanlık tema
- **Animasyonlar**: Smooth geçişler
- **Hover Efektleri**: İnteraktif elemanlar
- **Gradient Sphere**: Arka plan efekti
- **Noise Overlay**: Doku efekti
- **Custom Scrollbar**: Özel kaydırma çubuğu
- **Code Window**: Animasyonlu kod penceresi

---

## 🚀 Deployment

### Vercel'e Deploy

1. GitHub'a push yapın
2. Vercel'de projeyi import edin
3. Environment variables ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy butonuna basın

### Environment Variables

Admin panelden **Vars** sekmesinden ekleyebilirsiniz.

---

## 📱 Kullanım Senaryoları

### Yeni Proje Eklemek
1. Admin Panel → Projeler → Yeni Proje
2. Bilgileri doldurun
3. Görselleri seçin
4. Teknolojileri işaretleyin
5. "Yayında" yapın
6. Kaydet

### Mevcut Projeyi Düzenlemek
1. Admin Panel → Projeler
2. Düzenle butonuna tıklayın
3. İstediğiniz değişiklikleri yapın
4. Güncelle

### Projeyi Silmek
1. Admin Panel → Projeler
2. Sil butonuna tıklayın
3. Onaylayın

---

## 🔧 Troubleshooting

### Admin panele giriş yapamıyorum
- E-posta onayını kontrol edin
- Supabase dashboard'dan kullanıcıyı kontrol edin
- Şifre sıfırlama deneyin

### Projeler görünmüyor
- Status "published" olmalı
- RLS politikalarını kontrol edin
- Browser console'da hata var mı bakın

### Görseller yüklenmiyor
- URL doğru mu kontrol edin
- CORS hatası var mı bakın
- Görsel erişilebilir mi test edin

---

## 💡 İpuçları

1. **SEO için**: Her projeye açıklama ve alt text ekleyin
2. **Performans için**: Görselleri optimize edin (WebP formatı)
3. **Güvenlik için**: Admin şifrenizi güçlü tutun
4. **Yedekleme**: Veritabanını düzenli yedekleyin
5. **Test**: Her değişiklikten sonra siteyi test edin

---

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Browser console'u kontrol edin
2. Supabase logs'ları inceleyin
3. GitHub issues açın

---

## 🎉 Başarılar!

Artık profesyonel bir portföy web siteniz var! Admin panelden kolayca yönetebilir, projelerinizi sergileyebilir ve müşterilerinizle iletişime geçebilirsiniz.

**Kod yazmadan her şeyi admin panelden yapabilirsiniz!**

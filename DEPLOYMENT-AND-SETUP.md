# 🚀 SERHANDEMİR885 Portföy Sitesi - Tam Kurulum Rehberi

## ⚠️ ÖNEMLİ: Deployment Yöntemi

**Mevcut Durum:** GitHub Pages'de statik HTML arayıyor (404 hatası)
**Çözüm:** Vercel'e Next.js uygulaması olarak deploy etmeliyiz

---

## 📋 KURULUM ADIM ADIM

### ADIM 1️⃣: Supabase Veritabanını Hazırlayın

#### 1.1 Supabase Hesabı Oluşturun
- https://supabase.com adresine gidin
- **Sign Up** ile hesap oluşturun
- Email onayı yapın

#### 1.2 Yeni Proje Oluşturun
1. Supabase Dashboard'a giriş yapın
2. **New Project** butonuna tıklayın
3. Proje adı: `serhan885-portfolio`
4. Password: Güçlü bir şifre belirleyin (kaydettirin!)
5. Region: Turkey (Türkiye) seçin
6. **Create new project** butonuna basın
7. Proje yüklenmesini bekleyin (5-10 dakika)

#### 1.3 Veritabanını Hazırlayın
1. Supabase Dashboard'ında **SQL Editor** seçin
2. İleri git
3. `scripts/setup-database.sql` dosyasındaki TÜM kodu kopyalayın
4. SQL Editor'e yapıştırın
5. **RUN** butonuna basın

> ✅ Başarılı olursa: "Create table" mesajları göreceksiniz
> ❌ Hata alırsa: Admin Panelden vs. Vars sekmesinden environment variables kontrol edin

#### 1.4 Environment Variables'ı Kopyalayın
1. Supabase Dashboard → **Project Settings** → **API**
2. Aşağıdaki bilgileri not edin:
   - **Project URL**: Supabase URL
   - **Anon Public Key**: Public API Key
   
3. Bu bilgileri daha sonra v0 Vars sekmesine ekleyeceksiniz

---

### ADIM 2️⃣: v0 Ortamını Hazırlayın

#### 2.1 Environment Variables'ı Ekleyin
1. v0 UI'da sol sidebar → **Vars** sekmesini açın
2. Aşağıdaki değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL: [Supabase URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY: [Supabase Anon Key]
```

Örnek:
```
NEXT_PUBLIC_SUPABASE_URL: https://xyzabc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 2.2 Kodu Test Edin
1. v0 Preview'de uygulamayı çalıştırın
2. `/auth/login` adresine gidin
3. Register butonuna tıklayın
4. Yeni hesap oluşturun (ilk kullanıcı = admin)

---

### ADIM 3️⃣: Vercel'e Deploy Edin

#### 3.1 GitHub'a Push Yapın
```bash
# Terminal'de v0 project klasöründe
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

#### 3.2 Vercel'e Bağlayın
1. https://vercel.com adresine gidin
2. Sign Up / Log In yapın
3. **Add New...** → **Project** seçin
4. **Import Git Repository** seçin
5. GitHub'ı authorize edin
6. `serhandemir085-gif.github.io` repository'sini seçin
7. **Import** butonuna basın

#### 3.3 Environment Variables'ı Vercel'e Ekleyin
1. **Environment Variables** sekmesinde:
   ```
   NEXT_PUBLIC_SUPABASE_URL: [value]
   NEXT_PUBLIC_SUPABASE_ANON_KEY: [value]
   ```
2. **Deploy** butonuna basın

#### 3.4 Deployment Tamamlanana Kadar Bekleyin
- URL size verilecek: `https://[your-project].vercel.app`
- Bu URL'i kullanarak siteye erişebilirsiniz

---

## 🎮 ADMIN PANEL KULLANMAYA BAŞLAYIN

### Admin Panel'e Erişin
1. Deployment URL'ini açın
2. `/auth/login` ekleyerek adrese gidin
3. Hesabınızla giriş yapın

### Örnek: İlk Projeyi Ekleyin

#### Adım 1: Görsel Yükleyin
1. Admin Panel → **Görseller**
2. Proje kapağı için bir görsel URL'si girin:
   - Kendi buluta yükledi: Imgur, Imgbb, veya AWS S3
   - URL: `https://imgur.com/xxxxx.jpg`
   - Alt Text: Proje açıklaması

#### Adım 2: Teknoloji Ekleyin
1. Admin Panel → **Teknolojiler**
2. Kullandığınız teknolojileri ekleyin:
   - Python
   - JavaScript
   - Discord Bot Framework vb.

#### Adım 3: Proje Ekleyin
1. Admin Panel → **Projeler** → **Yeni Proje**
2. Formu doldurun:
   - **Başlık**: "Otomasyonlu PDF İşleyici"
   - **Açıklama**: "Python ile PDF dosyalarını otomatik olarak işleyen uygulama"
   - **Detaylı Açıklama**: Uzun açıklama
   - **Özellikler**: Her satıra bir özellik
   - **Fiyat**: Ücretli ise fiyat yazın
   - **URL'ler**: Demo URL, satın alma linki, GitHub linki
   - **Kapak Görseli**: Az önce yüklediğiniz görseli seçin
   - **Teknolojiler**: Python, Node.js vb. seçin
   - **Öne Çıkan**: ✅ (isteğe bağlı)
   - **Durum**: **Yayında** seçin

3. **Kaydet** butonuna basın
4. Ana sayfada görüntülenecektir!

---

## 🔗 TÜMAKLIN LİNKLER VE BİLGİLER

### Hizmetler ve Hesaplar
| Hizmet | URL | Kullanım |
|--------|-----|---------|
| **Supabase** | https://supabase.com | Veritabanı |
| **Vercel** | https://vercel.com | Hosting |
| **GitHub** | https://github.com/serhandemir085 | Kod depo |
| **v0** | https://v0.app | Kod editörü |

### Önemli Bilgiler
```
Supabase Project: serhan885-portfolio
Vercel Project: serhandemir085-gif
GitHub Repo: serhandemir085-gif/serhandemir085-gif.github.io
```

### Admin Paneli Bölümleri ve Fonksiyonları

#### Dashboard
- Toplam istatistikler
- Hızlı eylemler
- Sistem durumu

#### Projeler
- ➕ Yeni proje ekle
- ✏️ Projeyi düzenle
- 🗑️ Projeyi sil
- 👁️ Taslak/Yayında ayarla
- ⭐ Öne çıkan işaretle

#### Görseller
- 📤 Görsel URL ekle
- 📋 Kategorilendirme
- 👁️ Galeri görünümü
- 🗑️ Silme

#### Teknolojiler
- ➕ Yeni teknoloji ekle
- 🎨 Renk seçimi
- 🗑️ Silme

#### Yetenekler
- Becerilerinizi ekleyin
- Seviyeleri belirleyin
- Kategorilendirme

#### Linkler
- GitHub, LinkedIn, Twitter vb.
- Sosyal medya profilleri
- Kişisel websiteler

#### Mesajlar
- İletişim formundan gelen mesajlar
- Okundu/Okunmadı işareti
- Spam filtreleme

#### Analitik
- Ziyaretçi istatistikleri
- En çok ziyaret edilen projeler
- Konversiyon oranları

#### Ayarlar
- Site başlığı
- Site açıklaması
- Hero bölümü yazıları
- İletişim E-maili
- İletişim bilgileri

---

## 🎯 SONRAKI ADIMLAR

### 1. Domaininizi Bağlayın (Opsiyonel)
- Vercel'de **Settings** → **Domains**
- Kendi domainizi ekleyin
- DNS ayarlarını güncelleyin

### 2. E-mail Yapılandırması (Opsiyonel)
- İletişim formundan gelen e-mailler nereye gelmesini istiyorsanız
- Supabase → Email Adapter yapılandırın

### 3. Analytics Kurulumu
- Google Analytics ekle
- Vercel Analytics aktif et

### 4. SEO Optimizasyonu
- `/app/layout.tsx` dosyasında meta tags güncelleyin
- Sitemap oluşturun
- robots.txt ekleyin

### 5. Öne Çıkan Projeleri Seçin
- Admin Panel → Projeler
- En iyi 3-4 projeyi ⭐ işaretle
- Ana sayfada ilk görünecekler

---

## 🔐 GÜVENLİK ÖNEMLERİ

### Admin Şifresi
- ✅ En az 12 karakter
- ✅ Büyük + küçük harf + sayı + özel karakter
- ✅ Hiç kimseyle paylaşmayın

### API Keys
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` herkese gösterilir (güvenli)
- ✅ Diğer keys'i asla yayınlamayın
- ✅ Keys'i düzenli değiştirin

### Supabase Settings
- Row Level Security (RLS) zaten aktif
- Public kullanıcılar sadece yayınlanmış projeleri görür
- Admin kullanıcılar her şeyi düzenleyebilir

---

## 📱 RESPONSIVE TASARIM

Web siteniz otomatik olarak şu cihazlarda mükemmel görünecektir:
- 📱 Mobil (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Masaüstü (1024px+)

---

## ❓ SIKILANTILAR

**S: Admin panele erişemiyorum**
A: E-posta onayını kontrol edin. Supabase → Auth → Users'da kullanıcıyı görün.

**S: Projeler görünmüyor**
A: Status "published" olduğundan emin olun. Taslak projeleri sadece siz görebilirsiniz.

**S: Görseller yüklenmiyor**
A: URL doğru mu kontrol edin. CORS hatası varsa başka bir image hosting servisi deneyin.

**S: /auth/login 404 veriyor**
A: GitHub Pages'te deployment yapıyorsunuz. Vercel'e deploy edin!

---

## 🎉 HAZIRSINIZ!

Artık profesyonel bir portföy siteniz var ve kullanıma hazır. İyi şanslar! 🚀

---

**Oluşturma Tarihi**: 2026-01-31
**Versiyon**: 1.0
**Durum**: Production Ready

# ⚡ Hızlı Başlangıç Rehberi (5 dakika)

## 🎯 Hedef
Next.js portföy sitenizi Vercel'e deploy etmek ve admin paneli kullanmaya başlamak.

---

## ⏱️ 5 DAKIKA KURULUM

### 1. Supabase Hazırlığı (2 dakika)
```
1. https://supabase.com → Sign Up
2. Email onayı
3. New Project → Name: "serhan885"
4. SQL Editor → scripts/setup-database.sql kopyalayıp RUN
5. Settings → API → URL ve Key'i not et
```

### 2. v0 Vars Ekle (1 dakika)
```
Sidebar → Vars
NEXT_PUBLIC_SUPABASE_URL: [URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY: [Key]
```

### 3. Vercel Deploy (2 dakika)
```
1. https://vercel.com → Import GitHub
2. serhandemir085-gif.github.io seç
3. Environment Variables ekle
4. Deploy
```

---

## 🔗 BAĞLANTILAR

### Hizmetler
- **Supabase**: https://supabase.com
- **Vercel**: https://vercel.com
- **GitHub**: https://github.com/serhandemir085
- **v0**: https://v0.app

### Deployment Sonrası URL'ler
- **Ana Site**: https://[your-vercel-url].vercel.app
- **Admin Login**: https://[your-vercel-url].vercel.app/auth/login
- **Admin Panel**: https://[your-vercel-url].vercel.app/admin

---

## 🎮 ADMIN PANEL

### Erişim
```
1. Deployment URL'ini aç
2. /auth/login ekle
3. Hesapla giriş yap
```

### İlk İşler
1. ➕ Teknoloji ekle (Python, JS, vb.)
2. 📤 Görsel yükle (Imgur/Imgbb'den)
3. ➕ Proje ekle
4. 👁️ Status → "Yayında" seç
5. ⭐ Öne çıkan işaretle

---

## 📋 KONTROL LİSTESİ

- [ ] Supabase hesabı oluşturdum
- [ ] Veritabanını oluşturdum (setup-database.sql)
- [ ] API credentials'ı not ettim
- [ ] v0 Vars'a environment variables ekledim
- [ ] Vercel'e deploy ettim
- [ ] Admin login test ettim
- [ ] İlk projeyi ekledim
- [ ] Ana sayfada görüntüledi

---

## 🆘 SORUN GIDERILME

| Sorun | Çözüm |
|-------|-------|
| 404 hatası | Vercel'e deploy edin (GitHub Pages değil) |
| Admin girişi yapamıyorum | E-posta onayı yaptınız mı? |
| Projeler görünmüyor | Status "published" olmalı |
| Görseller açılmıyor | URL erişilebilir mi test edin |
| Environment hatası | NEXT_PUBLIC_ variables'ı kontrol edin |

---

## 📞 QUICK LINKS

| Adım | Link |
|------|------|
| Supabase | https://supabase.com/dashboard |
| Vercel | https://vercel.com/dashboard |
| GitHub | https://github.com/serhandemir085 |
| v0 | https://v0.app |
| Imgur (Images) | https://imgur.com |
| Imgbb (Images) | https://imgbb.com |

---

## 🚀 İYİ BAŞARILAR!

Sorular varsa DEPLOYMENT-AND-SETUP.md'yi oku!

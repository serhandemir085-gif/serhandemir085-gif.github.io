// Proje Veritabanı (Burayı İstediğin Gibi Düzenleyebilirsin)
const projectsData = [
    {
        id: 1,
        title: "Titan X v2",
        category: "System Optimization",
        tags: ["Python", "Windows API", "Performance"],
        image: "images/titan-x.jpg", // Resmi yoksa gri kutu görünür
        description: "Windows işletim sistemleri için geliştirilmiş, sistem kaynaklarını (CPU/RAM) analiz ederek arkaplan işlemlerini optimize eden ve FPS artışı sağlayan kapsamlı bir araç.",
        features: [
            "Gereksiz servisleri otomatik kapatma",
            "Oyun modu aktivasyonu",
            "Anlık RAM temizleme modülü",
            "Kayıt defteri (Regedit) optimizasyonları"
        ]
    },
    {
        id: 2,
        title: "Titan VFX (AI Editor)",
        category: "Artificial Intelligence",
        tags: ["Python", "AI", "Video Processing"],
        image: "images/titan-vfx.jpg",
        description: "İçerik üreticileri için geliştirilen bu yapay zeka aracı, videodaki ses dalgalarını analiz eder. Konuşmanın vurgulu olduğu yerlere otomatik zoom ve efekt ekler.",
        features: [
            "Ses analizi ile otomatik kurgu",
            "Duygu durumuna göre renk filtresi",
            "Otomatik altyazı senkronizasyonu",
            "Render süresini %40 kısaltan algoritma"
        ]
    },
    {
        id: 3,
        title: "Futbol Arena",
        category: "Interactive Streaming",
        tags: ["Node.js", "WebSocket", "Frontend"],
        image: "images/futbol-arena.jpg",
        description: "Canlı yayıncılar için özel olarak kodlanmış, izleyicilerin komutlarla maça müdahale edebildiği veya takım tutabildiği interaktif bir yayın arayüzü.",
        features: [
            "Gerçek zamanlı skor tablosu",
            "Özelleştirilebilir takım renkleri ve logolar",
            "Canlı yayın (OBS) entegrasyonu",
            "Anlık bildirim animasyonları"
        ]
    },
    {
        id: 4,
        title: "YouTube Hesap Botu",
        category: "Automation",
        tags: ["Python", "BlueStacks", "Bot"],
        image: "images/youtube-bot.jpg",
        description: "BlueStacks emülatörü üzerinden insan davranışlarını taklit ederek toplu YouTube hesabı oluşturan ve mobil doğrulama aşamalarını yöneten bot.",
        features: [
            "IP değiştirme (Proxy) desteği",
            "Tam otomatik form doldurma",
            "İnsan benzeri fare hareketleri (Anti-Detection)",
            "Başarı/Hata raporlama sistemi"
        ]
    },
    {
        id: 5,
        title: "SMM Bayi Otomasyonu",
        category: "E-Commerce",
        tags: ["API", "Backend", "Integration"],
        image: "images/smm-panel.jpg",
        description: "Farklı SMM panelleri (Medyapanel vb.) ile satış siteleri arasında köprü kurarak, sipariş geldiği anda ana sağlayıcıdan otomatik alım yapan sistem.",
        features: [
            "Kar marjı hesaplama modülü",
            "Otomatik sipariş durumu güncelleme",
            "Bakiye yetersiz uyarısı",
            "Çoklu API desteği"
        ]
    },
    {
        id: 6,
        title: "Video Randomizer",
        category: "Video Tools",
        tags: ["FFmpeg", "Scripting", "Algorithm"],
        image: "images/video-gen.jpg",
        description: "Aynı videoyu yüzlerce farklı kanalda 'özgün' olarak paylaşabilmek için videonun piksel verilerini ve metadatasını değiştiren FFmpeg tabanlı script.",
        features: [
            "Görünmez piksel manipülasyonu",
            "Ses perdesi (Pitch) değiştirme",
            "Rastgele çerçeve ve filtre ekleme",
            "Toplu işlem (Batch Processing)"
        ]
    }
];

// Sayfa Yüklendiğinde Çalışacak Kodlar
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader'ı Kapat
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 1500);

    // 2. Projeleri HTML'e Yerleştir (Render)
    const grid = document.getElementById('projects-grid');
    
    projectsData.forEach(project => {
        // Kart oluştur
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-id', project.id); // Tıklama için ID sakla
        
        // Etiketleri (Tags) oluştur
        let tagsHtml = '';
        project.tags.forEach(tag => {
            tagsHtml += `<span class="tag">${tag}</span>`;
        });

        // Kartın İçeriği
        card.innerHTML = `
            <div class="card-img-holder">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400/1e293b/FFF?text=Görsel+Yok'">
            </div>
            <div class="card-body">
                <div class="card-tags">${tagsHtml}</div>
                <h3>${project.title}</h3>
                <p>${project.description.substring(0, 80)}...</p>
                <span class="read-more">Detayları İncele <i class="fas fa-arrow-right"></i></span>
            </div>
        `;
        
        // Karta tıklama olayı ekle
        card.addEventListener('click', () => openModal(project));
        
        grid.appendChild(card);
    });

    // 3. İstatistik Sayacı Animasyonu
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200; // Hız ayarı
            const inc = target / speed;

            if(count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        }
        updateCount();
    });

    // 4. Yazı Yazma Efekti (Typewriter)
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if(this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            let typeSpeed = 100;

            if(this.isDeleting) { typeSpeed /= 2; }

            if(!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if(this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Yazı efektini başlat
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);

});

// MODAL İŞLEMLERİ
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');

// Modalı Açan Fonksiyon
function openModal(project) {
    // İçeriği doldur
    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-desc').innerText = project.description;
    
    const img = document.getElementById('modal-img');
    img.src = project.image;
    img.onerror = function() { this.src = 'https://placehold.co/800x600/1e293b/FFF?text=Görsel+Yok'; };

    // Etiketleri doldur
    const tagContainer = document.getElementById('modal-tags');
    tagContainer.innerHTML = '';
    project.tags.forEach(tag => {
        tagContainer.innerHTML += `<span class="tag" style="background:#2563eb; color:white;">${tag}</span> `;
    });

    // Özellikleri listele
    const featureList = document.getElementById('modal-features');
    featureList.innerHTML = '';
    project.features.forEach(feature => {
        featureList.innerHTML += `<li>${feature}</li>`;
    });

    // Modalı göster
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

// Modalı Kapatma
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
});

// Modal dışına tıklayınca kapat
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    }
}

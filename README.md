# 📖 CerpenEdu — Media Pembelajaran Cerpen

Website pembelajaran interaktif tentang **Cerita Pendek (Cerpen)** untuk siswa SMA/MA dan mahasiswa Bahasa Indonesia.

## 🌐 Demo Live
> Setelah deploy ke GitHub Pages, URL akan berformat:
> `https://[username].github.io/cerpen-edu/`

---

## 📁 Struktur Folder

```
cerpen-website/
├── index.html          ← File utama (semua halaman dalam 1 file)
├── css/
│   └── style.css       ← Semua styling
├── js/
│   └── main.js         ← Interaktivitas (navbar, tab, kuis)
└── README.md           ← Dokumentasi ini
```

---

## 📚 Fitur Website

| Halaman | Konten |
|---|---|
| 🏠 Beranda | Hero section, statistik konten |
| 📖 Materi Cerpen | Pengertian, ciri-ciri, definisi ahli |
| 🔍 Unsur Intrinsik & Ekstrinsik | Tab interaktif, 7 unsur intrinsik |
| 🧱 Struktur Cerpen | Orientasi, Komplikasi, Resolusi |
| 📝 Contoh Cerpen | 3 cerpen pendek berbeda genre |
| 🔬 Analisis Cerpen | Langkah analisis + tabel contoh |
| 🎯 Latihan / Kuis | 10 soal PG + cek jawaban otomatis |
| ℹ️ Tentang Website | Info konten & referensi |

---

## 🚀 Cara Upload ke GitHub Pages

### Langkah 1 — Buat Repository GitHub
1. Buka [github.com](https://github.com) dan login
2. Klik tombol **"New"** (repositori baru)
3. Isi nama repositori, contoh: `cerpen-edu`
4. Pastikan **Public** dipilih
5. Klik **"Create repository"**

### Langkah 2 — Upload File
**Cara A: Lewat Browser (Mudah)**
1. Di halaman repositori yang baru dibuat, klik **"uploading an existing file"**
2. Drag & drop semua file sekaligus:
   - `index.html`
   - Folder `css/` (dengan `style.css` di dalamnya)
   - Folder `js/` (dengan `main.js` di dalamnya)
3. Scroll ke bawah, klik **"Commit changes"**

**Cara B: Lewat Git (Terminal)**
```bash
git init
git add .
git commit -m "Initial commit: CerpenEdu website"
git branch -M main
git remote add origin https://github.com/[username]/cerpen-edu.git
git push -u origin main
```

### Langkah 3 — Aktifkan GitHub Pages
1. Di repositorimu, klik tab **Settings**
2. Scroll ke bagian **"Pages"** di menu kiri
3. Di bagian **"Source"**, pilih:
   - Branch: `main`
   - Folder: `/ (root)`
4. Klik **Save**
5. Tunggu 1–3 menit

### Langkah 4 — Website Online! 🎉
Website kamu akan tersedia di:
```
https://[username].github.io/cerpen-edu/
```
> Ganti `[username]` dengan username GitHub kamu
> Ganti `cerpen-edu` dengan nama repositori yang kamu buat

---

## ✏️ Cara Mengedit Konten

### Menambah Soal Kuis
Buka `js/main.js`, cari variabel `questions`, lalu tambahkan objek soal baru:
```javascript
{
  q: 'Pertanyaan kamu di sini?',
  opts: ['Pilihan A', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
  ans: 0,  // index jawaban benar (0=A, 1=B, 2=C, 3=D)
  explain: 'Penjelasan mengapa jawaban ini benar.'
}
```

### Mengganti Warna Tema
Buka `css/style.css`, edit variabel CSS di bagian `:root`:
```css
:root {
  --gold: #c9973a;   /* warna utama/aksen */
  --green: #3a7c5a;  /* warna sekunder */
  --bg: #faf9f6;     /* warna latar */
}
```

### Menambah Cerpen Baru
Di `index.html`, tambahkan tombol di `.cerpen-tabs`:
```html
<button class="cerpen-tab-btn" data-cerpen="cerpen4">Judul Cerpen</button>
```
Lalu tambahkan konten cerpennya di bawah cerpen terakhir:
```html
<div class="cerpen-display hidden" id="cerpen4">
  ...
</div>
```

---

## 🛠️ Teknologi

- **HTML5** — Struktur dan konten
- **CSS3** — Styling, animasi, responsif
- **Vanilla JavaScript** — Interaktivitas (tanpa library eksternal)
- **Google Fonts** — Playfair Display + Plus Jakarta Sans

---

## 📖 Referensi Materi

- Nurgiyantoro, B. (2015). *Teori Pengkajian Fiksi*. Yogyakarta: Gadjah Mada University Press.
- Sumardjo, J. & Saini, K.M. (1997). *Apresiasi Kesusastraan*. Jakarta: Gramedia.
- Poe, Edgar Allan. Teori Cerpen Klasik Amerika.
- Jassin, H.B. Kritik Sastra Indonesia Modern.

---

## 📄 Lisensi
Bebas digunakan untuk keperluan pembelajaran dan pendidikan.

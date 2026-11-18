# PRD — ERRNOR Team Portfolio / LUNAS

> Product Requirements Document. Versi 1.0 — 19 Nov 2026.
> Produk: portfolio tim ERRNOR + showcase produk hackathon **LUNAS**
> (Layanan Utang & Navigasi Aset Sistematis), PIDI x Digdaya Hackathon 2026.
> Stack: Vite 6 + React 19 + Tailwind CSS 3. Deploy: Cloudflare Pages.

## 1. Ringkasan

Satu halaman web yang menjawab dua pertanyaan pengunjung hackathon:

1. **Apa itu LUNAS?** — platform automasi efisiensi liabilitas & behavioral
   nudging berbasis SNAP BI untuk akselerasi investor ritel.
2. **Siapa yang membangunnya?** — empat anggota tim ERRNOR dengan peran dan
   keahlian masing-masing.

Pengunjung harus bisa memahami produk dalam 30 detik pertama dan mencoba
simulasinya sendiri tanpa akun, tanpa backend, tanpa data pribadi.

## 2. Pengguna & tujuan

| Pengguna | Tujuan | Tolok ukur |
|----------|--------|-----------|
| Juri hackathon | Menilai produk + tim | Semua fitur demo berfungsi; tim jelas perannya |
| Pengunjung umum | Paham ide LUNAS | Hero menjelaskan produk dalam 1 layar |
| Calon mitra / perekrut | Menilai anggota tim | Modal anggota: skill + tools lengkap |

## 3. Fitur (wajib jalan — diuji e2e)

### FR-1 — Splash screen
Saat pertama dibuka, tampil splash "Powered by Logic, Delivered by AI."
selama ~2,5 detik, lalu bergeser ke atas dan hilang total di detik 3,3
(tidak menghalangi klik). `prefers-reduced-motion` tetap menghormati
durasi animasi yang dipersingkat browser.

### FR-2 — Navbar + mode gelap
- Logo ERRNOR (klik → kembali ke hero), tautan Cara Kerja / Demo Interaktif / Tim.
- Tautan **GitHub** di kanan navbar → `https://github.com/dezzorigin/errnor-team-portfolio`.
- Toggle tema terang/gelap; pilihan tersimpan di `localStorage`
  (`errnor-theme`); default mengikuti `prefers-color-scheme`.
- Menu hamburger di mobile **benar-benar membuka panel** berisi tautan +
  GitHub (bug repo lama: tombol mengubah state tapi panel tidak pernah
  di-render).

### FR-3 — Hero + kartu struk hidup
- Hero rata kiri: nama produk LUNAS, kepanjangan, deskripsi singkat, dua CTA
  (Coba Demo Interaktif → `#playground`; Kenali Tim → `#team`).
- Kartu **Struk Proyeksi** di kanan hero menampilkan angka yang sama dengan
  state demo (pendapatan, utang, surplus, proyeksi aset 12 bulan) — kartu
  ini hidup, bukan gambar statis. Detail khas: stempel "LUNAS" + tepi
  zigzag seperti struk disobek.
- Semua angka dilabeli sebagai simulasi contoh.

### FR-4 — Cara Kerja (dua baris selang-seling)
- **Baris masalah:** diagram batang Beban Bunga vs Potensi Return. Tombol
  "Aktifkan Efisiensi Liabilitas" mengubah batang 85%→25% dan 15%→75%
  (toggle kembali ke semula).
- **Baris nudge:** mockup ponsel berisi kartu notifikasi "Gaji Masuk
  Terdeteksi!" dengan rincian alokasi (Lunasi Paylater Rp500rb, Invest
  Rp100rb). Tombol "Ketuk untuk Eksekusi" mengubah kartu jadi status
  berhasil dan menampilkan pesan konfirmasi; tombol menjadi disabled.

### FR-5 — Demo Interaktif (playground)
- Dua slider: Pendapatan/bulan (Rp5–50 jt, default 15) dan Utang/bulan
  (Rp1–30 jt, default 5).
- Kartu struk menampilkan surplus, porsi investasi (50% surplus), dan
  proyeksi aset 12 bulan. Rumus: `invested = surplus × 0,5`;
  `asset12 = invested × 12 × 1,08` (asumsi return 8%/tahun) — lihat
  `docs/data.md`.
- Bila utang ≥ pendapatan: tampil pesan "Defisit Finansial", bukan angka.
- Label jujur: "Simulasi contoh — bukan nasihat keuangan."

### FR-6 — Tim (carousel + modal)
- Carousel 4 anggota (Nabil, Arienal, Jawzy, Rizki): kartu tengah aktif,
  kartu kiri/kanan bisa diklik untuk berpindah; panah prev/next; dot
  indikator; auto-rotate tiap 4 detik (berhenti saat modal terbuka).
- Klik kartu tengah → modal detail: foto, peran, posisi, kutipan
  spesialisasi, 3 skill dengan persentase (dilabeli "Penilaian mandiri
  anggota tim"), dan daftar tools.
- Modal bisa ditutup via tombol X maupun klik backdrop.

### FR-7 — Footer ledger
Satu baris: brand + stempel LUNAS, navigasi, tautan GitHub, copyright
© 2026 Team ERRNOR + kredit PIDI x Digdaya Hackathon 2026 + tagline
"Powered by Logic, Delivered by AI."

## 4. Bukan fitur (di luar cakupan)

- Tidak ada backend, akun, database, atau pemanggilan API nyata (SNAP BI
  hanya disebut sebagai integrasi produk yang diusulkan; demo ini simulasi
  sisi klien murni).
- Tidak ada formulir kontak/newsletter — pengunjung diarahkan ke GitHub.
- Tidak ada halaman terpisah; semua konten satu halaman dengan anchor.

## 5. Persyaratan non-fungsional

- **Performa:** build Vite statis; tanpa gambar eksternal (semua aset lokal
  di `public/`); font via Google Fonts dengan fallback sistem.
- **Aksesibilitas:** semua tombol ikon punya `aria-label`; dialog modal
  `role="dialog"`; `focus-visible` terlihat; kontras AA; target sentuh
  ≥ 44px di mobile; `prefers-reduced-motion` dihormati.
- **Mobile:** 390px tanpa overflow horizontal; menu mobile berfungsi.
- **Kualitas visual:** mengikuti kontrak `docs/DESIGN.md` (standar anti AI
  slop) — ditegakkan `scripts/check-links.mjs` di CI.

## 6. Kriteria penerimaan

1. `npm run build` lolos; CI hijau (build + static-checks + advisory-sweep
   OSV + Playwright e2e).
2. Play-test e2e `e2e/smoke.spec.js` 6/6 lolos (lihat `docs/testing.md`).
3. Live di Cloudflare Pages: HTTP 200, semua aset lokal 200, semua
   interaksi FR-1–FR-7 berfungsi dari build produksi.
4. Gate 7 sumbu desain (docs/DESIGN.md §5) tiap sumbu ≥ 4/5; tes siluet lolos.

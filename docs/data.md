# Data — ERRNOR Team Portfolio / LUNAS

> Versi 1.0 — 19 Nov 2026. Semua data di aplikasi ini adalah **data statis
> di dalam kode** (`src/App.jsx`) — tidak ada database, API, atau file data
> terpisah. Dokumen ini mencatat asal tiap angka supaya tidak ada yang
> dikira data nyata.

## 1. Data tim (`squad`)

Empat anggota, ditulis langsung di `src/App.jsx`:

| Anggota | Peran | Posisi | Foto |
|---------|-------|--------|------|
| Nabil Aulia Dika | The Hustler | CEO & Product Strategist | `public/nabil.jpg` |
| Arienal Zaky Irvan | The Brain | AI Engineer & Tech Writer | `public/arienal.jpg` |
| Ibnul Jawzy | The Engine | Backend & Cloud Architect | `public/jawzy.jpg` |
| Muhammad Rizki | The Face | Frontend & Mobile Dev | `public/rizki.jpg` |

Tiap anggota punya: kutipan spesialisasi (ditulis tim), 3 skill dengan
persentase, dan 3 tools. **Persentase skill adalah penilaian mandiri
anggota tim** — bukan hasil tes/asesmen. Label ini tampil di modal
("Penilaian mandiri anggota tim").

## 2. Rumus simulasi playground

Slider demo menghitung proyeksi aset dari dua input pengguna:

```
surplus       = max(0, pendapatan − utang)     // Rp juta / bulan
invested      = surplus × 0,5                  // 50% surplus diinvestasikan
asset12Months = invested × 12 × 1,08          // 12 bulan, asumsi return 8%/tahun
```

- Default: pendapatan Rp15 jt, utang Rp5 jt → surplus 10 → investasi 5 →
  **Rp64,8 jt** dalam 12 bulan.
- Asumsi return 8% adalah angka contoh yang dipilih tim untuk demo, bukan
  janji hasil investasi. UI melabeli: "Simulasi contoh — bukan nasihat
  keuangan."
- Bila `surplus <= 0`: tampil pesan "Defisit Finansial", bukan angka.

## 3. Angka contoh lain di UI

| Angka | Asal | Keterangan |
|-------|------|-----------|
| Batang Beban Bunga 85% → 25% | Ilustrasi tim | Menunjukkan arah perubahan saat efisiensi aktif, bukan data pengguna nyata |
| Batang Potensi Return 15% → 75% | Ilustrasi tim | Idem |
| Nudge: Lunasi Paylater Rp500rb, Invest Rp100rb | Skenario contoh | Alur notifikasi gaji masuk |
| Bunga Paylater 30% (di kartu nudge) | Skenario contoh | Ilustrasi beban bunga paylater |

Tidak ada statistik vanity di situs ini (tanpa klaim jumlah pengguna,
uptime, atau "10x lebih cepat").

## 4. Aset media

| File | Asal | Lisensi / catatan |
|------|------|-------------------|
| `public/nabil.jpg`, `arienal.jpg`, `jawzy.jpg`, `rizki.jpg` | Foto anggota tim (dari repo asli) | Milik tim ERRNOR; dipakai dengan persetujuan tim |
| `public/logo-errnor.png`, `public/logo-icon.png` | Logo tim (dari repo asli) | Milik tim ERRNOR |
| Font Fraunces + Public Sans | Google Fonts (OFL) | Dimuat via CDN dengan fallback sistem |
| Ikon Lucide | `lucide-react` (ISC) | Ikon SVG satu bobot |
| Mark GitHub | Simple Icons (CC0) | SVG inline di `App.jsx` (lucide 1.x menghapus brand icon) |

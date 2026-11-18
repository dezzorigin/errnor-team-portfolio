# DESIGN.md — Kontrak Arah Desain (ERRNOR Team Portfolio / LUNAS)

> Kontrak ini ditulis 19 Nov 2026 SEBELUM coding, sebagai rebuild total atas
> standar UI/UX anti AI slop (Nabil, 19 Nov 2026 06:12 WIB —
> `~/workspace/github-actions/ui-anti-slop.md`). Produk: portfolio tim ERRNOR
> + showcase produk hackathon **LUNAS** (Layanan Utang & Navigasi Aset
> Sistematis) — PIDI x Digdaya Hackathon 2026.

## 1. Referensi (tour 19 Nov 2026)

| # | Referensi | URL | Kenapa cocok |
|---|-----------|-----|--------------|
| 1 | **WE-G — Framer** (PEMENANG) | https://www.framer.com/marketplace/templates/we-g/ | Domain sama (fintech/spend-management). Kanvas off-white hangat + seksi oxblood dalam + aksen ember; hero dengan artefak fisik; baris fitur selang-seling; strip statistik; footer newsletter. Struktur inilah yang di-clone. |
| 2 | Finma — Framer | https://www.framer.com/marketplace/templates/finma/ | Domain PALING dekat: SaaS keuangan otomatis yang membantu pengguna "crush debt" — persis janji LUNAS. Struktur trust-first + tabel perbandingan. |
| 3 | Kova app — Framer | https://www.framer.com/marketplace/templates/kova-app/ | Fintech gelap-hijau + krem, landing app keuangan. Pelajaran: angka dan grafik adalah buktinya, bukan dekorasi. |

**Yang diambil dari pemenang (WE-G):**
- Hero dua kolom rata kiri — teks kiri, artefak produk kanan (di sini artefaknya
  bukan foto: kartu "struk" interaktif yang hidup, berisi ringkasan simulasi).
- Baris fitur selang-seling dipisah garis rambut (bukan kartu-kartu simetris).
- Seksi gelap oxblood untuk demo interaktif; CTA ember tunggal.
- Satu aksi utama per viewport: hero = "Coba Demo Interaktif", demo = slider,
  tim = carousel, footer = GitHub.

**Yang TIDAK diambil (sengaja):** font WE-G (Inter Display + Geist Mono —
Inter masuk daftar larangan P0); foto hero fisik (diganti artefak interaktif
yang memang fungsi produk); FAQ (produk ini tidak butuh FAQ — diganti seksi tim).

## 2. Kontrak arah

**Ide layout dalam satu kalimat:** buku kas editorial — hero kiri dengan kartu
struk interaktif hidup di kanan, baris fitur selang-seling dipisah garis rambut,
seksi gelap oxblood untuk demo, dan tim sebagai daftar ledger + carousel foto.

**Detail khas (signature detail):** **Struk Lunas** — demo interaktif tinggal di
dalam kartu struk: angka tabular, garis sobek putus-putus, tepi bawah zigzag
seperti struk yang disobek dari buku kas, plus stempel "LUNAS" miring berbingkai
ganda. Stempel yang sama muncul di hero dan footer.

### Palet (5 warna bernama, tiap warna punya tugas)

| Nama | Hex | Tugas |
|------|-----|-------|
| Kertas Kas | `#F6F1E7` | Latar halaman terang — kertas buku kas, bukan putih generik |
| Tinta Ledger | `#211D19` | Teks + garis — tinta hangat, bukan hitam pekat |
| Oxblood | `#6E1423` | Seksi gelap + footer — warna "cap" resmi, bukan navy/slate |
| Ember | `#D9481C` | Satu-satunya aksen CTA — tombol primer, sorotan angka |
| Hijau Lunas | `#177245` | Status lunas/positif — angka aset, bar "Potensi Return" |

Pendukung: Putih Struk `#FFFDF8` (kartu struk), Garis Rambut `#E3DACA`
(pemisah), Arang `#171310` (latar gelap), Merah Beban `#B3261E` (hanya untuk
beban bunga/defisit). **Tidak ada gradient ungu/biru di mana pun** — semua
permukaan flat; bar dan tombol solid.

### Tipografi (2 keluarga)

- **Display:** Fraunces 600/700/900 — headline, angka besar, judul kartu.
  (Serif editorial buku kas; menggantikan font sistem bawaan repo lama.)
- **Body/data:** Public Sans 400–700 — teks, label, tombol. Angka data memakai
  `font-variant-numeric: tabular-nums` agar kolom angka tidak goyang.

### Radius & spacing

- Sistem radius: kartu 6px (tajam, ala kertas), pill 9999px hanya untuk badge.
- Grid spacing 4/8pt; padding kartu ≥ 16px (umumnya 24–32px); pemisah berupa
  garis rambut 1px, bukan bayangan kartu.
- Motion: transisi interaksi ≤ 180ms ease-out; `:active` scale 0.97 pada
  tombol/kartu; `prefers-reduced-motion` mematikan semua animasi/transisi.

## 3. Beda dari repo sebelumnya (minimal 3 dari 5 sumbu)

Repo pembanding terdekat: **#30 regesit-ui-rework** (bento gelap + tiket).
ERRNOR berbeda di **5 dari 5 sumbu**:

1. **Palet:** kertas + oxblood + ember + hijau lunas (vs bento gelap + ungu/kuning/persik).
2. **Tipografi:** Fraunces serif display + Public Sans (vs Space Grotesk + DM Sans).
3. **Layout:** buku kas editorial rata kiri + struk (vs bento poster gelap).
4. **Radius/spacing:** 6px tajam + garis rambut (vs kartu bento 32px).
5. **Detail khas:** struk sobek + stempel LUNAS (vs tiket berlubang).

## 4. Audit P0 (temuan di repo lama → perbaikan rebuild)

| Larangan P0 | Temuan di App.jsx lama | Perbaikan |
|---|---|---|
| Gradient ungu/biru | Blob hero biru/cyan, gradient teks subtitle, gradient splash, gradient tombol badge | Semua dihapus; permukaan flat, aksen solid |
| Font Inter/Roboto/system untuk semuanya | `font-sans` Tailwind default (system stack) | Display Fraunces + Public Sans |
| Hero tengah + 3 kartu identik | Hero tengah + badge gradient | Hero dua kolom rata kiri + kartu struk |
| Emoji mentah sebagai ikon fungsi | "Eksekusi Berhasil ✓" (karakter centang mentah) | Ikon Lucide `CheckCircle2` |
| Statistik vanity palsu | — (tidak ada; dipertahankan: tidak ada klaim pengguna/uptime) | — |
| Satu kata headline diwarnai/digradient | "LUNAS" diwarnai biru di judul seksi; subtitle gradient | Judul solid; satu kata disorot HANYA via stempel, bukan warna acak |
| Tema Tailwind mentah | Tailwind default slate/blue | Palet bernama + radius 6px + garis rambut |
| rounded-2xl shadow-lg di semua permukaan | `rounded-3xl shadow-2xl` di mana-mana | Radius 6px, bayangan hanya pada struk/modal |
| Footer 4 kolom default | — (footer lama 1 baris, dipertahankan polanya) | Footer ledger satu baris + GitHub |
| Copy generik | "Powered by Logic, Delivered by AI." = tagline asli tim | Dipertahankan (bukan copy generik, ini tagline produk) |
| Hiasan 01/02/03 (orde-kedua) | — | Tidak dipakai |

**Bug fungsi yang ikut diperbaiki:** tombol hamburger mobile lama mengubah state
`tapi tidak pernah me-render panel menu` (kontrol mati) → panel menu mobile
sekarang benar-benar tampil dengan tautan + GitHub.

## 5. Gate 7 sumbu (nilai 1–5, lolos bila tiap sumbu ≥ 4)

| Sumbu | Skor | Bukti |
|-------|------|-------|
| 1. Anti-slop purity | 5 | Nol P0 + nol orde-kedua setelah rebuild; ditegakkan CI (`scripts/check-links.mjs`) |
| 2. UX speed & 1-to-3 | 4 | 1 aksi utama/viewport; hero 2 CTA (primer+sekunder) |
| 3. Tipografi | 5 | 2 keluarga (Fraunces + Public Sans); tabular-nums di angka; body ≤ 75ch |
| 4. Spacing & geometri | 4 | Grid 4/8pt; radius 6px konsisten; padding kartu ≥ 16px |
| 5. Motion | 4 | Transisi ≤ 180ms ease-out; active scale 0.97; reduced-motion dihormati |
| 6. A11y | 4 | focus-visible di semua halaman; aria-label tombol ikon; tag semantik; kontras AA |
| 7. Mobile | 4 | 390px tanpa overflow horizontal; target sentuh ≥ 44px; menu mobile berfungsi |

## 6. Tes siluet

Screenshot landing dikecilkan ke thumbnail hitam-putih
(`docs/screenshots/09-silhouette.png`, dari `01-landing-hero.png` via ffmpeg
grayscale + scale 320px): masih terbaca sebagai **produk keuangan + tim** —
hero kiri + kartu struk kanan + baris fitur + carousel foto tim — bukan halaman
SaaS generik mana pun. Penanda yang bertahan di siluet: kartu struk dengan tepi
zigzag, stempel, dan foto-foto tim. Lolos.

## 7. Bukti visual

- `docs/screenshots/01-landing-hero.png` (desktop)
- `docs/screenshots/02-how-it-works.png` (desktop, bar chart + nudge)
- `docs/screenshots/03-playground.png` (desktop, struk proyeksi)
- `docs/screenshots/04-team.png` (desktop, carousel)
- `docs/screenshots/05-team-modal.png` (desktop, modal anggota)
- `docs/screenshots/06-landing-mobile-390.png` (mobile 390px)
- `docs/screenshots/07-playground-mobile-390.png` (mobile 390px)
- `docs/screenshots/08-dark-mode.png` (desktop, mode gelap)
- `docs/screenshots/09-silhouette.png` (tes siluet, grayscale thumbnail)
- `docs/demo/demo.mp4` (video demo, adegan dari screenshot)

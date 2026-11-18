# Arsitektur — ERRNOR Team Portfolio / LUNAS

> Versi 1.0 — 19 Nov 2026. Stack: Vite 6 + React 19 + Tailwind CSS 3.
> Satu halaman (SPA tanpa router), tanpa backend, tanpa state global.

## 1. Gambaran sistem

```
Pengunjung ──HTTP──▶ Cloudflare Pages (statis, dist/)
                        ├─ index.html
                        ├─ assets/index-*.js   (React bundle)
                        ├─ assets/index-*.css  (Tailwind)
                        └─ *.jpg / *.png       (foto tim + logo, public/)
Google Fonts (CDN, opsional — ada fallback serif/sans sistem)
```

Tidak ada pemanggilan API, tidak ada penyimpanan server. Satu-satunya
penyimpanan adalah `localStorage` browser untuk preferensi tema
(`errnor-theme`).

## 2. Struktur file

```
errnor-team-portfolio/
├── index.html               # entry HTML + font + skrip anti-FOUC tema
├── public/
│   ├── logo-errnor.png      # logo tim (footer)
│   ├── logo-icon.png        # mark (navbar + splash)
│   ├── nabil.jpg            # foto anggota tim
│   ├── arienal.jpg
│   ├── jawzy.jpg
│   └── rizki.jpg
├── src/
│   ├── main.jsx             # createRoot + StrictMode
│   ├── App.jsx              # SELURUH aplikasi (satu file, lihat §3)
│   └── index.css            # Tailwind + base + focus-visible + reduced-motion
├── tailwind.config.js       # palet bernama + font Fraunces/Public Sans
├── vite.config.js           # plugin React (bawaan)
├── e2e/smoke.spec.js        # Playwright e2e (6 tes)
├── scripts/
│   ├── advisory-sweep.py    # OSV batch sweep (prod only)
│   ├── check-links.mjs      # referensi lokal + secret + gate P0
│   ├── serve.mjs            # server statis (smoke lokal/CI)
│   ├── screenshot.mjs       # screenshot dokumentasi (puppeteer-core)
│   └── make-video.mjs       # rangkai screenshot -> docs/demo/demo.mp4
├── docs/                    # PRD, DESIGN, arsitektur, data, testing, deploy
└── .github/workflows/ci.yml # build + static-checks + sweep + e2e
```

## 3. Komponen (semua di `src/App.jsx`)

Aplikasi sengaja satu file — ukurannya kecil (~900 baris) dan semua state
saling terkait (angka playground dipakai kartu struk hero).

| Komponen / bagian | Tanggung jawab | State |
|---|---|---|
| `StampBadge` | Stempel "LUNAS" miring berbingkai ganda (detail khas) | — |
| `ZigzagEdge` | Tepi zigzag SVG bawah kartu struk | — |
| `squad` (data) | 4 anggota: peran, posisi, kutipan, 3 skill, tools, foto | — |
| Splash screen | Tampil 2,5 dtk → geser ke atas → hilang 3,3 dtk | `splashState` |
| Navbar | Logo, tautan anchor, GitHub, toggle tema, menu mobile | `isScrolled`, `isMobileMenuOpen`, `theme` |
| Hero | Copy produk + kartu struk hidup | memakai `income/debt` |
| Cara Kerja | Batang masalah + mockup nudge | `isOptimized`, `nudgeExecuted` |
| Playground | Slider + kartu struk proyeksi | `income`, `debt` |
| Tim | Carousel + dot + modal detail | `activeIdx`, `selectedMember` |
| Footer | Brand, navigasi, GitHub, copyright | — |

### Alur state

```
income, debt ──▶ surplus = max(0, income - debt)
              ──▶ invested = surplus × 0,5
              ──▶ asset12Months = invested × 12 × 1,08
              ──▶ kartu struk hero + kartu struk playground
```

`activeIdx` di-rotate `setInterval` 4 detik; interval dihentikan saat
`selectedMember` tidak null (modal terbuka). `getCardPosition` memetakan
selisih indeks ke posisi `center/left/right/hidden` untuk transform carousel.

### Tema gelap

- `document.documentElement.classList.toggle('dark', ...)`; Tailwind
  `darkMode: 'class'`.
- Skrip inline di `index.html` menerapkan tema sebelum React render
  (mencegah kedip terang/gelap).
- Pilihan disimpan di `localStorage`; default dari
  `prefers-color-scheme`.

## 4. Keputusan desain teknis

- **Tanpa router / tanpa state manager:** satu halaman, state lokal
  `useState` cukup; menambah router hanya menambah beban.
- **Tailwind 3 + config bernama:** palet dan font dikunci di
  `tailwind.config.js` (lihat `docs/DESIGN.md`); tidak ada warna
  arbitrer di luar palet.
- **Font via Google Fonts + fallback:** Fraunces (display) + Public Sans
  (body). Bila CDN font gagal, fallback Georgia/system-ui tetap menjaga
  hierarki serif vs sans.
- **Aset lokal semua:** foto tim + logo di `public/` — nol dependensi
  gambar eksternal (og:image lama dari Unsplash dihapus).
- **Build statis murni:** `vite build` → `dist/`; Cloudflare Pages
  menyajikan langsung tanpa fungsi server.

## 5. Batas & risiko

- Rumus proyeksi adalah **simulasi contoh** (lihat `docs/data.md`) — bukan
  model keuangan terverifikasi; labelnya eksplisit di UI.
- Persentase skill adalah penilaian mandiri anggota tim, bukan hasil
  asesmen eksternal — labelnya eksplisit di modal.
- Splash 3,3 detik menunda interaksi pertama; ini disengaja (identitas
  produk) dan tidak menghalangi setelah hilang.

# Testing — ERRNOR Team Portfolio / LUNAS

> Versi 1.0 — 19 Nov 2026.

## 1. Strategi

| Lapisan | Alat | Cakupan |
|---------|------|---------|
| Build | `npm run build` (Vite) | Bundle produksi terbentuk tanpa error |
| Pemeriksaan statis | `npm run validate` (`scripts/check-links.mjs`) | Referensi lokal ada, `<img>` ber-alt, tanpa secret, gate anti-slop P0 |
| Advisory sweep | `npm run sweep` (`scripts/advisory-sweep.py`) | Dependensi produksi vs OSV (HIGH/CRITICAL = gagal) |
| E2E | `npm test` (Playwright, `e2e/smoke.spec.js`) | Alur produk FR-1–FR-7 di atas `vite preview` |

Semua lapisan berjalan di CI (`.github/workflows/ci.yml`) pada tiap push
dan pull request ke `main`.

## 2. E2E — `e2e/smoke.spec.js` (6 tes)

| # | Tes | Yang dibuktikan |
|---|-----|-----------------|
| 1 | landing | Judul, tautan GitHub (href benar), heading LUNAS, kartu struk hero menampilkan Rp 64.8 jt (default 15/5), semua section ada, dua CTA terlihat |
| 2 | cara kerja | Toggle efisiensi: 85%→25% dan 15%→75%; nudge: tombol eksekusi → disabled + pesan sukses |
| 3 | demo interaktif | Slider pendapatan 15→30 mengubah proyeksi jadi Rp 162.0 jt; utang 30 → pesan defisit; utang kembali 5 → proyeksi kembali |
| 4 | tim | Dot Nabil → klik kartu tengah → modal berisi posisi, skill, tools, label penilaian mandiri; tutup modal |
| 5 | tema | Toggle menambah/menghapus class `dark` di `<html>` |
| 6 | mobile 390px | Hamburger membuka panel menu (tautan + GitHub); tutup kembali; `scrollWidth == clientWidth` (tanpa overflow horizontal) |

Setiap tes juga menegaskan: **nol console error, nol pageerror, nol
request lokal 404** (hook `beforeEach`/`afterEach`).

Catatan splash: tiap tes menunggu 3,6 detik setelah load karena splash
menutupi layar ~3,3 detik.

## 3. Menjalankan lokal

```bash
npm ci
npm run build
npm run validate
npm run sweep
# Playwright memakai Chromium cache yang sudah ada (TANPA `npx playwright install`):
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=$HOME/.cache/ms-playwright/chromium-1234/chrome-linux/chrome npm test
```

> **Jangan** jalankan `npx playwright install chromium` di VM ini — perintah
> itu menghapus isi `~/.cache/ms-playwright/` (chromium-1234 + headless-shell
> milik tooling lain). Di CI, workflow menginstal Chromium sendiri
> (`npx playwright install --with-deps chromium`).

## 4. Play-test manual (checklist sebelum merge)

- [ ] Buka live URL: splash muncul lalu hilang; hero + struk tampil.
- [ ] Toggle efisiensi (batang berubah), eksekusi nudge (berhasil).
- [ ] Geser kedua slider (proyeksi berubah; defisit tampil).
- [ ] Carousel: klik kiri/kanan/dot; buka modal tiap anggota; tutup.
- [ ] Toggle tema gelap/terang; refresh — tema bertahan.
- [ ] Mobile 390px: hamburger, semua section, tanpa scroll horizontal.
- [ ] DevTools: nol console error; tab Network: nol 404.

## 5. Hasil terakhir

- CI di PR #1: build, static-checks, advisory-sweep, playwright-e2e —
  hijau (lihat PR).
- Play-test lokal (build produksi, Chromium cache): 6/6 lolos.
- Play-test live di Cloudflare Pages: diverifikasi setelah deploy
  (lihat `docs/deploy.md`).

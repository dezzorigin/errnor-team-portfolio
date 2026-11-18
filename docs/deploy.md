# Deploy — ERRNOR Team Portfolio / LUNAS

> Versi 1.0 — 19 Nov 2026.

## 1. Target

| Item | Nilai |
|------|-------|
| Platform | Cloudflare Pages (statis) |
| Nama proyek | `errnor-team-portfolio` |
| URL live | https://errnor-team-portfolio.pages.dev/ |
| Build | `npm run build` → `dist/` |
| Framework preset | Vite (atau None — output statis murni) |

Nama `errnor-team-portfolio` dicoba pertama; fallback berurutan bila
sudah dipakai akun lain: `errnor-portfolio` → `errnor-team`. Nama Pages
adalah namespace global — ketersediaan baru ketahuan saat create
(GET 404 bukan berarti tersedia).

## 2. Cara deploy

### Otomatis (yang dipakai)

Direct-upload via Cloudflare API dengan `~/workspace/github-actions/cf_pages.py`:

```bash
python3 ~/workspace/github-actions/cf_pages.py deploy errnor-team-portfolio dist/
```

Skrip memakai API token Cloudflare dari konektor `custom.cloudflare`
(via surrogate — token tidak pernah dicetak). Deploy mengunggah `dist/`
hasil `npm run build`.

### Alternatif — Wrangler

```bash
npx wrangler pages deploy dist --project-name=errnor-team-portfolio
```

## 3. Verifikasi setelah deploy

```bash
# 1. Halaman utama 200
curl -s -o /tmp/errnor-home.html -w '%{http_code}\n' https://errnor-team-portfolio.pages.dev/
# 2. Aset inti 200 (jangan `curl | grep -q` + pipefail — SIGPIPE)
curl -s -o /dev/null -w '%{http_code}\n' https://errnor-team-portfolio.pages.dev/nabil.jpg
curl -s -o /dev/null -w '%{http_code}\n' https://errnor-team-portfolio.pages.dev/logo-errnor.png
# 3. Judul + konten di HTML hasil build
grep -q 'LUNAS by ERRNOR' /tmp/errnor-home.html
# 4. Play-test di browser: splash, toggle, nudge, slider, modal, tema, mobile
```

Hasil verifikasi PR #1: HTTP 200 di `/`, foto + logo 200, play-test live
lolos (lihat laporan PR).

## 4. About repo (homepage)

Setelah live, pasang link live di About repo via GitHub API:

```
PATCH /repos/dezzorigin/errnor-team-portfolio  { "homepage": "https://errnor-team-portfolio.pages.dev/" }
```

Terverifikasi: field `homepage` di repo menampilkan URL live.

## 5. Catatan

- Repo lama pernah menautkan demo Netlify (`errnor-portfolio.netlify.app`)
  dan og:url Vercel (`errnor-team.vercel.app`) — keduanya tautan basi dan
  sudah diganti ke URL Pages di `index.html` + README.
- Tidak ada variabel environment, secret, atau fungsi server — deploy
  murni statis, jadi tidak ada yang perlu dirotasi.

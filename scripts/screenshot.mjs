// Screenshot dokumentasi: adegan situs yang sedang berjalan (build produksi
// di dist/, disajikan scripts/serve.mjs) ke docs/screenshots/*.png — dipakai
// README + video demo.
//
// Prasyarat: puppeteer-core (node_modules atau fallback diag), Chromium di
// cache (~/.cache/ms-playwright/chromium-1234), forwarder 127.0.0.1:18081
// hidup (untuk Google Fonts), dan `npm run build` sudah jalan.
//
// Adegan:
//   01 landing hero (desktop) · 02 cara kerja (toggle efisiensi + nudge
//   dieksekusi) · 03 playground (slider pendapatan 30) · 04 tim (carousel)
//   · 05 modal anggota (Nabil) · 06 landing mobile 390 · 07 playground
//   mobile 390 · 08 mode gelap (desktop) · 09 siluet dibuat terpisah
//   via ffmpeg dari 01 (lihat README docs).
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'docs', 'screenshots');
const PORT = process.env.PORT || '8329';
const BASE = `http://127.0.0.1:${PORT}`;
const CHROMIUM = `${process.env.HOME}/.cache/ms-playwright/chromium-1234/chrome-linux/chrome`;

const require = createRequire(import.meta.url);
let puppeteer;
try {
  puppeteer = require('puppeteer-core');
} catch {
  try {
    puppeteer = require('/home/hatch/workspace/absensirapat-audit/diag/node_modules/puppeteer-core');
  } catch {
    console.error('puppeteer-core tidak ditemukan.');
    process.exit(1);
  }
}

mkdirSync(OUT, { recursive: true });

if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
  console.log('dist/ belum ada — menjalankan npm run build...');
  execFileSync('npm', ['run', 'build'], { cwd: ROOT, stdio: 'inherit' });
}

const server = spawn('node', ['scripts/serve.mjs', 'dist'], {
  cwd: ROOT,
  env: { ...process.env, PORT },
  stdio: 'ignore',
});
const waitServer = async () => {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch { /* belum hidup */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('server dist tidak hidup');
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(page, name) {
  await page.screenshot({ path: join(OUT, name), fullPage: false });
  console.log('shot:', name);
}

try {
  await waitServer();
  const browser = await puppeteer.launch({
    executablePath: CHROMIUM,
    headless: 'new',
    args: ['--proxy-server=http://127.0.0.1:18081', '--no-sandbox', '--disable-dev-shm-usage', '--force-device-scale-factor=1'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 01 — landing hero (tunggu splash hilang).
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 60000 });
  await sleep(3800);
  await shot(page, '01-landing-hero.png');

  // 02 — cara kerja: aktifkan efisiensi + eksekusi nudge.
  await page.evaluate(() => document.querySelector('#product').scrollIntoView());
  await sleep(800);
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#product button')];
    btns.find((b) => b.textContent.includes('Aktifkan Efisiensi'))?.click();
  });
  await sleep(700);
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll('#product button')];
    btns.find((b) => b.textContent.includes('Ketuk untuk Eksekusi'))?.click();
  });
  await sleep(700);
  await shot(page, '02-how-it-works.png');

  // 03 — playground: pendapatan 30 (proyeksi 162,0 jt).
  await page.evaluate(() => document.querySelector('#playground').scrollIntoView());
  await sleep(600);
  await page.$eval('#income-range', (el) => {
    // React controlled input: pakai native setter agar onChange terpanggil.
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    setter.call(el, '30');
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await sleep(600);
  await shot(page, '03-playground.png');

  // 04 — tim (carousel).
  await page.evaluate(() => document.querySelector('#team').scrollIntoView());
  await sleep(800);
  await shot(page, '04-team.png');

  // 05 — modal anggota Nabil.
  await page.evaluate(() => {
    const card = [...document.querySelectorAll('#team article')].find((a) => a.textContent.includes('Nabil Aulia Dika'));
    card?.click();
  });
  await sleep(900);
  await shot(page, '05-team-modal.png');
  await page.keyboard.press('Escape');
  await page.evaluate(() => {
    document.querySelector('[aria-label="Tutup detail anggota"]')?.click();
  });
  await sleep(500);

  // 06–07 — mobile 390px.
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 60000 });
  await sleep(3800);
  await shot(page, '06-landing-mobile-390.png');
  await page.evaluate(() => document.querySelector('#playground').scrollIntoView());
  await sleep(700);
  await shot(page, '07-playground-mobile-390.png');

  // 08 — mode gelap (desktop).
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => localStorage.setItem('errnor-theme', 'dark'));
  await page.goto(BASE + '/', { waitUntil: 'networkidle0', timeout: 60000 });
  await sleep(3800);
  await shot(page, '08-dark-mode.png');

  await browser.close();
  console.log('selesai: 8 screenshot di docs/screenshots/');
} finally {
  server.kill();
}

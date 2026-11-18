// Smoke test end-to-end ERRNOR Team Portfolio / LUNAS di atas `vite preview`
// (build produksi). Yang diuji adalah logika & alur produk, bukan gambar:
//   1. Landing: judul, navbar + tautan GitHub, hero + kartu struk hidup,
//      semua section.
//   2. Splash screen hilang setelah ~3,3 detik.
//   3. Cara Kerja: toggle efisiensi mengubah batang (85%->25% / 15%->75%);
//      nudge dieksekusi -> tombol disabled + pesan sukses.
//   4. Demo Interaktif: geser slider pendapatan mengubah proyeksi;
//      utang > pendapatan -> pesan defisit.
//   5. Tim: klik kartu tengah -> modal anggota (nama + skill + tools);
//      tutup modal.
//   6. Toggle tema: mode gelap hidup/mati.
//   7. Mobile 390px: menu hamburger benar-benar membuka panel; tanpa
//      overflow horizontal.
//   8. Semua halaman: nol console error/pageerror + nol request lokal 404.
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.__testErrors = [];
    const origError = console.error.bind(console);
    console.error = (...args) => {
      window.__testErrors.push(args.map(String).join(' '));
      origError(...args);
    };
    window.addEventListener('error', (e) => window.__testErrors.push(String(e.message)));
    window.addEventListener('unhandledrejection', (e) => window.__testErrors.push('rejection: ' + String(e.reason)));
  });
  // Request lokal (127.0.0.1) yang 404/500 = aset hilang — gagalkan tes.
  page.on('response', async (res) => {
    if (res.url().startsWith('http://127.0.0.1:') && res.status() >= 400) {
      await page.evaluate((u) => window.__testErrors.push('HTTP ' + u), `${res.status()} ${res.url()}`);
    }
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  // Splash screen menutupi layar ~3,3 detik — tunggu sampai hilang.
  await page.waitForTimeout(3600);
});

test.afterEach(async ({ page }) => {
  const errors = await page.evaluate(() => window.__testErrors || []);
  expect(errors, `console/page/HTTP errors: ${errors.join(' | ')}`).toEqual([]);
});

test('landing: judul, navbar GitHub, hero + struk, semua section', async ({ page }) => {
  await expect(page).toHaveTitle(/LUNAS by ERRNOR/);
  const gh = page.getByRole('link', { name: /GitHub — repositori ERRNOR/ }).first();
  await expect(gh).toBeVisible();
  await expect(gh).toHaveAttribute('href', 'https://github.com/dezzorigin/errnor-team-portfolio');
  await expect(page.getByRole('heading', { name: 'LUNAS', exact: true })).toBeVisible();
  await expect(page.getByText('Layanan Utang & Navigasi Aset Sistematis')).toBeVisible();
  // Kartu struk hidup di hero: proyeksi default (15jt/5jt -> 64,8 jt).
  const hero = page.locator('#hero');
  await expect(hero.getByText('Rp 64.8 jt').first()).toBeVisible();
  await expect(hero.getByText('Lunas').first()).toBeVisible();
  for (const id of ['hero', 'product', 'playground', 'team']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole('button', { name: 'Coba Demo Interaktif' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Kenali Tim' })).toBeVisible();
});

test('cara kerja: toggle efisiensi + eksekusi nudge', async ({ page }) => {
  const product = page.locator('#product');
  // Keadaan awal: beban 85%, return 15%.
  await expect(product.getByText('85%', { exact: true })).toBeVisible();
  await expect(product.getByText('15%', { exact: true })).toBeVisible();
  await product.getByRole('button', { name: 'Aktifkan Efisiensi Liabilitas' }).click();
  await expect(product.getByText('25%', { exact: true })).toBeVisible();
  await expect(product.getByText('75%', { exact: true })).toBeVisible();
  await expect(product.getByRole('button', { name: 'Efisiensi Aktif' })).toBeVisible();

  // Nudge: ketuk eksekusi -> tombol disabled + pesan sukses muncul.
  const nudgeBtn = product.getByRole('button', { name: 'Ketuk untuk Eksekusi' });
  await expect(nudgeBtn).toBeEnabled();
  await nudgeBtn.click();
  await expect(product.getByRole('button', { name: 'Eksekusi Berhasil' })).toBeDisabled();
  await expect(product.getByText(/Nudge dieksekusi/)).toBeVisible();
});

test('demo interaktif: slider mengubah proyeksi; defisit tampil', async ({ page }) => {
  const playground = page.locator('#playground');
  await expect(playground.getByText('Rp 64.8 jt')).toBeVisible();
  // Pendapatan 15 -> 30: surplus 25, investasi 12,5, aset 162,0.
  await playground.locator('#income-range').fill('30');
  await expect(playground.getByText('Rp 162.0 jt')).toBeVisible();
  // Utang 5 -> 30 dengan pendapatan 30: surplus 0 -> defisit.
  await playground.locator('#debt-range').fill('30');
  await expect(playground.getByText(/Defisit Finansial/)).toBeVisible();
  // Turunkan utang lagi: proyeksi kembali.
  await playground.locator('#debt-range').fill('5');
  await expect(playground.getByText('Rp 162.0 jt')).toBeVisible();
  await expect(playground.getByText(/Simulasi contoh — bukan nasihat keuangan/)).toBeVisible();
});

test('tim: klik kartu tengah membuka modal anggota', async ({ page }) => {
  // Set anggota aktif ke Nabil secara deterministik (carousel auto-rotate 4 dtk).
  await page.getByRole('tab', { name: 'Tampilkan Nabil Aulia Dika' }).click();
  await page.locator('#team article', { hasText: 'Nabil Aulia Dika' }).click();
  const dialog = page.getByRole('dialog', { name: 'Detail Nabil Aulia Dika' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText('CEO & Product Strategist')).toBeVisible();
  await expect(dialog.getByText('Business Model Canvas (BMC)')).toBeVisible();
  await expect(dialog.getByText('90%')).toBeVisible();
  await expect(dialog.getByText('Figma')).toBeVisible();
  await expect(dialog.getByText(/Penilaian mandiri anggota tim/)).toBeVisible();
  await dialog.getByRole('button', { name: 'Tutup detail anggota' }).click();
  await expect(dialog).toBeHidden();
});

test('tema: toggle gelap/terang mengubah class html', async ({ page }) => {
  const html = page.locator('html');
  const toggle = page.getByRole('button', { name: /Beralih ke mode/ }).first();
  await toggle.click();
  await expect(html).toHaveClass(/dark/);
  await toggle.click();
  await expect(html).not.toHaveClass(/dark/);
});

test.describe('mobile 390px', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('menu hamburger membuka panel; tanpa overflow horizontal', async ({ page }) => {
    const burger = page.getByRole('button', { name: 'Buka menu' });
    await expect(burger).toBeVisible();
    await burger.click();
    const menu = page.getByRole('navigation', { name: 'Menu mobile' });
    await expect(menu).toBeVisible();
    await expect(menu.getByText('Demo Interaktif')).toBeVisible();
    await expect(menu.getByText(/GitHub — dezzorigin\/errnor-team-portfolio/)).toBeVisible();
    // Tutup lagi via tombol yang sama.
    await page.getByRole('button', { name: 'Tutup menu' }).click();
    await expect(menu).toBeHidden();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, 'overflow horizontal di 390px').toBe(0);
  });
});

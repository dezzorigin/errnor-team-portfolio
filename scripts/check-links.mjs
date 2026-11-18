#!/usr/bin/env node
/**
 * Pemeriksaan statis (tanpa browser) — dipakai `npm run validate` dan job
 * `static-checks` di CI:
 *   1. Semua referensi lokal di index.html + src/*.jsx (path `/...` dan
 *      relatif) ada di disk (public/ atau src/).
 *   2. Semua <img> di JSX punya alt.
 *   3. LICENSE + README + docs inti ada.
 *   4. Sapu secret kasar di file sumber (bukan node_modules/dist).
 *   5. Gate anti-slop P0 (docs/DESIGN.md): tanpa gradient ungu/biru,
 *      tanpa headline gradient (bg-clip-text), tanpa impor font Inter,
 *      tanpa emoji mentah sebagai ikon fungsi, tanpa `rounded-3xl` +
 *      `shadow-2xl` di semua permukaan.
 * Keluar 1 bila ada satu saja temuan; semua temuan dicetak sekaligus.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const fail = (msg) => failures.push(msg);

// ── 1. Referensi lokal di index.html ──────────────────────────────────────
const html = readFileSync(join(ROOT, "index.html"), "utf-8");
for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = m[1];
  if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
  const clean = ref.split(/[?#]/)[0].replace(/^\//, "");
  if (!clean) continue;
  if (!existsSync(join(ROOT, "public", clean)) && !existsSync(join(ROOT, clean))) {
    fail(`index.html: file lokal hilang: ${ref}`);
  }
}
for (const m of html.matchAll(/<img([^>]*)>/g)) {
  if (!/alt=/.test(m[1])) fail(`index.html: <img> tanpa alt: ${m[0].slice(0, 80)}...`);
}

// ── 1b. Referensi aset lokal di src/*.jsx ─────────────────────────────────
const srcFiles = readdirSync(join(ROOT, "src")).filter((f) => f.endsWith(".jsx"));
for (const f of srcFiles) {
  const src = readFileSync(join(ROOT, "src", f), "utf-8");
  for (const m of src.matchAll(/["'`](\/[a-z0-9_./-]+\.(?:jpg|jpeg|png|svg|webp|ico))["'`]/gi)) {
    const target = m[1].replace(/^\//, "");
    if (!existsSync(join(ROOT, "public", target))) {
      fail(`src/${f}: aset lokal hilang: ${m[1]}`);
    }
  }
  // ── 2. <img> wajib punya alt ────────────────────────────────────────────
  for (const m of src.matchAll(/<img([^>]*?)\/?>/g)) {
    if (!/alt=/.test(m[1])) fail(`src/${f}: <img> tanpa alt: ${m[0].slice(0, 80)}...`);
  }
}

// ── 3. File wajib ada ─────────────────────────────────────────────────────
for (const f of ["LICENSE", "README.md", "docs/PRD.md", "docs/DESIGN.md", "docs/architecture.md", "docs/data.md", "docs/testing.md", "docs/deploy.md", "docs/diagrams.html"]) {
  if (!existsSync(join(ROOT, f))) fail(`${f} hilang`);
}

// ── 4. Sapu secret kasar (file sumber saja) ───────────────────────────────
const SECRET_PATTERNS = [
  [/\bAKIA[0-9A-Z]{16}\b/, "AWS access key"],
  [/ghp_[A-Za-z0-9]{20,}/, "GitHub PAT"],
  [/gho_[A-Za-z0-9]{20,}/, "GitHub OAuth token"],
  [/sk-[A-Za-z0-9]{16,}/, "API key sk-..."],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, "private key"],
  [/\.wrangler\//, "referensi .wrangler (artefak lokal, jangan ke-commit)"],
  [/xox[baprs]-[A-Za-z0-9-]{10,}/, "Slack token"],
];
const scanFiles = ["index.html", "package.json", ...srcFiles.map((f) => `src/${f}`)];
for (const rel of scanFiles) {
  const content = readFileSync(join(ROOT, rel), "utf-8");
  for (const [re, label] of SECRET_PATTERNS) {
    if (re.test(content)) fail(`${rel}: pola secret terdeteksi (${label})`);
  }
}

// ── 5. Gate anti-slop P0 di src/*.jsx + index.css ─────────────────────────
const styleFiles = [...srcFiles.map((f) => `src/${f}`), "src/index.css", "index.html"];
const P0_CHECKS = [
  [/bg-gradient-to-[a-z]+\s+from-(blue|indigo|violet|purple|cyan|sky)-/, "gradient ungu/biru (bg-gradient-to-* from-blue/indigo/violet/purple/cyan)"],
  [/bg-clip-text/, "headline gradient (bg-clip-text)"],
  [/from-blue-\d|from-indigo-\d|from-violet-\d|from-purple-\d|to-cyan-\d|via-blue-\d/, "gradient biru/ungu (from-/to-/via-)"],
  [/font-family:\s*Inter|@import[^;]*Inter|family=Inter/, "impor font Inter"],
  [/rounded-3xl/, "rounded-3xl (radius template, pakai 6px / pill)"],
];
for (const rel of styleFiles) {
  const content = readFileSync(join(ROOT, rel), "utf-8");
  for (const [re, label] of P0_CHECKS) {
    if (re.test(content)) fail(`${rel}: pelanggaran P0 — ${label}`);
  }
  // Emoji mentah sebagai ikon fungsi (bukan di dalam string teks biasa).
  const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  for (const m of content.matchAll(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu)) {
    fail(`${rel}: emoji mentah terdeteksi (${m[0]}) — pakai ikon SVG Lucide`);
  }
  void emojiRe;
}

// ── Ringkasan ─────────────────────────────────────────────────────────────
if (failures.length > 0) {
  console.error(`check-links: ${failures.length} temuan:`);
  for (const f of failures) console.error(`  FAIL ${f}`);
  process.exit(1);
}
console.log("check-links: OK (referensi lokal + alt + secret + gate P0)");

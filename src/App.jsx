import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  Server,
  Smartphone,
  Activity,
  ChevronRight,
  ChevronLeft,
  Sun,
  Moon,
  Briefcase,
  Wrench,
  Lightbulb,
  Menu,
  X,
  PlayCircle,
  BarChart3,
  BellRing,
  CheckCircle2,
  TrendingDown,
  Code2,
  ArrowRight,
  ArrowUpRight,
  ReceiptText,
  Stamp,
} from 'lucide-react';

/* Mark GitHub (Simple Icons, CC0) — lucide-react 1.x menghapus brand icon. */
function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const THEME_STORAGE_KEY = 'errnor-theme';
const REPO_URL = 'https://github.com/dezzorigin/errnor-team-portfolio';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark') return 'dark';
    if (stored === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

const squad = [
  {
    id: 'nabil',
    name: 'Nabil Aulia Dika',
    role: 'The Hustler',
    position: 'CEO & Product Strategist',
    icon: <Lightbulb size={28} className="text-ember" />,
    expertise:
      'Visioner, lincah memetakan alur bisnis, dan fokus pada kelayakan pasar (Market-Product Fit).',
    skills: [
      { name: 'Business Model Canvas (BMC)', level: 90 },
      { name: 'Pitching & Storytelling', level: 85 },
      { name: 'Wireframing & UX Flow', level: 80 },
    ],
    tools: ['Figma', 'Notion', 'Google Slides'],
    bgImg: '/nabil.jpg',
  },
  {
    id: 'arienal',
    name: 'Arienal Zaky Irvan',
    role: 'The Brain',
    position: 'AI Engineer & Tech Writer',
    icon: <BrainCircuit size={28} className="text-lunas" />,
    expertise:
      'Menerjemahkan probabilitas menjadi algoritma pasti. Fokus pada RAG dan optimasi portofolio dasar.',
    skills: [
      { name: 'Prompt Engineering (LLM)', level: 88 },
      { name: 'Technical Documentation', level: 85 },
      { name: 'Algoritma Mean-Variance', level: 75 },
    ],
    tools: ['Python', 'pgvector', 'LangChain API'],
    bgImg: '/arienal.jpg',
  },
  {
    id: 'jawzy',
    name: 'Ibnul Jawzy',
    role: 'The Engine',
    position: 'Backend & Cloud Architect',
    icon: <Server size={28} className="text-oxblood" />,
    expertise:
      'Membangun tulang punggung server yang efisien. Haus belajar standar arsitektur perbankan.',
    skills: [
      { name: 'RESTful API Development', level: 85 },
      { name: 'Database Management (SQL)', level: 80 },
      { name: 'Mock-up API SNAP BI', level: 70 },
    ],
    tools: ['FastAPI', 'Docker', 'GCP (Cloud Run)'],
    bgImg: '/jawzy.jpg',
  },
  {
    id: 'rizki',
    name: 'Muhammad Rizki',
    role: 'The Face',
    position: 'Frontend & Mobile Dev',
    icon: <Smartphone size={28} className="text-ember" />,
    expertise: 'Mengubah data mentah menjadi UI yang fluid dan interaktif di layar smartphone.',
    skills: [
      { name: 'Cross-Platform (Flutter)', level: 85 },
      { name: 'State Management', level: 80 },
      { name: 'Financial DataViz (Fl_Chart)', level: 75 },
    ],
    tools: ['Dart', 'VS Code', 'Postman'],
    bgImg: '/rizki.jpg',
  },
];

/* Stempel "LUNAS" — detail khas: cap miring berbingkai ganda. */
function StampBadge({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center gap-1.5 rounded-[4px] border-2 border-lunas px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-lunas rotate-[-4deg] ${className}`}
      style={{ boxShadow: 'inset 0 0 0 1px #FFFDF8, inset 0 0 0 3px #177245' }}
    >
      <Stamp size={13} strokeWidth={2} />
      Lunas
    </span>
  );
}

/* Tepi zigzag bawah kartu struk — struk yang disobek dari buku kas. */
function ZigzagEdge({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`block w-full h-[10px] ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 10"
    >
      <polygon points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 100,0 0,0" fill="#FFFDF8" />
    </svg>
  );
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [income, setIncome] = useState(15);
  const [debt, setDebt] = useState(5);
  const [isOptimized, setIsOptimized] = useState(false);
  const [nudgeExecuted, setNudgeExecuted] = useState(false);

  // SPLASH SCREEN STATE ('visible', 'leaving', 'hidden')
  const [splashState, setSplashState] = useState('visible');

  // SPLASH SCREEN LOGIC & BROWSER TITLE
  useEffect(() => {
    document.title = 'LUNAS by ERRNOR - Hackathon 2026';

    // Timer 1: Mulai animasi geser garasi ke atas di detik 2.5
    const slideTimer = setTimeout(() => setSplashState('leaving'), 2500);
    // Timer 2: Hapus dari DOM sepenuhnya di detik 3.3 (biar gak halangin klik)
    const hideTimer = setTimeout(() => setSplashState('hidden'), 3300);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore quota */
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (selectedMember) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % squad.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [selectedMember]);

  const nextMember = () => setActiveIdx((prev) => (prev + 1) % squad.length);
  const prevMember = () => setActiveIdx((prev) => (prev - 1 + squad.length) % squad.length);

  const getCardPosition = (index) => {
    const diff = index - activeIdx;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -3) return 'right';
    if (diff === -1 || diff === 3) return 'left';
    return 'hidden';
  };

  const surplus = Math.max(0, income - debt);
  const invested = surplus * 0.5;
  const asset12Months = invested * 12 * 1.08;

  const navLinks = [
    { id: 'product', label: 'Cara Kerja' },
    { id: 'playground', label: 'Demo Interaktif' },
    { id: 'team', label: 'Tim' },
  ];

  return (
    <>
      {/* ================= LOADING SPLASH SCREEN (GARAGE DOOR EFFECT) ================= */}
      {splashState !== 'hidden' && (
        <div
          className={`fixed inset-0 z-[9999] bg-arang flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${splashState === 'leaving' ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <div className="flex flex-col items-center justify-center gap-6 relative px-6">
            <img src="/logo-icon.png" alt="Logo ERRNOR" className="h-16 w-16 object-contain" />
            <div className="text-center space-y-2 overflow-hidden">
              <p className="font-display text-2xl md:text-4xl font-black text-[#EFE9DC] tracking-wide">
                Powered by Logic
              </p>
              <p className="font-display text-lg md:text-xl font-bold text-ember tracking-wide">
                Delivered by AI.
              </p>
            </div>
            <div className="w-48 h-1 bg-garisdark rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-ember animate-[progress_2s_ease-in-out_forwards]" />
            </div>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}} />
        </div>
      )}
      {/* ================= END OF SPLASH SCREEN ================= */}

      <div className="bg-kertas dark:bg-arang text-tinta dark:text-[#EFE9DC] min-h-screen font-sans transition-colors duration-500">
        {/* NAVBAR */}
        <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-kertas/90 dark:bg-arang/90 backdrop-blur-md shadow-sm border-b border-garis dark:border-garisdark' : 'py-5 bg-transparent'}`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-10">
              <button
                type="button"
                onClick={() => scrollTo('hero')}
                className="flex items-center gap-3 font-display font-black tracking-tight text-xl cursor-pointer"
                aria-label="ERRNOR — kembali ke atas"
              >
                <img src="/logo-icon.png" alt="" className="h-8 w-8 object-contain" />
                <span>ERRNOR.</span>
              </button>
              <nav className="hidden md:flex items-center gap-6 font-semibold text-sm" aria-label="Navigasi utama">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="text-tinta/70 dark:text-[#EFE9DC]/70 hover:text-ember transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub — repositori ERRNOR Team Portfolio"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-[6px] border border-garis dark:border-garisdark bg-struk dark:bg-arangcard text-sm font-bold hover:border-ember hover:text-ember transition-colors"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
                className="min-h-[44px] min-w-[44px] p-2.5 rounded-[6px] border border-garis dark:border-garisdark bg-struk dark:bg-arangcard hover:border-ember hover:text-ember transition-colors flex items-center justify-center"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-[6px] border border-garis dark:border-garisdark bg-struk dark:bg-arangcard hover:border-ember hover:text-ember transition-colors flex items-center justify-center"
              >
                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <nav
              className="md:hidden border-t border-garis dark:border-garisdark bg-kertas dark:bg-arang px-6 py-4"
              aria-label="Menu mobile"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="w-full text-left px-2 py-3 font-semibold hover:text-ember transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-2 py-3 font-semibold hover:text-ember transition-colors"
                  >
                    <GithubIcon size={16} />
                    GitHub — dezzorigin/errnor-team-portfolio
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </header>

        {/* HERO SECTION — rata kiri, dua kolom: teks + kartu struk hidup */}
        <section id="hero" className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-struk dark:bg-arangcard text-tinta/80 dark:text-[#EFE9DC]/80 text-xs font-bold uppercase tracking-[0.14em] border border-garis dark:border-garisdark mb-7">
                <Briefcase size={14} className="text-ember" />
                Portofolio Inovasi — Tim ERRNOR · PIDI x Digdaya Hackathon 2026
              </p>

              <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-4">
                LUNAS
              </h1>

              <p className="font-display text-xl md:text-2xl font-bold text-oxblood dark:text-[#E8A08A] mb-5 leading-snug max-w-xl">
                Layanan Utang &amp; Navigasi Aset Sistematis
              </p>

              <p className="text-lg text-tinta/75 dark:text-[#EFE9DC]/75 mb-8 max-w-xl leading-relaxed">
                Automasi efisiensi liabilitas &amp; behavioral nudging berbasis SNAP BI —
                untuk akselerasi investor ritel keluar dari jebakan utang.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo('playground')}
                  className="min-h-[48px] px-7 py-3.5 bg-ember text-white rounded-[6px] font-bold hover:bg-emberdeep active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle size={20} /> Coba Demo Interaktif
                </button>
                <button
                  onClick={() => scrollTo('team')}
                  className="min-h-[48px] px-7 py-3.5 rounded-[6px] font-bold border border-tinta/30 dark:border-[#EFE9DC]/30 hover:border-ember hover:text-ember active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  Kenali Tim <ArrowRight size={18} />
                </button>
              </div>

              <p className="mt-8 flex items-center gap-2 text-sm font-semibold text-tinta/60 dark:text-[#EFE9DC]/60">
                <Code2 size={16} className="text-ember" />
                Powered by Logic, Delivered by AI.
              </p>
            </div>

            {/* Kartu struk hidup — ringkasan simulasi dari state playground */}
            <div className="relative">
              <div className="bg-struk dark:bg-arangcard text-tinta dark:text-[#EFE9DC] rounded-[6px] border border-garis dark:border-garisdark shadow-[0_18px_40px_-18px_rgba(33,29,25,0.45)] px-6 pt-6 pb-2 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-tinta/60 dark:text-[#EFE9DC]/60">
                      <ReceiptText size={14} className="text-ember" /> Struk Proyeksi
                    </p>
                    <p className="font-display text-2xl font-black mt-2">Ringkasan 12 Bulan</p>
                  </div>
                  <StampBadge />
                </div>
                <div className="border-t border-dashed border-garis dark:border-garisdark my-5" />
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta/70 dark:text-[#EFE9DC]/70">Pendapatan / bulan</dt>
                    <dd className="tnum font-bold">Rp {income} jt</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta/70 dark:text-[#EFE9DC]/70">Utang / bulan</dt>
                    <dd className="tnum font-bold text-beban">Rp {debt} jt</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-tinta/70 dark:text-[#EFE9DC]/70">Surplus → investasi (50%)</dt>
                    <dd className="tnum font-bold">Rp {invested.toFixed(1)} jt</dd>
                  </div>
                </dl>
                <div className="border-t border-dashed border-garis dark:border-garisdark my-5" />
                <div className="flex items-end justify-between gap-4 pb-4">
                  <span className="text-sm font-bold text-tinta/70 dark:text-[#EFE9DC]/70">Proyeksi aset</span>
                  <span className="tnum font-display text-4xl font-black text-lunas">
                    Rp {asset12Months.toFixed(1)} jt
                  </span>
                </div>
                <p className="text-xs text-tinta/55 dark:text-[#EFE9DC]/55 pb-4">
                  Angka berubah mengikuti slider di Demo Interaktif. Simulasi contoh — bukan nasihat keuangan.
                </p>
              </div>
              <ZigzagEdge className="drop-shadow-[0_18px_40px_-18px_rgba(33,29,25,0.45)]" />
              <button
                onClick={() => scrollTo('playground')}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-ember hover:text-emberdeep transition-colors"
              >
                Ubah angkanya di demo <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS — baris selang-seling dipisah garis rambut */}
        <section id="product" className="py-20 md:py-28 bg-struk dark:bg-arangcard border-y border-garis dark:border-garisdark">
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember mb-3">Cara Kerja</p>
              <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">
                Utang dilunasi dulu, aset jalan terus.
              </h2>
            </div>
            <div className="space-y-24 md:space-y-32">
              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div>
                  <p className="inline-flex items-center gap-2 text-beban font-bold uppercase tracking-[0.16em] text-xs mb-4">
                    <TrendingDown size={16} /> Masalahnya
                  </p>
                  <h3 className="font-display text-3xl font-black mb-4 leading-tight">
                    Beban utang vs potensi aset
                  </h3>
                  <p className="text-tinta/70 dark:text-[#EFE9DC]/70 mb-8 leading-relaxed max-w-lg">
                    Arus kas generasi muda sering tercekik cicilan berbunga tinggi. Tanpa intervensi,
                    potensi pertumbuhan aset menjadi stagnan atau bahkan minus. Tekan tombolnya —
                    lihat apa yang berubah saat liabilitas dioptimasi.
                  </p>
                  <button
                    onClick={() => setIsOptimized(!isOptimized)}
                    aria-pressed={isOptimized}
                    className={`min-h-[48px] px-6 py-3 rounded-[6px] font-bold flex items-center gap-2 transition-all active:scale-[0.97] ${isOptimized ? 'bg-lunas text-white' : 'bg-oxblood text-white hover:bg-oxblooddeep'}`}
                  >
                    {isOptimized ? (
                      <>
                        <CheckCircle2 size={18} /> Efisiensi Aktif
                      </>
                    ) : (
                      <>
                        <Activity size={18} /> Aktifkan Efisiensi Liabilitas
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-kertas dark:bg-arang rounded-[6px] p-8 border border-garis dark:border-garisdark relative h-80 flex items-end justify-around pb-12">
                  <div className="relative w-1/3 flex flex-col items-center justify-end h-full">
                    <span className="absolute -top-8 text-sm font-bold text-tinta/60 dark:text-[#EFE9DC]/60">
                      Beban Bunga
                    </span>
                    <div
                      className="w-full bg-beban rounded-t-[4px] transition-all duration-500 relative flex items-start justify-center pt-2"
                      style={{ height: isOptimized ? '25%' : '85%' }}
                    >
                      <span className="text-white/90 font-bold text-xs tnum">
                        {isOptimized ? '25%' : '85%'}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-1/3 flex flex-col items-center justify-end h-full">
                    <span className="absolute -top-8 text-sm font-bold text-tinta/60 dark:text-[#EFE9DC]/60">
                      Potensi Return
                    </span>
                    <div
                      className="w-full bg-lunas rounded-t-[4px] transition-all duration-500 relative flex items-start justify-center pt-2"
                      style={{ height: isOptimized ? '75%' : '15%' }}
                    >
                      <span className="text-white/90 font-bold text-xs tnum">
                        {isOptimized ? '75%' : '15%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
                <div className="md:order-2">
                  <p className="inline-flex items-center gap-2 text-ember font-bold uppercase tracking-[0.16em] text-xs mb-4">
                    <BrainCircuit size={16} /> Behavioral Nudging
                  </p>
                  <h3 className="font-display text-3xl font-black mb-4 leading-tight">
                    AI mencegat di momen gaji masuk
                  </h3>
                  <p className="text-tinta/70 dark:text-[#EFE9DC]/70 mb-6 leading-relaxed max-w-lg">
                    Sistem mendeteksi saat user baru menerima gaji. Alih-alih pop-up promosi
                    konsumtif, AI memberikan <em>nudge</em> psikologis untuk mengalihkan dana secara
                    pintar: lunasi paylater dulu, sisanya masuk investasi. Coba ketuk eksekusinya
                    di mockup sebelah.
                  </p>
                  {nudgeExecuted && (
                    <p className="flex items-center gap-2 font-bold text-lunas">
                      <CheckCircle2 size={18} /> Nudge dieksekusi — Rp500rb ke paylater, Rp100rb ke investasi.
                    </p>
                  )}
                </div>
                <div className="md:order-1 flex justify-center">
                  <div className="relative w-80 h-[500px] bg-arang rounded-[2rem] border-8 border-[#2A241F] shadow-2xl p-4 overflow-hidden flex flex-col justify-center">
                    <div
                      className={`relative z-10 bg-struk text-tinta p-5 rounded-[6px] border border-garis transform transition-all duration-300 ${nudgeExecuted ? 'scale-95 opacity-70' : 'hover:scale-[1.02]'}`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-ember text-white p-1.5 rounded-full">
                          <BellRing size={16} />
                        </div>
                        <span className="text-xs font-bold">Gaji Masuk Terdeteksi!</span>
                      </div>
                      <p className="text-sm font-medium mb-4 leading-relaxed">
                        <span className="text-beban font-bold">Peringatan:</span> Bunga Paylater-mu (30%)
                        memakan arus kas.
                      </p>
                      <div className="bg-kertas p-3 rounded-[6px] mb-4 border border-garis">
                        <div className="flex justify-between text-sm">
                          <span className="text-beban font-semibold">Lunasi Paylater:</span>
                          <span className="font-bold tnum">Rp500rb</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-lunas font-semibold">Invest:</span>
                          <span className="font-bold tnum">Rp100rb</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setNudgeExecuted(true)}
                        disabled={nudgeExecuted}
                        className={`w-full min-h-[44px] py-2.5 rounded-[6px] font-bold text-sm transition-colors active:scale-[0.97] ${nudgeExecuted ? 'bg-lunas text-white cursor-default' : 'bg-ember text-white hover:bg-emberdeep'}`}
                      >
                        {nudgeExecuted ? (
                          <span className="inline-flex items-center gap-2">
                            <CheckCircle2 size={16} /> Eksekusi Berhasil
                          </span>
                        ) : (
                          'Ketuk untuk Eksekusi'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLAYGROUND — seksi gelap oxblood + kartu struk */}
        <section id="playground" className="py-20 md:py-28 px-6 bg-oxblood text-[#F6F1E7]">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F0B48F] mb-3">Demo Interaktif</p>
              <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">
                Geser angkanya, lihat struknya.
              </h2>
              <p className="mt-4 text-[#F6F1E7]/75 leading-relaxed">
                Simulasi sederhana cara LUNAS menghitung: separuh surplus dialihkan ke
                investasi, diproyeksikan 12 bulan. Ubah pendapatan dan utangmu — struk di
                kanan ikut berubah.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
              <div className="space-y-8 pt-2">
                <div>
                  <label htmlFor="income-range" className="flex justify-between text-sm font-bold mb-3 text-[#F6F1E7]/85">
                    <span>Pendapatan / bulan</span>
                    <span className="tnum">Rp {income} Juta</span>
                  </label>
                  <input
                    id="income-range"
                    type="range"
                    min="5"
                    max="50"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full h-2 bg-oxblooddeep rounded-full appearance-none cursor-pointer accent-[#E8A08A]"
                  />
                </div>
                <div>
                  <label htmlFor="debt-range" className="flex justify-between text-sm font-bold mb-3 text-[#F6F1E7]/85">
                    <span>Utang / bulan</span>
                    <span className="tnum text-[#F0B48F]">Rp {debt} Juta</span>
                  </label>
                  <input
                    id="debt-range"
                    type="range"
                    min="1"
                    max="30"
                    value={debt}
                    onChange={(e) => setDebt(Number(e.target.value))}
                    className="w-full h-2 bg-oxblooddeep rounded-full appearance-none cursor-pointer accent-[#E8A08A]"
                  />
                </div>
                <p className="text-sm text-[#F6F1E7]/60 leading-relaxed">
                  Rumus: surplus = pendapatan − utang; 50% surplus diinvestasikan;
                  proyeksi 12 bulan dengan asumsi return 8% per tahun. Semua angka di
                  halaman ini adalah simulasi contoh.
                </p>
              </div>
              <div className="relative">
                <div className="bg-struk text-tinta rounded-[6px] border border-garis shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] px-6 pt-6 pb-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-tinta/60">
                        <Activity size={14} className="text-ember" /> Proyeksi AI — 12 Bulan
                      </p>
                      <p className="font-display text-2xl font-black mt-2">Struk LUNAS</p>
                    </div>
                    <StampBadge />
                  </div>
                  <div className="border-t border-dashed border-garis my-5" />
                  {surplus <= 0 ? (
                    <p className="bg-beban/10 border border-beban/30 p-4 rounded-[6px] text-beban text-sm text-center font-bold mb-4">
                      Defisit Finansial — utang melebihi pendapatan.
                    </p>
                  ) : (
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex justify-between gap-4">
                        <span className="text-tinta/70">Surplus / bulan</span>
                        <span className="tnum font-bold">Rp {surplus.toFixed(1)} jt</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-tinta/70">Diinvestasikan (50%)</span>
                        <span className="tnum font-bold">Rp {invested.toFixed(1)} jt</span>
                      </div>
                      <div className="border-t border-dashed border-garis pt-3 flex items-end justify-between gap-4">
                        <span className="font-bold text-tinta/70">Aset 12 bulan</span>
                        <span className="tnum font-display text-4xl font-black text-lunas">
                          Rp {asset12Months.toFixed(1)} jt
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-tinta/55 pb-4">
                    Simulasi contoh — bukan nasihat keuangan.
                  </p>
                </div>
                <ZigzagEdge />
              </div>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="py-20 md:py-28 px-4 overflow-hidden border-t border-garis dark:border-garisdark">
          <div className="max-w-2xl mx-auto text-center mb-12 px-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember mb-3">Tim ERRNOR</p>
            <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">
              Para mastermind di balik LUNAS
            </h2>
            <p className="mt-4 text-tinta/70 dark:text-[#EFE9DC]/70 leading-relaxed">
              Empat peran, satu produk. Klik kartu di tengah untuk melihat detail tiap anggota.
            </p>
          </div>

          <div className="relative w-full max-w-6xl mx-auto h-[450px] flex items-center justify-center">
            {squad.map((member, idx) => {
              const pos = getCardPosition(idx);
              let zIndex = 10;
              let transform = 'scale(0.8) translateX(0) opacity-0';

              if (pos === 'center') {
                zIndex = 30;
                transform = 'scale(1) translateX(0) opacity-100';
              } else if (pos === 'left') {
                zIndex = 20;
                transform = 'scale(0.85) translateX(-65%) opacity-60';
              } else if (pos === 'right') {
                zIndex = 20;
                transform = 'scale(0.85) translateX(65%) opacity-60';
              }

              const filterClass = pos === 'center' ? 'grayscale-0' : 'grayscale';

              return (
                <article
                  key={member.id}
                  onClick={() => {
                    if (pos === 'left') prevMember();
                    else if (pos === 'right') nextMember();
                    else setSelectedMember(member);
                  }}
                  className={`absolute w-[280px] md:w-[350px] h-[400px] rounded-[6px] overflow-hidden transition-all duration-500 ease-out cursor-pointer shadow-xl border border-garis dark:border-garisdark bg-kertas dark:bg-arangcard ${filterClass}`}
                  style={{ zIndex, transform }}
                >
                  <img
                    src={member.bgImg}
                    alt={`Foto ${member.name}`}
                    className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-arang/85 backdrop-blur-sm px-6 py-5 text-white text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0B48F] mb-1">
                      {member.role}
                    </p>
                    <h3 className="font-display text-2xl font-black mb-1">{member.name}</h3>
                    <p className="text-sm text-white/75">{member.position}</p>
                    <div
                      className={`mt-3 transition-opacity duration-300 ${pos === 'center' ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <span className="text-xs border border-white/40 rounded-full px-4 py-1.5">
                        Lihat Detail
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}

            <button
              type="button"
              onClick={prevMember}
              aria-label="Anggota sebelumnya"
              className="absolute left-4 md:left-12 z-40 min-h-[44px] min-w-[44px] p-3 rounded-full bg-struk/90 dark:bg-arangcard/90 border border-garis dark:border-garisdark hover:bg-ember hover:text-white hover:border-ember transition-all flex items-center justify-center"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={nextMember}
              aria-label="Anggota berikutnya"
              className="absolute right-4 md:right-12 z-40 min-h-[44px] min-w-[44px] p-3 rounded-full bg-struk/90 dark:bg-arangcard/90 border border-garis dark:border-garisdark hover:bg-ember hover:text-white hover:border-ember transition-all flex items-center justify-center"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-2" role="tablist" aria-label="Pilih anggota tim">
            {squad.map((member, idx) => (
              <button
                key={member.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIdx}
                aria-label={`Tampilkan ${member.name}`}
                onClick={() => setActiveIdx(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === activeIdx ? 'w-8 bg-ember' : 'w-2.5 bg-tinta/25 dark:bg-[#EFE9DC]/25 hover:bg-tinta/50'}`}
              />
            ))}
          </div>
        </section>

        {/* TEAM MEMBER MODAL */}
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={`Detail ${selectedMember.name}`}>
            <div
              className="absolute inset-0 bg-arang/80 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedMember(null)}
            />

            <div className="relative w-full max-w-4xl bg-struk dark:bg-arangcard rounded-[6px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-garis dark:border-garisdark max-h-[90vh]">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                aria-label="Tutup detail anggota"
                className="absolute top-4 right-4 z-20 min-h-[44px] min-w-[44px] p-2 rounded-full bg-struk/80 dark:bg-arang/80 backdrop-blur-md hover:bg-ember hover:text-white transition-colors flex items-center justify-center"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/5 relative min-h-[250px] md:min-h-full overflow-hidden bg-kertas dark:bg-arang">
                <img
                  src={selectedMember.bgImg}
                  alt={`Foto ${selectedMember.name}`}
                  className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-arang/85 backdrop-blur-sm flex flex-col justify-end p-8 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0B48F] mb-1">
                    {selectedMember.role}
                  </p>
                  <h3 className="font-display text-3xl font-black mb-1">{selectedMember.name}</h3>
                  <p className="text-sm text-white/75">{selectedMember.position}</p>
                </div>
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-10 overflow-y-auto">
                <div className="mb-8 border-b border-garis dark:border-garisdark pb-6">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-3">
                    <Briefcase size={18} className="text-ember" /> Profil Spesialisasi
                  </h4>
                  <p className="text-tinta/70 dark:text-[#EFE9DC]/70 text-sm leading-relaxed italic">
                    &ldquo;{selectedMember.expertise}&rdquo;
                  </p>
                </div>
                <div className="mb-8">
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4">
                    <BarChart3 size={18} className="text-lunas" /> Proficiency Status
                  </h4>
                  <div className="space-y-4">
                    {selectedMember.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs font-bold mb-1.5">
                          <span>{skill.name}</span>
                          <span className="text-ember tnum">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-garis dark:bg-garisdark rounded-full overflow-hidden">
                          <div
                            className="h-full bg-ember rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-tinta/55 dark:text-[#EFE9DC]/55 mt-3">
                    Penilaian mandiri anggota tim.
                  </p>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4">
                    <Wrench size={18} className="text-oxblood dark:text-[#E8A08A]" /> Tech Stack &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 bg-kertas dark:bg-arang text-sm font-semibold rounded-[6px] border border-garis dark:border-garisdark"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER — ledger satu baris */}
        <footer className="py-10 border-t border-garis dark:border-garisdark bg-struk dark:bg-arangcard">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="flex items-center gap-3">
              <img src="/logo-errnor.png" alt="ERRNOR" className="h-6 w-auto object-contain" />
              <span className="font-display font-black tracking-tight text-lg">ERRNOR.</span>
              <StampBadge className="hidden sm:inline-flex" />
            </div>
            <nav className="flex items-center gap-5 text-sm font-semibold" aria-label="Navigasi footer">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-ember transition-colors">
                  {link.label}
                </button>
              ))}
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ember transition-colors">
                <GithubIcon size={15} /> GitHub
              </a>
            </nav>
            <p className="text-sm text-tinta/60 dark:text-[#EFE9DC]/60 text-center md:text-right">
              © 2026 Team ERRNOR · PIDI x Digdaya Hackathon 2026
              <span className="block text-xs mt-1">Powered by Logic, Delivered by AI.</span>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

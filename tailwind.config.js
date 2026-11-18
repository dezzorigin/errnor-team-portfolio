/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kertas: '#F6F1E7',      // latar kertas buku kas
        struk: '#FFFDF8',       // kartu struk
        tinta: '#211D19',       // teks tinta hangat
        arang: '#171310',       // latar gelap
        arangcard: '#221D18',   // kartu gelap
        oxblood: '#6E1423',     // seksi gelap / cap resmi
        oxblooddeep: '#4A0D18', // oxblood lebih dalam
        ember: '#D9481C',       // satu-satunya aksen CTA
        emberdeep: '#B93A14',   // ember hover
        lunas: '#177245',       // status lunas / positif
        beban: '#B3261E',       // beban bunga / defisit
        garis: '#E3DACA',       // garis rambut terang
        garisdark: '#3A322C',   // garis rambut gelap
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

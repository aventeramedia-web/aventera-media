/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0E0E0E',
        paper: '#FBFAF7',
        red: '#CC0202',
        redBright: '#FF4141',
        wine: '#5C0000',
        charcoal: '#0E0E0E',
        stone: '#8C8880',
        stoneLight: '#D8D4CC',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        tight2: '-0.03em',
        tight3: '-0.04em',
      },
    },
  },
  plugins: [],
};

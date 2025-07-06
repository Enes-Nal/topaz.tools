/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        secondary: '#999999',
        accent: '#c084fc',
        'pastel-blue': '#a7b2ff',
        hover: '#1a1a1a',
        border: '#333333',
        card: '#111111',
        input: '#1a1a1a',
        sidebar: '#0d0d0d',
        sidebarBorder: '#1e1e1e',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '14px',
        'lg': '16px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 0 0 1px #222222',
      },
    },
  },
  plugins: [],
};

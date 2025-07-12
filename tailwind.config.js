/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme colors
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

        // Light theme colors - much darker for better readability
        'light-background': '#e5e7eb',
        'light-foreground': '#111827',
        'light-secondary': '#374151',
        'light-hover': '#d1d5db',
        'light-border': '#9ca3af',
        'light-card': '#f3f4f6',
        'light-input': '#ffffff',
        'light-sidebar': '#e5e7eb',
        'light-sidebar-border': '#d1d5db',
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
        'light-card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Topaz Video Downloader',
  description: 'Download videos from YouTube, Instagram, Twitter, TikTok and more',
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-storage');
                  if (theme) {
                    const parsed = JSON.parse(theme);
                    const currentTheme = parsed.state?.theme || 'auto';
                    if (currentTheme === 'auto') {
                      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      document.documentElement.classList.add(isDark ? 'dark' : 'light');
                    } else {
                      document.documentElement.classList.add(currentTheme);
                    }
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Sidebar />
          <div className="pl-20">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

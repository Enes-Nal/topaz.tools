'use client';

import { useThemeStore } from '@/lib/theme-store';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, getCurrentTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const currentTheme = getCurrentTheme();
    const html = document.documentElement;

    // Remove existing theme classes
    html.classList.remove('light', 'dark');

    // Add current theme class
    html.classList.add(currentTheme);
  }, [theme, getCurrentTheme, mounted]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (!mounted || theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const currentTheme = getCurrentTheme();
      const html = document.documentElement;
      html.classList.remove('light', 'dark');
      html.classList.add(currentTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, getCurrentTheme, mounted]);

  // Apply theme immediately on mount to prevent flash
  useEffect(() => {
    const currentTheme = getCurrentTheme();
    const html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(currentTheme);
  }, []);

  return <>{children}</>;
}

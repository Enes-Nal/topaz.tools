import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getCurrentTheme: () => 'light' | 'dark';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'auto',

      setTheme: (theme) => set({ theme }),

      getCurrentTheme: () => {
        const { theme } = get();
        if (theme === 'auto') {
          // Check system preference
          if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          }
          return 'dark'; // Default fallback
        }
        return theme;
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

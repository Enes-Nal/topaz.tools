'use client';

import { ThumbnailControls } from '@/components/thumbnail/controls';
import { ThumbnailPreview } from '@/components/thumbnail/preview';
import { useThumbnailStore } from '@/lib/thumbnail-store';
import { useEffect, useState } from 'react';

export default function ThumbnailPage() {
  const { theme } = useThumbnailStore();
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setCurrentTheme(storedTheme === 'auto' ? systemTheme : storedTheme);
  }, [theme]);

  return (
    <div className={`${currentTheme} w-full h-full min-h-screen`}>
      <div className="flex min-h-screen h-screen bg-white text-gray-800 dark:bg-background dark:text-foreground font-sans">
        {/* Controls Panel */}
        <aside className="w-[350px] h-screen bg-gray-50 border-r border-gray-200 dark:bg-[#18181b] dark:border-[#23232a] p-6 overflow-y-auto flex-shrink-0">
          <ThumbnailControls />
        </aside>

        {/* Preview Panel */}
        <main className="flex-1 bg-gray-100 dark:bg-[#101012] p-8 overflow-y-auto">
          <ThumbnailPreview />
        </main>
      </div>
    </div>
  );
}

'use client';

import { ThumbnailControls } from '@/components/thumbnail/controls';
import { ThumbnailPreview } from '@/components/thumbnail/preview';
import { useThemeStore } from '@/lib/theme-store';
import { useEffect, useState } from 'react';

export default function ThumbnailPage() {
  const { getCurrentTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const globalTheme = getCurrentTheme();

  return (
    <div className={`${globalTheme} w-full h-full min-h-screen`}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-light-background dark:bg-background text-light-foreground dark:text-foreground font-sans">
        {/* Controls Panel */}
        <aside className="w-full lg:w-[350px] lg:h-screen bg-light-sidebar dark:bg-[#18181b] border-b lg:border-b-0 lg:border-r border-light-sidebar-border dark:border-[#23232a] p-4 lg:p-6 overflow-y-auto flex-shrink-0">
          <ThumbnailControls />
        </aside>

        {/* Preview Panel */}
        <main className="flex-1 bg-white dark:bg-[#101012] p-4 lg:p-8 overflow-y-auto">
          <ThumbnailPreview />
        </main>
      </div>
    </div>
  );
}

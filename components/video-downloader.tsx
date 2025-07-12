'use client';

import { useVideoDownloaderStore } from '@/lib/store';
import { useThemeStore } from '@/lib/theme-store';
import { UrlInput } from './url-input';
import { DownloadProgress } from './download-progress';

export function VideoDownloader() {
  const { downloadStatus, error, videoInfo } = useVideoDownloaderStore();
  const { getCurrentTheme } = useThemeStore();
  const showProgressBar = downloadStatus === 'downloading' || downloadStatus === 'processing';
  const currentTheme = getCurrentTheme();
  const logoSrc = currentTheme === 'light' ? '/topaz_white.png' : '/topaz.png';

  return (
    <div className="space-y-4 flex flex-col items-center">
      <img
        src={logoSrc}
        alt="Topaz Logo"
        className="mx-auto mb-4"
        style={{ width: '120px', height: 'auto' }}
      />
      <UrlInput />

      {error && !videoInfo && (
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-500/50 rounded-md p-3 text-center">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {showProgressBar && <DownloadProgress />}
    </div>
  );
}

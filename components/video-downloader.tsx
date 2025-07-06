'use client';

import { useVideoDownloaderStore } from '@/lib/store';
import { UrlInput } from './url-input';
import { DownloadProgress } from './download-progress';

export function VideoDownloader() {
  const { downloadStatus, error, videoInfo } = useVideoDownloaderStore();
  const showProgressBar = downloadStatus === 'downloading' || downloadStatus === 'processing';

  return (
    <div className="space-y-4 flex flex-col items-center">
      <img
        src="/topaz.png"
        alt="Topaz Logo"
        className="mx-auto mb-4"
        style={{ width: '120px', height: 'auto' }}
      />
      <UrlInput />

      {error && !videoInfo && (
        <div className="bg-red-900/20 border border-red-500/50 rounded-md p-3 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {showProgressBar && <DownloadProgress />}
    </div>
  );
}

'use client';

import { useVideoDownloaderStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function DownloadProgress() {
  const { downloadStatus } = useVideoDownloaderStore();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (downloadStatus === 'downloading') {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          // Simulate progress with random increments
          return prev + Math.random() * 10;
        });
      }, 500);
      return () => clearInterval(interval);
    } else if (downloadStatus === 'completed') {
      setProgress(100);
    }
  }, [downloadStatus]);

  const getStatusText = () => {
    switch (downloadStatus) {
      case 'fetching':
        return 'Analyzing link...';
      case 'downloading':
        return `Downloading... ${Math.round(progress)}%`;
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Download complete!';
      case 'error':
        return 'Download failed';
      default:
        return '';
    }
  };

  if (downloadStatus === 'idle') return null;

  return (
    <div className="space-y-2 pt-2">
      <div className="w-full bg-light-input dark:bg-input rounded-full h-2.5 overflow-hidden">
        <div
          className={cn(
            'h-2.5 rounded-full transition-all duration-500 ease-linear',
            downloadStatus === 'error' ? 'bg-red-500' : 'bg-pastel-blue'
          )}
          style={{ width: `${downloadStatus === 'error' ? 100 : progress}%` }}
        />
      </div>
      <p className="text-center text-sm text-light-secondary dark:text-secondary">{getStatusText()}</p>
    </div>
  );
}

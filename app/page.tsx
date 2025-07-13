'use client';

import { VideoDownloader } from '@/components/video-downloader';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <main className="w-full max-w-2xl">
        <VideoDownloader />
      </main>
    </div>
  );
}

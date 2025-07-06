'use client';

import { useThumbnailStore } from '@/lib/thumbnail-store';
import { useCompareStore } from '@/lib/compare-store';
import { YouTubeCardHome } from './youtube-card-home';
import { placeholderData } from '@/lib/placeholder-data';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { YouTubeCardSidebar } from './youtube-card-sidebar';
import { YouTubeCardSearch } from './youtube-card-search';
import { toPng } from 'html-to-image';
import { Download, Shuffle } from 'lucide-react';
import { loadFormattedVideos, convertToPreviewFormat } from '@/lib/load-formatted-videos';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const ModeButton = ({ mode, currentMode, setMode, children }) => {
  const isActive = mode === currentMode;
  return (
    <button
      onClick={() => setMode(mode)}
      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
        isActive
          ? 'bg-pastel-blue text-gray-900'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#23232a] dark:text-[#e5e7eb] dark:hover:bg-[#33333a]'
      }`}
    >
      {children}
    </button>
  );
};

export function ThumbnailPreview() {
  const { previewMode, setPreviewMode, ...defaultPreviewData } = useThumbnailStore();
  const { thumbnails: compareThumbnails } = useCompareStore();

  const [shuffledPlaceholders, setShuffledPlaceholders] = useState([]);
  const [insertionIndex, setInsertionIndex] = useState(0);
  const previewRef = useRef(null);

  const randomize = useCallback(async () => {
    try {
      let videos = await loadFormattedVideos();
      videos = shuffleArray([...videos]);
      const convertedVideos = convertToPreviewFormat(videos.slice(0, 12)); // Limit to 12 videos
      setShuffledPlaceholders(convertedVideos);
      setInsertionIndex(Math.floor(Math.random() * (convertedVideos.length + 1)));
    } catch (error) {
      console.error('Error loading formatted videos:', error);
      // Fallback to placeholder data
      const fallbackVideos = shuffleArray([...placeholderData]);
      setShuffledPlaceholders(fallbackVideos);
      setInsertionIndex(Math.floor(Math.random() * (fallbackVideos.length + 1)));
    }
  }, []);

  // Initial randomization on mount
  useEffect(() => {
    randomize();
  }, [randomize]);

  const mixedData = useMemo(() => {
    if (previewMode === 'compare') return [];
    const previewCard = { ...defaultPreviewData, isPreview: true };
    const finalData = [...shuffledPlaceholders];
    finalData.splice(insertionIndex, 0, previewCard);
    return finalData;
  }, [defaultPreviewData, shuffledPlaceholders, insertionIndex, previewMode]);

  const handleExport = () => {
    if (previewRef.current === null) {
      return;
    }
    toPng(previewRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `thumbnail-preview-${previewMode}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderPreview = () => {
    switch (previewMode) {
      case 'home':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {mixedData.map((data, index) => (
              <YouTubeCardHome key={data.isPreview ? 'preview-card' : index} {...data} avatarUrl={data.channelAvatarUrl || data.avatarUrl} />
            ))}
          </div>
        );
      case 'sidebar':
        return (
          <div className="flex flex-col gap-4">
             {mixedData.slice(0, 5).map((data, index) => (
              <YouTubeCardSidebar key={data.isPreview ? 'preview-card' : index} {...data} avatarUrl={data.channelAvatarUrl || data.avatarUrl} />
            ))}
          </div>
        );
      case 'search':
        return (
          <div className="flex flex-col gap-6">
            {mixedData.slice(0, 4).map((data, index) => (
              <YouTubeCardSearch key={data.isPreview ? 'preview-card' : index} {...data} avatarUrl={data.channelAvatarUrl || data.avatarUrl} />
            ))}
          </div>
        );
      case 'compare':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {compareThumbnails.map((data) => (
              <YouTubeCardHome key={data.id} {...data} isPreview={true} />
            ))}
          </div>
        );
      default:
        return <div className="text-white">Select a preview mode</div>;
    }
  };

  const titles = {
    home: 'Home Feed Preview',
    sidebar: 'Sidebar "Up Next" Preview',
    search: 'Search Results Preview',
    compare: 'Compare Mode',
  };

  return (
    <div className="font-roboto !font-roboto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-[#e5e7eb]">{titles[previewMode]}</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <ModeButton mode="home" currentMode={previewMode} setMode={setPreviewMode}>Home</ModeButton>
            <ModeButton mode="sidebar" currentMode={previewMode} setMode={setPreviewMode}>Sidebar</ModeButton>
            <ModeButton mode="search" currentMode={previewMode} setMode={setPreviewMode}>Search</ModeButton>
            <ModeButton mode="compare" currentMode={previewMode} setMode={setPreviewMode}>Compare</ModeButton>
          </div>
          <button onClick={randomize} className="flex items-center gap-2 bg-gray-200 dark:bg-[#23232a] text-gray-700 dark:text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-[#33333a] transition-colors">
            <Shuffle size={16} />
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 bg-pastel-blue text-black font-semibold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>
      <div ref={previewRef} className="p-1">
        {renderPreview()}
      </div>
    </div>
  );
}

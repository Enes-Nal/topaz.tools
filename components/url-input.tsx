'use client';

import { useState, useEffect } from 'react';
import { useVideoDownloaderStore } from '@/lib/store';
import { downloadRequestSchema } from '@/lib/schemas';
import { Link, Sparkles, Music, VolumeX, ClipboardPaste, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type DownloadType = 'auto' | 'audio' | 'mute';

const fileTypes = [
  { label: 'MP4', value: 'mp4' },
  { label: 'MP3', value: 'mp3' },
  { label: 'WebM', value: 'webm' },
  { label: 'MKV', value: 'mkv' },
];

const COMMON_QUALITIES = [
  '2160p',
  '1440p',
  '1080p',
  '720p',
  '480p',
  '360p',
  '240p',
  '144p',
];

export function UrlInput() {
  const { url, setUrl, setDownloadOptions, setDownloadStatus, setError, downloadOptions, videoInfo, setVideoInfo, downloadStatus } = useVideoDownloaderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [downloadType, setDownloadType] = useState<DownloadType>('auto');
  const [quality, setQuality] = useState<string>('1080p');
  const [fileType, setFileType] = useState<string>('mp4');
  const [availableQualities, setAvailableQualities] = useState<string[]>(COMMON_QUALITIES);

  // Extract available qualities from videoInfo
  useEffect(() => {
    if (videoInfo && videoInfo.formats) {
      const heights = videoInfo.formats
        .filter(f => f.vcodec !== 'none' && f.height)
        .map(f => f.height as number)
        .filter(Boolean);
      const uniqueHeights = Array.from(new Set(heights)).sort((a, b) => b - a);
      const qualities = uniqueHeights.map(h => `${h}p`);
      setAvailableQualities(qualities.length > 0 ? qualities : COMMON_QUALITIES);
      // Set quality to 1080p if present, else first available
      if (qualities.includes('1080p')) setQuality('1080p');
      else if (qualities.length > 0) setQuality(qualities[0]);
    } else {
      setAvailableQualities(COMMON_QUALITIES);
      setQuality(COMMON_QUALITIES.includes('1080p') ? '1080p' : COMMON_QUALITIES[0]);
    }
  }, [videoInfo]);

  // Update download options when quality or fileType changes
  useEffect(() => {
    setDownloadOptions({
      format: qualityToFormat(quality),
      outputFormat: downloadType === 'audio' ? 'mp3' : fileType,
    });
  }, [quality, fileType, downloadType, setDownloadOptions]);

  function qualityToFormat(q: string) {
    const num = parseInt(q);
    if (!num) return 'best';
    return `bestvideo[height<=${num}]+bestaudio/best[height<=${num}]`;
  }

  const handleTypeChange = (type: DownloadType) => {
    setDownloadType(type);
    if (type === 'audio') {
      setFileType('mp3');
      setDownloadOptions({ audioOnly: true, videoOnly: false, outputFormat: 'mp3' });
    } else if (type === 'mute') {
      setDownloadOptions({ audioOnly: false, videoOnly: true, outputFormat: fileType });
    } else {
      setDownloadOptions({ audioOnly: false, videoOnly: false, outputFormat: fileType });
    }
  };

  const handleQualityChange = (val: string) => {
    setQuality(val);
    setDownloadOptions({ format: qualityToFormat(val) });
  };

  const handleFileTypeChange = (val: string) => {
    setFileType(val);
    setDownloadOptions({ outputFormat: val });
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      await fetchVideoInfo(text);
    } catch (err) {
      setError('Failed to paste from clipboard.');
    }
  };

  const fetchVideoInfo = async (inputUrl: string) => {
    try {
      setError(null);
      setIsLoading(true);
      setDownloadStatus('fetching');
      const validatedData = downloadRequestSchema.parse({ url: inputUrl.trim() });
      const response = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch video info.');
      }
      const info = await response.json();
      setVideoInfo(info);
      setDownloadStatus('idle');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch video info.');
      setDownloadStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (currentUrl: string) => {
    if (!currentUrl.trim()) {
      setError('Please paste a link to start.');
      return;
    }
    setDownloadStatus('fetching');
    setIsLoading(true);
    setError(null);
    try {
      await fetchVideoInfo(currentUrl);
      setDownloadStatus('downloading');
      const validatedData = downloadRequestSchema.parse({ url: currentUrl.trim() });
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...validatedData, ...useVideoDownloaderStore.getState().downloadOptions }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start download.');
      }
      const result = await response.json();
      setDownloadStatus('processing');
      if (result.filename) {
        // Log the filename received from backend
        console.log('Received filename from backend:', result.filename);
        const fileRes = await fetch(`/api/downloads?filename=${encodeURIComponent(result.filename)}`);
        // Log the filename used in the fetch
        console.log('Requesting file from /api/downloads:', `/api/downloads?filename=${encodeURIComponent(result.filename)}`);
        if (!fileRes.ok) throw new Error('Failed to fetch the downloaded file.');
        const blob = await fileRes.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setDownloadStatus('completed');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred.');
      setDownloadStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if we are in a loading/downloading state
  const isDownloading = isLoading || downloadStatus === 'downloading' || downloadStatus === 'processing';

  // Helper to detect TikTok URL
  const isTikTok = url.includes('tiktok.com');

  return (
    <div className="space-y-3">
      <div className="relative">
        {/* Link icon or loading spinner */}
        <span className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-light-secondary dark:text-secondary flex items-center justify-center">
          {isDownloading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Link className="w-5 h-5" />
          )}
        </span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={async (e) => { if (e.key === 'Enter') await handleSubmit(url); }}
          placeholder="paste the link here"
          className="w-full bg-light-input dark:bg-input text-light-foreground dark:text-foreground rounded-xl pl-10 pr-12 py-3 border-2 border-transparent focus:border-pastel-blue focus:outline-none transition-colors"
          disabled={isLoading}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-light-hover dark:hover:bg-hover transition-colors"
          onClick={() => handleSubmit(url)}
          disabled={isLoading}
          aria-label="Download"
        >
          <ArrowRight className="w-6 h-6 text-pastel-blue" />
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 w-full">
        <div className="flex items-center bg-light-input dark:bg-input p-1 rounded-xl">
          {(['auto', 'audio', 'mute'] as DownloadType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={cn(
                'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors border-2',
                downloadType === type
                  ? 'bg-pastel-blue/20 border-pastel-blue text-light-foreground dark:text-foreground shadow-sm'
                  : 'border-transparent text-light-secondary dark:text-secondary hover:text-light-foreground dark:hover:text-foreground'
              )}
            >
              {type === 'auto' && <Sparkles className="w-4 h-4 text-yellow-400" />}
              {type === 'audio' && <Music className="w-4 h-4 text-accent" />}
              {type === 'mute' && <VolumeX className="w-4 h-4 text-gray-500" />}
              <span>{type}</span>
            </button>
          ))}
        </div>
        {/* Quality Dropdown - hide for TikTok */}
        {!isTikTok && (
          <div className="flex-1 min-w-[90px]">
            <select
              value={quality}
              onChange={(e) => handleQualityChange(e.target.value)}
              className="w-full bg-light-input dark:bg-input border-2 border-pastel-blue rounded-lg px-3 py-2 text-light-foreground dark:text-foreground text-sm transition-colors focus:outline-none"
              disabled={isLoading}
            >
              {availableQualities.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
        )}
        {/* File Type Dropdown */}
        <div className="flex-1 min-w-[90px]">
          <select
            value={downloadType === 'audio' ? 'mp3' : fileType}
            onChange={(e) => handleFileTypeChange(e.target.value)}
            className="w-full bg-light-input dark:bg-input border-2 border-pastel-blue rounded-lg px-3 py-2 text-light-foreground dark:text-foreground text-sm transition-colors focus:outline-none"
            disabled={isLoading || downloadType === 'audio'}
          >
            {fileTypes.map((f) => (
              <option key={f.value} value={f.value} disabled={downloadType === 'audio' && f.value !== 'mp3'}>{f.label}</option>
            ))}
          </select>
        </div>
        {/* Paste Button */}
        <button
          onClick={handlePaste}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-light-input dark:bg-input rounded-xl text-light-foreground dark:text-foreground font-medium hover:bg-light-hover dark:hover:bg-hover transition-colors disabled:opacity-50 ml-2"
        >
          <ClipboardPaste className="w-5 h-5" />
          <span>Paste</span>
        </button>
      </div>
    </div>
  );
}

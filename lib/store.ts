import { create } from 'zustand';
import { VideoInfo, DownloadProgress, DownloadStatus, DownloadOptions } from './types';

interface VideoDownloaderState {
  // State
  url: string;
  videoInfo: VideoInfo | null;
  downloadStatus: DownloadStatus;
  downloadProgress: DownloadProgress | null;
  downloadOptions: DownloadOptions;
  error: string | null;

  // Actions
  setUrl: (url: string) => void;
  setVideoInfo: (info: VideoInfo | null) => void;
  setDownloadStatus: (status: DownloadStatus) => void;
  setDownloadProgress: (progress: DownloadProgress | null) => void;
  setDownloadOptions: (options: Partial<DownloadOptions>) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultDownloadOptions: DownloadOptions = {
  format: 'best',
  outputFormat: 'mp4',
  audioOnly: false,
  videoOnly: false,
};

export const useVideoDownloaderStore = create<VideoDownloaderState>((set) => ({
  // Initial state
  url: '',
  videoInfo: null,
  downloadStatus: 'idle',
  downloadProgress: null,
  downloadOptions: defaultDownloadOptions,
  error: null,

  // Actions
  setUrl: (url) => set({ url }),

  setVideoInfo: (videoInfo) => set({ videoInfo }),

  setDownloadStatus: (downloadStatus) => set({ downloadStatus }),

  setDownloadProgress: (downloadProgress) => set({ downloadProgress }),

  setDownloadOptions: (options) =>
    set((state) => ({
      downloadOptions: { ...state.downloadOptions, ...options }
    })),

  setError: (error) => set({ error }),

  reset: () => set({
    url: '',
    videoInfo: null,
    downloadStatus: 'idle',
    downloadProgress: null,
    downloadOptions: defaultDownloadOptions,
    error: null,
  }),
}));

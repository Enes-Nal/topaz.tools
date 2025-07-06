export interface VideoInfo {
  title: string;
  duration: string;
  thumbnail: string;
  formats: VideoFormat[];
  extractor: string;
  webpage_url: string;
}

export interface VideoFormat {
  format_id: string;
  ext: string;
  resolution: string;
  filesize: number;
  vcodec: string;
  acodec: string;
  height?: number | null;
  width?: number | null;
  fps?: number | null;
  abr?: number | null;
  vbr?: number | null;
}

export interface DownloadOptions {
  format: string;
  outputFormat: 'mp4' | 'mp3' | 'webm' | 'mkv';
  audioOnly: boolean;
  videoOnly: boolean;
}

export interface DownloadProgress {
  status: 'downloading' | 'processing' | 'completed' | 'error';
  progress: number;
  speed: string;
  eta: string;
  filename: string;
  error?: string;
}

export interface SupportedPlatform {
  name: string;
  icon: string;
  urlPattern: RegExp;
  supported: boolean;
}

export type DownloadStatus = 'idle' | 'fetching' | 'downloading' | 'processing' | 'completed' | 'error';

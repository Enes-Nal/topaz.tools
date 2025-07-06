import { z } from 'zod';

export const downloadRequestSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  format: z.string().optional(),
  outputFormat: z.enum(['mp4', 'mp3', 'webm', 'mkv']).default('mp4'),
  audioOnly: z.boolean().default(false),
  videoOnly: z.boolean().default(false),
});

export const videoInfoSchema = z.object({
  title: z.string(),
  duration: z.string(),
  thumbnail: z.string().url(),
  formats: z.array(z.object({
    format_id: z.string(),
    ext: z.string(),
    resolution: z.string(),
    filesize: z.number(),
    vcodec: z.string(),
    acodec: z.string(),
    height: z.number().nullable().optional(),
    width: z.number().nullable().optional(),
    fps: z.number().nullable().optional(),
    abr: z.number().nullable().optional(),
    vbr: z.number().nullable().optional(),
  })),
  extractor: z.string(),
  webpage_url: z.string().url(),
});

export const downloadProgressSchema = z.object({
  status: z.enum(['downloading', 'processing', 'completed', 'error']),
  progress: z.number().min(0).max(100),
  speed: z.string(),
  eta: z.string(),
  filename: z.string(),
  error: z.string().optional(),
});

export type DownloadRequest = z.infer<typeof downloadRequestSchema>;
export type VideoInfo = z.infer<typeof videoInfoSchema>;
export type DownloadProgress = z.infer<typeof downloadProgressSchema>;

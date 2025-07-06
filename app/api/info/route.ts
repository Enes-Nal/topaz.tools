import { NextRequest, NextResponse } from 'next/server';
import { downloadRequestSchema, videoInfoSchema } from '@/lib/schemas';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = downloadRequestSchema.parse(body);

    // Use yt-dlp to get video information
    const command = `yt-dlp --dump-json --no-playlist "${url}"`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error('yt-dlp stderr:', stderr);
    }

    const videoData = JSON.parse(stdout);

    // Transform the data to match our schema
    const videoInfo = {
      title: videoData.title || 'Unknown Title',
      duration: videoData.duration_string || 'Unknown',
      thumbnail: videoData.thumbnail || '',
      formats: videoData.formats?.map((format: any) => ({
        format_id: format.format_id,
        ext: format.ext,
        resolution: format.resolution || 'unknown',
        filesize: format.filesize || 0,
        vcodec: format.vcodec || 'none',
        acodec: format.acodec || 'none',
        height: format.height || null,
        width: format.width || null,
        fps: format.fps || null,
        abr: format.abr || null,
        vbr: format.vbr || null,
      })) || [],
      extractor: videoData.extractor || 'unknown',
      webpage_url: videoData.webpage_url || url,
    };

    const validatedInfo = videoInfoSchema.parse(videoInfo);

    return NextResponse.json(validatedInfo);
  } catch (error) {
    console.error('Error fetching video info:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch video information' },
      { status: 500 }
    );
  }
}

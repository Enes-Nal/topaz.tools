import { NextRequest, NextResponse } from 'next/server';
import { downloadRequestSchema } from '@/lib/schemas';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const execAsync = promisify(exec);

function sanitizeFilename(name: string) {
  return name
    .replace(/[^\w.-]/g, '_') // Only keep word chars, dot, dash, underscore
    .replace(/_+/g, '_')      // Collapse multiple underscores
    .replace(/^_+|_+$/g, ''); // Trim underscores
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, format, outputFormat, audioOnly, videoOnly } = downloadRequestSchema.parse(body);

    // Ensure downloads directory exists and is writable
    const downloadsDir = join(process.cwd(), 'downloads');
    if (!existsSync(downloadsDir)) {
      await mkdir(downloadsDir, { recursive: true });
    }

    // Get video title for output template (use yt-dlp to get title only)
    let videoTitle = 'video';
    try {
      const infoCmd = `yt-dlp --get-title "${url}"`;
      const { stdout: titleStdout } = await execAsync(infoCmd);
      videoTitle = sanitizeFilename(titleStdout.trim());
    } catch (e) {
      // fallback to 'video'
    }

    // Set output template with sanitized title
    const outputTemplate = `downloads/${videoTitle}.%(ext)s`;

    // Build yt-dlp command based on options
    let command = 'yt-dlp --no-part --force-overwrites';

    const isTikTok = url.includes('tiktok.com');
    if (isTikTok) {
      // Use only the minimal working TikTok command
      command = `yt-dlp -S ext:mp4 --merge-output-format mp4 --force-overwrites --output "${outputTemplate}" "${url}"`;
    } else {
      if (audioOnly) {
        command += ' --extract-audio --audio-format mp3';
      } else if (videoOnly) {
        command += ' --video-only';
      }
      if (format && format !== 'best') {
        command += ` --format "${format}"`;
      }
      command += ` --output "${outputTemplate}"`;
      command += ` "${url}"`;
    }

    console.log('Executing command:', command);

    let stdout = '', stderr = '';
    try {
      const result = await execAsync(command);
      stdout = result.stdout;
      stderr = result.stderr;
      if (stderr) {
        console.error('yt-dlp stderr:', stderr);
      }
    } catch (err: any) {
      console.error('yt-dlp failed:', err.stderr || err.message);
      return NextResponse.json({ error: 'yt-dlp failed: ' + (err.stderr || err.message) }, { status: 500 });
    }

    // Find the downloaded file
    const fs = require('fs');
    const files = fs.readdirSync(downloadsDir);
    // Find the file with the sanitized title and any extension
    const matching = files.filter(f => f.startsWith(videoTitle + '.'));
    let filename = matching.length > 0 ? matching[0] : '';
    let fullPath = filename ? join(downloadsDir, filename) : '';

    // Wait for the file to exist and be readable (poll for up to 2 seconds)
    const waitForFile = async (path: string, timeoutMs = 2000) => {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        try {
          if (fs.existsSync(path)) {
            await new Promise(res => setTimeout(res, 50)); // small delay for file system flush
            return true;
          }
        } catch {}
        await new Promise(res => setTimeout(res, 50));
      }
      return false;
    };
    if (!filename || !(await waitForFile(fullPath))) {
      console.error('Download failed: File not found after yt-dlp:', fullPath);
      return NextResponse.json({ error: 'Download failed: File not found after yt-dlp.' }, { status: 500 });
    }

    // Only convert format if it's different from the original and not audio-only
    if (outputFormat && filename && !audioOnly) {
      const inputPath = fullPath;
      const inputExt = inputPath.split('.').pop()?.toLowerCase();

      // Only convert if the output format is different from the input format
      if (inputExt !== outputFormat) {
        const outputPath = inputPath.replace(/\.[^/.]+$/, `.${outputFormat}`);

        const ffmpegCommand = `ffmpeg -i "${inputPath}" -c copy "${outputPath}" -y`;

        try {
          await execAsync(ffmpegCommand);
          filename = outputPath.split('/').pop();
          fullPath = outputPath;
        } catch (ffmpegError: any) {
          console.error('FFmpeg conversion error:', ffmpegError.stderr || ffmpegError.message);
          // Continue with original file if conversion fails
        }
      }
    }

    // Final check for file existence
    if (!filename || !existsSync(fullPath)) {
      console.error('Final download failed: File not found:', fullPath);
      return NextResponse.json({ error: 'Final download failed: File not found.' }, { status: 500 });
    }

    // Log the filename being returned
    console.log('Returning filename to frontend:', filename);

    return NextResponse.json({
      success: true,
      filename: filename || 'download_completed',
      message: 'Download completed successfully'
    });

  } catch (error) {
    console.error('Error downloading video:', error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to download video' },
      { status: 500 }
    );
  }
}

# Topaz Video Downloader

A sleek, modern video downloader web application that supports downloading videos from YouTube, Instagram, Twitter, TikTok, and many more platforms. Built with Next.js, TypeScript, and powered by yt-dlp.

## Features

- 🎥 **Multi-Platform Support**: Download from YouTube, Instagram, Twitter, TikTok, Facebook, Vimeo, and more
- 🎨 **Modern UI**: Clean, dark-themed interface following modern design principles
- ⚡ **Fast Downloads**: Powered by yt-dlp for efficient video downloading
- 🎵 **Multiple Formats**: Support for MP4, WebM, MKV, and MP3 audio extraction
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔧 **Advanced Options**: Choose quality, format, and download type (video+audio, audio-only)
- ✅ **Real-time Progress**: See download progress and status updates

## Prerequisites

Before running this application, you need to install:

1. **Node.js** (v18 or higher)
2. **yt-dlp** - Video downloader
3. **FFmpeg** - For video/audio processing

### Installing yt-dlp

```bash
# On macOS (using Homebrew)
brew install yt-dlp

# On Ubuntu/Debian
sudo apt update
sudo apt install yt-dlp

# On Windows (using Chocolatey)
choco install yt-dlp

# Or download from: https://github.com/yt-dlp/yt-dlp
```

### Installing FFmpeg

```bash
# On macOS (using Homebrew)
brew install ffmpeg

# On Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# On Windows (using Chocolatey)
choco install ffmpeg

# Or download from: https://ffmpeg.org/download.html
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd topaz-video-downloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create downloads directory**
   ```bash
   mkdir downloads
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Enter a video URL** in the input field (supports YouTube, Instagram, Twitter, TikTok, etc.)
2. **Click "Fetch Info"** to get video information and available formats
3. **Select download options**:
   - Download type (Video + Audio, Audio Only)
   - Output format (MP4, WebM, MKV, MP3)
   - Quality settings
   - Specific format ID
4. **Click "Download Video"** to start the download
5. **Monitor progress** in the download status section

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── info/          # Video info endpoint
│   │   └── download/      # Download endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── video-downloader.tsx
│   ├── url-input.tsx
│   ├── video-info.tsx
│   ├── download-options.tsx
│   ├── download-progress.tsx
│   ├── supported-platforms.tsx
│   ├── header.tsx
│   └── footer.tsx
├── lib/                   # Utility libraries
│   ├── types.ts           # TypeScript interfaces
│   ├── schemas.ts         # Zod validation schemas
│   └── store.ts           # Zustand state management
├── downloads/             # Downloaded files directory
├── design.json            # Design system configuration
└── package.json           # Dependencies and scripts
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Validation**: Zod
- **Icons**: Lucide React
- **Video Processing**: yt-dlp, FFmpeg

## API Endpoints

### POST /api/info
Fetches video information using yt-dlp.

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=..."
}
```

**Response:**
```json
{
  "title": "Video Title",
  "duration": "10:30",
  "thumbnail": "https://...",
  "formats": [...],
  "extractor": "youtube",
  "webpage_url": "https://..."
}
```

### POST /api/download
Downloads video with specified options.

**Request Body:**
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format": "best",
  "quality": "best",
  "outputFormat": "mp4",
  "audioOnly": false,
  "videoOnly": false
}
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Set custom download directory
DOWNLOAD_DIR=./downloads

# Optional: Set maximum file size (in bytes)
MAX_FILE_SIZE=1073741824
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Style

This project follows:
- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Zod for validation
- Zustand for state management

## Security Considerations

- The application runs yt-dlp commands on the server
- Downloaded files are stored in a local directory
- Input validation is performed using Zod schemas
- CORS headers are configured for API endpoints

## Troubleshooting

### Common Issues

1. **"yt-dlp command not found"**
   - Ensure yt-dlp is installed and in your PATH
   - Try running `yt-dlp --version` in terminal

2. **"FFmpeg command not found"**
   - Ensure FFmpeg is installed and in your PATH
   - Try running `ffmpeg -version` in terminal

3. **Download fails**
   - Check if the URL is supported by yt-dlp
   - Verify internet connection
   - Check server logs for detailed error messages

4. **Permission errors**
   - Ensure the downloads directory is writable
   - Check file permissions on the server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Video downloader
- [FFmpeg](https://ffmpeg.org/) - Multimedia framework
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

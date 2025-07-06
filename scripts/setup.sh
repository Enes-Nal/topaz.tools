#!/bin/bash

echo "🚀 Setting up Topaz Video Downloader..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null; then
    echo "⚠️  yt-dlp is not installed. Please install it:"
    echo "   macOS: brew install yt-dlp"
    echo "   Ubuntu/Debian: sudo apt install yt-dlp"
    echo "   Windows: choco install yt-dlp"
    echo "   Or download from: https://github.com/yt-dlp/yt-dlp"
else
    echo "✅ yt-dlp is installed: $(yt-dlp --version)"
fi

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "⚠️  FFmpeg is not installed. Please install it:"
    echo "   macOS: brew install ffmpeg"
    echo "   Ubuntu/Debian: sudo apt install ffmpeg"
    echo "   Windows: choco install ffmpeg"
    echo "   Or download from: https://ffmpeg.org/download.html"
else
    echo "✅ FFmpeg is installed: $(ffmpeg -version | head -n1)"
fi

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Create downloads directory
echo "📁 Creating downloads directory..."
mkdir -p downloads

# Set permissions for downloads directory
chmod 755 downloads

echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."

// Loads video data from the local formatted JSON file
// This replaces the API calls with local data for better performance and reliability

export interface FormattedVideo {
  id: string;
  title: string;
  thumbnail: string;
  view_count: number;
  uploader: string;
  duration?: number;
  duration_string?: string;
  upload_date?: string;
  description?: string;
  channel_id?: string;
  channel_url?: string;
  webpage_url?: string;
  channelAvatarUrl?: string;
}

export async function loadFormattedVideos(): Promise<FormattedVideo[]> {
  try {
    // Import the JSON file dynamically
    const response = await fetch('/json/formatted_placeholder_with_avatars.json');
    if (!response.ok) {
      throw new Error('Failed to load formatted videos');
    }

    const videos: FormattedVideo[] = await response.json();
    return videos;
  } catch (error) {
    console.error('Error loading formatted videos:', error);
    // Return empty array as fallback
    return [];
  }
}

// Convert formatted video data to the format expected by the preview components
export function convertToPreviewFormat(videos: FormattedVideo[]) {
  return videos.map((video) => ({
    thumbnailUrl: video.thumbnail,
    title: video.title,
    username: video.uploader,
    viewCount: video.view_count ? formatViewCount(video.view_count) + ' views' : '',
    publicationTime: video.upload_date ? formatUploadDate(video.upload_date) : '',
    duration: video.duration_string || '',
    channelAvatarUrl: video.channelAvatarUrl || '', // Use the fetched channel avatar
    description: video.description || '',
    videoId: video.id,
    channelId: video.channel_id,
    channelUrl: video.channel_url,
    webpageUrl: video.webpage_url,
  }));
}

// Helper function to format upload date
function formatUploadDate(uploadDate: string): string {
  try {
    const date = new Date(
      parseInt(uploadDate.slice(0, 4)),
      parseInt(uploadDate.slice(4, 6)) - 1,
      parseInt(uploadDate.slice(6, 8))
    );
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) return 'Today';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return '';
  }
}

// Helper function to format view count in compact notation
function formatViewCount(count: number): string {
  if (count < 1000) return count.toString();
  if (count < 10_000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  if (count < 1_000_000) return Math.round(count / 1000) + 'K';
  if (count < 1_000_000_000) return (count / 1_000_000).toFixed(1) + 'M';
  return (count / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
}

// Fetches real YouTube video data from a public API for use as random feed
// Falls back to placeholderData if the fetch fails
import { placeholderData } from './placeholder-data';

export async function fetchRandomYouTubeVideos() {
  try {
    // Use a public endpoint (e.g. RapidAPI's youtube-search-results)
    const res = await fetch('https://yt.lemnoslife.com/noKey/trending?region=US');
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    if (!data || !data.videos) throw new Error('No videos');

    // Map to our card format
    return data.videos.slice(0, 12).map((v) => ({
      thumbnailUrl: v.video.thumbnails[0].url,
      title: v.video.title,
      username: v.video.author.title,
      viewCount: v.video.stats.views ? v.video.stats.views.toLocaleString() + ' views' : '',
      publicationTime: v.video.publishedTimeText || '',
      duration: v.video.lengthText || '',
      channelAvatarUrl: v.video.author.avatar[0]?.url || '',
      description: v.video.descriptionSnippet || '',
    }));
  } catch (e) {
    // Fallback to static placeholder data
    return placeholderData;
  }
}

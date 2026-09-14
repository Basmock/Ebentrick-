/**
 * YouTube Link Parser & Embed Utility
 * Supports standard watch URLs, youtu.be, shorts, embeds, and raw IDs
 */

export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If already a clean 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Handle standard youtube.com/watch?v=...
  const watchMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }

  // Handle youtube.com/shorts/...
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([^"&?\/\s]{11})/i);
  if (shortsMatch && shortsMatch[1]) {
    return shortsMatch[1];
  }

  return null;
}

export function getYouTubeThumbnail(videoIdOrUrl: string, quality: 'hq' | 'max' = 'hq'): string {
  const id = extractYouTubeId(videoIdOrUrl) || videoIdOrUrl;
  return quality === 'max'
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export const getYouTubeThumbnailUrl = getYouTubeThumbnail;

export function getYouTubeEmbedUrl(videoIdOrUrl: string, autoPlay: boolean = false): string {
  const id = extractYouTubeId(videoIdOrUrl) || videoIdOrUrl;
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`;
}

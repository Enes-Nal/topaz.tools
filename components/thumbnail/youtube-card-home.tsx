'use client';

import Image from 'next/image';
import { useThumbnailStore } from '@/lib/thumbnail-store';

const REMOTE_PLACEHOLDER = '/placeholder.png';

export function YouTubeCardHome({
  isPreview = false,
  thumbnailUrl,
  avatarUrl,
  title,
  username,
  viewCount,
  publicationTime,
  duration,
}) {
  const { showBorder } = useThumbnailStore();

  // Always use the provided thumbnailUrl if present, otherwise fallback to remote placeholder
  const finalThumbnailUrl = thumbnailUrl || REMOTE_PLACEHOLDER;
  const finalAvatarUrl = avatarUrl || '/placeholderpfp.jpg';

  return (
    <div className={`flex flex-col gap-3 font-roboto w-full max-w-sm ${isPreview && showBorder ? 'border-2 border-red-500 rounded-xl' : ''}`}>
      {/* Thumbnail */}
      <div className="relative aspect-video w-full">
        <Image
          src={finalThumbnailUrl}
          alt="Video thumbnail"
          layout="fill"
          className="rounded-xl object-cover"
          unoptimized={true}
        />
        <span className="absolute bottom-1.5 right-1.5 bg-black bg-opacity-80 text-white text-xs font-bold rounded px-1 py-0.5">
          {duration}
        </span>
      </div>

      {/* Video Info */}
      <div className="flex gap-3 px-1">
        {/* Avatar */}
        <div className="relative w-9 h-9 flex-shrink-0">
          <Image
            src={finalAvatarUrl}
            alt="Channel avatar"
            layout="fill"
            className="rounded-full object-cover"
            unoptimized={true} // Allow external URLs without configuration
          />
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-gray-900 dark:text-[#f1f1f1] leading-snug max-h-[3.2rem] overflow-hidden">
            {title}
          </h3>
          <div className="text-sm text-gray-600 dark:text-[#aaa] mt-1">
            <p>{username}</p>
            <p>
              <span>{viewCount}</span>
              <span className="before:content-['•'] before:mx-1">{publicationTime}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';

const REMOTE_PLACEHOLDER = '/placeholder.png';

export function YouTubeCardSidebar({
  isPreview = false,
  thumbnailUrl,
  title,
  username,
  viewCount,
  publicationTime,
  duration,
}) {
  const finalThumbnailUrl = thumbnailUrl || REMOTE_PLACEHOLDER;

  return (
    <div className={`flex gap-3 font-roboto w-full max-w-md ${isPreview ? 'bg-red-500/10 p-2 rounded-lg' : ''}`}>
      {/* Thumbnail */}
      <div className="relative aspect-video w-40 flex-shrink-0">
        <Image
          src={finalThumbnailUrl}
          alt="Video thumbnail"
          layout="fill"
          className="rounded-lg object-cover"
          unoptimized={true}
        />
        <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs font-bold rounded px-1 py-0.5">
          {duration}
        </span>
      </div>

      {/* Text Details */}
      <div className="flex flex-col py-0.5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-[#f1f1f1] leading-snug max-h-10 overflow-hidden">
          {title}
        </h3>
        <div className="text-xs text-gray-600 dark:text-[#aaa] mt-1">
          <p>{username}</p>
          <p>
            <span>{viewCount}</span>
            <span className="before:content-['•'] before:mx-1">{publicationTime}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

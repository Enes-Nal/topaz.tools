'use client';

import Image from 'next/image';

const REMOTE_PLACEHOLDER = '/placeholder.png';

export function YouTubeCardSearch({
  isPreview = false,
  thumbnailUrl,
  avatarUrl,
  title,
  username,
  viewCount,
  publicationTime,
  description,
}) {
  const finalThumbnailUrl = thumbnailUrl || REMOTE_PLACEHOLDER;
  const finalAvatarUrl = avatarUrl || '/placeholderpfp.jpg';

  return (
    <div className="flex flex-row gap-4 font-roboto w-full max-w-3xl min-h-[120px]">
      {/* Thumbnail */}
      <div className="relative aspect-video w-60 min-w-[240px] max-w-[260px] flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={finalThumbnailUrl}
          alt="Video thumbnail"
          layout="fill"
          className="object-cover rounded-xl"
          unoptimized={true}
        />
      </div>

      {/* Text Details */}
      <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
        <div>
          <h3 className="text-base font-bold text-gray-100 dark:text-[#f1f1f1] leading-snug line-clamp-2 mb-1">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image
                src={finalAvatarUrl}
                alt="Channel avatar"
                layout="fill"
                className="rounded-full object-cover"
                unoptimized={true}
              />
            </div>
            <span className="text-xs text-gray-400 font-semibold truncate max-w-[120px]">{username}</span>
            <span className="text-xs text-gray-400 before:content-['•'] before:mx-1">{viewCount}</span>
            <span className="text-xs text-gray-400 before:content-['•'] before:mx-1">{publicationTime}</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mt-1 max-w-full">
          {description}
        </p>
      </div>
    </div>
  );
}

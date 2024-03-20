import { twMerge } from "tailwind-merge";

import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

import { useEffect, useRef, useState } from "react";

type VideoProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export function Video({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;

      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={twMerge(
            "block h-full w-full rounded-xl object-cover transition-[border-radius] duration-200",
            isVideoPlaying && "rounded-none",
          )}
        />
        <div className="absolute bottom-1 right-1 rounded bg-secondary-dark px-0.5 text-sm text-secondary">
          {formatDuration(duration)}
        </div>
        <video
          className={twMerge(
            "absolute inset-0 block h-full object-cover opacity-0 transition-opacity duration-200",
            isVideoPlaying && "opacity-100 delay-200",
          )}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        />
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img className="h-12 w-12 rounded-full" src={channel.profileUrl} />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-sm text-secondary-text">
            {channel.name}
          </a>
          <div className="text-sm text-secondary-text">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Play, Eye, CheckCircle2, Flame, Clock } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoGridProps {
  videos: VideoItem[];
  onAdClick: () => void;
}

const VideoCard: React.FC<{ video: VideoItem; index: number; onAdClick: () => void }> = ({ video, index, onAdClick }) => {
  const [imgSrc, setImgSrc] = useState(video.image);

  return (
    <div
      id={`video-card-${video.id}`}
      onClick={onAdClick}
      className="group flex flex-col bg-neutral-900/90 rounded-2xl overflow-hidden border border-neutral-800 hover:border-rose-500/50 hover:shadow-xl hover:shadow-rose-950/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Video Thumbnail Container */}
      <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
        <img
          src={imgSrc}
          alt={video.rawTitle || video.title}
          onError={() => setImgSrc(video.fallbackImage)}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out brightness-95 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Gradient shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/40 pointer-events-none" />

        {/* Quality / HD Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="bg-rose-600/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
            {video.qualityBadge || '1080p HD'}
          </span>
          {index === 0 && (
            <span className="bg-amber-500 text-neutral-950 text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow">
              <Flame className="w-2.5 h-2.5 fill-current" /> HOT
            </span>
          )}
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 border border-white/50 transform scale-90 group-hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Duration badge bottom right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-2 py-0.5 rounded border border-white/10">
          <Clock className="w-3 h-3 text-rose-400" />
          <span>{video.duration}</span>
        </div>
      </div>

      {/* Video Content Metadata */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="flex gap-2.5">
          <div className="relative shrink-0">
            <img
              src={video.creatorAvatar}
              alt={video.creatorName}
              onError={(e) => {
                (e.target as HTMLImageElement).src = video.fallbackImage;
              }}
              className="w-9 h-9 rounded-full object-cover border border-rose-500/50"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug">
              {video.rawTitle ? video.rawTitle : video.title}
            </h3>

            {/* Creator info */}
            <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
              <span className="truncate">{video.creatorName}</span>
              <CheckCircle2 className="w-3 h-3 text-rose-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Views & Quick CTA */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-xs">
          <div className="flex items-center gap-1.5 text-neutral-300 font-medium">
            <Eye className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-bold text-white">{video.views}</span> views
          </div>

          <span className="text-rose-400 font-bold group-hover:underline flex items-center gap-1">
            Watch Now →
          </span>
        </div>
      </div>
    </div>
  );
};

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, onAdClick }) => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-5 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full inline-block"></span>
            Recommended VIP Videos
          </h2>
          <span className="bg-neutral-800 text-rose-400 text-xs font-bold px-2 py-0.5 rounded-full border border-neutral-700">
            {videos.length} Available
          </span>
        </div>

        <button
          id="view-all-videos-btn"
          onClick={onAdClick}
          className="text-xs text-neutral-400 hover:text-white cursor-pointer transition-colors"
        >
          View All Trending
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            index={index}
            onAdClick={onAdClick}
          />
        ))}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Play, Volume2, Maximize, Radio, Eye, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { VideoItem } from '../types';

interface FeaturedLiveVideoProps {
  video: VideoItem;
  onAdClick: () => void;
}

export const FeaturedLiveVideo: React.FC<FeaturedLiveVideoProps> = ({ video, onAdClick }) => {
  const [imgSrc, setImgSrc] = useState(video.image);

  return (
    <section className="relative w-full mb-8">
      {/* Container with glowing border */}
      <div 
        id="featured-live-player"
        onClick={onAdClick}
        className="group relative w-full bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-rose-500/40 shadow-2xl shadow-rose-950/40 cursor-pointer transition-all duration-300 hover:border-rose-400 hover:shadow-rose-600/30"
      >
        {/* Aspect Ratio Video Container (16:9) */}
        <div className="relative w-full aspect-video sm:aspect-[16/9] md:aspect-[21/9] bg-neutral-950 overflow-hidden">
          {/* Main Thumbnail / Simulated Video */}
          <img
            src={imgSrc}
            alt={video.title}
            onError={() => setImgSrc(video.fallbackImage)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 filter contrast-105"
            loading="eager"
          />

          {/* Dark gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-black/60 pointer-events-none" />

          {/* Top Header Controls / Badges */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 right-3 sm:right-5 flex items-center justify-between pointer-events-none">
            {/* LIVE Tag */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 bg-rose-600/95 text-white font-black text-xs sm:text-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-rose-600/50 backdrop-blur-md animate-pulse">
                <Radio className="w-4 h-4 animate-spin text-white" style={{ animationDuration: '3s' }} />
                <span>LIVE STREAM</span>
              </span>

              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-rose-200 border border-rose-500/30 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full">
                <Eye className="w-3.5 h-3.5 text-rose-400" />
                <span>{video.liveViewers || '18.4K'} watching</span>
              </span>
            </div>

            {/* Quality badge */}
            <span className="bg-amber-500/90 text-neutral-950 text-xs font-black px-2.5 py-1 rounded-md tracking-wider shadow">
              4K ULTRA HD
            </span>
          </div>

          {/* Center Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative">
              {/* Outer pulsing rings */}
              <div className="absolute -inset-4 bg-rose-600/30 rounded-full animate-ping pointer-events-none" />
              <div className="absolute -inset-2 bg-gradient-to-tr from-rose-500 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-rose-500 border-2 border-white/80 flex items-center justify-center shadow-2xl shadow-rose-600/60 transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white fill-white ml-1 filter drop-shadow" />
              </div>
            </div>
          </div>

          {/* Bottom Stream Player Controls Simulation */}
          <div className="absolute bottom-0 inset-x-0 p-3 sm:p-5 pointer-events-none bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent">
            {/* Live Progress Buffer bar */}
            <div className="w-full h-1.5 bg-neutral-700/60 rounded-full overflow-hidden mb-3 relative">
              <div className="absolute top-0 bottom-0 left-0 w-3/4 bg-gradient-to-r from-rose-600 to-pink-500 rounded-full" />
              <div className="absolute top-0 bottom-0 left-3/4 w-2 h-full bg-white rounded-full animate-pulse shadow-sm shadow-white" />
            </div>

            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 font-bold text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span>LIVE • {video.duration}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-neutral-400">
                  <Volume2 className="w-4 h-4 text-neutral-300" />
                  <span>Audio Active (High Quality)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="bg-neutral-800/80 text-neutral-300 text-xs px-2 py-0.5 rounded border border-neutral-700">
                  1080p60
                </span>
                <Maximize className="w-4 h-4 text-neutral-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Information Bar */}
        <div className="p-4 sm:p-5 bg-neutral-950 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-neutral-800/80">
          <div className="flex items-start sm:items-center gap-3">
            <div className="relative shrink-0">
              <img
                src={video.creatorAvatar}
                alt={video.creatorName}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = video.fallbackImage;
                }}
                className="w-12 h-12 rounded-full object-cover border-2 border-rose-500 shadow-md shadow-rose-500/20"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-rose-500/20 text-rose-400 text-[11px] font-bold px-2 py-0.5 rounded border border-rose-500/30">
                  🔥 TOP TRENDING LIVE
                </span>
                <span className="text-neutral-400 text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> VIP Member Room
                </span>
              </div>

              <h2 className="text-base sm:text-xl font-black text-white group-hover:text-rose-400 transition-colors line-clamp-1 mt-0.5">
                {video.rawTitle ? video.rawTitle : video.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                <span className="font-semibold text-rose-300">{video.creatorName}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{video.views} total views</span>
                <span>•</span>
                <span className="text-neutral-300">Started 6 mins ago</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="featured-chat-btn"
              onClick={onAdClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-pink-400" />
              <span>Live Chat (348)</span>
            </button>

            <button
              id="featured-join-stream-btn"
              onClick={onAdClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-400 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg shadow-rose-600/40 transition-all transform active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>PLAY VIDEO FULL HD</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

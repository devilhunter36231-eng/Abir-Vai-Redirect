import React from 'react';
import { Video, Bell, Search, Flame, Radio } from 'lucide-react';

interface NavbarProps {
  onAdClick: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdClick, unreadCount = 5 }) => {
  const categories = [
    { label: '🔥 Trending', active: true },
    { label: '🔴 LIVE Now', active: false },
    { label: '💋 Private Cam', active: false },
    { label: '⭐ VIP 4K', active: false },
    { label: '💕 Dating Call', active: false }
  ];

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 text-white select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={onAdClick}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <Video className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-lg tracking-tight leading-none bg-gradient-to-r from-white via-rose-100 to-pink-300 bg-clip-text text-transparent">
                STREAMLIVE <span className="text-rose-500 text-xs px-1.5 py-0.5 rounded bg-rose-500/20 font-bold border border-rose-500/30">VIP</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>24,892 Online Now</span>
              </div>
            </div>
          </div>

          {/* Search bar simulation */}
          <div 
            id="navbar-search"
            onClick={onAdClick}
            className="hidden md:flex flex-1 max-w-md items-center bg-neutral-900/90 border border-neutral-800 rounded-full px-4 py-2 cursor-pointer hover:border-neutral-700 transition-colors"
          >
            <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
            <span className="text-neutral-400 text-sm truncate">Search private live streams, models, hot videos...</span>
            <span className="ml-auto bg-rose-600/20 text-rose-400 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Hot
            </span>
          </div>

          {/* Live Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-live-btn"
              onClick={onAdClick}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-full shadow-lg shadow-rose-600/40 transition-all active:scale-95 animate-pulse cursor-pointer"
            >
              <Radio className="w-4 h-4" />
              <span>LIVE CAM</span>
            </button>

            <button
              id="header-notification-btn"
              onClick={onAdClick}
              className="relative p-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-[11px] font-bold text-white rounded-full flex items-center justify-center border-2 border-neutral-950 animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              id={`category-pill-${idx}`}
              onClick={onAdClick}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                cat.active
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

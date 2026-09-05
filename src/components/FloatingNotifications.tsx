import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, MessageCircle, X, Sparkles } from 'lucide-react';
import { NotificationItem } from '../types';

interface FloatingNotificationsProps {
  items: NotificationItem[];
  onAdClick: () => void;
}

export const FloatingNotifications: React.FC<FloatingNotificationsProps> = ({ items, onAdClick }) => {
  // Stagger display of notifications: one pops up after another
  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    items.forEach((item, index) => {
      const delay = 500 + index * 800; // 0.5s, 1.3s, 2.1s, 2.9s, 3.7s
      const timer = setTimeout(() => {
        setVisibleIds((prev) => [...prev, item.id]);
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [items]);

  const activeNotifications = items.filter((item) => visibleIds.includes(item.id));

  return (
    <aside aria-label="Live video call notifications" className="fixed top-16 sm:top-20 right-3 sm:right-6 z-45 max-w-sm w-[calc(100%-1.5rem)] pointer-events-none flex flex-col gap-2.5">
      <AnimatePresence>
        {activeNotifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            id={`floating-notification-${notif.id}`}
            initial={{ opacity: 0, x: 50, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={onAdClick}
            className="pointer-events-auto w-full bg-neutral-900/95 backdrop-blur-md border border-rose-500/40 rounded-2xl p-3 shadow-2xl shadow-rose-950/50 cursor-pointer hover:border-rose-400 hover:bg-neutral-850 transition-all hover:scale-102 select-none group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Private Call Request
                </span>
              </div>

              <span className="text-[10px] text-neutral-400 font-medium">
                {notif.timeAgo}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Girl Avatar with online indicator */}
              <div className="relative shrink-0">
                <img
                  src={notif.avatar}
                  alt={notif.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                  }}
                  className="w-11 h-11 rounded-full object-cover border-2 border-rose-500 shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                    {notif.name}
                  </h4>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                    FREE NOW
                  </span>
                </div>

                <p className="text-xs text-neutral-200 line-clamp-1 font-medium mt-0.5">
                  {notif.message}
                </p>
              </div>

              {/* Quick Action Button */}
              <button
                id={`notif-btn-${notif.id}`}
                onClick={onAdClick}
                className="shrink-0 bg-gradient-to-r from-rose-600 to-pink-600 group-hover:from-rose-500 group-hover:to-pink-500 text-white text-[11px] font-bold py-1.5 px-3 rounded-xl shadow-md shadow-rose-600/40 flex items-center gap-1 active:scale-95 transition-all"
              >
                <Video className="w-3 h-3 fill-current" />
                <span>Call</span>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
};

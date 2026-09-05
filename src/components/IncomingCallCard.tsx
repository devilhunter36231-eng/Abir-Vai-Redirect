import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneCall, Video, Star, ShieldCheck, Heart, Sparkles, X } from 'lucide-react';
import { CallingCardData } from '../types';

interface IncomingCallCardProps {
  data: CallingCardData;
  visible: boolean;
  onAdClick: () => void;
}

export const IncomingCallCard: React.FC<IncomingCallCardProps> = ({ data, visible, onAdClick }) => {
  const [avatarSrc, setAvatarSrc] = useState(data.avatar);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div 
        id="incoming-call-overlay-container"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm cursor-pointer"
        onClick={onAdClick}
      >
        {/* Continuous Zoom In / Zoom Out Breathing Animation */}
        <motion.div
          id="incoming-call-card"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            y: 0
          }}
          transition={{
            opacity: { duration: 0.4 },
            y: { duration: 0.4 },
            scale: {
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut'
            }
          }}
          onClick={onAdClick}
          className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-rose-500/70 rounded-3xl p-6 shadow-2xl shadow-rose-600/50 text-white overflow-hidden"
        >
          {/* Glowing ambient background spots */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close/Skip button (also redirects to ad) */}
          <button
            id="call-card-close-btn"
            onClick={onAdClick}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Call Header Indicator */}
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold px-3.5 py-1 rounded-full mb-3 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>INCOMING PRIVATE VIDEO CALL...</span>
            </div>

            {/* Profile Avatar with pulsating rings */}
            <div className="relative my-3">
              {/* Pulsing ring 1 */}
              <div className="absolute -inset-3 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
              {/* Pulsing ring 2 */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 blur-sm pointer-events-none" />

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-rose-500 to-amber-400 shadow-xl shadow-rose-600/40">
                <img
                  src={avatarSrc}
                  alt={data.name}
                  onError={() => setAvatarSrc(data.fallbackAvatar)}
                  className="w-full h-full object-cover rounded-full bg-neutral-900"
                />
                <span className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 border-2 border-neutral-950 rounded-full flex items-center justify-center shadow">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                </span>
              </div>
            </div>

            {/* Girl Name and Badges */}
            <div className="flex items-center gap-1.5 mt-1">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {data.name}
              </h3>
              <ShieldCheck className="w-5 h-5 text-sky-400 fill-sky-400/20" />
            </div>

            <p className="text-xs text-rose-300 font-semibold mt-0.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {data.subtitle}
            </p>

            <div className="flex items-center gap-3 text-xs text-neutral-400 mt-2">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3 h-3 fill-amber-400" /> {data.rating}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Online & Ready</span>
            </div>

            {/* Quick message quote */}
            <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 my-4 text-xs text-neutral-200 text-center shadow-inner">
              <p className="italic">"Hey handsome! I'm completely free right now. Accept my call or message me directly below 💕"</p>
            </div>

            {/* Social Contact Buttons (WhatsApp, Telegram, Facebook) */}
            <div className="w-full mb-4">
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">
                Connect via Social Messenger:
              </p>

              <div className="grid grid-cols-3 gap-2.5">
                {/* WhatsApp */}
                <button
                  id="call-card-whatsapp-btn"
                  onClick={onAdClick}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/40"
                >
                  <svg className="w-6 h-6 fill-current text-[#25D366]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span className="text-[11px] font-bold">WhatsApp</span>
                </button>

                {/* Telegram */}
                <button
                  id="call-card-telegram-btn"
                  onClick={onAdClick}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-400 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-sky-950/40"
                >
                  <svg className="w-6 h-6 fill-current text-[#229ED9]" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.198 1.006.128.832.942z"/>
                  </svg>
                  <span className="text-[11px] font-bold">Telegram</span>
                </button>

                {/* Facebook */}
                <button
                  id="call-card-facebook-btn"
                  onClick={onAdClick}
                  className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-400 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-blue-950/40"
                >
                  <svg className="w-6 h-6 fill-current text-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-[11px] font-bold">Facebook</span>
                </button>
              </div>
            </div>

            {/* Main Accept Video Call and Decline Buttons */}
            <div className="w-full flex items-center gap-3">
              {/* Decline (still triggers ad) */}
              <button
                id="call-decline-btn"
                onClick={onAdClick}
                className="flex-1 py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-rose-500 rotate-[135deg]" />
                <span>Decline</span>
              </button>

              {/* Accept Video Call */}
              <button
                id="call-accept-btn"
                onClick={onAdClick}
                className="flex-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/40 animate-pulse transition-all transform hover:scale-102 active:scale-95 cursor-pointer"
              >
                <Video className="w-5 h-5 fill-white" />
                <span>ACCEPT VIDEO CALL</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export interface VideoItem {
  id: string;
  title: string;
  rawTitle?: string;
  image: string;
  fallbackImage: string;
  duration: string;
  views: string;
  isLive?: boolean;
  liveViewers?: string;
  creatorName: string;
  creatorAvatar: string;
  uploadedTime: string;
  qualityBadge?: string;
}

export interface NotificationItem {
  id: string;
  name: string;
  avatar: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  status: 'online' | 'calling' | 'active';
}

export interface CallingCardData {
  name: string;
  subtitle: string;
  avatar: string;
  fallbackAvatar: string;
  rating: string;
  distance: string;
}

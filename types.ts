export interface PrivacySettings {
  enableExtension: boolean;
  hoverToReveal: boolean;
  
  // Sidebar (Chat List)
  sidebarBlurName: boolean;
  sidebarBlurPhoto: boolean;
  sidebarBlurPreview: boolean; // Last message preview
  
  // Active Chat
  chatBlurName: boolean;
  chatBlurPhoto: boolean;
  chatBlurMessage: boolean;
  chatBlurMedia: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export interface Message {
  id: string;
  text?: string;
  image?: string;
  sender: 'me' | 'them';
  time: string;
  isMedia?: boolean;
}
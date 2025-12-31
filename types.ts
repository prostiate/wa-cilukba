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
  chatBlurGroupParticipant: boolean; // New: Blur participant names in groups
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup?: boolean; // New: Identify if it's a group
}

export interface Message {
  id: string;
  text?: string;
  image?: string;
  sender: 'me' | 'them';
  senderName?: string; // New: For group chats
  senderColor?: string; // New: For group chats
  time: string;
  isMedia?: boolean;
}
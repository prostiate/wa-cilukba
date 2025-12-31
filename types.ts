export interface PrivacySettings {
  enableExtension: boolean;
  blurMessages: boolean;
  blurPreviews: boolean;
  blurMedia: boolean;
  blurProfilePhotos: boolean;
  blurNames: boolean;
  hoverToReveal: boolean;
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

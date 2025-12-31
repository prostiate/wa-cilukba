import React from 'react';
import { usePrivacy } from '../../context/PrivacyContext';

interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ src, size = 'md' }) => {
  const { settings } = usePrivacy();

  const isBlurred = settings.enableExtension && settings.blurProfilePhotos;
  const canHover = settings.enableExtension && settings.hoverToReveal;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative overflow-hidden rounded-full flex-shrink-0 bg-gray-300 ${sizeClasses[size]}`}>
      <img
        src={src}
        alt="Avatar"
        className={`w-full h-full object-cover transition-all duration-300 
          ${isBlurred ? 'filter blur-[5px]' : ''} 
          ${isBlurred && canHover ? 'hover:blur-0' : ''}`}
      />
    </div>
  );
};

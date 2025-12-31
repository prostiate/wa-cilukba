import React from 'react';
import { usePrivacy } from '../../context/PrivacyContext';

interface BlurTextProps {
  children: React.ReactNode;
  active: boolean; // Is the specific blur type active?
  intensity?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({ children, active, intensity = 'sm', className = '' }) => {
  const { settings } = usePrivacy();
  
  const isBlurred = settings.enableExtension && active;
  const canHover = settings.enableExtension && settings.hoverToReveal;

  const blurClass = {
    sm: 'blur-[4px]',
    md: 'blur-[6px]',
    lg: 'blur-[8px]',
  }[intensity];

  return (
    <span 
      className={`transition-all duration-300 inline-block ${className}
        ${isBlurred ? `filter ${blurClass} select-none` : ''} 
        ${isBlurred && canHover ? 'hover:blur-0 hover:select-auto' : ''}
      `}
    >
      {children}
    </span>
  );
};

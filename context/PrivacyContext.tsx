import React, { createContext, useContext, useState, useEffect } from 'react';
import { PrivacySettings } from '../types';

interface PrivacyContextType {
  settings: PrivacySettings;
  updateSetting: (key: keyof PrivacySettings, value: boolean) => void;
  toggleMasterSwitch: () => void;
}

const defaultSettings: PrivacySettings = {
  enableExtension: true,
  hoverToReveal: true,
  
  // Sidebar defaults
  sidebarBlurName: false,
  sidebarBlurPhoto: true,
  sidebarBlurPreview: true,

  // Chat defaults
  chatBlurName: false,
  chatBlurPhoto: true,
  chatBlurMessage: true,
  chatBlurMedia: true,
};

const PrivacyContext = createContext<PrivacyContextType | undefined>(undefined);

export const PrivacyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<PrivacySettings>(defaultSettings);

  const updateSetting = (key: keyof PrivacySettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMasterSwitch = () => {
    setSettings((prev) => ({ ...prev, enableExtension: !prev.enableExtension }));
  };

  // Keyboard shortcut listener for Alt+X
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === 'KeyX') {
        toggleMasterSwitch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PrivacyContext.Provider value={{ settings, updateSetting, toggleMasterSwitch }}>
      {children}
    </PrivacyContext.Provider>
  );
};

export const usePrivacy = () => {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error('usePrivacy must be used within a PrivacyProvider');
  }
  return context;
};
import React from 'react';
import { usePrivacy } from '../context/PrivacyContext';
import { Toggle } from './ui/Toggle';
import { Shield, ShieldAlert, Settings, EyeOff } from 'lucide-react';

export const ControlPanel: React.FC = () => {
  const { settings, updateSetting, toggleMasterSwitch } = usePrivacy();

  return (
    <div className="w-full h-full bg-white border-l border-gray-200 shadow-xl flex flex-col">
      <div className="p-6 bg-teal-600 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-6 h-6" />
          <h2 className="text-xl font-bold">Privacy Extension</h2>
        </div>
        <p className="text-teal-100 text-sm">For WhatsApp Web</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Global Toggle */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <Toggle 
                label="Enable Privacy Features" 
                description="Master switch (Alt+X)"
                checked={settings.enableExtension} 
                onChange={toggleMasterSwitch} 
            />
        </div>

        {/* Granular Controls */}
        <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message Content</h3>
            <Toggle 
                label="Blur Recent Messages" 
                checked={settings.blurMessages} 
                onChange={(v) => updateSetting('blurMessages', v)}
                disabled={!settings.enableExtension}
            />
            <Toggle 
                label="Blur Message Previews" 
                description="Left sidebar text"
                checked={settings.blurPreviews} 
                onChange={(v) => updateSetting('blurPreviews', v)}
                disabled={!settings.enableExtension}
            />
            <Toggle 
                label="Blur Media" 
                description="Images, Videos, Stickers"
                checked={settings.blurMedia} 
                onChange={(v) => updateSetting('blurMedia', v)}
                disabled={!settings.enableExtension}
            />
        </div>

        <div className="border-t border-gray-100 my-2"></div>

        <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact Details</h3>
            <Toggle 
                label="Blur Profile Photos" 
                checked={settings.blurProfilePhotos} 
                onChange={(v) => updateSetting('blurProfilePhotos', v)}
                disabled={!settings.enableExtension}
            />
             <Toggle 
                label="Blur Contact Names" 
                checked={settings.blurNames} 
                onChange={(v) => updateSetting('blurNames', v)}
                disabled={!settings.enableExtension}
            />
        </div>

        <div className="border-t border-gray-100 my-2"></div>

        <div className="space-y-1">
             <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Interactivity</h3>
             <Toggle 
                label="Hover to Reveal" 
                description="Temporarily unblur on mouseover"
                checked={settings.hoverToReveal} 
                onChange={(v) => updateSetting('hoverToReveal', v)}
                disabled={!settings.enableExtension}
            />
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <span>v2.4.0 • MIT License</span>
        <button className="text-teal-600 hover:underline flex items-center space-x-1">
            <Settings className="w-3 h-3" />
            <span>More Settings</span>
        </button>
      </div>
    </div>
  );
};

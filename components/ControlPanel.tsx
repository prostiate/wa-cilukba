import React from "react";
import { usePrivacy } from "../context/PrivacyContext";
import { Toggle } from "./ui/Toggle";
import {
  Shield,
  LayoutPanelLeft,
  MessageSquare,
  MousePointerClick,
  Github,
} from "lucide-react";

export const ControlPanel: React.FC = () => {
  const { settings, updateSetting, toggleMasterSwitch } = usePrivacy();

  return (
    <div className="w-full h-full bg-white border-l border-gray-200 shadow-xl flex flex-col">
      <div className="p-6 bg-teal-600 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-6 h-6" />
          <h2 className="text-xl font-bold">WA Cilukba</h2>
        </div>
        <p className="text-teal-100 text-sm">Peek-a-boo for WhatsApp Web</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Global Toggle */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <Toggle
            label="Enable Privacy Features"
            description="Master switch (Alt+X)"
            checked={settings.enableExtension}
            onChange={toggleMasterSwitch}
          />
        </div>

        {/* SECTION: LEFT SIDEBAR */}
        <div>
          <div className="flex items-center space-x-2 mb-3 text-gray-500">
            <LayoutPanelLeft className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Left Sidebar (Chat List)
            </h3>
          </div>
          <div className="space-y-1 pl-2 border-l-2 border-gray-100">
            <Toggle
              label="Blur Contact Names"
              checked={settings.sidebarBlurName}
              onChange={(v) => updateSetting("sidebarBlurName", v)}
              disabled={!settings.enableExtension}
            />
            <Toggle
              label="Blur Profile Photos"
              checked={settings.sidebarBlurPhoto}
              onChange={(v) => updateSetting("sidebarBlurPhoto", v)}
              disabled={!settings.enableExtension}
            />
            <Toggle
              label="Blur Last Message"
              description="Hide message previews"
              checked={settings.sidebarBlurPreview}
              onChange={(v) => updateSetting("sidebarBlurPreview", v)}
              disabled={!settings.enableExtension}
            />
          </div>
        </div>

        {/* SECTION: ACTIVE CHAT */}
        <div>
          <div className="flex items-center space-x-2 mb-3 text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Active Chat Content
            </h3>
          </div>
          <div className="space-y-1 pl-2 border-l-2 border-gray-100">
            <Toggle
              label="Blur Messages"
              checked={settings.chatBlurMessage}
              onChange={(v) => updateSetting("chatBlurMessage", v)}
              disabled={!settings.enableExtension}
            />
            <Toggle
              label="Blur Media"
              description="Images, Videos, Stickers"
              checked={settings.chatBlurMedia}
              onChange={(v) => updateSetting("chatBlurMedia", v)}
              disabled={!settings.enableExtension}
            />
            <Toggle
              label="Blur Header Name"
              description="Chat Title"
              checked={settings.chatBlurName}
              onChange={(v) => updateSetting("chatBlurName", v)}
              disabled={!settings.enableExtension}
            />
            <Toggle
              label="Blur Header Photo"
              description="Profile/Group Icon"
              checked={settings.chatBlurPhoto}
              onChange={(v) => updateSetting("chatBlurPhoto", v)}
              disabled={!settings.enableExtension}
            />
            <Toggle
              label="Blur Group Participants"
              description="Names inside chat bubbles"
              checked={settings.chatBlurGroupParticipant}
              onChange={(v) => updateSetting("chatBlurGroupParticipant", v)}
              disabled={!settings.enableExtension}
            />
          </div>
        </div>

        {/* SECTION: INTERACTIVITY */}
        <div>
          <div className="flex items-center space-x-2 mb-3 text-gray-500">
            <MousePointerClick className="w-4 h-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Interactivity
            </h3>
          </div>
          <div className="space-y-1 pl-2 border-l-2 border-gray-100">
            <Toggle
              label="Hover to Reveal"
              description="Temporarily unblur on mouseover"
              checked={settings.hoverToReveal}
              onChange={(v) => updateSetting("hoverToReveal", v)}
              disabled={!settings.enableExtension}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span>v1.0.0 • MIT License</span>
          <span>•</span>
          <a
            href="https://github.com/prostiate/wa-cilukba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-teal-600 transition-colors font-semibold"
          >
            <Github size={12} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

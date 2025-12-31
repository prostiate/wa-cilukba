import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';

export const MockWhatsAppLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full max-w-[1600px] mx-auto overflow-hidden shadow-2xl rounded-lg bg-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <ChatArea />
    </div>
  );
};

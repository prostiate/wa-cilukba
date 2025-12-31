import React, { useState } from 'react';
import { PrivacyProvider } from './context/PrivacyContext';
import { MockWhatsAppLayout } from './components/WhatsAppMock/Layout';
import { ControlPanel } from './components/ControlPanel';
import { Menu, X, Download } from 'lucide-react';
import { downloadExtension } from './utils/extensionGenerator';

const AppContent: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleDownload = () => {
    // In a real scenario, this might show a modal with instructions
    if (confirm("Download the Extension Source Code?\n\nTo install:\n1. Unzip the file\n2. Go to chrome://extensions\n3. Enable 'Developer Mode'\n4. Click 'Load Unpacked'")) {
        downloadExtension();
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 relative">
      {/* Marketing Header */}
      <header className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md z-50 shrink-0">
        <div className="flex items-center space-x-3">
            <div className="bg-teal-500 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <div>
                <h1 className="text-xl font-bold tracking-tight">WhatsApp Privacy Extension</h1>
                <p className="text-xs text-gray-400">Interactive Simulator</p>
            </div>
        </div>
        
        <div className="flex items-center space-x-4">
             <button 
                onClick={handleDownload}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md transition-colors font-medium text-sm shadow-lg border border-teal-500"
            >
                <Download className="w-4 h-4" />
                <span>Download Extension</span>
            </button>
            <button 
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-slate-700 rounded-md transition-colors md:hidden"
            >
                {isSidebarOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Mock App Container */}
        <div className="flex-1 p-4 md:p-8 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
            <div className="w-full h-full max-w-[1400px] shadow-2xl rounded-xl overflow-hidden border border-slate-700 ring-1 ring-white/10 relative">
                <div className="absolute top-4 left-0 right-0 text-center z-50 pointer-events-none md:hidden">
                    <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        Best viewed on Desktop
                    </span>
                </div>
                <MockWhatsAppLayout />
            </div>
        </div>

        {/* Floating/Fixed Extension Controls (Sidebar) */}
        <div 
            className={`
                fixed inset-y-0 right-0 w-80 bg-white transform transition-transform duration-300 ease-in-out z-40 shadow-2xl
                md:relative md:translate-x-0 md:w-96 md:shadow-none md:border-l border-gray-200
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            <div className="h-full pt-16 md:pt-0"> {/* Padding top on mobile for header */}
                <ControlPanel />
            </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
                onClick={() => setSidebarOpen(false)}
            />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <PrivacyProvider>
      <AppContent />
    </PrivacyProvider>
  );
};

export default App;

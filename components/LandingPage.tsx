import React from 'react';
import { Download, Play, Shield, Eye, Lock, Zap, CheckCircle2 } from 'lucide-react';
import { downloadExtension } from '../utils/extensionGenerator';

interface LandingPageProps {
  onStartDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDemo }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-teal-500 selection:text-white overflow-y-auto">
      {/* Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-teal-500 p-1.5 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">WA Privacy</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={onStartDemo} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Live Demo
              </button>
              <button 
                onClick={() => downloadExtension()}
                className="bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            v3.0 Now Available with Granular Controls
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Privacy for WhatsApp Web <br /> Made Simple.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Blur messages, names, and photos automatically. Reveal them only when you hover. 
            Keep your chats private in public spaces.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onStartDemo}
              className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-teal-900/20 flex items-center justify-center gap-2 group"
            >
              <Play className="w-5 h-5 fill-current" />
              Try Live Demo
            </button>
            <button 
              onClick={() => downloadExtension()}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all border border-slate-700 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Extension
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Compatible with Chrome, Edge, Brave, and Firefox (via Manual Install).
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-800/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intelligent Blurring</h3>
              <p className="text-gray-400 leading-relaxed">
                Automatically detects and blurs sensitive content. You decide whether to hide names, photos, or message text.
              </p>
            </div>
             {/* Feature 2 */}
             <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Granular Control</h3>
              <p className="text-gray-400 leading-relaxed">
                Separate settings for the sidebar contact list and the active chat window. Customize your privacy level perfectly.
              </p>
            </div>
             {/* Feature 3 */}
             <div className="bg-slate-900 p-8 rounded-2xl border border-white/5 hover:border-teal-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Hover to Reveal</h3>
              <p className="text-gray-400 leading-relaxed">
                Need to see a message? Just hover your mouse over it. It blurs again instantly when you move away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section (What user asked for) */}
      <section className="py-24">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-16">Why use this extension?</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-lg font-semibold text-gray-400 mb-6 uppercase tracking-wider">Before</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="w-6 h-6 rounded-full border border-red-500/50 flex items-center justify-center text-red-500"><span className="text-xs">✕</span></div>
                            <span>Messages visible to anyone passing by</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="w-6 h-6 rounded-full border border-red-500/50 flex items-center justify-center text-red-500"><span className="text-xs">✕</span></div>
                            <span>Contact names exposed in public</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <div className="w-6 h-6 rounded-full border border-red-500/50 flex items-center justify-center text-red-500"><span className="text-xs">✕</span></div>
                            <span>Private photos on full display</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-teal-400 mb-6 uppercase tracking-wider">After</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-white">
                            <CheckCircle2 className="w-6 h-6 text-teal-500" />
                            <span>Blur Recent Messages & Media</span>
                        </div>
                        <div className="flex items-center gap-3 text-white">
                            <CheckCircle2 className="w-6 h-6 text-teal-500" />
                            <span>Blur Profile Photos & Names</span>
                        </div>
                         <div className="flex items-center gap-3 text-white">
                            <CheckCircle2 className="w-6 h-6 text-teal-500" />
                            <span>Separate controls for Sidebar vs Chat</span>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} WhatsApp Privacy Extension. Open Source (MIT).</p>
      </footer>
    </div>
  );
};
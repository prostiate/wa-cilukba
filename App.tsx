import React, { useState, useEffect } from "react";
import { PrivacyProvider } from "./context/PrivacyContext";
import { MockWhatsAppLayout } from "./components/WhatsAppMock/Layout";
import { ControlPanel } from "./components/ControlPanel";
import {
  Download,
  Shield,
  Eye,
  Lock,
  Zap,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
  Menu,
  X,
  ArrowDown,
} from "lucide-react";
import { downloadExtension } from "./utils/extensionGenerator";

// Theme Context Helper
type Theme = "light" | "dark" | "system";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Force scroll to top on refresh/load
  useEffect(() => {
    window.scrollTo(0, 0);
    // Some browsers might need a slight delay if they are restoring scroll position
    const timeout = setTimeout(() => window.scrollTo(0, 0), 0);
    return () => clearTimeout(timeout);
  }, []);

  const handleDownload = () => {
    if (
      confirm(
        "Download WA Cilukba v1.0.0?\n\n1. Unzip the file\n2. Go to chrome://extensions\n3. Enable 'Developer Mode'\n4. Click 'Load Unpacked'"
      )
    ) {
      downloadExtension();
    }
  };

  const scrollToDemo = () => {
    document
      .getElementById("demo-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PrivacyProvider>
      <div
        className={`min-h-screen font-sans transition-colors duration-300 dark:bg-slate-900 dark:text-white bg-gray-50 text-slate-900`}
      >
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="bg-teal-600 p-1.5 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight">
                  WA Cilukba
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <div className="hidden sm:flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                  <button
                    onClick={() => setTheme("light")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "light"
                        ? "bg-white dark:bg-slate-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme("system")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "system"
                        ? "bg-white dark:bg-slate-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTheme("dark")}
                    className={`p-1.5 rounded-md transition-colors ${
                      theme === "dark"
                        ? "bg-white dark:bg-slate-600 shadow-sm"
                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleDownload}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md transition-colors md:hidden"
                >
                  {isSidebarOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              v1.0.0 Stable Release
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Privacy for WhatsApp Web <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-400">
                Peek-a-boo!
              </span>{" "}
              (Cilukba)
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              "Cilukba" means Peek-a-boo in Indonesian. <br />
              We hide your chats until you hover over them. Secure your screen
              in public spaces.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={scrollToDemo}
                className="w-full sm:w-auto px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 group"
              >
                Try Live Simulator
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-700 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Extension
              </button>
            </div>
          </div>
        </section>

        {/* Demo / Simulator Section */}
        <section
          id="demo-section"
          className="py-12 bg-gray-100 dark:bg-slate-900/50 border-y border-gray-200 dark:border-white/5 relative"
        >
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 h-[800px] relative">
              {/* Simulator Container */}
              <div className="flex-1 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700 relative bg-white">
                <div className="absolute top-4 left-0 right-0 text-center z-50 pointer-events-none md:hidden">
                  <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    Best viewed on Desktop
                  </span>
                </div>
                <MockWhatsAppLayout />
              </div>

              {/* Controls Sidebar (Desktop) / Mobile Drawer */}
              <div
                className={`
                        fixed inset-y-0 right-0 w-80 bg-white transform transition-transform duration-300 ease-in-out z-40 shadow-2xl
                        md:relative md:translate-x-0 md:w-80 md:shadow-none md:rounded-2xl md:overflow-hidden md:border border-gray-200 dark:border-slate-700
                        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
                    `}
              >
                <div className="h-full pt-16 md:pt-0">
                  <ControlPanel />
                </div>
              </div>
            </div>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-30 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Why choose WA Cilukba?
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Simple, effective privacy for your daily communications.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 hover:border-teal-500/30 transition-colors group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Eye className="w-6 h-6 text-teal-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Intelligent Blurring</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Automatically detects and blurs sensitive content like photos,
                  names, and messages.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 hover:border-teal-500/30 transition-colors group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Lock className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Granular Control</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Toggle blurring for specific elements. Keep the chat list
                  visible while hiding the active conversation.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 hover:border-teal-500/30 transition-colors group">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">Hover to Reveal</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Just like "Cilukba" (Peek-a-boo), hover your mouse to
                  temporarily reveal the content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-white/10 text-center text-gray-500 text-sm bg-gray-50 dark:bg-slate-900">
          <p>
            &copy; {new Date().getFullYear()} WA Cilukba. Open Source (MIT).
            Built with ❤️ for privacy.
          </p>
        </footer>
      </div>
    </PrivacyProvider>
  );
};

export default App;

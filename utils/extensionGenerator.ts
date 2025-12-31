import JSZip from 'jszip';

export const downloadExtension = async () => {
  const zip = new JSZip();

  // 1. MANIFEST.JSON
  zip.file("manifest.json", JSON.stringify({
    "manifest_version": 3,
    "name": "WhatsApp Privacy Extension",
    "version": "1.0",
    "description": "Privacy tools for WhatsApp Web. Generated from the Simulator.",
    "permissions": ["storage", "activeTab", "scripting"],
    "host_permissions": ["https://web.whatsapp.com/*"],
    "action": {
      "default_popup": "popup.html",
      "default_icon": "icon.png"
    },
    "content_scripts": [
      {
        "matches": ["https://web.whatsapp.com/*"],
        "js": ["content.js"],
        "css": ["styles.css"]
      }
    ]
  }, null, 2));

  // 2. STYLES.CSS
  zip.file("styles.css", `
    /* --- Privacy Extension Styles --- */
    
    /* Global Blur Helper */
    .wa-blur-effect {
        filter: blur(6px) !important;
        transition: filter 0.2s ease !important;
    }
    
    body.wa-hover-reveal .wa-blur-effect:hover {
        filter: blur(0px) !important;
    }

    /* --- SIDEBAR SELECTORS (Heuristics) --- */
    
    /* Sidebar Names: Titles inside Chat List */
    body.wa-blur-sidebar-name div[aria-label="Chat list"] span[title] {
        filter: blur(5px) !important;
        transition: 0.3s;
    }
    body.wa-hover-reveal.wa-blur-sidebar-name div[aria-label="Chat list"] span[title]:hover {
        filter: none !important;
    }

    /* Sidebar Photos: Images inside Chat List */
    body.wa-blur-sidebar-photo div[aria-label="Chat list"] img {
        filter: blur(5px) !important;
        transition: 0.3s;
    }
    body.wa-hover-reveal.wa-blur-sidebar-photo div[aria-label="Chat list"] img:hover {
        filter: none !important;
    }

    /* Sidebar Preview: Secondary text in chat list rows */
    body.wa-blur-sidebar-preview div[aria-label="Chat list"] span[dir="auto"] {
        filter: blur(4px) !important;
        transition: 0.3s;
    }
     body.wa-hover-reveal.wa-blur-sidebar-preview div[aria-label="Chat list"] span[dir="auto"]:hover {
        filter: none !important;
    }


    /* --- ACTIVE CHAT SELECTORS (Heuristics) --- */

    /* Chat Messages: Incoming/Outgoing bubbles */
    body.wa-blur-chat-message .message-in span.selectable-text, 
    body.wa-blur-chat-message .message-out span.selectable-text {
        filter: blur(5px) !important;
        transition: 0.3s;
    }
    body.wa-hover-reveal.wa-blur-chat-message .message-in:hover span.selectable-text, 
    body.wa-hover-reveal.wa-blur-chat-message .message-out:hover span.selectable-text {
        filter: none !important;
    }

    /* Chat Media: Images/Videos */
    body.wa-blur-chat-media div[role="application"] img, 
    body.wa-blur-chat-media div[role="application"] video {
        filter: blur(12px) !important;
        transition: 0.3s;
    }
    body.wa-hover-reveal.wa-blur-chat-media div[role="application"] img:hover,
    body.wa-hover-reveal.wa-blur-chat-media div[role="application"] video:hover {
        filter: none !important;
    }

    /* Chat Header: Name */
    body.wa-blur-chat-name header span[title] {
        filter: blur(5px) !important;
        transition: 0.3s;
    }
    body.wa-hover-reveal.wa-blur-chat-name header span[title]:hover {
        filter: none !important;
    }

    /* Chat Header: Photo */
    body.wa-blur-chat-photo header img {
        filter: blur(5px) !important;
        transition: 0.3s;
    }
    body.wa-hover-reveal.wa-blur-chat-photo header img:hover {
        filter: none !important;
    }
  `);

  // 3. CONTENT.JS
  zip.file("content.js", `
    console.log("WhatsApp Privacy Extension: Active");

    const defaultState = {
      enableExtension: true,
      hoverToReveal: true,
      sidebarBlurName: false,
      sidebarBlurPhoto: true,
      sidebarBlurPreview: true,
      chatBlurName: false,
      chatBlurPhoto: true,
      chatBlurMessage: true,
      chatBlurMedia: true
    };

    let currentState = { ...defaultState };

    function updateDOM() {
      const b = document.body.classList;
      const s = currentState;
      const on = s.enableExtension;

      // Toggle Classes based on state
      b.toggle('wa-hover-reveal', on && s.hoverToReveal);
      
      b.toggle('wa-blur-sidebar-name', on && s.sidebarBlurName);
      b.toggle('wa-blur-sidebar-photo', on && s.sidebarBlurPhoto);
      b.toggle('wa-blur-sidebar-preview', on && s.sidebarBlurPreview);
      
      b.toggle('wa-blur-chat-name', on && s.chatBlurName);
      b.toggle('wa-blur-chat-photo', on && s.chatBlurPhoto);
      b.toggle('wa-blur-chat-message', on && s.chatBlurMessage);
      b.toggle('wa-blur-chat-media', on && s.chatBlurMedia);
    }

    // Initialize
    chrome.storage.local.get(['privacySettings'], (result) => {
      if (result.privacySettings) {
        Object.assign(currentState, result.privacySettings);
      }
      updateDOM();
    });

    // Listen for changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.privacySettings) {
        Object.assign(currentState, changes.privacySettings.newValue);
        updateDOM();
      }
    });

    // Master Toggle Shortcut
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.code === 'KeyX') {
             currentState.enableExtension = !currentState.enableExtension;
             chrome.storage.local.set({ privacySettings: currentState });
             updateDOM();
        }
    });
  `);

  // 4. POPUP.HTML (Tailored to match React UI)
  zip.file("popup.html", `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body { width: 340px; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f9fafb; }
            
            /* Header */
            .header { background: #0d9488; color: white; padding: 16px; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header svg { margin-right: 8px; }
            .header h1 { margin: 0; font-size: 16px; font-weight: 600; }
            .header p { margin: 0; font-size: 11px; opacity: 0.8; margin-left: auto; }

            /* Content */
            .content { padding: 16px; display: flex; flex-col; gap: 16px; }

            /* Card */
            .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
            .card-header { background: #f3f4f6; padding: 8px 12px; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; }
            .card-body { padding: 4px 0; }

            /* Toggle Row */
            .row { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid #f3f4f6; }
            .row:last-child { border-bottom: none; }
            .row-text { display: flex; flex-direction: column; }
            .label { font-size: 13px; color: #1f2937; font-weight: 500; }
            .sublabel { font-size: 11px; color: #9ca3af; margin-top: 2px; }

            /* Switch */
            .switch { position: relative; display: inline-block; width: 36px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e5e7eb; transition: .4s; border-radius: 34px; }
            .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
            input:checked + .slider { background-color: #0d9488; }
            input:checked + .slider:before { transform: translateX(16px); }
            
            /* Master Switch Special Styling */
            .master-card { border: 1px solid #d1d5db; background: #f0fdfa; }
        </style>
    </head>
    <body>
        <div class="header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h1>Privacy Extension</h1>
            <p>for WhatsApp Web</p>
        </div>

        <div class="content">
            <!-- Master -->
            <div class="card master-card">
                <div class="row">
                    <div class="row-text">
                        <span class="label">Enable Privacy Features</span>
                        <span class="sublabel">Master Switch (Alt+X)</span>
                    </div>
                    <label class="switch"><input type="checkbox" id="enableExtension"><span class="slider"></span></label>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="card">
                <div class="card-header">Left Sidebar (Chat List)</div>
                <div class="card-body">
                    <div class="row">
                        <span class="label">Blur Contact Names</span>
                        <label class="switch"><input type="checkbox" id="sidebarBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="row">
                        <span class="label">Blur Profile Photos</span>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPhoto"><span class="slider"></span></label>
                    </div>
                    <div class="row">
                        <div class="row-text">
                            <span class="label">Blur Last Message</span>
                            <span class="sublabel">Hide message previews</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPreview"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- Chat -->
            <div class="card">
                <div class="card-header">Active Chat Content</div>
                <div class="card-body">
                    <div class="row">
                        <span class="label">Blur Messages</span>
                        <label class="switch"><input type="checkbox" id="chatBlurMessage"><span class="slider"></span></label>
                    </div>
                    <div class="row">
                        <div class="row-text">
                            <span class="label">Blur Media</span>
                            <span class="sublabel">Images, Videos, Stickers</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurMedia"><span class="slider"></span></label>
                    </div>
                    <div class="row">
                        <span class="label">Blur Header Name</span>
                        <label class="switch"><input type="checkbox" id="chatBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="row">
                        <span class="label">Blur Header Photo</span>
                        <label class="switch"><input type="checkbox" id="chatBlurPhoto"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- Interactivity -->
            <div class="card">
                <div class="card-header">Interactivity</div>
                <div class="card-body">
                     <div class="row">
                        <div class="row-text">
                            <span class="label">Hover to Reveal</span>
                            <span class="sublabel">Temporarily unblur on mouseover</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="hoverToReveal"><span class="slider"></span></label>
                    </div>
                </div>
            </div>
        </div>
        <script src="popup.js"></script>
    </body>
    </html>
  `);

  // 5. POPUP.JS
  zip.file("popup.js", `
    const keys = [
        'enableExtension', 
        'sidebarBlurName', 'sidebarBlurPhoto', 'sidebarBlurPreview',
        'chatBlurMessage', 'chatBlurMedia', 'chatBlurName', 'chatBlurPhoto',
        'hoverToReveal'
    ];

    const defaultSettings = {
      enableExtension: true,
      hoverToReveal: true,
      sidebarBlurName: false,
      sidebarBlurPhoto: true,
      sidebarBlurPreview: true,
      chatBlurName: false,
      chatBlurPhoto: true,
      chatBlurMessage: true,
      chatBlurMedia: true
    };

    // Load
    chrome.storage.local.get(['privacySettings'], (result) => {
        const settings = result.privacySettings || defaultSettings;
        keys.forEach(key => {
            const el = document.getElementById(key);
            if(el) el.checked = settings[key];
        });
    });

    // Save
    keys.forEach(key => {
        document.getElementById(key).addEventListener('change', () => {
            const newSettings = {};
            keys.forEach(k => newSettings[k] = document.getElementById(k).checked);
            chrome.storage.local.set({ privacySettings: newSettings });
        });
    });
  `);

  // 6. ICON.PNG
  zip.file("icon.png", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", {base64: true});

  // GENERATE ZIP
  const blob = await zip.generateAsync({type:"blob"});
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "whatsapp-privacy-extension.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
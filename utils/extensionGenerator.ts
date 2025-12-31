import JSZip from 'jszip';

export const downloadExtension = async () => {
  const zip = new JSZip();

  // 1. MANIFEST.JSON
  zip.file("manifest.json", JSON.stringify({
    "manifest_version": 3,
    "name": "WhatsApp Privacy Extension",
    "version": "3.0",
    "description": "Privacy tools for WhatsApp Web. Dashboard View.",
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

  // 2. STYLES.CSS (Same logic as before)
  zip.file("styles.css", `
    /* --- Privacy Extension Styles --- */
    
    .wa-blur-effect {
        filter: blur(6px) !important;
        transition: filter 0.2s ease !important;
    }
    
    body.wa-hover-reveal .wa-blur-effect:hover {
        filter: blur(0px) !important;
    }

    /* Sidebar */
    body.wa-blur-sidebar-name div[aria-label="Chat list"] span[title] { filter: blur(5px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-sidebar-name div[aria-label="Chat list"] span[title]:hover { filter: none !important; }

    body.wa-blur-sidebar-photo div[aria-label="Chat list"] img { filter: blur(5px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-sidebar-photo div[aria-label="Chat list"] img:hover { filter: none !important; }

    body.wa-blur-sidebar-preview div[aria-label="Chat list"] span[dir="auto"] { filter: blur(4px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-sidebar-preview div[aria-label="Chat list"] span[dir="auto"]:hover { filter: none !important; }

    /* Active Chat */
    body.wa-blur-chat-message .message-in span.selectable-text, 
    body.wa-blur-chat-message .message-out span.selectable-text { filter: blur(5px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-chat-message .message-in:hover span.selectable-text, 
    body.wa-hover-reveal.wa-blur-chat-message .message-out:hover span.selectable-text { filter: none !important; }

    body.wa-blur-chat-media div[role="application"] img, 
    body.wa-blur-chat-media div[role="application"] video { filter: blur(12px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-chat-media div[role="application"] img:hover,
    body.wa-hover-reveal.wa-blur-chat-media div[role="application"] video:hover { filter: none !important; }

    body.wa-blur-chat-name header span[title] { filter: blur(5px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-chat-name header span[title]:hover { filter: none !important; }

    body.wa-blur-chat-photo header img { filter: blur(5px) !important; transition: 0.3s; }
    body.wa-hover-reveal.wa-blur-chat-photo header img:hover { filter: none !important; }
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

      b.toggle('wa-hover-reveal', on && s.hoverToReveal);
      b.toggle('wa-blur-sidebar-name', on && s.sidebarBlurName);
      b.toggle('wa-blur-sidebar-photo', on && s.sidebarBlurPhoto);
      b.toggle('wa-blur-sidebar-preview', on && s.sidebarBlurPreview);
      b.toggle('wa-blur-chat-name', on && s.chatBlurName);
      b.toggle('wa-blur-chat-photo', on && s.chatBlurPhoto);
      b.toggle('wa-blur-chat-message', on && s.chatBlurMessage);
      b.toggle('wa-blur-chat-media', on && s.chatBlurMedia);
    }

    chrome.storage.local.get(['privacySettings'], (result) => {
      if (result.privacySettings) Object.assign(currentState, result.privacySettings);
      updateDOM();
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.privacySettings) {
        Object.assign(currentState, changes.privacySettings.newValue);
        updateDOM();
      }
    });

    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.code === 'KeyX') {
             currentState.enableExtension = !currentState.enableExtension;
             chrome.storage.local.set({ privacySettings: currentState });
             updateDOM();
        }
    });
  `);

  // 4. POPUP.HTML (Updated to WIDE Dashboard Layout)
  zip.file("popup.html", `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body { 
                width: 720px; 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                background: #f0f2f5; 
                color: #374151;
            }
            
            .header { 
                background: #0d9488; 
                color: white; 
                padding: 18px 24px; 
                display: flex; 
                align-items: center; 
                box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
            }
            .header svg { margin-right: 12px; width: 24px; height: 24px; }
            .header h1 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.5px; }
            .header .badge { 
                background: rgba(255,255,255,0.2); 
                padding: 2px 8px; 
                border-radius: 12px; 
                font-size: 11px; 
                margin-left: 12px; 
                font-weight: 500;
            }
            .header .link { margin-left: auto; color: rgba(255,255,255,0.8); text-decoration: none; font-size: 12px; }

            .dashboard { 
                display: grid; 
                grid-template-columns: 180px 1fr 1fr 160px; 
                gap: 16px; 
                padding: 20px; 
                min-height: 350px;
            }

            .col { display: flex; flex-direction: column; gap: 12px; }
            
            .col-title {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: #6b7280;
                font-weight: 700;
                margin-bottom: 4px;
                padding-left: 4px;
            }

            .card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                border: 1px solid #e5e7eb;
                overflow: hidden;
            }

            /* Master Switch Area */
            .master-switch-card {
                background: #f0fdfa;
                border: 1px solid #99f6e4;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 100%;
                box-sizing: border-box;
            }
            .master-icon {
                width: 48px;
                height: 48px;
                background: #0d9488;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
                color: white;
            }
            .master-status { font-weight: 600; color: #115e59; margin-bottom: 4px; }
            .master-hint { font-size: 12px; color: #5eead4; color: #0f766e; opacity: 0.7; }

            /* List Items */
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px 16px;
                border-bottom: 1px solid #f3f4f6;
                transition: background 0.2s;
            }
            .item:last-child { border-bottom: none; }
            .item:hover { background: #f9fafb; }
            
            .item-label { font-size: 13px; font-weight: 500; color: #1f2937; }
            .item-sub { font-size: 11px; color: #9ca3af; margin-top: 1px; }

            /* Switch CSS */
            .switch { position: relative; display: inline-block; width: 36px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #e5e7eb; transition: .3s; border-radius: 34px; }
            .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
            input:checked + .slider { background-color: #0d9488; }
            input:checked + .slider:before { transform: translateX(16px); }
            input:disabled + .slider { opacity: 0.5; cursor: not-allowed; }

            .footer {
                text-align: center;
                padding: 10px;
                color: #9ca3af;
                font-size: 11px;
                border-top: 1px solid #e5e7eb;
                background: white;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h1>Privacy Extension</h1>
            <span class="badge">PRO</span>
            <a href="https://web.whatsapp.com" target="_blank" class="link">Open WhatsApp Web</a>
        </div>

        <div class="dashboard">
            <!-- Column 1: Master -->
            <div class="col">
                <div class="card master-switch-card">
                    <div class="master-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </div>
                    <div class="master-status">Global Privacy</div>
                    <div class="master-hint">Alt + X</div>
                    <div style="margin-top: 12px;">
                        <label class="switch">
                            <input type="checkbox" id="enableExtension">
                            <span class="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- Column 2: Sidebar -->
            <div class="col">
                <div class="col-title">Left Sidebar</div>
                <div class="card">
                    <div class="item">
                        <span class="item-label">Blur Names</span>
                        <label class="switch"><input type="checkbox" id="sidebarBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <span class="item-label">Blur Photos</span>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPhoto"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div>
                            <div class="item-label">Blur Preview</div>
                            <div class="item-sub">Last message text</div>
                        </div>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPreview"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- Column 3: Active Chat -->
            <div class="col">
                <div class="col-title">Active Chat</div>
                <div class="card">
                    <div class="item">
                        <span class="item-label">Blur Messages</span>
                        <label class="switch"><input type="checkbox" id="chatBlurMessage"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div>
                            <div class="item-label">Blur Media</div>
                            <div class="item-sub">Photos, Videos</div>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurMedia"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <span class="item-label">Blur Name</span>
                        <label class="switch"><input type="checkbox" id="chatBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <span class="item-label">Blur Photo</span>
                        <label class="switch"><input type="checkbox" id="chatBlurPhoto"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- Column 4: Interactivity -->
            <div class="col">
                <div class="col-title">Interactivity</div>
                <div class="card">
                    <div class="item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                        <div>
                            <div class="item-label">Hover to Reveal</div>
                            <div class="item-sub">Temporarily unblur content when hovering mouse</div>
                        </div>
                        <div style="width: 100%; display: flex; justify-content: flex-end;">
                            <label class="switch"><input type="checkbox" id="hoverToReveal"><span class="slider"></span></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            Version 3.0 • Open Source (MIT) • Offline Safe
        </div>
        <script src="popup.js"></script>
    </body>
    </html>
  `);

  // 5. POPUP.JS (Same logic)
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

    chrome.storage.local.get(['privacySettings'], (result) => {
        const settings = result.privacySettings || defaultSettings;
        keys.forEach(key => {
            const el = document.getElementById(key);
            if(el) {
                el.checked = settings[key];
                // Disable other inputs if master is off
                if(key !== 'enableExtension') {
                   el.disabled = !settings.enableExtension;
                }
            }
        });
    });

    keys.forEach(key => {
        const el = document.getElementById(key);
        if(!el) return;
        
        el.addEventListener('change', () => {
            // If master switch toggled, update UI disabled state immediately
            if(key === 'enableExtension') {
                const isEnabled = el.checked;
                keys.forEach(k => {
                    if(k !== 'enableExtension') {
                        const subEl = document.getElementById(k);
                        if(subEl) subEl.disabled = !isEnabled;
                    }
                });
            }

            const newSettings = {};
            keys.forEach(k => {
                const kEl = document.getElementById(k);
                if(kEl) newSettings[k] = kEl.checked;
            });
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
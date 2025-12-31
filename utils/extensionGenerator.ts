import JSZip from 'jszip';

export const downloadExtension = async () => {
  const zip = new JSZip();

  // 1. MANIFEST.JSON
  zip.file("manifest.json", JSON.stringify({
    "manifest_version": 3,
    "name": "WhatsApp Privacy Extension",
    "version": "1.0",
    "description": "Privacy tools for WhatsApp Web. Secure your screen.",
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

  // 2. STYLES.CSS (FIXED ROBUST SELECTORS)
  zip.file("styles.css", `
    /* --- Privacy Extension Styles v1.0 --- */
    
    /* 1. Global Blur Helper */
    .wa-blur-target {
        filter: blur(8px) !important;
        transition: filter 0.2s ease-in-out !important;
    }
    
    /* Hover to Reveal Logic */
    body.wa-hover-reveal .wa-blur-target:hover {
        filter: blur(0px) !important;
    }

    /* --- SIDEBAR --- */
    
    /* Sidebar Names: Inside the chat list row, typically a span with dir="auto" or specific color classes */
    /* Target: Chat list -> Row -> Content -> Title */
    body.wa-blur-sidebar-name div[aria-label="Chat list"] span[title] {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-sidebar-name div[aria-label="Chat list"] span[title]:hover {
        filter: none !important;
    }

    /* Sidebar Photos */
    body.wa-blur-sidebar-photo div[aria-label="Chat list"] img {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-sidebar-photo div[aria-label="Chat list"] img:hover {
        filter: none !important;
    }

    /* Sidebar Preview Message */
    body.wa-blur-sidebar-preview div[aria-label="Chat list"] span[dir="auto"] {
        filter: blur(4px) !important;
    }
    body.wa-hover-reveal.wa-blur-sidebar-preview div[aria-label="Chat list"] span[dir="auto"]:hover {
        filter: none !important;
    }

    /* --- ACTIVE CHAT --- */

    /* Messages: The bubble content. We target the text container specifically. */
    /* Using generic .message-in and .message-out + span selectors for broad compatibility */
    body.wa-blur-chat-message .message-in span.selectable-text,
    body.wa-blur-chat-message .message-out span.selectable-text,
    body.wa-blur-chat-message .message-in span[dir="ltr"],
    body.wa-blur-chat-message .message-out span[dir="ltr"] {
        filter: blur(5px) !important;
        user-select: none;
    }
    body.wa-hover-reveal.wa-blur-chat-message .message-in:hover span,
    body.wa-hover-reveal.wa-blur-chat-message .message-out:hover span {
        filter: none !important;
        user-select: text;
    }

    /* Chat Media: Images and Videos in bubbles */
    /* Targeting blobs (images) and videos */
    body.wa-blur-chat-media .message-in img[src^="blob:"],
    body.wa-blur-chat-media .message-out img[src^="blob:"],
    body.wa-blur-chat-media .message-in video,
    body.wa-blur-chat-media .message-out video {
        filter: blur(15px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-media .message-in:hover img,
    body.wa-hover-reveal.wa-blur-chat-media .message-out:hover img {
        filter: none !important;
    }

    /* Chat Header: Name */
    body.wa-blur-chat-name header span[title] {
        filter: blur(6px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-name header span[title]:hover {
        filter: none !important;
    }

    /* Chat Header: Photo */
    body.wa-blur-chat-photo header img {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-photo header img:hover {
        filter: none !important;
    }

    /* Group Participant Names (Inside bubbles) */
    /* Usually has a specific color class like text-slate-500 or similar, but structure is consistant */
    body.wa-blur-chat-group-participant .message-in div[role="button"] > span[dir="auto"] {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-group-participant .message-in:hover div[role="button"] > span[dir="auto"] {
        filter: none !important;
    }
  `);

  // 3. CONTENT.JS
  zip.file("content.js", `
    console.log("WhatsApp Privacy Extension v1.0: Loaded");

    const defaultState = {
      enableExtension: true,
      hoverToReveal: true,
      sidebarBlurName: false,
      sidebarBlurPhoto: true,
      sidebarBlurPreview: true,
      chatBlurName: false,
      chatBlurPhoto: true,
      chatBlurMessage: true,
      chatBlurMedia: true,
      chatBlurGroupParticipant: true
    };

    let currentState = { ...defaultState };

    function updateDOM() {
      const b = document.body.classList;
      const s = currentState;
      const on = s.enableExtension;

      // Helper for clean class toggling
      const toggle = (cls, active) => b.toggle(cls, !!(on && active));

      toggle('wa-hover-reveal', s.hoverToReveal);
      
      toggle('wa-blur-sidebar-name', s.sidebarBlurName);
      toggle('wa-blur-sidebar-photo', s.sidebarBlurPhoto);
      toggle('wa-blur-sidebar-preview', s.sidebarBlurPreview);
      
      toggle('wa-blur-chat-name', s.chatBlurName);
      toggle('wa-blur-chat-photo', s.chatBlurPhoto);
      toggle('wa-blur-chat-message', s.chatBlurMessage);
      toggle('wa-blur-chat-media', s.chatBlurMedia);
      toggle('wa-blur-chat-group-participant', s.chatBlurGroupParticipant);
    }

    // Initialize
    chrome.storage.local.get(['privacySettings'], (result) => {
      if (result.privacySettings) Object.assign(currentState, result.privacySettings);
      updateDOM();
    });

    // Listen
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.privacySettings) {
        Object.assign(currentState, changes.privacySettings.newValue);
        updateDOM();
      }
    });

    // Shortcut
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.code === 'KeyX') {
             currentState.enableExtension = !currentState.enableExtension;
             chrome.storage.local.set({ privacySettings: currentState });
             updateDOM();
        }
    });
  `);

  // 4. POPUP.HTML (REFINED LAYOUT 680px)
  zip.file("popup.html", `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body { 
                width: 680px; 
                margin: 0; 
                padding: 0; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                background: #f8fafc; 
                color: #334155;
            }
            
            .header { 
                background: linear-gradient(135deg, #0d9488, #0f766e); 
                color: white; 
                padding: 16px 20px; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            }
            .header-brand { display: flex; align-items: center; gap: 10px; }
            .header h1 { margin: 0; font-size: 16px; font-weight: 600; letter-spacing: 0.5px; }
            .header-status { font-size: 11px; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 99px; }

            .dashboard { 
                display: grid; 
                grid-template-columns: 170px 1fr 1fr 160px; 
                gap: 12px; 
                padding: 16px; 
                box-sizing: border-box;
            }

            .col { display: flex; flex-direction: column; gap: 10px; }
            
            .col-title {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: #64748b;
                font-weight: 700;
                padding-left: 4px;
            }

            .card {
                background: white;
                border-radius: 8px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
                border: 1px solid #e2e8f0;
                overflow: hidden;
            }

            /* Master Switch Area */
            .master-card {
                background: #f0fdfa;
                border: 1px solid #ccfbf1;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                height: 100%;
                box-sizing: border-box;
            }
            .master-btn {
                width: 44px;
                height: 44px;
                background: #0d9488;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                margin-bottom: 12px;
                box-shadow: 0 4px 6px rgba(13, 148, 136, 0.3);
            }
            .master-status-text { font-weight: 700; color: #115e59; font-size: 14px; margin-bottom: 4px; }
            .master-shortcut { font-size: 11px; color: #5eead4; color: #0f766e; opacity: 0.8; margin-bottom: 16px; }

            /* List Items */
            .item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 12px;
                border-bottom: 1px solid #f1f5f9;
                transition: background 0.1s;
            }
            .item:last-child { border-bottom: none; }
            .item:hover { background: #f8fafc; }
            
            .item-content { display: flex; flex-direction: column; }
            .item-label { font-size: 12px; font-weight: 500; color: #1e293b; }
            .item-sub { font-size: 10px; color: #94a3b8; margin-top: 2px; }

            /* Modern Switch */
            .switch { position: relative; display: inline-block; width: 32px; height: 18px; flex-shrink: 0; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 34px; }
            .slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 2px; bottom: 2px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
            input:checked + .slider { background-color: #0d9488; }
            input:checked + .slider:before { transform: translateX(14px); }
            input:disabled + .slider { opacity: 0.5; cursor: not-allowed; }

            .footer {
                text-align: center;
                padding: 12px;
                color: #94a3b8;
                font-size: 10px;
                border-top: 1px solid #e2e8f0;
                background: white;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="header-brand">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <h1>WhatsApp Privacy</h1>
            </div>
            <span class="header-status">v1.0</span>
        </div>

        <div class="dashboard">
            <!-- Col 1: Master -->
            <div class="col">
                <div class="card master-card">
                    <div class="master-btn">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg>
                    </div>
                    <div class="master-status-text">Global Privacy</div>
                    <div class="master-shortcut">Shortcut: Alt + X</div>
                    <label class="switch" style="width: 40px; height: 22px;">
                        <input type="checkbox" id="enableExtension">
                        <span class="slider" style="border-radius: 22px;"></span>
                        <style>
                            /* Local override for bigger switch in master card */
                            #enableExtension:checked + .slider:before { transform: translateX(18px); }
                            .master-card .slider:before { width: 18px; height: 18px; }
                        </style>
                    </label>
                </div>
            </div>

            <!-- Col 2: Sidebar -->
            <div class="col">
                <div class="col-title">Sidebar List</div>
                <div class="card">
                    <div class="item">
                        <span class="item-label">Blur Contact Names</span>
                        <label class="switch"><input type="checkbox" id="sidebarBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <span class="item-label">Blur Profile Photos</span>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPhoto"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Blur Preview</span>
                            <span class="item-sub">Last message text</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPreview"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- Col 3: Active Chat -->
            <div class="col">
                <div class="col-title">Active Chat</div>
                <div class="card">
                    <div class="item">
                        <span class="item-label">Blur Messages</span>
                        <label class="switch"><input type="checkbox" id="chatBlurMessage"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                             <span class="item-label">Blur Media</span>
                             <span class="item-sub">Images & Videos</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurMedia"><span class="slider"></span></label>
                    </div>
                     <div class="item">
                        <div class="item-content">
                            <span class="item-label">Participants</span>
                            <span class="item-sub">Names in groups</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurGroupParticipant"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <span class="item-label">Blur Header Name</span>
                        <label class="switch"><input type="checkbox" id="chatBlurName"><span class="slider"></span></label>
                    </div>
                     <div class="item">
                        <span class="item-label">Blur Header Photo</span>
                        <label class="switch"><input type="checkbox" id="chatBlurPhoto"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- Col 4: Interactivity -->
            <div class="col">
                <div class="col-title">Settings</div>
                <div class="card">
                    <div class="item" style="flex-direction: column; align-items: flex-start; gap: 8px;">
                        <div class="item-content">
                            <span class="item-label">Hover to Reveal</span>
                            <span class="item-sub">Unblur on mouseover</span>
                        </div>
                        <div style="width: 100%; display: flex; justify-content: flex-end;">
                            <label class="switch"><input type="checkbox" id="hoverToReveal"><span class="slider"></span></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            WA Privacy Extension v1.0 • Open Source (MIT)
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
        'chatBlurMessage', 'chatBlurMedia', 'chatBlurName', 'chatBlurPhoto', 'chatBlurGroupParticipant',
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
      chatBlurMedia: true,
      chatBlurGroupParticipant: true
    };

    chrome.storage.local.get(['privacySettings'], (result) => {
        const settings = result.privacySettings || defaultSettings;
        keys.forEach(key => {
            const el = document.getElementById(key);
            if(el) {
                el.checked = settings[key];
                if(key !== 'enableExtension') el.disabled = !settings.enableExtension;
            }
        });
    });

    keys.forEach(key => {
        const el = document.getElementById(key);
        if(!el) return;
        el.addEventListener('change', () => {
            if(key === 'enableExtension') {
                const isEnabled = el.checked;
                keys.forEach(k => {
                    if(k !== 'enableExtension') {
                         const sub = document.getElementById(k);
                         if(sub) sub.disabled = !isEnabled;
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
  link.download = "whatsapp-privacy-v1.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
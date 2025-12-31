import JSZip from "jszip";

export const createExtensionZip = async () => {
  const zip = new JSZip();

  // 1. MANIFEST.JSON
  zip.file(
    "manifest.json",
    JSON.stringify(
      {
        manifest_version: 3,
        name: "WA Cilukba",
        version: "1.0.0",
        description: "Privacy tools for WhatsApp Web. Peek-a-boo your chats.",
        permissions: ["storage", "activeTab", "scripting"],
        host_permissions: ["https://web.whatsapp.com/*"],
        action: {
          default_popup: "popup.html",
          default_icon: "icon.png",
        },
        content_scripts: [
          {
            matches: ["https://web.whatsapp.com/*"],
            js: ["content.js"],
            css: ["styles.css"],
          },
        ],
      },
      null,
      2
    )
  );

  // 2. STYLES.CSS (PRESERVED ROBUST SELECTORS)
  zip.file(
    "styles.css",
    `
    /* --- WA Cilukba Styles v1.0.0 --- */
    
    /* 1. Global Blur Helper */
    .wa-blur-target {
        filter: blur(8px) !important;
        transition: filter 0.2s ease-in-out !important;
    }
    
    /* Hover to Reveal Logic */
    body.wa-hover-reveal .wa-blur-target:hover {
        filter: blur(0px) !important;
    }

    /* --- GLOBAL TRANSITION --- */
    body.wa-hover-reveal * {
        transition: filter 0.3s ease-in-out !important;
    }

    /* --- SIDEBAR --- */
    
    /* Sidebar Names */
    body.wa-blur-sidebar-name div[aria-label="Chat list"] span[dir="auto"][title],
    body.wa-blur-sidebar-name div[aria-label="Chat list"] div[role="gridcell"] div.xuxw1ft span[title] {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-sidebar-name div[aria-label="Chat list"] span[dir="auto"][title]:hover,
    body.wa-hover-reveal.wa-blur-sidebar-name div[aria-label="Chat list"] div[role="gridcell"] div.xuxw1ft span[title]:hover {
        filter: none !important;
    }

    /* Sidebar Photos */
    body.wa-blur-sidebar-photo div[aria-label="Chat list"] img,
    body.wa-blur-sidebar-photo div[aria-label="Chat list"] ._ak8h img {
        filter: blur(8px) !important;
    }
    body.wa-hover-reveal.wa-blur-sidebar-photo div[aria-label="Chat list"] img:hover,
    body.wa-hover-reveal.wa-blur-sidebar-photo div[aria-label="Chat list"] ._ak8h img:hover {
        filter: none !important;
    }

    /* Sidebar Preview Text */
    body.wa-blur-sidebar-preview div[aria-label="Chat list"] ._ak8j span[title],
    body.wa-blur-sidebar-preview div[aria-label="Chat list"] ._ak8j span[dir="ltr"] {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-sidebar-preview div[aria-label="Chat list"] ._ak8j span[title]:hover,
    body.wa-hover-reveal.wa-blur-sidebar-preview div[aria-label="Chat list"] ._ak8j span[dir="ltr"]:hover {
        filter: none !important;
    }

    /* --- ACTIVE CHAT --- */

    /* Messages: Text */
    body.wa-blur-chat-message .message-in span[data-testid="selectable-text"],
    body.wa-blur-chat-message .message-out span[data-testid="selectable-text"],
    body.wa-blur-chat-message .message-in span[dir="ltr"],
    body.wa-blur-chat-message .message-out span[dir="ltr"],
    body.wa-blur-chat-message .message-in ._akbu,
    body.wa-blur-chat-message .message-out ._akbu {
        filter: blur(6px) !important;
        user-select: none;
    }
    body.wa-hover-reveal.wa-blur-chat-message .message-in:hover span[data-testid="selectable-text"],
    body.wa-hover-reveal.wa-blur-chat-message .message-out:hover span[data-testid="selectable-text"],
    body.wa-hover-reveal.wa-blur-chat-message .message-in:hover ._akbu,
    body.wa-hover-reveal.wa-blur-chat-message .message-out:hover ._akbu {
        filter: none !important;
        user-select: text;
    }

    /* Chat Media */
    body.wa-blur-chat-media .message-in img,
    body.wa-blur-chat-media .message-out img,
    body.wa-blur-chat-media .message-in video,
    body.wa-blur-chat-media .message-out video {
        filter: blur(20px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-media .message-in:hover img,
    body.wa-hover-reveal.wa-blur-chat-media .message-out:hover img {
        filter: none !important;
    }

    /* Chat Header: Name */
    body.wa-blur-chat-name header span[title],
    body.wa-blur-chat-name header .x1iyjqo2 {
        filter: blur(6px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-name header:hover span[title],
    body.wa-hover-reveal.wa-blur-chat-name header:hover .x1iyjqo2 {
        filter: none !important;
    }

    /* Chat Header: Photo */
    body.wa-blur-chat-photo header img {
        filter: blur(8px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-photo header img:hover {
        filter: none !important;
    }

    /* Group Participant Names */
    body.wa-blur-chat-group-participant .message-in ._ahxj span,
    body.wa-blur-chat-group-participant .message-in span[dir="auto"] {
        filter: blur(5px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-group-participant .message-in:hover ._ahxj span {
        filter: none !important;
    }

    /* Group Participant Photos in Active Chat */
    body.wa-blur-chat-photo #main img[src^="https://media"],
    body.wa-blur-chat-photo #main div[role="button"][aria-label^="Open chat details"] img {
        filter: blur(10px) !important;
    }
    body.wa-hover-reveal.wa-blur-chat-photo #main img[src^="https://media"]:hover,
    body.wa-hover-reveal.wa-blur-chat-photo #main div[role="button"][aria-label^="Open chat details"]:hover img {
        filter: none !important;
    }
  `
  );

  // 3. CONTENT.JS
  zip.file(
    "content.js",
    `
    console.log("WA Cilukba v1.0.0: Loaded");

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
  `
  );

  // 4. POPUP.HTML (SYNCHRONIZED WITH CONTROLPANEL.TSX)
  zip.file(
    "popup.html",
    `
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
                background: #f8fafc; 
                color: #334155;
            }
            .header { 
                background: #0d9488; 
                color: white; 
                padding: 20px; 
                display: flex; align-items: center; justify-content: space-between;
                box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
            }
            .header-brand { display: flex; align-items: center; gap: 10px; }
            .header h1 { margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.5px; }
            .header-sub { font-size: 12px; opacity: 0.9; margin-top: 2px; }
            .dashboard { 
                display: grid; grid-template-columns: 200px 1fr 1fr; gap: 16px; padding: 20px; box-sizing: border-box;
            }
            .col { display: flex; flex-direction: column; gap: 16px; }
            .col-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 800; display: flex; align-items: center; gap: 6px; }
            .card { background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; overflow: hidden; }
            .master-card { background: #f0fdfa; border: 1px solid #ccfbf1; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100%; box-sizing: border-box; }
            .master-btn { width: 48px; height: 48px; background: #0d9488; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4); }
            .master-title { font-weight: 700; color: #115e59; font-size: 14px; margin-bottom: 4px; }
            .master-desc { font-size: 11px; color: #0f766e; opacity: 0.8; margin-bottom: 20px; }
            
            .item { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }
            .item:last-child { border-bottom: none; }
            .item:hover { background: #f8fafc; }
            .item-content { display: flex; flex-direction: column; flex: 1; padding-right: 12px; }
            .item-label { font-size: 13px; font-weight: 500; color: #1e293b; }
            .item-sub { font-size: 11px; color: #64748b; margin-top: 2px; line-height: 1.3; }
            
            .switch { position: relative; display: inline-block; width: 36px; height: 20px; flex-shrink: 0; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #cbd5e1; transition: .3s; border-radius: 34px; }
            .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .3s; border-radius: 50%; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
            input:checked + .slider { background-color: #0d9488; }
            input:checked + .slider:before { transform: translateX(16px); }
            input:disabled + .slider { opacity: 0.4; cursor: not-allowed; }
            
            .footer { padding: 16px; color: #94a3b8; font-size: 11px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; background: white; }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="header-brand">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div>
                    <h1>WA Cilukba</h1>
                    <div class="header-sub">Peek-a-boo for WhatsApp Web</div>
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;">v1.0.0</div>
        </div>
        
        <div class="dashboard">
            <!-- MASTER SWITCH -->
            <div class="col">
                <div class="card master-card">
                    <div class="master-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <div class="master-title">Privacy Features</div>
                    <div class="master-desc">Master Switch (Alt+X)</div>
                    <label class="switch" style="width: 44px; height: 24px;">
                        <input type="checkbox" id="enableExtension">
                        <span class="slider" style="border-radius: 24px;"></span>
                        <style>#enableExtension:checked + .slider:before { transform: translateX(20px); } .master-card .slider:before { width: 20px; height: 20px; }</style>
                    </label>
                </div>
            </div>

            <!-- SIDEBAR GROUP -->
            <div class="col">
                <div class="col-title">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>
                    Left Sidebar (Chat List)
                </div>
                <div class="card">
                    <div class="item">
                        <div class="item-content"><span class="item-label">Blur Contact Names</span></div>
                        <label class="switch"><input type="checkbox" id="sidebarBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content"><span class="item-label">Blur Profile Photos</span></div>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPhoto"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Blur Last Message</span>
                            <span class="item-sub">Hide message previews</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="sidebarBlurPreview"><span class="slider"></span></label>
                    </div>
                </div>
                
                <div class="col-title" style="margin-top: 8px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 6l-6 6 6 6"/><circle cx="12" cy="12" r="10"/></svg>
                    Interactivity
                </div>
                <div class="card">
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Hover to Reveal</span>
                            <span class="item-sub">Temporarily unblur on mouseover</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="hoverToReveal"><span class="slider"></span></label>
                    </div>
                </div>
            </div>

            <!-- ACTIVE CHAT GROUP -->
            <div class="col">
                <div class="col-title">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    Active Chat Content
                </div>
                <div class="card">
                    <div class="item">
                        <div class="item-content"><span class="item-label">Blur Messages</span></div>
                        <label class="switch"><input type="checkbox" id="chatBlurMessage"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Blur Media</span>
                            <span class="item-sub">Images, Videos, Stickers</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurMedia"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Blur Header Name</span>
                            <span class="item-sub">Chat Title</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurName"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Blur Header Photo</span>
                            <span class="item-sub">Profile/Group Icon</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurPhoto"><span class="slider"></span></label>
                    </div>
                    <div class="item">
                        <div class="item-content">
                            <span class="item-label">Blur Group Participants</span>
                            <span class="item-sub">Names inside chat bubbles</span>
                        </div>
                        <label class="switch"><input type="checkbox" id="chatBlurGroupParticipant"><span class="slider"></span></label>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div style="display: flex; align-items: center; gap: 8px;">
                <span>&copy; ${new Date().getFullYear()} WA Cilukba</span>
                <span style="color: #cbd5e1;">•</span>
                <a href="https://github.com/prostiate/wa-cilukba" target="_blank" style="color: #64748b; text-decoration: none; display: flex; align-items: center; gap: 4px; font-weight: 600;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    GitHub
                </a>
            </div>
            <span style="font-weight: 600; color: #64748b;">MIT License</span>
        </div>
        <script src="popup.js"></script>
    </body>
    </html>
    `
  );

  // 5. POPUP.JS
  zip.file(
    "popup.js",
    `
    const keys = ['enableExtension', 'sidebarBlurName', 'sidebarBlurPhoto', 'sidebarBlurPreview', 'chatBlurMessage', 'chatBlurMedia', 'chatBlurName', 'chatBlurPhoto', 'chatBlurGroupParticipant', 'hoverToReveal'];
    const defaultSettings = { enableExtension: true, hoverToReveal: true, sidebarBlurName: false, sidebarBlurPhoto: true, sidebarBlurPreview: true, chatBlurName: false, chatBlurPhoto: true, chatBlurMessage: true, chatBlurMedia: true, chatBlurGroupParticipant: true };
    chrome.storage.local.get(['privacySettings'], (result) => {
        const settings = result.privacySettings || defaultSettings;
        keys.forEach(key => {
            const el = document.getElementById(key);
            if(el) { el.checked = settings[key]; if(key !== 'enableExtension') el.disabled = !settings.enableExtension; }
        });
    });
    keys.forEach(key => {
        const el = document.getElementById(key);
        if(!el) return;
        el.addEventListener('change', () => {
            if(key === 'enableExtension') {
                const isEnabled = el.checked;
                keys.forEach(k => { if(k !== 'enableExtension') { const sub = document.getElementById(k); if(sub) sub.disabled = !isEnabled; } });
            }
            const newSettings = {};
            keys.forEach(k => { const kEl = document.getElementById(k); if(kEl) newSettings[k] = kEl.checked; });
            chrome.storage.local.set({ privacySettings: newSettings });
        });
    });
  `
  );

  // 6. ICON.PNG
  zip.file(
    "icon.png",
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    { base64: true }
  );

  return zip;
};

export const downloadExtension = async () => {
  const zip = await createExtensionZip();
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "WA-Cilukba-v1.0.0.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

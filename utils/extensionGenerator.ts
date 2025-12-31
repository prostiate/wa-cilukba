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
  // These selectors are heuristic approximations for WhatsApp Web
  zip.file("styles.css", `
    /* --- Privacy Extension Styles --- */
    
    /* Base Blur Class */
    .wa-privacy-blur {
        filter: blur(6px) !important;
        transition: filter 0.2s ease !important;
        cursor: pointer !important;
    }
    .wa-privacy-blur:hover {
        filter: blur(0px) !important;
    }

    /* 
       Note: WhatsApp Web classes change frequently. 
       We target generic attributes where possible.
    */

    /* Blur Images/Media */
    body.blur-media img[src^="blob:"],
    body.blur-media div[role="button"] img {
        filter: blur(10px);
        transition: 0.3s;
    }
    body.blur-media img[src^="blob:"]:hover,
    body.blur-media div[role="button"] img:hover {
        filter: none;
    }

    /* Blur Profile Pictures (Headers & Chat List) */
    body.blur-photos header img,
    body.blur-photos div[aria-label*="Chat list"] img {
        filter: blur(6px);
        transition: 0.3s;
    }
    body.blur-photos header img:hover,
    body.blur-photos div[aria-label*="Chat list"] img:hover {
        filter: none;
    }

    /* Blur Names */
    body.blur-names span[title],
    body.blur-names div[role="row"] span[dir="auto"] {
        filter: blur(5px);
        transition: 0.3s;
    }
    body.blur-names span[title]:hover,
    body.blur-names div[role="row"] span[dir="auto"]:hover {
        filter: none;
    }

    /* Blur Messages */
    body.blur-messages .message-in, 
    body.blur-messages .message-out {
        filter: blur(5px);
        transition: 0.3s;
    }
    body.blur-messages .message-in:hover, 
    body.blur-messages .message-out:hover {
        filter: none;
    }
  `);

  // 3. CONTENT.JS
  zip.file("content.js", `
    console.log("WhatsApp Privacy Extension: Active");

    const state = {
      blurMedia: true,
      blurPhotos: true,
      blurNames: false,
      blurMessages: true
    };

    function updateDOM() {
      document.body.classList.toggle('blur-media', state.blurMedia);
      document.body.classList.toggle('blur-photos', state.blurPhotos);
      document.body.classList.toggle('blur-names', state.blurNames);
      document.body.classList.toggle('blur-messages', state.blurMessages);
    }

    // Initialize
    chrome.storage.local.get(['settings'], (result) => {
      if (result.settings) {
        Object.assign(state, result.settings);
        updateDOM();
      }
    });

    // Listen for changes from popup
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.settings) {
        Object.assign(state, changes.settings.newValue);
        updateDOM();
      }
    });
    
    // Quick Toggle Shortcut (Alt+X)
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.code === 'KeyX') {
             chrome.storage.local.get(['settings'], (result) => {
                const currentSettings = result.settings || state;
                const newState = { ...currentSettings, enabled: !currentSettings.enabled };
                // Logic to toggle all off/on would go here, simplified for demo
                if (!newState.enabled) {
                    document.body.classList.remove('blur-media', 'blur-photos', 'blur-names', 'blur-messages');
                } else {
                    updateDOM();
                }
             });
        }
    });
  `);

  // 4. POPUP.HTML
  zip.file("popup.html", `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <style>
            body { width: 300px; padding: 0; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            .header { background: #0d9488; color: white; padding: 15px; display: flex; align-items: center; }
            .header h1 { margin: 0; font-size: 16px; margin-left: 10px; }
            .content { padding: 15px; }
            .option { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
            .option:last-child { border-bottom: none; }
            label { font-size: 14px; color: #333; }
            
            /* Switch CSS */
            .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
            .switch input { opacity: 0; width: 0; height: 0; }
            .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
            .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background-color: white; transition: .4s; border-radius: 50%; }
            input:checked + .slider { background-color: #0d9488; }
            input:checked + .slider:before { transform: translateX(20px); }
        </style>
    </head>
    <body>
        <div class="header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <h1>Privacy Settings</h1>
        </div>
        <div class="content">
            <div class="option">
                <label>Blur Recent Messages</label>
                <label class="switch"><input type="checkbox" id="blurMessages"><span class="slider"></span></label>
            </div>
            <div class="option">
                <label>Blur Media</label>
                <label class="switch"><input type="checkbox" id="blurMedia"><span class="slider"></span></label>
            </div>
            <div class="option">
                <label>Blur Profile Photos</label>
                <label class="switch"><input type="checkbox" id="blurPhotos"><span class="slider"></span></label>
            </div>
             <div class="option">
                <label>Blur Names</label>
                <label class="switch"><input type="checkbox" id="blurNames"><span class="slider"></span></label>
            </div>
        </div>
        <script src="popup.js"></script>
    </body>
    </html>
  `);

  // 5. POPUP.JS
  zip.file("popup.js", `
    const keys = ['blurMessages', 'blurMedia', 'blurPhotos', 'blurNames'];

    // Load
    chrome.storage.local.get(['settings'], (result) => {
        const settings = result.settings || { blurMessages: true, blurMedia: true, blurPhotos: true, blurNames: false };
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
            chrome.storage.local.set({ settings: newSettings });
        });
    });
  `);

  // 6. ICON.PNG (1x1 transparent pixel base64)
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

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
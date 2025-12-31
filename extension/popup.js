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
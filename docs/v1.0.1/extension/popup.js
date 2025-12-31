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
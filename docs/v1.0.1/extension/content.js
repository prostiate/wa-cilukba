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
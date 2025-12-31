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
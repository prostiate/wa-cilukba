# WA Cilukba (Peek-a-boo) 🙈🛡️

WA Cilukba is a privacy-focused browser extension for WhatsApp Web. It automatically blurs sensitive content (like contact names, photos, and messages) and only reveals them when you hover your mouse over them. Perfect for using WhatsApp in public spaces or protecting your screen from shoulder surfers.

"Cilukba" is the Indonesian word for "Peek-a-boo".

## ✨ Key Features

- **🛡️ Comprehensive Blurring**: Hide contact names, profile photos, message previews, group participant names, and media content.
- **👁️ Hover to Reveal**: Effortlessly unblur specific parts of your screen just by moving your mouse over them.
- **🎨 smooth Animations**: Beautiful 0.3s transitions when revealing and hiding content for a premium feel.
- **⚡ Master Switch**: Instantly toggle all privacy features on or off with a shortcut (`Alt + X`).
- **🔍 Robust Selectors**: Built with the latest WhatsApp Web DOM structure for maximum reliability.
- **📱 Live Simulator**: Try out all features directly in our interactive web-based simulator before downloading.

## 🚀 How to Run the Demo Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/prostiate/wa-cilukba.git
   cd wa-cilukba
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` (or the port shown in your terminal).

## 📥 How to Install the Extension

1. Open the [Live Demo](http://localhost:3000) and click the **"Download Extension"** button.
2. Unzip the downloaded file (`WA-Cilukba-v1.0.0.zip`).
3. Open Chrome (or any Chromium-based browser) and navigate to `chrome://extensions/`.
4. Enable **"Developer mode"** in the top right corner.
5. Click **"Load unpacked"** and select the folder you unzipped in step 2.
6. Open [WhatsApp Web](https://web.whatsapp.com) and start peeking!

## 🌐 Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages using GitHub Actions.

1. Push your code to the `main` branch.
2. The GitHub Action will automatically build and deploy the demo to `https://prostiate.github.io/wa-cilukba/`.
3. Ensure your repository settings have GitHub Pages source set to the `gh-pages` branch.

## 📦 Automated Releases

You can generate the extension zip file locally or via GitHub Releases.

### Local Generation

Run the following command to generate `WA-Cilukba-v1.0.0.zip`:

```bash
npm run build:extension
```

### GitHub Releases

The included GitHub Action automatically attaches the extension zip to any tag matching `v*` (e.g., `v1.0.0`).

1. Create and push a tag:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. The zip will be available as an asset in the "Releases" section of your GitHub repository.

## 🤝 Contributing & Open Source

This project is open-source and welcomes contributions!

- **Bug Reports**: Open an issue if you find something broken due to WhatsApp Web updates.
- **Feature Requests**: We love new ideas for privacy features.
- **Pull Requests**: Feel free to submit improvements to selectors, design, or functionality.

### 📜 License

Licensed under the [MIT License](LICENSE). Built with ❤️ for privacy enthusiasts.

---

_Disclaimer: This extension is not affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries._

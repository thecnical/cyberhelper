# 🤖 CyberHelper

<div align="center">

![CyberHelper Logo](assets/logo.svg)

**A Powerful ChatGPT-like AI Assistant for Linux**

[![GitHub Stars](https://img.shields.io/github/stars/thecnical/cyberhelper?style=social)](https://github.com/thecnical/cyberhelper)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Linux](https://img.shields.io/badge/platform-Linux-orange.svg)](https://www.linux.org/)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

[Features](#-features) • [Quick Start](#-quick-start-one-command-setup) • [Free Providers](#-free-ai-providers) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎯 What is CyberHelper?

CyberHelper is a **native Linux desktop application** that brings the power of AI chat assistants to your fingertips. With a beautiful ChatGPT-inspired interface and support for **13 AI providers** (including **8 FREE ones**), you can chat with AI without leaving your Linux desktop!

### 🌟 Why Choose CyberHelper?

- 🆓 **8 FREE AI Providers** - No API key needed for most!
- 🎨 **ChatGPT-Quality UI** - Exact same look and feel
- 🐧 **Linux-First** - Built specifically for Linux users
- 🔒 **Privacy-Focused** - Everything stored locally
- ⚡ **Super Fast** - Native Electron performance
- 🌓 **Dark/Light Themes** - Easy on your eyes
- 💬 **Real-time Streaming** - See responses as they generate
- 📝 **Markdown & Code** - Syntax highlighting for 100+ languages

---

## ✨ Features

### 🤖 AI Provider Support

#### Premium Providers
- ✅ **OpenAI** - GPT-4 Turbo, GPT-4, GPT-3.5
- ✅ **Anthropic Claude** - Claude 3.5 Sonnet, Opus, Haiku
- ✅ **Google Gemini** - Gemini Pro, Pro Vision
- ✅ **Ollama** - Local models (Llama 2, Mistral, Code Llama)

#### 🆓 FREE Providers (No API Key Required!)
- ✅ **Groq** - Ultra-fast inference (Llama 3.3 70B)
- ✅ **OpenRouter** - Free tier with multiple models
- ✅ **APMix** - Free GPT-4o, Claude 3.5, Gemini Pro
- ✅ **ApiNex** - Free GPT-4 Turbo, Claude Opus
- ✅ **ByteX AI** - Free GPT-4o Mini, Claude 3.5
- ✅ **LLM7.io** - Free GPT-4o, Claude Opus
- ✅ **FreeAI** - Free GPT-3.5, GPT-4
- ✅ **Zenmux** - Free GPT-4o Mini, Claude Haiku

### 💎 Interface Features

- 🎨 **ChatGPT-Inspired Design** - Familiar interface
- 💬 **Real-time Streaming** - Watch AI respond live
- 📝 **Markdown Rendering** - Beautiful formatting
- 🖥️ **Code Syntax Highlighting** - 100+ languages
- 📋 **Copy Code** - One-click code copying
- 🔍 **Search Conversations** - Find old chats easily
- 💾 **History Management** - Never lose a conversation
- 🌓 **Theme Switching** - Dark/Light modes

### 🔒 Security & Privacy

- 🔐 **Encrypted Storage** - API keys stored securely
- 💻 **Local-First** - All data on your machine
- 🚫 **No Telemetry** - No tracking or analytics
- 🔓 **Open Source** - Fully transparent code

---

## 🚀 Quick Start (One Command Setup!)

### ⚡ Automatic Setup (Recommended)

**Just run these 3 commands:**

```bash
git clone https://github.com/thecnical/cyberhelper.git
cd cyberhelper
chmod +x setup.sh && ./setup.sh
```

**The script automatically:**
- ✅ Installs Node.js (if needed)
- ✅ Installs system dependencies
- ✅ Installs npm packages
- ✅ Builds the application
- ✅ Creates desktop shortcut
- ✅ Makes launch script

**After setup:**
```bash
./cyberhelper
# OR
npm start
# OR search "CyberHelper" in your app menu
```

### 🛠️ Manual Setup

```bash
# Clone repository
git clone https://github.com/thecnical/cyberhelper.git
cd cyberhelper

# Install dependencies
npm install

# Development mode (with hot reload)
npm run dev

# Build and run production
npm run build
npm run build:electron
npm start
```

---

## 🆓 Free AI Providers

**Get started instantly with FREE providers!**

### Top Free Picks:

#### 1. **Groq** ⚡ (Fastest!)
- 🚀 Ultra-fast inference
- 🤖 Llama 3.3 70B, Mixtral 8x7B
- 🔑 No API key needed
- 💯 100% Free

#### 2. **APMix** 💎 (Best Variety)
- 🎯 GPT-4o, Claude 3.5, Gemini Pro
- 🔑 No API key needed
- 🌐 Website: https://apmix.ai/

#### 3. **ApiNex** 🚀 (Premium Models)
- 💪 GPT-4 Turbo, Claude Opus
- 🤖 Llama 3 70B
- 🌐 Website: https://apinex.bond/

#### 4. **OpenRouter** 🔀 (Multi-Model)
- 🎨 Gemini Flash 1.5 (1M context!)
- 🦙 Llama 3.2, Phi-3 Mini
- 🔑 Optional API key for more models

**Plus:** ByteX AI, LLM7.io, FreeAI, Zenmux - All 100% FREE!

---

## 📖 First Time Setup

### Option A: Free Provider (Recommended)

1. **Launch CyberHelper**
   ```bash
   ./cyberhelper
   ```

2. **Open Settings** (⚙️ icon in sidebar)

3. **Go to "AI Providers" tab**

4. **Enable a FREE provider:**
   - Toggle on "Groq" (fastest!)
   - Or "APMix" (GPT-4o for free!)
   - Or "ApiNex" (Claude Opus free!)

5. **Start Chatting!**
   - Click "New chat"
   - Select your provider from dropdown
   - Type your message
   - Press Enter

**That's it! No API key needed!** 🎉

### Option B: Premium Provider

For **OpenAI**, **Claude**, or **Gemini**:

1. **Get API Key:**
   - OpenAI: https://platform.openai.com/api-keys
   - Anthropic: https://console.anthropic.com/
   - Google: https://makersuite.google.com/app/apikey

2. **In Settings:**
   - Enable your provider
   - Paste API key
   - Select model

3. **Start chatting!**

---

## 📋 System Requirements

### Minimum
- **OS:** Linux (Kernel 3.10+)
- **RAM:** 4 GB
- **Disk:** 200 MB
- **Node.js:** 18.0.0+ (auto-installed by setup.sh)

### Recommended
- **OS:** Ubuntu 20.04+, Kali 2023+, Arch, Fedora 38+
- **RAM:** 8 GB
- **Disk:** 500 MB
- **Display:** 1920x1080+

### Tested On
- ✅ Ubuntu 22.04, 24.04
- ✅ Kali Linux 2024.x
- ✅ Debian 12
- ✅ Arch Linux
- ✅ Fedora 40
- ✅ Pop!_OS 22.04
- ✅ Linux Mint 22

---

## 🎨 Screenshots

<div align="center">

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

### Light Mode
![Light Mode](screenshots/light-mode.png)

### Code Highlighting
![Code](screenshots/code-highlighting.png)

### Settings
![Settings](screenshots/settings.png)

</div>

---

## 📚 Documentation

- 📖 [Quick Start Guide](QUICKSTART.md) - Get running in 5 minutes
- 📦 [Installation Guide](INSTALL.md) - Detailed install instructions
- 📘 [Usage Manual](USAGE.md) - Complete user guide
- 🤝 [Contributing Guide](CONTRIBUTING.md) - Help improve CyberHelper
- 🗺️ [Roadmap](ROADMAP.md) - Future plans

---

## 🛠️ Development

### Tech Stack

**Frontend:**
- React 18 + TypeScript
- Zustand (State Management)
- React Markdown
- Syntax Highlighter
- Vite (Build Tool)

**Desktop:**
- Electron 33
- electron-store

**AI SDKs:**
- OpenAI, Anthropic, Google Generative AI
- Axios (HTTP Client)

### Build Commands

```bash
# Development with hot reload
npm run dev

# Build React app
npm run build

# Build Electron main process
npm run build:electron

# Run production
npm start

# Package for Linux
npm run package:linux
npm run package:deb      # DEB package
npm run package:appimage # AppImage
```

### Project Structure

```
cyberhelper/
├── electron/          # Electron main process
│   ├── main.ts       # Main entry point
│   └── preload.ts    # Preload script
├── src/              # React app
│   ├── components/   # UI components
│   ├── services/     # AI service integrations
│   ├── types.ts      # TypeScript types
│   └── store.ts      # State management
├── assets/           # Images and icons
├── public/           # Static files
└── docs/             # Documentation
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## 🐛 Bug Reports

Found a bug? Please open an issue:

**https://github.com/thecnical/cyberhelper/issues**

Include:
- Your Linux distribution
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 🗺️ Roadmap

### v1.1.0 (Q1 2027)
- [ ] Export conversations (PDF, Markdown)
- [ ] Voice input support
- [ ] Image generation (DALL-E, SD)
- [ ] Custom system prompts
- [ ] Conversation branching

### v1.2.0 (Q2 2027)
- [ ] Multi-workspace support
- [ ] RAG (document chat)
- [ ] Plugin system
- [ ] Team collaboration

### v2.0.0 (Q4 2027)
- [ ] Cross-platform (Windows, macOS)
- [ ] Mobile apps (Android, iOS)
- [ ] Web version
- [ ] Enterprise features

See [ROADMAP.md](ROADMAP.md) for full details.

---

## ❓ FAQ

### Q: Do I need an API key?
**A:** No! We have 8 FREE providers that work without any API key.

### Q: Which free provider is best?
**A:** 
- **Groq** - Fastest responses
- **APMix** - Best model variety (GPT-4o!)
- **ApiNex** - Most powerful (GPT-4 Turbo)

### Q: Is my data safe?
**A:** Yes! Everything is stored locally on your machine. No cloud, no tracking.

### Q: Can I use Ollama for offline AI?
**A:** Yes! Install Ollama and run models locally for complete privacy.

### Q: Does it work on Kali Linux?
**A:** Absolutely! CyberHelper is optimized for Kali and all major distros.

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

Free to use, modify, and distribute!

---

## 🙏 Acknowledgments

- **Inspired by** ChatGPT's excellent UI/UX
- **Built for** the Linux community
- **Powered by** amazing AI providers
- **Thanks to** all contributors

---

## 💬 Community

- **GitHub:** https://github.com/thecnical/cyberhelper
- **Issues:** https://github.com/thecnical/cyberhelper/issues
- **Discussions:** https://github.com/thecnical/cyberhelper/discussions

---

## 🌟 Show Your Support

If you like CyberHelper, please:

- ⭐ **Star this repo**
- 🐛 **Report bugs**
- 💡 **Suggest features**
- 🤝 **Contribute code**
- 📢 **Share with friends**

---

<div align="center">

**Made with ❤️ for the Linux Community**

[![GitHub](https://img.shields.io/badge/GitHub-thecnical%2Fcyberhelper-blue?logo=github)](https://github.com/thecnical/cyberhelper)
[![Stars](https://img.shields.io/github/stars/thecnical/cyberhelper?style=social)](https://github.com/thecnical/cyberhelper/stargazers)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>
# 🚀 CyberHelper Quick Start Guide

Get up and running with CyberHelper in 5 minutes!

## Prerequisites

- Linux system (any distribution)
- Node.js 18+ and npm (for development)
- At least one AI provider API key

## Installation

### Option 1: Quick Install Script (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/yourusername/cyberhelper/main/install.sh | bash
```

### Option 2: Download Package

**Debian/Ubuntu/Kali:**
```bash
wget https://github.com/yourusername/cyberhelper/releases/latest/download/cyberhelper_amd64.deb
sudo dpkg -i cyberhelper_amd64.deb
```

**Universal (Any Linux):**
```bash
wget https://github.com/yourusername/cyberhelper/releases/latest/download/cyberhelper.AppImage
chmod +x cyberhelper.AppImage
./cyberhelper.AppImage
```

## First-Time Setup

### 1. Launch CyberHelper

```bash
cyberhelper
# or find it in your applications menu
```

### 2. Get an API Key

Choose at least one provider:

**Option A: OpenAI (GPT)**
1. Go to https://platform.openai.com/api-keys
2. Sign up/login
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

**Option B: Anthropic (Claude)**
1. Go to https://console.anthropic.com/
2. Sign up/login
3. Navigate to API Keys
4. Create a new key
5. Copy the key (starts with `sk-ant-`)

**Option C: Google (Gemini)**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Create API key
4. Copy the key

**Option D: Ollama (Local/Free)**
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Use in CyberHelper
# URL: http://localhost:11434
# Model: llama2
```

### 3. Configure CyberHelper

1. Click the **Settings** (⚙️) icon in the sidebar
2. Go to **AI Providers** tab
3. Toggle on your chosen provider
4. Paste your API key
5. Select a model (e.g., `gpt-3.5-turbo` for OpenAI)
6. Click outside to save

### 4. Start Chatting!

1. Click **New chat**
2. Type your message
3. Press **Enter**
4. Watch the AI respond in real-time!

## Example Prompts to Try

### General Questions
```
Explain how Linux file permissions work
What's the difference between apt and snap?
How do I troubleshoot slow WiFi on Linux?
```

### Coding Help
```
Write a Python script to rename multiple files
Explain this bash command: find . -type f -name "*.log" -delete
Help me debug this error: [paste your error]
```

### Creative Tasks
```
Write a professional email requesting time off
Generate 5 creative project names for a security tool
Help me brainstorm blog post ideas about Linux
```

### System Administration
```
How do I set up a firewall with ufw?
Create a backup script for my home directory
Explain systemd services with examples
```

## Development Quick Start

### Clone and Run

```bash
# Clone the repository
git clone https://github.com/yourusername/cyberhelper.git
cd cyberhelper

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open automatically with hot reload enabled!

### Build for Production

```bash
# Build the app
npm run build
npm run build:electron

# Package for Linux
npm run package:linux
```

Built packages will be in the `release/` directory.

## Keyboard Shortcuts

- `Ctrl + N` - New conversation
- `Ctrl + ,` - Open settings
- `Ctrl + B` - Toggle sidebar
- `Enter` - Send message
- `Shift + Enter` - New line in message

## Troubleshooting

### App won't start
```bash
# Check if dependencies are installed
which cyberhelper

# If AppImage:
chmod +x cyberhelper.AppImage

# If missing dependencies:
sudo apt-get install libgtk-3-0 libnotify4 libnss3  # Debian/Ubuntu
```

### API key not working
1. Verify the key is correct (no extra spaces)
2. Check your internet connection
3. Verify your API provider account has credits
4. Try a different model

### Can't see conversations
1. Make sure "Save conversation history" is enabled in Settings > Preferences
2. Check if the app has write permissions

## Tips for Best Results

1. **Be specific** - "Explain Python decorators with 3 examples" vs "Tell me about Python"
2. **Provide context** - Include relevant details, error messages, or code
3. **Use markdown** - The AI understands and formats markdown beautifully
4. **Iterate** - Ask follow-up questions to refine responses
5. **Choose the right model**:
   - Quick tasks: GPT-3.5 Turbo, Claude Haiku
   - Complex tasks: GPT-4, Claude 3.5 Sonnet
   - Privacy-sensitive: Ollama (runs locally)

## Next Steps

- 📖 Read the [full usage guide](USAGE.md)
- 🛠️ Learn about [advanced features](USAGE.md#advanced-features)
- 🤝 [Contribute to the project](CONTRIBUTING.md)
- 💬 Join our [Discord community](https://discord.gg/cyberhelper)

## Getting Help

- **Documentation**: Check [USAGE.md](USAGE.md) for detailed info
- **Issues**: Report bugs at https://github.com/yourusername/cyberhelper/issues
- **Discord**: Get help from the community
- **Email**: support@cyberhelper.dev

---

**Happy chatting with CyberHelper!** 🎉

Made with ❤️ for the Linux community
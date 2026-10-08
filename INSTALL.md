# Installation Guide

This guide will help you install CyberHelper on your Linux system.

## Quick Install (Recommended)

### One-Line Install

```bash
curl -fsSL https://raw.githubusercontent.com/yourusername/cyberhelper/main/install.sh | bash
```

Or with wget:

```bash
wget -qO- https://raw.githubusercontent.com/yourusername/cyberhelper/main/install.sh | bash
```

## Manual Installation

### 1. Debian/Ubuntu/Kali Linux (DEB Package)

```bash
# Download the package
wget https://github.com/yourusername/cyberhelper/releases/latest/download/cyberhelper_amd64.deb

# Install dependencies
sudo apt-get update
sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6 xdg-utils

# Install CyberHelper
sudo dpkg -i cyberhelper_amd64.deb
sudo apt-get install -f
```

### 2. Arch Linux (AUR)

```bash
# Using yay
yay -S cyberhelper

# Or using paru
paru -S cyberhelper
```

### 3. Fedora/RHEL/CentOS (AppImage)

```bash
# Download AppImage
wget https://github.com/yourusername/cyberhelper/releases/latest/download/cyberhelper.AppImage

# Make it executable
chmod +x cyberhelper.AppImage

# Move to system location
sudo mv cyberhelper.AppImage /usr/local/bin/cyberhelper
```

### 4. Universal AppImage (All Distributions)

```bash
# Download
wget https://github.com/yourusername/cyberhelper/releases/latest/download/cyberhelper.AppImage

# Make executable
chmod +x cyberhelper.AppImage

# Run directly
./cyberhelper.AppImage

# Or install system-wide
sudo mv cyberhelper.AppImage /usr/local/bin/cyberhelper
```

### 5. Snap Package

```bash
sudo snap install cyberhelper
```

### 6. From Source

```bash
# Clone the repository
git clone https://github.com/yourusername/cyberhelper.git
cd cyberhelper

# Install dependencies
npm install

# Build the application
npm run build
npm run build:electron

# Package for your platform
npm run package:linux

# Install the generated package from release/ directory
```

## Post-Installation

### 1. Launch CyberHelper

- **From Application Menu**: Search for "CyberHelper" in your applications
- **From Terminal**: Run `cyberhelper`

### 2. Configure API Keys

1. Click the Settings icon (⚙️) in the sidebar
2. Go to "AI Providers" tab
3. Enable your preferred provider
4. Enter your API key
5. Select a model
6. Click outside the settings to save

### 3. Get API Keys

- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic Claude**: https://console.anthropic.com/
- **Google Gemini**: https://makersuite.google.com/app/apikey
- **Ollama**: Install locally from https://ollama.ai/

## System Requirements

### Minimum Requirements

- **OS**: Linux (Kernel 3.10+)
- **RAM**: 4 GB
- **Disk Space**: 200 MB
- **Display**: 1024x768 or higher
- **Internet**: Required for AI providers

### Recommended Requirements

- **OS**: Modern Linux distribution (Ubuntu 20.04+, Fedora 35+, Arch, etc.)
- **RAM**: 8 GB or more
- **Disk Space**: 500 MB
- **Display**: 1920x1080 or higher

## Supported Distributions

CyberHelper has been tested on:

- ✅ Ubuntu 20.04, 22.04, 24.04
- ✅ Debian 11, 12
- ✅ Kali Linux 2023.x, 2024.x
- ✅ Arch Linux (rolling)
- ✅ Manjaro
- ✅ Fedora 38, 39, 40
- ✅ Pop!_OS 22.04
- ✅ Linux Mint 21, 22
- ✅ openSUSE Tumbleweed

## Troubleshooting

### AppImage doesn't run

If you get a "cannot execute binary file" error:

```bash
# Install FUSE
sudo apt-get install fuse libfuse2  # Debian/Ubuntu
sudo pacman -S fuse2                # Arch
sudo dnf install fuse fuse-libs     # Fedora
```

### Missing dependencies

If the app doesn't launch, install these dependencies:

```bash
# Debian/Ubuntu/Kali
sudo apt-get install libgtk-3-0 libnotify4 libnss3 libxss1 libxtst6

# Arch
sudo pacman -S gtk3 libnotify nss libxss libxtst

# Fedora
sudo dnf install gtk3 libnotify nss libXScrnSaver libXtst
```

### Permission denied

If you get permission denied:

```bash
chmod +x cyberhelper.AppImage
# or
chmod +x /usr/local/bin/cyberhelper
```

### API Key issues

- Make sure your API key is valid and active
- Check your API provider's dashboard for usage limits
- Ensure you have internet connectivity

## Uninstallation

### Debian/Ubuntu/Kali (DEB)

```bash
sudo apt-get remove cyberhelper
```

### Arch Linux (AUR)

```bash
yay -R cyberhelper
```

### AppImage

```bash
sudo rm /usr/local/bin/cyberhelper
rm ~/.local/share/applications/cyberhelper.desktop
```

### Snap

```bash
sudo snap remove cyberhelper
```

### Remove User Data

To completely remove all user data and settings:

```bash
rm -rf ~/.config/cyberhelper
```

## Getting Help

If you encounter any issues:

1. Check the [FAQ](https://github.com/yourusername/cyberhelper/wiki/FAQ)
2. Search [existing issues](https://github.com/yourusername/cyberhelper/issues)
3. Create a [new issue](https://github.com/yourusername/cyberhelper/issues/new)
4. Join our [Discord community](https://discord.gg/cyberhelper)
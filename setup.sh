#!/bin/bash

# CyberHelper Auto Setup Script
# One command to install everything!

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Art Banner
echo -e "${CYAN}"
cat << "EOF"
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ██████╗██╗   ██╗██████╗ ███████╗██████╗               ║
║  ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗              ║
║  ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝              ║
║  ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗              ║
║  ╚██████╗   ██║   ██████╔╝███████╗██║  ██║              ║
║   ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝              ║
║                                                           ║
║        HELPER - AI Assistant for Linux                    ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

echo -e "${GREEN}🚀 Starting CyberHelper Auto Setup...${NC}\n"

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo -e "${RED}❌ Please do NOT run this script as root or with sudo${NC}"
    echo -e "${YELLOW}ℹ️  The script will ask for sudo password when needed${NC}"
    exit 1
fi

# Detect OS
echo -e "${BLUE}🔍 Detecting your Linux distribution...${NC}"
if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO=$ID
    VERSION=$VERSION_ID
else
    DISTRO="unknown"
fi

echo -e "${GREEN}✓ Detected: $DISTRO $VERSION${NC}\n"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Step 1: Install Node.js and npm
echo -e "${BLUE}📦 Step 1/5: Checking Node.js and npm...${NC}"

if command_exists node && command_exists npm; then
    NODE_VERSION=$(node -v)
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓ Node.js $NODE_VERSION already installed${NC}"
    echo -e "${GREEN}✓ npm $NPM_VERSION already installed${NC}"
else
    echo -e "${YELLOW}⚠️  Node.js not found. Installing...${NC}"

    case "$DISTRO" in
        ubuntu|debian|kali)
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
        fedora|rhel|centos)
            curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
            sudo dnf install -y nodejs
            ;;
        arch|manjaro)
            sudo pacman -S --noconfirm nodejs npm
            ;;
        *)
            echo -e "${RED}❌ Unsupported distribution. Please install Node.js 18+ manually.${NC}"
            echo -e "${CYAN}Visit: https://nodejs.org/${NC}"
            exit 1
            ;;
    esac

    echo -e "${GREEN}✓ Node.js and npm installed successfully!${NC}"
fi

echo ""

# Step 2: Install System Dependencies
echo -e "${BLUE}📦 Step 2/5: Installing system dependencies...${NC}"

case "$DISTRO" in
    ubuntu|debian|kali)
        sudo apt-get update
        sudo apt-get install -y \
            libgtk-3-0 \
            libnotify4 \
            libnss3 \
            libxss1 \
            libxtst6 \
            xdg-utils \
            libatspi2.0-0 \
            libdrm2 \
            libgbm1 \
            libasound2 \
            git
        ;;
    fedora|rhel|centos)
        sudo dnf install -y \
            gtk3 \
            libnotify \
            nss \
            libXScrnSaver \
            libXtst \
            xdg-utils \
            at-spi2-core \
            libdrm \
            mesa-libgbm \
            alsa-lib \
            git
        ;;
    arch|manjaro)
        sudo pacman -S --noconfirm \
            gtk3 \
            libnotify \
            nss \
            libxss \
            libxtst \
            xdg-utils \
            at-spi2-core \
            libdrm \
            mesa \
            alsa-lib \
            git
        ;;
esac

echo -e "${GREEN}✓ System dependencies installed!${NC}\n"

# Step 3: Install npm dependencies
echo -e "${BLUE}📦 Step 3/5: Installing npm packages...${NC}"
echo -e "${YELLOW}⏳ This may take 2-3 minutes...${NC}"

npm install --silent

echo -e "${GREEN}✓ npm packages installed successfully!${NC}\n"

# Step 4: Build the application
echo -e "${BLUE}🔨 Step 4/5: Building CyberHelper...${NC}"
echo -e "${YELLOW}⏳ Building React app...${NC}"

npm run build > /dev/null 2>&1

echo -e "${GREEN}✓ React app built successfully!${NC}"
echo -e "${YELLOW}⏳ Building Electron app...${NC}"

npm run build:electron > /dev/null 2>&1

echo -e "${GREEN}✓ Electron app built successfully!${NC}\n"

# Step 5: Create desktop shortcut
echo -e "${BLUE}🖥️  Step 5/5: Creating desktop shortcut...${NC}"

DESKTOP_FILE="$HOME/.local/share/applications/cyberhelper.desktop"
mkdir -p "$HOME/.local/share/applications"

cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=CyberHelper
Comment=AI-Powered Chat Assistant for Linux
Exec=$(pwd)/node_modules/.bin/electron $(pwd)/dist/main/main.js
Icon=$(pwd)/assets/logo.svg
Categories=Utility;Network;Development;
Terminal=false
StartupWMClass=CyberHelper
Keywords=AI;Chat;Assistant;GPT;Claude;
EOF

chmod +x "$DESKTOP_FILE"

echo -e "${GREEN}✓ Desktop shortcut created!${NC}\n"

# Create launch script
echo -e "${BLUE}📝 Creating launch script...${NC}"

LAUNCH_SCRIPT="cyberhelper"

cat > "$LAUNCH_SCRIPT" << 'EOF'
#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"
npm start
EOF

chmod +x "$LAUNCH_SCRIPT"

echo -e "${GREEN}✓ Launch script created!${NC}\n"

# Installation Complete!
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                                                           ║${NC}"
echo -e "${GREEN}║          ✨ INSTALLATION COMPLETE! ✨                      ║${NC}"
echo -e "${GREEN}║                                                           ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${CYAN}🎉 CyberHelper is ready to use!${NC}\n"

echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📚 Quick Start Guide:${NC}"
echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${CYAN}🚀 Launch CyberHelper:${NC}"
echo -e "   ${GREEN}./cyberhelper${NC}"
echo -e "   ${YELLOW}OR${NC}"
echo -e "   ${GREEN}npm start${NC}"
echo -e "   ${YELLOW}OR${NC}"
echo -e "   ${GREEN}Search 'CyberHelper' in your applications menu${NC}\n"

echo -e "${CYAN}⚙️  Setup (First Time):${NC}"
echo -e "   1. Click Settings icon (⚙️) in sidebar"
echo -e "   2. Go to 'AI Providers' tab"
echo -e "   3. ${GREEN}Enable any FREE provider:${NC}"
echo -e "      ${YELLOW}• Groq${NC} - Ultra fast (Free)"
echo -e "      ${YELLOW}• APMix${NC} - GPT-4o, Claude, Gemini (Free)"
echo -e "      ${YELLOW}• ApiNex${NC} - GPT-4 Turbo, Claude Opus (Free)"
echo -e "      ${YELLOW}• OpenRouter${NC} - Multiple models (Free tier)"
echo -e "      ${YELLOW}• ByteX, LLM7, FreeAI, Zenmux${NC} (All Free)"
echo -e "   4. ${GREEN}Most free providers need NO API key!${NC}"
echo -e "   5. Just enable and start chatting!\n"

echo -e "${CYAN}💡 For Premium Providers:${NC}"
echo -e "   ${YELLOW}• OpenAI:${NC} https://platform.openai.com/api-keys"
echo -e "   ${YELLOW}• Anthropic:${NC} https://console.anthropic.com/"
echo -e "   ${YELLOW}• Google Gemini:${NC} https://makersuite.google.com/app/apikey\n"

echo -e "${CYAN}📖 Documentation:${NC}"
echo -e "   ${GREEN}• README.md${NC} - Overview"
echo -e "   ${GREEN}• QUICKSTART.md${NC} - 5-minute guide"
echo -e "   ${GREEN}• USAGE.md${NC} - Complete manual\n"

echo -e "${CYAN}🐛 Need Help?${NC}"
echo -e "   ${GREEN}• GitHub:${NC} https://github.com/thecnical/cyberhelper"
echo -e "   ${GREEN}• Issues:${NC} https://github.com/thecnical/cyberhelper/issues\n"

echo -e "${PURPLE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${GREEN}✨ Enjoy using CyberHelper! ✨${NC}\n"

echo -e "${CYAN}💚 If you like it, please star the repo: ⭐${NC}"
echo -e "${BLUE}   https://github.com/thecnical/cyberhelper${NC}\n"
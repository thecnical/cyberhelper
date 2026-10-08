#!/bin/bash

# CyberHelper Installation Script for Linux
# This script installs CyberHelper on various Linux distributions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Detect Linux distribution
detect_distro() {
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        DISTRO=$ID
        VERSION=$VERSION_ID
    elif [ -f /etc/lsb-release ]; then
        . /etc/lsb-release
        DISTRO=$DISTRIB_ID
        VERSION=$DISTRIB_RELEASE
    else
        DISTRO="unknown"
    fi

    print_info "Detected distribution: $DISTRO $VERSION"
}

# Check if running as root
check_root() {
    if [ "$EUID" -eq 0 ]; then
        print_error "Please do not run this script as root or with sudo"
        print_info "The script will ask for sudo password when needed"
        exit 1
    fi
}

# Check system requirements
check_requirements() {
    print_info "Checking system requirements..."

    # Check available disk space (need at least 500MB)
    AVAILABLE_SPACE=$(df -m . | awk 'NR==2 {print $4}')
    if [ "$AVAILABLE_SPACE" -lt 500 ]; then
        print_error "Not enough disk space. Need at least 500MB free."
        exit 1
    fi

    # Check if curl or wget is available
    if ! command -v curl &> /dev/null && ! command -v wget &> /dev/null; then
        print_error "Neither curl nor wget found. Please install one of them."
        exit 1
    fi

    print_success "System requirements met"
}

# Install dependencies for Debian/Ubuntu/Kali
install_debian_deps() {
    print_info "Installing dependencies for Debian-based system..."
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
        libasound2
    print_success "Dependencies installed"
}

# Install dependencies for Arch Linux
install_arch_deps() {
    print_info "Installing dependencies for Arch Linux..."
    sudo pacman -Sy --noconfirm \
        gtk3 \
        libnotify \
        nss \
        libxss \
        libxtst \
        xdg-utils \
        at-spi2-core \
        libdrm \
        mesa \
        alsa-lib
    print_success "Dependencies installed"
}

# Install dependencies for Fedora
install_fedora_deps() {
    print_info "Installing dependencies for Fedora..."
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
        alsa-lib
    print_success "Dependencies installed"
}

# Download and install CyberHelper
install_cyberhelper() {
    print_info "Downloading CyberHelper..."

    # Create temporary directory
    TMP_DIR=$(mktemp -d)
    cd "$TMP_DIR"

    # Determine download URL based on distro
    RELEASE_URL="https://github.com/yourusername/cyberhelper/releases/latest/download"

    case "$DISTRO" in
        ubuntu|debian|kali)
            PACKAGE_FILE="cyberhelper_amd64.deb"
            print_info "Downloading DEB package..."
            if command -v curl &> /dev/null; then
                curl -L -o "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            else
                wget -O "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            fi
            print_info "Installing DEB package..."
            sudo dpkg -i "$PACKAGE_FILE"
            sudo apt-get install -f -y
            ;;
        arch|manjaro)
            PACKAGE_FILE="cyberhelper.AppImage"
            print_info "Downloading AppImage..."
            if command -v curl &> /dev/null; then
                curl -L -o "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            else
                wget -O "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            fi
            chmod +x "$PACKAGE_FILE"
            sudo mv "$PACKAGE_FILE" /usr/local/bin/cyberhelper
            create_desktop_entry
            ;;
        fedora|rhel|centos)
            PACKAGE_FILE="cyberhelper.AppImage"
            print_info "Downloading AppImage..."
            if command -v curl &> /dev/null; then
                curl -L -o "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            else
                wget -O "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            fi
            chmod +x "$PACKAGE_FILE"
            sudo mv "$PACKAGE_FILE" /usr/local/bin/cyberhelper
            create_desktop_entry
            ;;
        *)
            print_warning "Unsupported distribution, installing AppImage..."
            PACKAGE_FILE="cyberhelper.AppImage"
            if command -v curl &> /dev/null; then
                curl -L -o "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            else
                wget -O "$PACKAGE_FILE" "$RELEASE_URL/$PACKAGE_FILE"
            fi
            chmod +x "$PACKAGE_FILE"
            sudo mv "$PACKAGE_FILE" /usr/local/bin/cyberhelper
            create_desktop_entry
            ;;
    esac

    # Cleanup
    cd -
    rm -rf "$TMP_DIR"

    print_success "CyberHelper installed successfully!"
}

# Create desktop entry for AppImage installations
create_desktop_entry() {
    print_info "Creating desktop entry..."

    DESKTOP_FILE="$HOME/.local/share/applications/cyberhelper.desktop"
    mkdir -p "$HOME/.local/share/applications"

    cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=CyberHelper
Comment=AI-powered chat assistant for Linux
Exec=/usr/local/bin/cyberhelper
Icon=cyberhelper
Categories=Utility;Network;
Terminal=false
StartupWMClass=CyberHelper
EOF

    chmod +x "$DESKTOP_FILE"
    print_success "Desktop entry created"
}

# Main installation flow
main() {
    echo ""
    echo "╔═══════════════════════════════════════╗"
    echo "║                                       ║"
    echo "║       CyberHelper Installer          ║"
    echo "║   AI Assistant for Linux v1.0.0      ║"
    echo "║                                       ║"
    echo "╚═══════════════════════════════════════╝"
    echo ""

    check_root
    detect_distro
    check_requirements

    # Install distribution-specific dependencies
    case "$DISTRO" in
        ubuntu|debian|kali)
            install_debian_deps
            ;;
        arch|manjaro)
            install_arch_deps
            ;;
        fedora|rhel|centos)
            install_fedora_deps
            ;;
        *)
            print_warning "Unknown distribution. Attempting generic installation..."
            ;;
    esac

    # Install CyberHelper
    install_cyberhelper

    echo ""
    print_success "Installation complete!"
    print_info "You can now launch CyberHelper from your applications menu or by running 'cyberhelper' in terminal"
    print_info "Configure your AI provider API keys in Settings before first use"
    echo ""
}

# Run main function
main
# Contributing to CyberHelper

Thank you for your interest in contributing to CyberHelper! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Submitting Changes](#submitting-changes)
6. [Code Style](#code-style)
7. [Testing](#testing)
8. [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Linux operating system (for testing)
- Text editor or IDE (VS Code recommended)

### Finding Issues to Work On

1. Check the [issue tracker](https://github.com/yourusername/cyberhelper/issues)
2. Look for issues labeled:
   - `good first issue` - Great for newcomers
   - `help wanted` - We need contributors
   - `bug` - Something isn't working
   - `enhancement` - New features

3. Comment on the issue to let others know you're working on it

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/cyberhelper.git
cd cyberhelper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

This starts:
- Vite dev server on `http://localhost:5173`
- Electron window with hot reload

### 4. Project Structure

```
cyberhelper/
├── electron/          # Electron main process
│   ├── main.ts       # Main entry point
│   └── preload.ts    # Preload script
├── src/              # React application
│   ├── components/   # UI components
│   ├── services/     # AI service integrations
│   ├── types.ts      # TypeScript types
│   ├── store.ts      # State management
│   └── App.tsx       # Main app component
├── assets/           # Icons and images
└── public/           # Static files
```

## Making Changes

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Adding tests

### 2. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run in development mode
npm run dev

# Build the application
npm run build

# Test the build
npm start
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Example:
```
feat: add support for GPT-4 Turbo model
fix: resolve markdown rendering issue
docs: update installation instructions
```

## Submitting Changes

### 1. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 2. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template:
   - Description of changes
   - Related issue numbers
   - Screenshots (if UI changes)
   - Testing done

### 3. PR Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

## Code Style

### TypeScript/JavaScript

```typescript
// Use descriptive variable names
const userMessage = 'Hello';

// Use arrow functions for callbacks
const handleClick = () => {
  console.log('Clicked');
};

// Use async/await over promises
async function fetchData() {
  const response = await fetch(url);
  return response.json();
}

// Use optional chaining
const title = conversation?.title ?? 'Untitled';
```

### React Components

```typescript
// Use functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  return (
    <div className="my-component">
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### CSS

```css
/* Use CSS custom properties for theming */
.component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

/* Use meaningful class names */
.chat-message {}
.sidebar-header {}

/* Group related properties */
.button {
  /* Display & Box Model */
  display: flex;
  padding: 10px;
  
  /* Colors */
  background-color: var(--accent-primary);
  color: white;
  
  /* Typography */
  font-size: 14px;
  font-weight: 600;
  
  /* Other */
  cursor: pointer;
  transition: all 0.2s ease;
}
```

## Testing

### Manual Testing

1. **UI Testing**
   - Test all user interactions
   - Verify responsive design
   - Check dark/light themes
   - Test keyboard shortcuts

2. **Feature Testing**
   - Test with different AI providers
   - Verify conversation management
   - Check settings persistence
   - Test edge cases

3. **Cross-platform Testing**
   - Test on different Linux distributions
   - Verify package installations
   - Check system integration

### Automated Testing (Coming Soon)

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e
```

## Documentation

### Code Documentation

```typescript
/**
 * Sends a message to the AI provider
 * @param messages - Array of conversation messages
 * @param config - Provider configuration
 * @param onStream - Optional callback for streaming responses
 * @returns Promise resolving to the AI response
 */
async sendMessage(
  messages: Message[],
  config: ProviderConfig,
  onStream?: (chunk: string) => void
): Promise<string> {
  // Implementation
}
```

### User Documentation

When adding features:
1. Update relevant `.md` files
2. Add examples and screenshots
3. Update the changelog

## Adding New Features

### Adding a New AI Provider

1. **Update Types**
```typescript
// src/types.ts
export type AIProvider = 'openai' | 'anthropic' | 'google' | 'ollama' | 'newprovider';
```

2. **Add to AI Service**
```typescript
// src/services/ai.service.ts
private async sendNewProviderMessage(...) {
  // Implementation
}
```

3. **Add Models**
```typescript
// src/types.ts
export const AVAILABLE_MODELS: Record<AIProvider, AIModel[]> = {
  // ...
  newprovider: [
    {
      id: 'model-id',
      name: 'Model Name',
      provider: 'newprovider',
      contextWindow: 8192,
    },
  ],
};
```

4. **Update Settings UI**
```typescript
// src/components/Settings.tsx
const providerLabels: Record<AIProvider, string> = {
  // ...
  newprovider: 'New Provider',
};
```

5. **Test Thoroughly**
   - Test message sending
   - Test streaming responses
   - Test error handling
   - Document API key setup

## Release Process

### Version Numbering

We use [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Creating a Release

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. GitHub Actions will build and publish

## Getting Help

If you need help:

1. Check existing [documentation](https://github.com/yourusername/cyberhelper/wiki)
2. Search [closed issues](https://github.com/yourusername/cyberhelper/issues?q=is%3Aissue+is%3Aclosed)
3. Ask in [Discussions](https://github.com/yourusername/cyberhelper/discussions)
4. Join our [Discord](https://discord.gg/cyberhelper)

## Recognition

Contributors will be:
- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- Added to the GitHub contributors list

Thank you for contributing to CyberHelper! 🎉
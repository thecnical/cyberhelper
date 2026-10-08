# CyberHelper Usage Guide

A comprehensive guide to using CyberHelper effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Interface Overview](#interface-overview)
3. [Using AI Providers](#using-ai-providers)
4. [Conversation Management](#conversation-management)
5. [Keyboard Shortcuts](#keyboard-shortcuts)
6. [Advanced Features](#advanced-features)
7. [Tips and Best Practices](#tips-and-best-practices)

## Getting Started

### First Launch

1. **Launch the Application**
   - Open from Applications menu or run `cyberhelper` in terminal

2. **Configure API Keys**
   - Click Settings (⚙️) in the sidebar
   - Navigate to "AI Providers" tab
   - Enable at least one provider
   - Enter your API key
   - Choose a model

3. **Start Your First Conversation**
   - Click "New chat" button
   - Type your message in the input box
   - Press Enter to send

## Interface Overview

### Main Components

```
┌─────────────┬───────────────────────────────────────┐
│             │  Chat Header (Model, Theme, Clear)    │
│  Sidebar    ├───────────────────────────────────────┤
│             │                                       │
│  - Search   │                                       │
│  - Chats    │         Messages Area                │
│  - Settings │                                       │
│             │                                       │
│             ├───────────────────────────────────────┤
│             │      Input Area (Type message)        │
└─────────────┴───────────────────────────────────────┘
```

### Sidebar

- **New Chat**: Start a fresh conversation
- **Search**: Find conversations by title or content
- **Conversation List**: Browse your chat history organized by date
- **Settings**: Configure providers and preferences

### Chat Area

- **Model Selector**: Switch between AI providers and models
- **Theme Toggle**: Switch between dark and light mode
- **Clear Chat**: Delete all messages in current conversation
- **Messages**: View the conversation history
- **Input Box**: Type and send messages

## Using AI Providers

### OpenAI (GPT)

**Best for**: General knowledge, creative writing, coding

**Available Models**:
- GPT-4 Turbo: Most capable, best for complex tasks
- GPT-4: Powerful for complex reasoning
- GPT-3.5 Turbo: Fast and cost-effective

**Example Use Cases**:
```
"Explain quantum computing in simple terms"
"Write a Python script to analyze CSV data"
"Help me debug this JavaScript error: ..."
```

### Anthropic Claude

**Best for**: Long documents, detailed analysis, ethical reasoning

**Available Models**:
- Claude 3.5 Sonnet: Most intelligent, best overall
- Claude 3 Opus: Powerful for complex tasks
- Claude 3 Sonnet: Balanced performance
- Claude 3 Haiku: Fast and efficient

**Example Use Cases**:
```
"Analyze this 10-page document and summarize key points"
"Review this code for security vulnerabilities"
"Help me write a professional email"
```

### Google Gemini

**Best for**: Multimodal tasks, research, information synthesis

**Available Models**:
- Gemini Pro: Powerful multimodal model
- Gemini Pro Vision: With vision capabilities

**Example Use Cases**:
```
"Research recent developments in AI safety"
"Explain the differences between Linux distributions"
"Help me understand this technical paper"
```

### Ollama (Local)

**Best for**: Privacy, offline usage, custom models

**Available Models** (install via Ollama):
- Llama 2: Open source, runs locally
- Mistral: Efficient local model
- Code Llama: Specialized for coding

**Setup**:
```bash
# Install Ollama
curl https://ollama.ai/install.sh | sh

# Pull a model
ollama pull llama2

# Configure in CyberHelper
# Base URL: http://localhost:11434
# Model: llama2
```

## Conversation Management

### Creating Conversations

1. Click "New chat" button
2. Start typing your message
3. The conversation title is auto-generated from your first message

### Organizing Conversations

Conversations are automatically grouped by:
- Today
- Yesterday
- Previous 7 Days
- Previous 30 Days
- Older

### Searching Conversations

1. Click the search box in sidebar
2. Type keywords from the conversation
3. Results filter in real-time

### Deleting Conversations

1. Hover over a conversation in the sidebar
2. Click the trash icon
3. Confirm deletion

### Clearing Messages

- Click "Clear chat" button in header to delete all messages in current conversation
- The conversation remains but messages are removed

## Keyboard Shortcuts

### General

- `Ctrl + N` - New conversation
- `Ctrl + ,` - Open settings
- `Ctrl + K` - Focus search
- `Ctrl + B` - Toggle sidebar

### Message Input

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Ctrl + /` - Clear input

### Navigation

- `↑` / `↓` - Navigate conversations
- `Escape` - Close settings/dialogs

## Advanced Features

### Markdown Support

CyberHelper fully supports markdown formatting:

```markdown
# Heading 1
## Heading 2

**Bold text**
*Italic text*

- Bullet list
1. Numbered list

[Link](https://example.com)

`inline code`

```python
# Code block
print("Hello World")
```

> Blockquote
```

### Code Syntax Highlighting

Code blocks automatically get syntax highlighting:

- 100+ languages supported
- Copy button for easy code copying
- Dark/light theme aware

### Streaming Responses

Messages appear in real-time as the AI generates them:

- Enable in Settings > Preferences > "Stream responses"
- See responses word-by-word
- Stop generation anytime

### Conversation History

Your conversations are automatically saved:

- Persistent across app restarts
- Stored securely on your device
- Toggle in Settings > Preferences > "Save conversation history"

### Custom API Endpoints

Connect to OpenAI-compatible APIs:

1. Enable "Custom API" in Settings
2. Enter your base URL (e.g., `https://api.example.com`)
3. Provide API key
4. Specify model name

## Tips and Best Practices

### Getting Better Responses

1. **Be Specific**
   - ❌ "Tell me about Python"
   - ✅ "Explain Python list comprehensions with 3 examples"

2. **Provide Context**
   - ❌ "Fix this code: [code]"
   - ✅ "I'm getting error X when running this Python script: [code]. I'm trying to [goal]."

3. **Break Down Complex Tasks**
   - ❌ "Build me a complete web app"
   - ✅ "Help me design the database schema for a blog app with users and posts"

4. **Iterate and Refine**
   - Start with a broad question
   - Ask follow-up questions
   - Request clarification or examples

### Choosing the Right Model

- **Quick tasks**: GPT-3.5 Turbo, Claude Haiku
- **Complex reasoning**: GPT-4, Claude 3.5 Sonnet
- **Long documents**: Claude 3 Opus (200K context)
- **Privacy-sensitive**: Ollama (local models)
- **Budget-conscious**: GPT-3.5 Turbo

### Managing API Costs

1. **Use appropriate models**
   - Don't use GPT-4 for simple tasks
   - Start with cheaper models

2. **Monitor usage**
   - Check provider dashboards regularly
   - Set spending limits on provider websites

3. **Optimize prompts**
   - Be concise but clear
   - Avoid redundant context

### Security Best Practices

1. **API Keys**
   - Never share your API keys
   - Rotate keys periodically
   - Use separate keys for testing

2. **Sensitive Information**
   - Don't share passwords or private keys
   - Avoid personal identifying information
   - Use local models (Ollama) for sensitive data

3. **Data Privacy**
   - All data stored locally on your device
   - API keys are encrypted
   - Disable history for sensitive conversations

## Troubleshooting

### AI Not Responding

1. Check your API key is correct
2. Verify internet connection
3. Check provider status page
4. Try a different model

### Slow Responses

1. Try a faster model (GPT-3.5, Haiku)
2. Check your internet speed
3. Reduce message length
4. Clear old conversations

### App Crashes

1. Check system resources (RAM/CPU)
2. Update to latest version
3. Clear app cache: `rm -rf ~/.config/cyberhelper/cache`
4. Report issue on GitHub

### Formatting Issues

1. Ensure markdown is properly formatted
2. Check code block language specifiers
3. Try toggling dark/light mode

## Getting Help

- **Documentation**: https://github.com/yourusername/cyberhelper/wiki
- **Issues**: https://github.com/yourusername/cyberhelper/issues
- **Discord**: https://discord.gg/cyberhelper
- **Email**: support@cyberhelper.dev

## Contributing

Want to contribute?

1. Check out our [Contributing Guide](CONTRIBUTING.md)
2. Look for [good first issues](https://github.com/yourusername/cyberhelper/labels/good-first-issue)
3. Join our Discord community

---

**Happy chatting with CyberHelper!** 🚀
import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store';
import { aiService } from '../services/ai.service';
import Message from './Message';
import './ChatArea.css';

const ChatArea = () => {
  const {
    currentConversation,
    addMessage,
    clearCurrentConversation,
    providers,
    currentProvider,
    setProvider,
    isStreaming,
    setStreaming,
    toggleSidebar,
    sidebarOpen,
    theme,
    setTheme,
  } = useStore();

  const [input, setInput] = useState('');
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, streamingContent]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const providerConfig = providers[currentProvider];
    if (!providerConfig.enabled || !providerConfig.apiKey) {
      alert(`Please configure ${currentProvider} API key in Settings`);
      return;
    }

    const userMessage = {
      id: Math.random().toString(36).substring(2),
      role: 'user' as const,
      content: input.trim(),
      timestamp: Date.now(),
    };

    addMessage(userMessage);
    setInput('');
    setStreaming(true);
    setStreamingContent('');

    try {
      const messages = currentConversation ? [...currentConversation.messages, userMessage] : [userMessage];

      const response = await aiService.sendMessage(messages, providerConfig, (chunk) => {
        setStreamingContent((prev) => prev + chunk);
      });

      const assistantMessage = {
        id: Math.random().toString(36).substring(2),
        role: 'assistant' as const,
        content: response,
        timestamp: Date.now(),
        provider: currentProvider,
        model: providerConfig.model,
      };

      addMessage(assistantMessage);
    } catch (error: any) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Math.random().toString(36).substring(2),
        role: 'assistant' as const,
        content: `Error: ${error.message || 'Failed to get response from AI provider'}`,
        timestamp: Date.now(),
      };
      addMessage(errorMessage);
    } finally {
      setStreaming(false);
      setStreamingContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear this conversation?')) {
      clearCurrentConversation();
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="header-left">
          {!sidebarOpen && (
            <button className="menu-btn" onClick={toggleSidebar} title="Open sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <div className="model-selector">
            <select value={currentProvider} onChange={(e) => setProvider(e.target.value as any)}>
              {Object.entries(providers).map(([key, config]) => (
                <option key={key} value={key} disabled={!config.enabled}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {config.enabled ? ` - ${config.model}` : ' (Not configured)'}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="header-right">
          <button
            className="icon-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="5" strokeWidth="2" />
                <line x1="12" y1="1" x2="12" y2="3" strokeWidth="2" strokeLinecap="round" />
                <line x1="12" y1="21" x2="12" y2="23" strokeWidth="2" strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeWidth="2" strokeLinecap="round" />
                <line x1="1" y1="12" x2="3" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="21" y1="12" x2="23" y2="12" strokeWidth="2" strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeWidth="2" strokeLinecap="round" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <button className="icon-btn" onClick={handleClearChat} title="Clear chat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="3 6 5 6 21 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {currentConversation?.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isStreaming && streamingContent && (
            <Message
              message={{
                id: 'streaming',
                role: 'assistant',
                content: streamingContent,
                timestamp: Date.now(),
              }}
              isStreaming
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="input-area">
        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            rows={1}
            disabled={isStreaming}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            title="Send message"
          >
            {isStreaming ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="6" y="6" width="12" height="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            )}
          </button>
        </div>
        <div className="input-footer">
          <span className="footer-text">CyberHelper can make mistakes. Check important info.</span>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
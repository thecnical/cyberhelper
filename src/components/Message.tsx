import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useStore } from '../store';
import { Message as MessageType } from '../types';
import './Message.css';

interface MessageProps {
  message: MessageType;
  isStreaming?: boolean;
}

const Message = ({ message, isStreaming }: MessageProps) => {
  const { theme } = useStore();
  const isUser = message.role === 'user';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={`message ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-avatar">
        {isUser ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="7" r="4" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.26-7-9V8.3l7-3.5 7 3.5V11c0 3.74-3.13 8.04-7 9zm-1-8V7h2v5h5v2h-5v5h-2v-5H6v-2h5z" />
          </svg>
        )}
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-sender">{isUser ? 'You' : 'CyberHelper'}</span>
          {message.provider && (
            <span className="message-meta">
              {message.provider} • {message.model}
            </span>
          )}
        </div>
        <div className="message-body">
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                code({ className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeString = String(children).replace(/\n$/, '');
                  const inline = !className;

                  return !inline && match ? (
                    <div className="code-block">
                      <div className="code-header">
                        <span className="code-language">{match[1]}</span>
                        <button
                          className="copy-btn"
                          onClick={() => copyToClipboard(codeString)}
                          title="Copy code"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
                          </svg>
                          Copy
                        </button>
                      </div>
                      <SyntaxHighlighter
                        style={theme === 'dark' ? oneDark as any : oneLight as any}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {codeString}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="inline-code" {...props}>
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="markdown-paragraph">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="markdown-list">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="markdown-list">{children}</ol>;
                },
                li({ children }) {
                  return <li className="markdown-list-item">{children}</li>;
                },
                h1({ children }) {
                  return <h1 className="markdown-h1">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="markdown-h2">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="markdown-h3">{children}</h3>;
                },
                blockquote({ children }) {
                  return <blockquote className="markdown-blockquote">{children}</blockquote>;
                },
                a({ href, children }) {
                  return (
                    <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                },
                table({ children }) {
                  return <table className="markdown-table">{children}</table>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
          {isStreaming && (
            <span className="streaming-cursor" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
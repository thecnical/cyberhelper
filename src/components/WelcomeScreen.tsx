import { useStore } from '../store';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const { createConversation, providers } = useStore();

  const examplePrompts = [
    {
      icon: '💡',
      title: 'Explain a concept',
      prompt: 'Explain quantum computing in simple terms',
    },
    {
      icon: '💻',
      title: 'Write code',
      prompt: 'Write a Python function to find prime numbers',
    },
    {
      icon: '🔍',
      title: 'Get advice',
      prompt: 'How can I improve my Linux system security?',
    },
    {
      icon: '✍️',
      title: 'Help with writing',
      prompt: 'Help me write a professional email',
    },
  ];

  const handleExampleClick = (prompt: string) => {
    createConversation();
    // The prompt will be set in the chat area
    setTimeout(() => {
      const textarea = document.querySelector('.input-container textarea') as HTMLTextAreaElement;
      if (textarea) {
        textarea.value = prompt;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.focus();
      }
    }, 100);
  };

  const hasConfiguredProvider = Object.values(providers).some((p) => p.enabled && p.apiKey);

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-header">
          <div className="app-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.26-7-9V8.3l7-3.5 7 3.5V11c0 3.74-3.13 8.04-7 9zm-1-8V7h2v5h5v2h-5v5h-2v-5H6v-2h5z" />
            </svg>
          </div>
          <h1 className="welcome-title">Welcome to CyberHelper</h1>
          <p className="welcome-subtitle">
            Your powerful AI assistant for Linux. Choose from multiple AI providers and get started.
          </p>
        </div>

        {!hasConfiguredProvider ? (
          <div className="setup-notice">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <div>
              <h3>Configure API Keys</h3>
              <p>To get started, please configure at least one AI provider in Settings.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="capabilities">
              <h2>What can I help you with?</h2>
              <div className="capabilities-grid">
                <div className="capability-card">
                  <div className="capability-icon">💬</div>
                  <h3>Natural Conversations</h3>
                  <p>Chat naturally about any topic</p>
                </div>
                <div className="capability-card">
                  <div className="capability-icon">🧠</div>
                  <h3>Problem Solving</h3>
                  <p>Get help with complex problems</p>
                </div>
                <div className="capability-card">
                  <div className="capability-icon">📚</div>
                  <h3>Learning</h3>
                  <p>Learn new concepts and skills</p>
                </div>
                <div className="capability-card">
                  <div className="capability-icon">⚙️</div>
                  <h3>Technical Help</h3>
                  <p>Linux commands, coding, debugging</p>
                </div>
              </div>
            </div>

            <div className="examples">
              <h2>Try an example</h2>
              <div className="examples-grid">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    className="example-card"
                    onClick={() => handleExampleClick(example.prompt)}
                  >
                    <span className="example-icon">{example.icon}</span>
                    <div className="example-content">
                      <h4>{example.title}</h4>
                      <p>{example.prompt}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="welcome-footer">
          <button className="start-btn" onClick={createConversation}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Start New Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
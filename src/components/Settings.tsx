import { useState } from 'react';
import { useStore } from '../store';
import { AIProvider, AVAILABLE_MODELS } from '../types';
import './Settings.css';

const Settings = () => {
  const { toggleSettings, providers, updateProviderConfig, settings, updateSettings } = useStore();
  const [activeTab, setActiveTab] = useState<'providers' | 'preferences'>('providers');

  const providerLabels: Record<AIProvider, string> = {
    openai: 'OpenAI',
    anthropic: 'Anthropic Claude',
    google: 'Google Gemini',
    ollama: 'Ollama (Local)',
    openrouter: 'OpenRouter (Free Tier)',
    groq: 'Groq (Free Tier)',
    bytex: 'ByteX AI (Free)',
    llm7: 'LLM7.io (Free)',
    freeai: 'FreeAI (Free)',
    zenmux: 'Zenmux (Free)',
    apmix: 'APMix AI (Free)',
    apinex: 'ApiNex (Free)',
    custom: 'Custom API',
  };

  const handleProviderChange = (provider: AIProvider, field: string, value: any) => {
    updateProviderConfig(provider, { [field]: value });
  };

  return (
    <div className="settings-overlay" onClick={toggleSettings}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-btn" onClick={toggleSettings}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="settings-tabs">
          <button
            className={`tab ${activeTab === 'providers' ? 'active' : ''}`}
            onClick={() => setActiveTab('providers')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" strokeWidth="2" />
            </svg>
            AI Providers
          </button>
          <button
            className={`tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" strokeWidth="2" />
              <path
                d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Preferences
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'providers' && (
            <div className="providers-section">
              <p className="section-description">
                Configure your AI provider API keys. Your keys are stored securely on your device.
              </p>

              {(Object.keys(providers) as AIProvider[]).map((provider) => (
                <div key={provider} className="provider-card">
                  <div className="provider-header">
                    <div className="provider-title">
                      <h3>{providerLabels[provider]}</h3>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={providers[provider].enabled}
                          onChange={(e) =>
                            handleProviderChange(provider, 'enabled', e.target.checked)
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  {providers[provider].enabled && (
                    <div className="provider-config">
                      <div className="form-group">
                        <label htmlFor={`${provider}-key`}>API Key</label>
                        <input
                          id={`${provider}-key`}
                          type="password"
                          value={providers[provider].apiKey}
                          onChange={(e) => handleProviderChange(provider, 'apiKey', e.target.value)}
                          placeholder={`Enter ${providerLabels[provider]} API key`}
                        />
                        {provider === 'openai' && (
                          <small>
                            Get your API key from{' '}
                            <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
                              OpenAI Platform
                            </a>
                          </small>
                        )}
                        {provider === 'anthropic' && (
                          <small>
                            Get your API key from{' '}
                            <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer">
                              Anthropic Console
                            </a>
                          </small>
                        )}
                        {provider === 'google' && (
                          <small>
                            Get your API key from{' '}
                            <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                              Google AI Studio
                            </a>
                          </small>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor={`${provider}-model`}>Model</label>
                        <select
                          id={`${provider}-model`}
                          value={providers[provider].model}
                          onChange={(e) => handleProviderChange(provider, 'model', e.target.value)}
                        >
                          {AVAILABLE_MODELS[provider].map((model) => (
                            <option key={model.id} value={model.id}>
                              {model.name}
                              {model.description && ` - ${model.description}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {(provider === 'ollama' || provider === 'custom') && (
                        <div className="form-group">
                          <label htmlFor={`${provider}-url`}>Base URL</label>
                          <input
                            id={`${provider}-url`}
                            type="text"
                            value={providers[provider].baseURL || ''}
                            onChange={(e) => handleProviderChange(provider, 'baseURL', e.target.value)}
                            placeholder={provider === 'ollama' ? 'http://localhost:11434' : 'https://api.example.com'}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-section">
              <div className="form-group">
                <label>Font Size</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="12"
                    max="20"
                    value={settings.fontSize}
                    onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                  />
                  <span className="slider-value">{settings.fontSize}px</span>
                </div>
              </div>

              <div className="form-group">
                <label>Max Tokens</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="512"
                    max="4096"
                    step="256"
                    value={settings.maxTokens}
                    onChange={(e) => updateSettings({ maxTokens: parseInt(e.target.value) })}
                  />
                  <span className="slider-value">{settings.maxTokens}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Temperature</label>
                <div className="slider-container">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) => updateSettings({ temperature: parseFloat(e.target.value) })}
                  />
                  <span className="slider-value">{settings.temperature}</span>
                </div>
                <small>Higher values make output more random, lower values more focused</small>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.streamResponses}
                    onChange={(e) => updateSettings({ streamResponses: e.target.checked })}
                  />
                  <span>Stream responses (show AI response in real-time)</span>
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.saveHistory}
                    onChange={(e) => updateSettings({ saveHistory: e.target.checked })}
                  />
                  <span>Save conversation history</span>
                </label>
              </div>

              <div className="about-section">
                <h3>About CyberHelper</h3>
                <p>Version 1.0.0</p>
                <p>A powerful ChatGPT-like desktop application for Linux users.</p>
                <div className="about-links">
                  <a href="https://github.com/yourusername/cyberhelper" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <span>•</span>
                  <a href="https://github.com/yourusername/cyberhelper/issues" target="_blank" rel="noopener noreferrer">
                    Report Issue
                  </a>
                  <span>•</span>
                  <a href="https://github.com/yourusername/cyberhelper/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                    License
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
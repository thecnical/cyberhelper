import { create } from 'zustand';
import { Message, Conversation, ProviderConfig, AppSettings, AIProvider } from './types';

interface AppStore {
  // UI State
  sidebarOpen: boolean;
  settingsOpen: boolean;
  theme: 'light' | 'dark';

  // Conversations
  conversations: Conversation[];
  currentConversation: Conversation | null;

  // Providers
  providers: Record<AIProvider, ProviderConfig>;
  currentProvider: AIProvider;

  // Settings
  settings: AppSettings;

  // Loading states
  isLoading: boolean;
  isStreaming: boolean;

  // Actions
  toggleSidebar: () => void;
  toggleSettings: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Conversation actions
  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  updateConversationTitle: (id: string, title: string) => void;
  addMessage: (message: Message) => void;
  clearCurrentConversation: () => void;

  // Provider actions
  setProvider: (provider: AIProvider) => void;
  updateProviderConfig: (provider: AIProvider, config: Partial<ProviderConfig>) => void;

  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Loading actions
  setLoading: (loading: boolean) => void;
  setStreaming: (streaming: boolean) => void;

  // Persistence
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const defaultSettings: AppSettings = {
  theme: 'dark',
  fontSize: 16,
  defaultProvider: 'openai',
  defaultModel: 'gpt-3.5-turbo',
  streamResponses: true,
  saveHistory: true,
  maxTokens: 2048,
  temperature: 0.7,
};

const defaultProviders: Record<AIProvider, ProviderConfig> = {
  openai: {
    provider: 'openai',
    apiKey: '',
    model: 'gpt-3.5-turbo',
    enabled: false,
  },
  anthropic: {
    provider: 'anthropic',
    apiKey: '',
    model: 'claude-3-5-sonnet-20241022',
    enabled: false,
  },
  google: {
    provider: 'google',
    apiKey: '',
    model: 'gemini-pro',
    enabled: false,
  },
  ollama: {
    provider: 'ollama',
    apiKey: '',
    model: 'llama2',
    baseURL: 'http://localhost:11434',
    enabled: false,
  },
  openrouter: {
    provider: 'openrouter',
    apiKey: '',
    model: 'google/gemini-flash-1.5',
    baseURL: 'https://openrouter.ai/api/v1',
    enabled: false,
  },
  groq: {
    provider: 'groq',
    apiKey: '',
    model: 'llama-3.3-70b-versatile',
    baseURL: 'https://api.groq.com/openai/v1',
    enabled: false,
  },
  bytex: {
    provider: 'bytex',
    apiKey: 'free',
    model: 'gpt-4o-mini',
    baseURL: 'https://api.bytex.ai/v1',
    enabled: false,
  },
  llm7: {
    provider: 'llm7',
    apiKey: 'free',
    model: 'gpt-4o',
    baseURL: 'https://llm7.io/v1',
    enabled: false,
  },
  freeai: {
    provider: 'freeai',
    apiKey: 'free',
    model: 'gpt-3.5-turbo',
    baseURL: 'https://api.freeai.one/v1',
    enabled: false,
  },
  zenmux: {
    provider: 'zenmux',
    apiKey: 'free',
    model: 'gpt-4o-mini',
    baseURL: 'https://zenmux.com/v1',
    enabled: false,
  },
  apmix: {
    provider: 'apmix',
    apiKey: 'free',
    model: 'gpt-4o',
    baseURL: 'https://apmix.ai/v1',
    enabled: false,
  },
  apinex: {
    provider: 'apinex',
    apiKey: 'free',
    model: 'gpt-4-turbo',
    baseURL: 'https://apinex.bond/v1',
    enabled: false,
  },
  custom: {
    provider: 'custom',
    apiKey: '',
    model: '',
    baseURL: '',
    enabled: false,
  },
};

export const useStore = create<AppStore>((set, get) => ({
  // Initial state
  sidebarOpen: true,
  settingsOpen: false,
  theme: 'dark',
  conversations: [],
  currentConversation: null,
  providers: defaultProviders,
  currentProvider: 'openai',
  settings: defaultSettings,
  isLoading: false,
  isStreaming: false,

  // UI actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSettings: () => set((state) => ({ settingsOpen: !state.settingsOpen })),
  setTheme: (theme) => {
    set({ theme });
    document.documentElement.classList.toggle('dark', theme === 'dark');
    get().saveToStorage();
  },

  // Conversation actions
  createConversation: () => {
    const { currentProvider, providers } = get();
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      provider: currentProvider,
      model: providers[currentProvider].model,
    };
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
      currentConversation: newConversation,
    }));
    get().saveToStorage();
  },

  selectConversation: (id) => {
    const conversation = get().conversations.find((c) => c.id === id);
    if (conversation) {
      set({ currentConversation: conversation });
    }
  },

  deleteConversation: (id) => {
    set((state) => {
      const conversations = state.conversations.filter((c) => c.id !== id);
      const currentConversation =
        state.currentConversation?.id === id ? null : state.currentConversation;
      return { conversations, currentConversation };
    });
    get().saveToStorage();
  },

  updateConversationTitle: (id, title) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, title, updatedAt: Date.now() } : c
      ),
      currentConversation:
        state.currentConversation?.id === id
          ? { ...state.currentConversation, title, updatedAt: Date.now() }
          : state.currentConversation,
    }));
    get().saveToStorage();
  },

  addMessage: (message) => {
    set((state) => {
      if (!state.currentConversation) return state;

      const updatedConversation = {
        ...state.currentConversation,
        messages: [...state.currentConversation.messages, message],
        updatedAt: Date.now(),
      };

      // Auto-generate title from first user message
      if (
        updatedConversation.messages.length === 1 &&
        message.role === 'user' &&
        updatedConversation.title === 'New Chat'
      ) {
        updatedConversation.title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
      }

      return {
        currentConversation: updatedConversation,
        conversations: state.conversations.map((c) =>
          c.id === updatedConversation.id ? updatedConversation : c
        ),
      };
    });
    get().saveToStorage();
  },

  clearCurrentConversation: () => {
    set((state) => {
      if (!state.currentConversation) return state;

      const clearedConversation = {
        ...state.currentConversation,
        messages: [],
        updatedAt: Date.now(),
      };

      return {
        currentConversation: clearedConversation,
        conversations: state.conversations.map((c) =>
          c.id === clearedConversation.id ? clearedConversation : c
        ),
      };
    });
    get().saveToStorage();
  },

  // Provider actions
  setProvider: (provider) => {
    set({ currentProvider: provider });
    get().saveToStorage();
  },

  updateProviderConfig: (provider, config) => {
    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: { ...state.providers[provider], ...config },
      },
    }));
    get().saveToStorage();
  },

  // Settings actions
  updateSettings: (settings) => {
    set((state) => ({ settings: { ...state.settings, ...settings } }));
    get().saveToStorage();
  },

  // Loading actions
  setLoading: (loading) => set({ isLoading: loading }),
  setStreaming: (streaming) => set({ isStreaming: streaming }),

  // Persistence
  loadFromStorage: async () => {
    if (!window.electronAPI) return;

    try {
      const [conversations, providers, settings, theme, currentProvider] = await Promise.all([
        window.electronAPI.store.get('conversations'),
        window.electronAPI.store.get('providers'),
        window.electronAPI.store.get('settings'),
        window.electronAPI.store.get('theme'),
        window.electronAPI.store.get('currentProvider'),
      ]);

      set({
        conversations: conversations || [],
        providers: providers || defaultProviders,
        settings: settings || defaultSettings,
        theme: theme || 'dark',
        currentProvider: currentProvider || 'openai',
      });

      document.documentElement.classList.toggle('dark', (theme || 'dark') === 'dark');
    } catch (error) {
      console.error('Failed to load from storage:', error);
    }
  },

  saveToStorage: async () => {
    if (!window.electronAPI) return;

    try {
      const { conversations, providers, settings, theme, currentProvider } = get();
      await Promise.all([
        window.electronAPI.store.set('conversations', conversations),
        window.electronAPI.store.set('providers', providers),
        window.electronAPI.store.set('settings', settings),
        window.electronAPI.store.set('theme', theme),
        window.electronAPI.store.set('currentProvider', currentProvider),
      ]);
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  },
}));
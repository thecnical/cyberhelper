export type AIProvider = 'openai' | 'anthropic' | 'google' | 'ollama' | 'openrouter' | 'groq' | 'bytex' | 'llm7' | 'freeai' | 'zenmux' | 'apmix' | 'apinex' | 'custom';

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  provider?: AIProvider;
  model?: string;
  tokens?: {
    prompt: number;
    completion: number;
    total: number;
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  provider: AIProvider;
  model: string;
}

export interface ProviderConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  baseURL?: string;
  enabled: boolean;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  fontSize: number;
  defaultProvider: AIProvider;
  defaultModel: string;
  streamResponses: boolean;
  saveHistory: boolean;
  maxTokens: number;
  temperature: number;
}

export interface AIModel {
  id: string;
  name: string;
  provider: AIProvider;
  contextWindow: number;
  description?: string;
}

export const AVAILABLE_MODELS: Record<AIProvider, AIModel[]> = {
  openai: [
    {
      id: 'gpt-4-turbo-preview',
      name: 'GPT-4 Turbo',
      provider: 'openai',
      contextWindow: 128000,
      description: 'Most capable model, best for complex tasks',
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      contextWindow: 8192,
      description: 'Powerful model for complex tasks',
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      contextWindow: 16385,
      description: 'Fast and cost-effective',
    },
  ],
  anthropic: [
    {
      id: 'claude-3-5-sonnet-20241022',
      name: 'Claude 3.5 Sonnet',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Most intelligent model',
    },
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Powerful model for complex tasks',
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Balanced performance and speed',
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      provider: 'anthropic',
      contextWindow: 200000,
      description: 'Fast and efficient',
    },
  ],
  google: [
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'google',
      contextWindow: 32768,
      description: 'Powerful multimodal model',
    },
    {
      id: 'gemini-pro-vision',
      name: 'Gemini Pro Vision',
      provider: 'google',
      contextWindow: 16384,
      description: 'Multimodal with vision capabilities',
    },
  ],
  ollama: [
    {
      id: 'llama2',
      name: 'Llama 2',
      provider: 'ollama',
      contextWindow: 4096,
      description: 'Open source model running locally',
    },
    {
      id: 'mistral',
      name: 'Mistral',
      provider: 'ollama',
      contextWindow: 8192,
      description: 'Efficient open source model',
    },
    {
      id: 'codellama',
      name: 'Code Llama',
      provider: 'ollama',
      contextWindow: 16384,
      description: 'Specialized for code generation',
    },
  ],
  openrouter: [
    {
      id: 'google/gemini-flash-1.5',
      name: 'Gemini Flash 1.5 (Free)',
      provider: 'openrouter',
      contextWindow: 1000000,
      description: 'Free tier - Fast multimodal model',
    },
    {
      id: 'meta-llama/llama-3.2-3b-instruct:free',
      name: 'Llama 3.2 3B (Free)',
      provider: 'openrouter',
      contextWindow: 131072,
      description: 'Free tier - Fast and efficient',
    },
    {
      id: 'microsoft/phi-3-mini-128k-instruct:free',
      name: 'Phi-3 Mini (Free)',
      provider: 'openrouter',
      contextWindow: 128000,
      description: 'Free tier - Compact and powerful',
    },
  ],
  groq: [
    {
      id: 'llama-3.3-70b-versatile',
      name: 'Llama 3.3 70B (Free)',
      provider: 'groq',
      contextWindow: 32768,
      description: 'Free tier - Ultra fast inference',
    },
    {
      id: 'llama-3.1-8b-instant',
      name: 'Llama 3.1 8B (Free)',
      provider: 'groq',
      contextWindow: 131072,
      description: 'Free tier - Lightning fast',
    },
    {
      id: 'mixtral-8x7b-32768',
      name: 'Mixtral 8x7B (Free)',
      provider: 'groq',
      contextWindow: 32768,
      description: 'Free tier - Mixture of experts',
    },
  ],
  bytex: [
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini (Free)',
      provider: 'bytex',
      contextWindow: 128000,
      description: 'Free access to GPT-4o Mini',
    },
    {
      id: 'claude-3-5-sonnet-20241022',
      name: 'Claude 3.5 Sonnet (Free)',
      provider: 'bytex',
      contextWindow: 200000,
      description: 'Free access to Claude 3.5',
    },
  ],
  llm7: [
    {
      id: 'gpt-4o',
      name: 'GPT-4o (Free)',
      provider: 'llm7',
      contextWindow: 128000,
      description: 'Free GPT-4o access',
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus (Free)',
      provider: 'llm7',
      contextWindow: 200000,
      description: 'Free Claude Opus access',
    },
  ],
  freeai: [
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo (Free)',
      provider: 'freeai',
      contextWindow: 16385,
      description: 'Free GPT-3.5 access',
    },
    {
      id: 'gpt-4',
      name: 'GPT-4 (Free)',
      provider: 'freeai',
      contextWindow: 8192,
      description: 'Free GPT-4 access',
    },
  ],
  zenmux: [
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini (Free)',
      provider: 'zenmux',
      contextWindow: 128000,
      description: 'Free via Zenmux',
    },
    {
      id: 'claude-3-haiku',
      name: 'Claude 3 Haiku (Free)',
      provider: 'zenmux',
      contextWindow: 200000,
      description: 'Free via Zenmux',
    },
  ],
  apmix: [
    {
      id: 'gpt-4o',
      name: 'GPT-4o (Free)',
      provider: 'apmix',
      contextWindow: 128000,
      description: 'Free GPT-4o via APMix',
    },
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet (Free)',
      provider: 'apmix',
      contextWindow: 200000,
      description: 'Free Claude via APMix',
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro (Free)',
      provider: 'apmix',
      contextWindow: 32768,
      description: 'Free Gemini via APMix',
    },
  ],
  apinex: [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo (Free)',
      provider: 'apinex',
      contextWindow: 128000,
      description: 'Free GPT-4 Turbo via ApiNex',
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus (Free)',
      provider: 'apinex',
      contextWindow: 200000,
      description: 'Free Claude Opus via ApiNex',
    },
    {
      id: 'llama-3-70b',
      name: 'Llama 3 70B (Free)',
      provider: 'apinex',
      contextWindow: 8192,
      description: 'Free Llama 3 via ApiNex',
    },
  ],
  custom: [],
};
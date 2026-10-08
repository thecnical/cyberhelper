import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { Message, ProviderConfig } from '../types';

export class AIService {
  private openaiClient: OpenAI | null = null;
  private anthropicClient: Anthropic | null = null;
  private googleClient: GoogleGenerativeAI | null = null;

  initializeProvider(config: ProviderConfig) {
    switch (config.provider) {
      case 'openai':
        this.openaiClient = new OpenAI({
          apiKey: config.apiKey,
          dangerouslyAllowBrowser: true,
        });
        break;
      case 'anthropic':
        this.anthropicClient = new Anthropic({
          apiKey: config.apiKey,
          dangerouslyAllowBrowser: true,
        });
        break;
      case 'google':
        this.googleClient = new GoogleGenerativeAI(config.apiKey);
        break;
    }
  }

  async sendMessage(
    messages: Message[],
    config: ProviderConfig,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    this.initializeProvider(config);

    switch (config.provider) {
      case 'openai':
        return this.sendOpenAIMessage(messages, config, onStream);
      case 'anthropic':
        return this.sendAnthropicMessage(messages, config, onStream);
      case 'google':
        return this.sendGoogleMessage(messages, config, onStream);
      case 'ollama':
        return this.sendOllamaMessage(messages, config, onStream);
      case 'openrouter':
      case 'groq':
      case 'bytex':
      case 'llm7':
      case 'freeai':
      case 'zenmux':
      case 'apmix':
      case 'apinex':
      case 'custom':
        return this.sendCustomMessage(messages, config, onStream);
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
  }

  private async sendOpenAIMessage(
    messages: Message[],
    config: ProviderConfig,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    if (!this.openaiClient) {
      throw new Error('OpenAI client not initialized');
    }

    const formattedMessages = messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));

    if (onStream) {
      const stream = await this.openaiClient.chat.completions.create({
        model: config.model,
        messages: formattedMessages,
        stream: true,
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          fullResponse += content;
          onStream(content);
        }
      }
      return fullResponse;
    } else {
      const response = await this.openaiClient.chat.completions.create({
        model: config.model,
        messages: formattedMessages,
      });
      return response.choices[0]?.message?.content || '';
    }
  }

  private async sendAnthropicMessage(
    messages: Message[],
    config: ProviderConfig,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    if (!this.anthropicClient) {
      throw new Error('Anthropic client not initialized');
    }

    const formattedMessages = messages
      .filter((msg) => msg.role !== 'system')
      .map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    const systemMessage = messages.find((msg) => msg.role === 'system')?.content;

    if (onStream) {
      const stream = await this.anthropicClient.messages.create({
        model: config.model,
        max_tokens: 4096,
        messages: formattedMessages,
        system: systemMessage,
        stream: true,
      });

      let fullResponse = '';
      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          const content = chunk.delta.text;
          fullResponse += content;
          onStream(content);
        }
      }
      return fullResponse;
    } else {
      const response = await this.anthropicClient.messages.create({
        model: config.model,
        max_tokens: 4096,
        messages: formattedMessages,
        system: systemMessage,
      });
      return response.content[0].type === 'text' ? response.content[0].text : '';
    }
  }

  private async sendGoogleMessage(
    messages: Message[],
    config: ProviderConfig,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    if (!this.googleClient) {
      throw new Error('Google client not initialized');
    }

    const model = this.googleClient.getGenerativeModel({ model: config.model });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1];

    if (onStream) {
      const result = await chat.sendMessageStream(lastMessage.content);
      let fullResponse = '';
      for await (const chunk of result.stream) {
        const content = chunk.text();
        fullResponse += content;
        onStream(content);
      }
      return fullResponse;
    } else {
      const result = await chat.sendMessage(lastMessage.content);
      return result.response.text();
    }
  }

  private async sendOllamaMessage(
    messages: Message[],
    config: ProviderConfig,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    const baseURL = config.baseURL || 'http://localhost:11434';

    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    if (onStream) {
      const response = await fetch(`${baseURL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: config.model,
          messages: formattedMessages,
          stream: true,
        }),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              fullResponse += json.message.content;
              onStream(json.message.content);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
      return fullResponse;
    } else {
      const response = await axios.post(`${baseURL}/api/chat`, {
        model: config.model,
        messages: formattedMessages,
        stream: false,
      });
      return response.data.message.content;
    }
  }

  private async sendCustomMessage(
    messages: Message[],
    config: ProviderConfig,
    onStream?: (chunk: string) => void
  ): Promise<string> {
    if (!config.baseURL) {
      throw new Error('Custom provider requires baseURL');
    }

    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await axios.post(
      `${config.baseURL}/v1/chat/completions`,
      {
        model: config.model,
        messages: formattedMessages,
        stream: !!onStream,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
      }
    );

    if (onStream) {
      // Handle streaming for custom OpenAI-compatible APIs
      return response.data.choices[0]?.message?.content || '';
    }

    return response.data.choices[0]?.message?.content || '';
  }
}

export const aiService = new AIService();
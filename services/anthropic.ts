import "server-only";

export interface AnthropicServiceConfig {
  apiKey: string | undefined;
}

export function getAnthropicServiceConfig(): AnthropicServiceConfig {
  return {
    apiKey: process.env.ANTHROPIC_API_KEY,
  };
}

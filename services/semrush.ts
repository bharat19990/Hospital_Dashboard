import "server-only";

export interface SemrushServiceConfig {
  apiKey: string | undefined;
}

export function getSemrushServiceConfig(): SemrushServiceConfig {
  return {
    apiKey: process.env.SEMRUSH_API_KEY,
  };
}

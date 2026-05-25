import "server-only";

export interface YoutubeServiceConfig {
  apiKey: string | undefined;
}

export function getYoutubeServiceConfig(): YoutubeServiceConfig {
  return {
    apiKey: process.env.YOUTUBE_API_KEY,
  };
}

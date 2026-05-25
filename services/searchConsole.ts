import "server-only";

export interface SearchConsoleServiceConfig {
  siteUrl: string | undefined;
}

export function getSearchConsoleServiceConfig(): SearchConsoleServiceConfig {
  return {
    siteUrl: process.env.SEARCH_CONSOLE_SITE_URL,
  };
}

import "server-only";

export interface FacebookServiceConfig {
  pageId: string | undefined;
}

export function getFacebookServiceConfig(): FacebookServiceConfig {
  return {
    pageId: process.env.META_FB_PAGE_ID,
  };
}

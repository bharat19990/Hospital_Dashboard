import "server-only";

export interface InstagramServiceConfig {
  accountId: string | undefined;
}

export function getInstagramServiceConfig(): InstagramServiceConfig {
  return {
    accountId: process.env.META_IG_ACCOUNT_ID,
  };
}

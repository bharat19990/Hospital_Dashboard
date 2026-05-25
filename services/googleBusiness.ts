import "server-only";

export interface GoogleBusinessServiceConfig {
  accountId: string | undefined;
}

export function getGoogleBusinessServiceConfig(): GoogleBusinessServiceConfig {
  return {
    accountId: process.env.GOOGLE_BUSINESS_ACCOUNT_ID,
  };
}

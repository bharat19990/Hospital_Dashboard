import "server-only";

export interface GoogleAdsServiceConfig {
  customerId: string | undefined;
}

export function getGoogleAdsServiceConfig(): GoogleAdsServiceConfig {
  return {
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID,
  };
}

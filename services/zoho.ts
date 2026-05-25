import "server-only";

export interface ZohoServiceConfig {
  sheetId: string | undefined;
}

export function getZohoServiceConfig(): ZohoServiceConfig {
  return {
    sheetId: process.env.ZOHO_SHEET_ID,
  };
}

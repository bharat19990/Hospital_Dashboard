import "server-only";

export interface Ga4ServiceConfig {
  propertyId: string | undefined;
}

export function getGa4ServiceConfig(): Ga4ServiceConfig {
  return {
    propertyId: process.env.GA4_PROPERTY_ID,
  };
}

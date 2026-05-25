import "server-only";

export interface WhatsappServiceConfig {
  phoneNumberId: string | undefined;
}

export function getWhatsappServiceConfig(): WhatsappServiceConfig {
  return {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  };
}

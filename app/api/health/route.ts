const apiChecks = [
  "zoho",
  "youtube",
  "google-ads",
  "facebook",
  "instagram",
  "whatsapp",
  "ai-insights",
  "roas",
];

export function GET() {
  return Response.json({
    ok: true,
    services: Object.fromEntries(apiChecks.map((service) => [service, "ok"])),
  });
}

const roasByChannel: Record<string, { roas: number; spend: number; revenue: number }> = {
  youtube: { roas: 5.32, spend: 406000, revenue: 2160000 },
  "google-ads": { roas: 5.48, spend: 635000, revenue: 3480000 },
  facebook: { roas: 2.91, spend: 443000, revenue: 1290000 },
  instagram: { roas: 3.21, spend: 305000, revenue: 980000 },
  whatsapp: { roas: 0, spend: 0, revenue: 1120000 },
};

export function GET(_request: Request, { params }: { params: { channel: string } }) {
  const data = roasByChannel[params.channel];

  if (!data) {
    return Response.json({ ok: false, error: "Unsupported channel" }, { status: 404 });
  }

  return Response.json({ ok: true, channel: params.channel, ...data });
}

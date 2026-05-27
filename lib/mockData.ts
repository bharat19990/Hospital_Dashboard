import type { AIInsight, ChannelStatus, KpiMetric, ZohoAdmit } from "@/types";

export type ChannelSlug =
  | "youtube"
  | "google-ads"
  | "facebook"
  | "instagram"
  | "whatsapp";

export interface TableColumn {
  key: string;
  label: string;
}

export interface ChannelKpi extends KpiMetric {
  isInverseMetric?: boolean;
  statusColor?: "green" | "yellow" | "red";
}

export interface ChannelPageData {
  slug: ChannelSlug;
  channelName: string;
  route: string;
  status: ChannelStatus;
  icon: string;
  kpis: ChannelKpi[];
  primaryChart:
    | { type: "line"; title: string; data: Array<Record<string, string | number>>; lines: Array<{ key: string; color: string; label: string }>; xKey: string }
    | { type: "area"; title: string; data: Array<Record<string, string | number>>; areas: Array<{ key: string; color: string; label: string }>; xKey: string }
    | { type: "composed"; title: string; data: Array<Record<string, string | number>>; xKey: string; bars?: Array<{ key: string; color: string; label: string; axis?: "left" | "right" }>; lines?: Array<{ key: string; color: string; label: string; axis?: "left" | "right" }> };
  secondary?:
    | { type: "pie"; title: string; data: Array<{ name: string; value: number; color: string }> }
    | { type: "bar"; title: string; data: Array<Record<string, string | number>>; xKey: string; bars: Array<{ key: string; color: string; label: string }>; layout?: "horizontal" | "vertical" }
    | { type: "groupedBar"; title: string; data: Array<Record<string, string | number>>; xKey: string; bars: Array<{ key: string; color: string; label: string }> }
    | { type: "alert"; title: string; message: string };
  zoho?: { channel: string; admits: number };
  roas?: { value: number; spend: number; revenue: number; tone: "green" | "yellow" | "red" };
  infoCard?: { title: string; body: string; buttonLabel: string; href: string };
  alert?: { title: string; message: string };
  tables: Array<{ title: string; columns: TableColumn[]; rows: Array<Record<string, string | number>> }>;
  insights: AIInsight[];
}

export function generateDailyData(base: number, variance: number, days = 30) {
  return Array.from({ length: days }, (_, index) => {
    const wave = Math.sin(index / 2.3) * variance * 0.55;
    const weekly = ((index % 7) - 3) * variance * 0.08;
    const drift = index * variance * 0.025;
    return {
      date: `May ${String(index + 1).padStart(2, "0")}`,
      value: Math.max(0, Math.round(base + wave + weekly + drift)),
    };
  });
}

function admits(count: number, channel: string): ZohoAdmit[] {
  return Array.from({ length: count }, (_, index) => ({
    date: `2026-05-${String((index % 30) + 1).padStart(2, "0")}`,
    referralMode: channel,
    channel,
  }));
}

function dailyMulti(base: number, variance: number, keys: string[]): Array<Record<string, string | number>> {
  const source = generateDailyData(base, variance);
  return source.map((item, index) => ({
    date: item.date,
    ...Object.fromEntries(keys.map((key, keyIndex) => [key, Math.round(item.value * (1 - keyIndex * 0.22) + ((index + keyIndex) % 5) * variance * 0.08)])),
  }));
}

export const dashboardChannelCards = [
  { channelName: "YouTube", href: "/youtube", status: "green" as const, roas: 5.32, metrics: [{ label: "Admits", value: 42, change: 16.7, changeDirection: "up" as const }, { label: "Revenue", value: "₹21.6L", change: 20.3, changeDirection: "up" as const }] },
  { channelName: "Google Ads", href: "/google-ads", status: "green" as const, roas: 5.48, metrics: [{ label: "Admits", value: 63, change: 28.6, changeDirection: "up" as const }, { label: "Revenue", value: "₹34.8L", change: 31.2, changeDirection: "up" as const }] },
  { channelName: "Facebook", href: "/facebook", status: "yellow" as const, roas: 2.91, metrics: [{ label: "Admits", value: 27, change: 3.8, changeDirection: "up" as const }, { label: "Revenue", value: "₹12.9L", change: 5.4, changeDirection: "up" as const }] },
  { channelName: "Instagram", href: "/instagram", status: "green" as const, roas: 3.21, metrics: [{ label: "Admits", value: 19, change: 15.2, changeDirection: "up" as const }, { label: "Revenue", value: "₹9.8L", change: 18.7, changeDirection: "up" as const }] },
  { channelName: "WhatsApp", href: "/whatsapp", status: "green" as const, metrics: [{ label: "Admits", value: 22, change: 22.2, changeDirection: "up" as const }, { label: "Revenue", value: "₹11.2L", change: 24.1, changeDirection: "up" as const }] },
];

const topVideos = ["Laparoscopic Surgery Explained", "Meet Dr. Sharma - Cardiologist", "Patient Story: Hip Replacement", "OPD Booking Guide", "New ICU Wing Tour"];
const keywords = ["best hospital in indore", "cardiologist near me", "orthopedic surgeon indore", "24 hour emergency hospital", "laparoscopic surgery cost", "gynecologist indore", "child specialist near me", "hospital appointment booking"];

export const channelPages: Record<ChannelSlug, ChannelPageData> = {
  youtube: {
    slug: "youtube", channelName: "YouTube", route: "/youtube", status: "green", icon: "play",
    kpis: [{ label: "Views", value: "84,200", change: 18, changeDirection: "up" }, { label: "Watch Time", value: "1,840", unit: "hrs", change: 12, changeDirection: "up" }, { label: "Subscribers", value: "+127", change: 8, changeDirection: "up" }, { label: "CTR", value: "4.2%", change: 0.4, changeDirection: "up" }],
    primaryChart: { type: "line", title: "Views Over Time", data: generateDailyData(2800, 400), lines: [{ key: "value", color: "#FF0000", label: "Views" }], xKey: "date" },
    secondary: { type: "pie", title: "Traffic Source", data: [{ name: "YouTube Search", value: 38, color: "#FF0000" }, { name: "Suggested", value: 27, color: "#FF6B6B" }, { name: "External", value: 18, color: "#FFA500" }, { name: "Direct", value: 12, color: "#FFD700" }, { name: "Other", value: 5, color: "#CCC" }] },
    zoho: { channel: "YouTube", admits: 8 },
    tables: [{ title: "Top Videos", columns: ["Title", "Views", "Watch Time", "CTR", "Likes"].map((label) => ({ key: label, label })), rows: topVideos.map((Title, index) => ({ Title, Views: [21400, 18620, 15980, 14200, 10300][index], "Watch Time": `${[420, 510, 360, 280, 270][index]} hrs`, CTR: `${[5.8, 4.9, 6.1, 3.7, 3.1][index]}%`, Likes: [1280, 940, 1120, 520, 410][index] })) }],
    insights: ["Patient story videos have 3x CTR — upload 2 more this week.", "Add Hindi subtitles to top 3 videos for regional search.", "Pin the cardiology video to homepage — highest watch time.", "Post Shorts version of OPD video — 40% higher mobile reach."].map((text, i) => ({ text, priority: i + 1, channel: "YouTube" })),
  },
  "google-ads": {
    slug: "google-ads", channelName: "Google Ads", route: "/google-ads", status: "green", icon: "dollar",
    kpis: [{ label: "Spend", value: 234500, change: 5, changeDirection: "up" }, { label: "Impressions", value: "1,84,200", change: 22, changeDirection: "up" }, { label: "CTR", value: "3.2%", change: 0.6, changeDirection: "up" }, { label: "Conversions", value: 47, unit: "CPA ₹4,989", change: 14, changeDirection: "up" }],
    primaryChart: { type: "composed", title: "Spend vs Conversions", data: dailyMulti(7800, 1300, ["spend", "conversions"]).map((d) => ({ ...d, conversions: Math.max(1, Math.round(Number(d.conversions) / 4200)) })), xKey: "date", bars: [{ key: "spend", color: "#4285F4", label: "Daily Spend", axis: "left" }], lines: [{ key: "conversions", color: "#0D9488", label: "Conversions", axis: "right" }] },
    secondary: { type: "bar", title: "Top Campaigns by Spend", layout: "vertical", xKey: "campaign", bars: [{ key: "spend", color: "#4285F4", label: "Spend" }], data: [{ campaign: "Cardiology OPD", spend: 68400 }, { campaign: "Orthopaedics", spend: 52100 }, { campaign: "Emergency", spend: 44800 }, { campaign: "General OPD", spend: 38600 }, { campaign: "Mother & Child", spend: 30600 }] },
    zoho: { channel: "Google Ads", admits: 34 }, roas: { value: 7.2, spend: 234500, revenue: 1700000, tone: "green" },
    tables: [{ title: "Keywords", columns: ["Keyword", "Impressions", "Clicks", "CTR", "CPC", "Conversions"].map((label) => ({ key: label, label })), rows: keywords.map((Keyword, index) => ({ Keyword, Impressions: [32400, 28100, 22400, 19800, 17600, 16400, 13900, 12600][index], Clicks: [1280, 1010, 760, 690, 510, 470, 430, 380][index], CTR: `${[3.9, 3.6, 3.4, 3.5, 2.9, 2.8, 3.1, 3.0][index]}%`, CPC: `₹${[54, 62, 68, 59, 72, 66, 58, 49][index]}`, Conversions: [10, 9, 7, 6, 4, 5, 3, 3][index] })) }],
    insights: ["Increase Cardiology budget 20% — lowest CPA at ₹3,200.", "Pause General OPD campaign — CTR 1.1% vs account avg 3.2%.", "Add negative keyword 'free' — attracting non-converting traffic.", "Test patient testimonial creative for orthopaedics campaign."].map((text, i) => ({ text, priority: i + 1, channel: "Google Ads" })),
  },
  facebook: {
    slug: "facebook", channelName: "Facebook", route: "/facebook", status: "green", icon: "users",
    kpis: [{ label: "Reach", value: "2,84,500", change: 24, changeDirection: "up" }, { label: "Impressions", value: "6,12,800", change: 31, changeDirection: "up" }, { label: "Engagements", value: "18,420", change: 17, changeDirection: "up" }, { label: "Spend", value: 98000, change: 10, changeDirection: "up" }],
    primaryChart: { type: "composed", title: "Reach vs Engagement Over Time", data: dailyMulti(9500, 1600, ["reach", "engagements"]).map((d) => ({ ...d, engagements: Math.round(Number(d.engagements) * 0.08) })), xKey: "date", lines: [{ key: "reach", color: "#1877F2", label: "Reach", axis: "left" }, { key: "engagements", color: "#0D9488", label: "Engagements", axis: "right" }] },
    secondary: { type: "groupedBar", title: "Age & Gender", xKey: "age", bars: [{ key: "male", color: "#1877F2", label: "Male" }, { key: "female", color: "#E1306C", label: "Female" }], data: [{ age: "18-24", male: 2800, female: 3200 }, { age: "25-34", male: 8400, female: 11200 }, { age: "35-44", male: 6800, female: 9100 }, { age: "45-54", male: 4200, female: 5800 }, { age: "55+", male: 2100, female: 2900 }] },
    zoho: { channel: "Facebook", admits: 22 }, roas: { value: 11.2, spend: 98000, revenue: 1100000, tone: "green" },
    tables: [{ title: "Top Posts", columns: ["Title", "Type", "Reach", "Engagements", "Clicks", "Date"].map((label) => ({ key: label, label })), rows: ["World Heart Day", "Patient Story: Knee Pain Resolved", "Free Health Camp - Register", "Meet Dr. Priya - Gynecology", "New OPD Wing Open"].map((Title, i) => ({ Title, Type: ["Awareness", "Story", "Event", "Doctor", "Update"][i], Reach: [68400, 54800, 46300, 38100, 32400][i], Engagements: [4200, 5100, 3300, 2800, 2100][i], Clicks: [860, 1120, 1480, 690, 520][i], Date: `May ${21 - i}` })) }],
    insights: ["Boost patient story post — organic reach 3x above average.", "Post Tuesday/Thursday 6-8 PM — peak engagement window.", "Target 35-44 female audience — highest appointment conversion rate.", "Create Facebook Event for health camp — 5x more organic reach."].map((text, i) => ({ text, priority: i + 1, channel: "Facebook" })),
  },
  instagram: {
    slug: "instagram", channelName: "Instagram", route: "/instagram", status: "green", icon: "camera",
    kpis: [{ label: "Followers", value: "18,400", unit: "+340", change: 1.9, changeDirection: "up" }, { label: "Reach", value: "1,42,800", change: 28, changeDirection: "up" }, { label: "Story Views", value: "48,600", change: 15, changeDirection: "up" }, { label: "Spend", value: 62000, change: 8, changeDirection: "up" }],
    primaryChart: { type: "line", title: "Reach Over Time", data: generateDailyData(4760, 900), lines: [{ key: "value", color: "#E1306C", label: "Reach" }], xKey: "date" },
    secondary: { type: "bar", title: "Avg Engagement by Post Type", xKey: "type", bars: [{ key: "engagement", color: "#E1306C", label: "Avg Engagement" }], data: [{ type: "Reels", engagement: 842, color: "#9333EA" }, { type: "Carousels", engagement: 614, color: "#E1306C" }, { type: "Images", engagement: 287, color: "#FB7185" }, { type: "Stories", engagement: 198, color: "#F97316" }] },
    zoho: { channel: "Instagram", admits: 14 }, roas: { value: 11.3, spend: 62000, revenue: 700000, tone: "green" },
    tables: [{ title: "Top Posts", columns: ["Type", "Caption Preview", "Reach", "Likes", "Comments", "Saves"].map((label) => ({ key: label, label })), rows: ["Your heart health starts small", "Meet Dr. Agarwal", "Free camp Sunday — link in bio", "Behind the scenes: ICU team", "5 signs to see a cardiologist"].map((caption, i) => ({ Type: ["Reel", "Image", "Story", "Reel", "Carousel"][i], "Caption Preview": caption, Reach: [28400, 19600, 22100, 17400, 15800][i], Likes: [1420, 880, 760, 1020, 940][i], Comments: [88, 42, 51, 64, 59][i], Saves: [340, 210, 180, 260, 300][i] })) }],
    insights: ["Reels have 2.9x reach of static posts — post 3 this week.", "Add 'Indore' location tag — local reach up 40% on tagged posts.", "Run Story poll 'Which health topic next?' — boosts saves.", "Add ₹15,000 spend to free camp post — best conversion signal."].map((text, i) => ({ text, priority: i + 1, channel: "Instagram" })),
  },
  whatsapp: {
    slug: "whatsapp", channelName: "WhatsApp", route: "/whatsapp", status: "green", icon: "message",
    kpis: [{ label: "Sent", value: "4,820", change: 12, changeDirection: "up" }, { label: "Delivered", value: "4,614", unit: "95.7%", change: 1.2, changeDirection: "up" }, { label: "Read", value: "3,891", unit: "84.2%", change: 4.8, changeDirection: "up" }, { label: "Response Rate", value: "31.4%", change: 6.1, changeDirection: "up" }],
    primaryChart: { type: "area", title: "Message Volume Over Time", data: dailyMulti(160, 28, ["sent", "read"]).map((d) => ({ ...d, read: Math.round(Number(d.read) * 0.84) })), xKey: "date", areas: [{ key: "sent", color: "#25D366", label: "Sent" }, { key: "read", color: "#128C7E", label: "Read" }] },
    secondary: { type: "alert", title: "WhatsApp Attribution", message: "WhatsApp has no ad spend tracking. Admits attributed via Zoho entries where staff records WhatsApp as referral mode." },
    zoho: { channel: "WhatsApp", admits: 11 },
    tables: [{ title: "Campaigns", columns: ["Name", "Sent", "Delivered", "Read", "Response Rate", "Date"].map((label) => ({ key: label, label })), rows: ["OPD Appointment Reminder", "Health Camp Invite", "Post-Discharge Follow-up", "Diabetes Awareness Broadcast", "New Doctor Intro"].map((Name, i) => ({ Name, Sent: [1380, 1120, 840, 920, 560][i], Delivered: [1322, 1070, 804, 884, 534][i], Read: [1170, 890, 720, 711, 400][i], "Response Rate": `${[34, 29, 41, 24, 18][i]}%`, Date: `May ${20 - i}` })) }],
    insights: ["Send broadcasts 10-11 AM — read rates peak in that window.", "Follow up non-responders after 48hrs — +22% response rate.", "Add one-tap 'Book Appointment' reply button to OPD reminders.", "Segment list by department — targeted messages get 2x response."].map((text, i) => ({ text, priority: i + 1, channel: "WhatsApp" })),
  },
};

export const zohoAdmitsByChannel = Object.fromEntries(
  Object.values(channelPages)
    .filter((page) => page.zoho)
    .map((page) => [page.slug, admits(page.zoho?.admits ?? 0, page.zoho?.channel ?? page.channelName)]),
) as Record<string, ZohoAdmit[]>;

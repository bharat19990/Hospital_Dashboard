import type { AIInsight, ChannelStatus, KpiMetric, ZohoAdmit } from "@/types";

export type ChannelSlug =
  | "youtube"
  | "google-ads"
  | "google-business"
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "search-console"
  | "semrush"
  | "clarity"
  | "ga4";

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
  { channelName: "Google Business", href: "/google-business", status: "green" as const, metrics: [{ label: "Admits", value: 38, change: 11.8, changeDirection: "up" as const }, { label: "Revenue", value: "₹18.7L", change: 12.6, changeDirection: "up" as const }] },
  { channelName: "Facebook", href: "/facebook", status: "yellow" as const, roas: 2.91, metrics: [{ label: "Admits", value: 27, change: 3.8, changeDirection: "up" as const }, { label: "Revenue", value: "₹12.9L", change: 5.4, changeDirection: "up" as const }] },
  { channelName: "Instagram", href: "/instagram", status: "green" as const, roas: 3.21, metrics: [{ label: "Admits", value: 19, change: 15.2, changeDirection: "up" as const }, { label: "Revenue", value: "₹9.8L", change: 18.7, changeDirection: "up" as const }] },
  { channelName: "WhatsApp", href: "/whatsapp", status: "green" as const, metrics: [{ label: "Admits", value: 22, change: 22.2, changeDirection: "up" as const }, { label: "Revenue", value: "₹11.2L", change: 24.1, changeDirection: "up" as const }] },
  { channelName: "Search Console", href: "/search-console", status: "yellow" as const, metrics: [{ label: "Admits", value: 14, change: 3.4, changeDirection: "down" as const }, { label: "Revenue", value: "₹6.1L", change: 1.6, changeDirection: "down" as const }] },
  { channelName: "SEMrush", href: "/semrush", status: "red" as const, metrics: [{ label: "Admits", value: 8, change: 11.1, changeDirection: "down" as const }, { label: "Revenue", value: "₹3.2L", change: 9.5, changeDirection: "down" as const }] },
  { channelName: "Clarity", href: "/clarity", status: "green" as const, metrics: [{ label: "Admits", value: 6, change: 9.1, changeDirection: "up" as const }, { label: "Revenue", value: "₹2.6L", change: 8.3, changeDirection: "up" as const }] },
  { channelName: "GA4", href: "/ga4", status: "yellow" as const, metrics: [{ label: "Admits", value: 4, change: 20, changeDirection: "down" as const }, { label: "Revenue", value: "₹1.6L", change: 18.4, changeDirection: "down" as const }] },
];

const topVideos = ["Laparoscopic Surgery Explained", "Meet Dr. Sharma - Cardiologist", "Patient Story: Hip Replacement", "OPD Booking Guide", "New ICU Wing Tour"];
const keywords = ["best hospital in indore", "cardiologist near me", "orthopedic surgeon indore", "24 hour emergency hospital", "laparoscopic surgery cost", "gynecologist indore", "child specialist near me", "hospital appointment booking"];
const pages = ["/", "/cardiology", "/appointments", "/orthopaedics", "/doctors", "/emergency", "/mother-and-child", "/contact"];

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
  "google-business": {
    slug: "google-business", channelName: "Google Business", route: "/google-business", status: "green", icon: "map",
    kpis: [{ label: "Profile Views", value: "12,840", change: 9, changeDirection: "up" }, { label: "Website Clicks", value: "1,920", change: 14, changeDirection: "up" }, { label: "Directions", value: 847, change: 6, changeDirection: "up" }, { label: "Calls", value: 634, unit: "4.6★ (286)", change: 11, changeDirection: "up" }],
    primaryChart: { type: "line", title: "Profile Views Over Time", data: generateDailyData(430, 80), lines: [{ key: "value", color: "#4285F4", label: "Profile Views" }], xKey: "date" },
    secondary: { type: "bar", title: "Reviews by Star Rating", xKey: "rating", bars: [{ key: "reviews", color: "#22C55E", label: "Reviews" }], data: [{ rating: "1★", reviews: 4, color: "#EF4444" }, { rating: "2★", reviews: 8, color: "#EF4444" }, { rating: "3★", reviews: 22, color: "#F59E0B" }, { rating: "4★", reviews: 67, color: "#22C55E" }, { rating: "5★", reviews: 185, color: "#22C55E" }] },
    zoho: { channel: "Google Business", admits: 19 },
    tables: [{ title: "Recent Reviews", columns: ["Rating", "Summary", "Date", "Response Status"].map((label) => ({ key: label, label })), rows: ["Very smooth OPD appointment experience", "Emergency team helped us immediately", "Parking was crowded on Sunday", "Cardiology doctor explained clearly", "Billing queue took extra time", "Nursing staff was supportive"].map((Summary, i) => ({ Rating: ["5★", "5★", "3★", "5★", "3★", "4★"][i], Summary, Date: `May ${22 - i}`, "Response Status": i === 2 || i === 4 ? "Pending" : "Responded" })) }],
    insights: ["Respond to 3 unanswered 3-star reviews — affects local ranking.", "Post update about new Mother & Child wing — boosts profile views 15%.", "Add 10 interior photos — listings with 30+ photos get 2x directions.", "Answer top Q&A 'OPD timings' on your profile."].map((text, i) => ({ text, priority: i + 1, channel: "Google Business" })),
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
  "search-console": {
    slug: "search-console", channelName: "Search Console", route: "/search-console", status: "green", icon: "search",
    kpis: [{ label: "Clicks", value: "8,420", change: 18, changeDirection: "up" }, { label: "Impressions", value: "1,84,600", change: 24, changeDirection: "up" }, { label: "CTR", value: "4.6%", change: 0.8, changeDirection: "up" }, { label: "Avg Position", value: "14.2", change: 1.4, changeDirection: "down", isInverseMetric: true }],
    primaryChart: { type: "composed", title: "Clicks & Impressions Over Time", data: dailyMulti(6200, 900, ["impressions", "clicks"]).map((d) => ({ ...d, clicks: Math.round(Number(d.clicks) * 0.05) })), xKey: "date", lines: [{ key: "clicks", color: "#4285F4", label: "Clicks", axis: "left" }, { key: "impressions", color: "#FB8C00", label: "Impressions", axis: "right" }] },
    secondary: { type: "bar", title: "Top Queries by Clicks", layout: "vertical", xKey: "query", bars: [{ key: "clicks", color: "#4285F4", label: "Clicks" }], data: ["best hospital in indore", "cardiologist indore", "orthopedic hospital near me", "24 hour hospital indore", "laparoscopic surgery indore", "best gynecologist indore", "child specialist indore", "hospital appointment online"].map((query, i) => ({ query, clicks: [1240, 892, 764, 618, 524, 487, 412, 381][i] })) },
    tables: [{ title: "Top Queries", columns: ["Query", "Clicks", "Impressions", "CTR", "Position"].map((label) => ({ key: label, label })), rows: keywords.map((Query, i) => ({ Query, Clicks: [1240, 892, 764, 618, 524, 487, 412, 381][i], Impressions: [28400, 21100, 17800, 15400, 13200, 11800, 9900, 8700][i], CTR: `${[4.4, 4.2, 4.3, 4.0, 4.0, 4.1, 4.2, 4.4][i]}%`, Position: [4.2, 7.1, 9.4, 3.8, 10.5, 12.2, 8.7, 6.8][i] })) }, { title: "Top Pages", columns: ["URL", "Clicks", "Impressions", "CTR"].map((label) => ({ key: label, label })), rows: ["/cardiology", "/orthopaedics", "/appointments", "/doctors", "/emergency", "/"].map((URL, i) => ({ URL, Clicks: [1880, 1520, 1310, 1020, 890, 820][i], Impressions: [48000, 39400, 35100, 28600, 21200, 19800][i], CTR: `${[3.9, 3.8, 3.7, 3.6, 4.2, 4.1][i]}%` })) }],
    insights: ["Optimize /cardiology title tag — position 8 but CTR only 2.1%.", "Write blog post on 'laparoscopic surgery cost indore' — high impression, low click.", "Add FAQ schema to /appointments — triggers rich results.", "Add 5 internal links to /orthopaedics from high-traffic pages."].map((text, i) => ({ text, priority: i + 1, channel: "Search Console" })),
  },
  semrush: {
    slug: "semrush", channelName: "SEMrush", route: "/semrush", status: "yellow", icon: "bar",
    kpis: [{ label: "Domain Authority", value: "38/100", change: 2, changeDirection: "up" }, { label: "Organic Keywords", value: "1,842", change: 124, changeDirection: "up" }, { label: "Est. Traffic", value: "12,400/mo", change: 8, changeDirection: "up" }, { label: "Backlinks", value: 847, change: 34, changeDirection: "up" }],
    primaryChart: { type: "line", title: "Keyword Positions Over Time", data: dailyMulti(90, 16, ["top3", "pos4to10", "pos11to30"]), xKey: "date", lines: [{ key: "top3", color: "#22C55E", label: "Top 3 positions" }, { key: "pos4to10", color: "#4285F4", label: "Positions 4-10" }, { key: "pos11to30", color: "#FB8C00", label: "Positions 11-30" }] },
    secondary: { type: "bar", title: "Top Keywords by Search Volume", layout: "vertical", xKey: "keyword", bars: [{ key: "volume", color: "#FF6B35", label: "Volume" }], data: keywords.slice(0, 6).map((keyword, i) => ({ keyword, volume: [12100, 8900, 7600, 6200, 5100, 4400][i] })) },
    alert: { title: "Organic Search Attribution", message: "Admit attribution for organic search tracked via Search Console and Zoho entries tagged as Google Organic." },
    tables: [{ title: "Ranking Keywords", columns: ["Keyword", "Position", "Change", "Volume", "URL"].map((label) => ({ key: label, label })), rows: ["best hospital indore", "cardiologist indore", "orthopedic hospital indore", "laparoscopic surgery indore", "gynecologist indore", "child specialist indore", "hospital near me indore", "emergency hospital indore", "best doctor indore", "spine surgery indore"].map((Keyword, i) => ({ Keyword, Position: [4, 7, 12, 9, 15, 18, 6, 3, 22, 31][i], Change: ["+2", "+1", "-1", "+3", "+0", "+2", "+4", "+1", "-2", "+6"][i], Volume: [12100, 8900, 7600, 5100, 4400, 3900, 8600, 6200, 4800, 2700][i], URL: ["/", "/cardiology", "/orthopaedics", "/laparoscopy", "/mother-and-child", "/paediatrics", "/", "/emergency", "/doctors", "/spine-surgery"][i] })) }],
    insights: ["Push orthopaedics from pos 12 to top 10 — add 3 local directory backlinks.", "Create landing pages for spine surgery and child specialist.", "Domain authority 38 vs competitor avg 44 — get listed on Practo and Justdial.", "Target 'hospital near me indore' with Google Business post — high local intent."].map((text, i) => ({ text, priority: i + 1, channel: "SEMrush" })),
  },
  clarity: {
    slug: "clarity", channelName: "Clarity", route: "/clarity", status: "green", icon: "eye",
    kpis: [{ label: "Sessions", value: "28,400", change: 14, changeDirection: "up" }, { label: "Rage Clicks", value: "3.2%", change: 0.8, changeDirection: "down", isInverseMetric: true }, { label: "Dead Clicks", value: "6.8%", change: 1.2, changeDirection: "down", isInverseMetric: true }, { label: "Scroll Depth", value: "54%", change: 6, changeDirection: "up" }],
    primaryChart: { type: "line", title: "Sessions Over Time", data: generateDailyData(946, 160), xKey: "date", lines: [{ key: "value", color: "#0078D4", label: "Sessions" }] },
    secondary: { type: "bar", title: "Scroll Depth by Page", layout: "vertical", xKey: "page", bars: [{ key: "depth", color: "#0D9488", label: "Scroll Depth" }], data: [{ page: "/appointments", depth: 81, color: "#22C55E" }, { page: "/cardiology", depth: 72, color: "#22C55E" }, { page: "/orthopaedics", depth: 64, color: "#F59E0B" }, { page: "/doctors", depth: 58, color: "#F59E0B" }, { page: "/", depth: 48, color: "#EF4444" }, { page: "/emergency", depth: 43, color: "#EF4444" }] },
    infoCard: { title: "View Heatmaps in Microsoft Clarity", body: "Heatmaps and session recordings are in the Clarity dashboard.", buttonLabel: "Open Clarity Dashboard →", href: "https://clarity.microsoft.com" },
    tables: [{ title: "Pages by Engagement", columns: ["Page", "Sessions", "Rage Clicks", "Dead Clicks", "Scroll Depth", "Engagement"].map((label) => ({ key: label, label })), rows: pages.slice(0, 6).map((Page, i) => ({ Page, Sessions: [8600, 6200, 5400, 4100, 3100, 2100][i], "Rage Clicks": `${[2.1, 3.4, 8.4, 4.8, 5.6, 6.2][i]}%`, "Dead Clicks": `${[4.8, 5.9, 8.9, 6.7, 7.8, 8.1][i]}%`, "Scroll Depth": `${[48, 72, 81, 58, 64, 43][i]}%`, Engagement: ["Med", "High", "High", "Med", "Med", "Low"][i] })) }],
    insights: ["Fix dead click on /appointments CTA — 8.4% click non-clickable element.", "Homepage scroll 48% — move doctor profiles section above the fold.", "Review session recordings for /emergency — critical info below fold.", "Add sticky Book Appointment button on mobile — reduces rage clicks."].map((text, i) => ({ text, priority: i + 1, channel: "Clarity" })),
  },
  ga4: {
    slug: "ga4", channelName: "GA4", route: "/ga4", status: "green", icon: "activity",
    kpis: [{ label: "Users", value: "42,800", unit: "New 28,600 / Returning 14,200", change: 16, changeDirection: "up" }, { label: "Sessions", value: "58,400", change: 19, changeDirection: "up" }, { label: "Bounce Rate", value: "42.8%", change: 3.2, changeDirection: "down", isInverseMetric: true }, { label: "Goals", value: "1,284", change: 22, changeDirection: "up" }],
    primaryChart: { type: "line", title: "Daily Users", data: dailyMulti(1426, 260, ["newUsers", "returningUsers"]), xKey: "date", lines: [{ key: "newUsers", color: "#4285F4", label: "New Users" }, { key: "returningUsers", color: "#0D9488", label: "Returning Users" }] },
    secondary: { type: "pie", title: "Traffic Sources", data: [{ name: "Organic Search", value: 38, color: "#4285F4" }, { name: "Direct", value: 22, color: "#34A853" }, { name: "Paid", value: 18, color: "#FBBC04" }, { name: "Social", value: 14, color: "#EA4335" }, { name: "Referral", value: 5, color: "#9C27B0" }, { name: "Other", value: 3, color: "#CCC" }] },
    zoho: { channel: "GA4", admits: 41 },
    tables: [{ title: "Top Landing Pages", columns: ["Page", "Users", "Sessions", "Bounce Rate", "Goals", "Avg Duration"].map((label) => ({ key: label, label })), rows: pages.map((Page, i) => ({ Page, Users: [12800, 7200, 6800, 5400, 4100, 3200, 2100, 1200][i], Sessions: [16400, 9300, 8800, 6900, 5200, 3900, 2700, 1600][i], "Bounce Rate": `${[48, 39, 61, 42, 44, 36, 41, 52][i]}%`, Goals: [310, 246, 282, 188, 110, 96, 42, 10][i], "Avg Duration": ["2m 10s", "3m 42s", "1m 18s", "2m 56s", "2m 30s", "3m 05s", "2m 12s", "1m 02s"][i] })) }],
    insights: ["/appointments bounce rate 61% — add progress indicator to booking form.", "Returning users have 3x higher goal completion — create re-engagement sequence.", "Paid search is 18% traffic but 34% of goals — increase Google Ads budget.", "Add event tracking for Call Now button clicks — not captured as goal currently."].map((text, i) => ({ text, priority: i + 1, channel: "GA4" })),
  },
};

export const zohoAdmitsByChannel = Object.fromEntries(
  Object.values(channelPages)
    .filter((page) => page.zoho)
    .map((page) => [page.slug, admits(page.zoho?.admits ?? 0, page.zoho?.channel ?? page.channelName)]),
) as Record<string, ZohoAdmit[]>;

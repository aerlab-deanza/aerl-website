import fs from "fs";
import path from "path";

export interface DayStats {
  date: string;
  views: number;
  uniqueUsers: number;
}

// sessions: { [sessionId]: ["/", "/about", ...] }
interface DayData {
  sessions: Record<string, string[]>;
}

export interface AnalyticsData {
  totalViews: number;
  totalUniqueUsers: number;
  days: Record<string, DayData>;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "analytics.json");

const EMPTY: AnalyticsData = { totalViews: 0, totalUniqueUsers: 0, days: {} };

function isNewShape(data: AnalyticsData): boolean {
  // Old shape stored sessions as string[]. New shape uses Record<string, string[]>.
  return Object.values(data.days).every((d) => !Array.isArray((d as unknown as Record<string, unknown>).sessions));
}

function readData(): AnalyticsData {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(EMPTY, null, 2));
      return { ...EMPTY, days: {} };
    }
    const parsed: AnalyticsData = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    if (!isNewShape(parsed)) {
      // Stale file from old shape — reset rather than miscount
      const fresh = { ...EMPTY, days: {} };
      fs.writeFileSync(DATA_FILE, JSON.stringify(fresh, null, 2));
      return fresh;
    }
    return parsed;
  } catch {
    return { ...EMPTY, days: {} };
  }
}

function writeData(data: AnalyticsData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Failed to write analytics:", e);
  }
}

export function trackVisit(sessionId: string, pathname: string): void {
  const data = readData();
  const today = new Date().toISOString().split("T")[0];

  if (!data.days[today]) data.days[today] = { sessions: {} };

  const day = data.days[today];
  const visited = day.sessions[sessionId] ?? [];

  // Already counted this path for this session today — skip
  if (visited.includes(pathname)) return;

  const isNewSession = visited.length === 0;

  day.sessions[sessionId] = [...visited, pathname];
  data.totalViews++;
  if (isNewSession) data.totalUniqueUsers++;

  writeData(data);
}

export function getAnalytics(): AnalyticsData {
  return readData();
}

export function getDailyStats(days = 14): DayStats[] {
  const data = readData();
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const date = d.toISOString().split("T")[0];
    const day = data.days[date];
    if (!day) return { date, views: 0, uniqueUsers: 0 };
    const sessions = day.sessions;
    const views = Object.values(sessions).reduce((sum, paths) => sum + paths.length, 0);
    const uniqueUsers = Object.keys(sessions).length;
    return { date, views, uniqueUsers };
  });
}

import fs from "fs";
import path from "path";
import { labStats } from "./site-content";

export type Stat = { label: string; value: string; description: string };

const DATA_DIR = path.join(process.cwd(), "data");
const STATS_FILE = path.join(DATA_DIR, "stats.json");

export function getStats(): Stat[] {
  try {
    if (!fs.existsSync(STATS_FILE)) return labStats.map((s) => ({ ...s }));
    return JSON.parse(fs.readFileSync(STATS_FILE, "utf-8")) as Stat[];
  } catch {
    return labStats.map((s) => ({ ...s }));
  }
}

export function updateStats(stats: Stat[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

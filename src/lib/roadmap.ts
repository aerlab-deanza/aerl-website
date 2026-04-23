import fs from "fs";
import path from "path";
import { tracks as defaultTracks } from "./data";
import type { Track } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");
const ROADMAP_FILE = path.join(DATA_DIR, "roadmap.json");

export function getRoadmapTracks(): Track[] {
  try {
    if (!fs.existsSync(ROADMAP_FILE)) return defaultTracks.map((t) => ({ ...t }));
    return JSON.parse(fs.readFileSync(ROADMAP_FILE, "utf-8")) as Track[];
  } catch {
    return defaultTracks.map((t) => ({ ...t }));
  }
}

export function updateRoadmapTracks(tracks: Track[]): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(ROADMAP_FILE, JSON.stringify(tracks, null, 2));
}

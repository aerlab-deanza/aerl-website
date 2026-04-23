import { getRedis } from "./redis"
import { tracks as defaultTracks } from "./data"
import type { Track } from "@/types"

const KEY = "aerl:roadmap"

export async function getRoadmapTracks(): Promise<Track[]> {
  try {
    const data = await getRedis().get<Track[]>(KEY)
    return data ?? defaultTracks.map((t) => ({ ...t }))
  } catch {
    return defaultTracks.map((t) => ({ ...t }))
  }
}

export async function updateRoadmapTracks(tracks: Track[]): Promise<void> {
  await getRedis().set(KEY, tracks)
}

import { getRedis } from "./redis"
import { labStats } from "./site-content"

export type Stat = { label: string; value: string; description: string }

const KEY = "aerl:stats"

export async function getStats(): Promise<Stat[]> {
  try {
    const data = await getRedis().get<Stat[]>(KEY)
    return data ?? labStats.map((s) => ({ ...s }))
  } catch {
    return labStats.map((s) => ({ ...s }))
  }
}

export async function updateStats(stats: Stat[]): Promise<void> {
  await getRedis().set(KEY, stats)
}

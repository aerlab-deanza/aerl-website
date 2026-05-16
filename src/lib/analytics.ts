import { getRedis } from "./redis"

export interface DayStats {
  date: string
  views: number
  uniqueUsers: number
}

interface DayData {
  sessions: Record<string, string[]>
}

interface StoredData {
  days: Record<string, DayData>
}

export interface AnalyticsData extends StoredData {
  totalViews: number
  totalUniqueUsers: number
}

const KEY = "aerl:analytics"

async function readData(): Promise<StoredData> {
  try {
    const data = await getRedis().get<Record<string, unknown>>(KEY)
    if (!data || typeof data.days !== "object" || !data.days) return { days: {} }
    return { days: data.days as Record<string, DayData> }
  } catch {
    return { days: {} }
  }
}

async function writeData(data: StoredData): Promise<void> {
  await getRedis().set(KEY, data)
}

export async function trackVisit(sessionId: string, pathname: string): Promise<void> {
  const data = await readData()
  const today = new Date().toISOString().split("T")[0]

  if (!data.days[today]) data.days[today] = { sessions: {} }

  const day = data.days[today]
  const visited = day.sessions[sessionId] ?? []

  if (visited.includes(pathname)) return

  day.sessions[sessionId] = [...visited, pathname]

  await writeData(data)
}

export async function getAnalytics(): Promise<AnalyticsData> {
  const data = await readData()
  const allSessions = new Set<string>()
  let totalViews = 0
  for (const day of Object.values(data.days)) {
    for (const [sessionId, paths] of Object.entries(day.sessions)) {
      allSessions.add(sessionId)
      totalViews += paths.length
    }
  }
  return { ...data, totalViews, totalUniqueUsers: allSessions.size }
}

export async function getDailyStats(days = 14): Promise<DayStats[]> {
  const data = await readData()
  return Array.from({ length: days }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (days - 1 - i))
    const date = d.toISOString().split("T")[0]
    const day = data.days[date]
    if (!day) return { date, views: 0, uniqueUsers: 0 }
    const views = Object.values(day.sessions).reduce((sum, paths) => sum + paths.length, 0)
    const uniqueUsers = Object.keys(day.sessions).length
    return { date, views, uniqueUsers }
  })
}

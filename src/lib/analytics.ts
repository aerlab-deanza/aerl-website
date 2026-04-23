import { getRedis } from "./redis"

export interface DayStats {
  date: string
  views: number
  uniqueUsers: number
}

interface DayData {
  sessions: Record<string, string[]>
}

export interface AnalyticsData {
  totalViews: number
  totalUniqueUsers: number
  days: Record<string, DayData>
}

const KEY = "aerl:analytics"
const EMPTY: AnalyticsData = { totalViews: 0, totalUniqueUsers: 0, days: {} }

function isNewShape(data: AnalyticsData): boolean {
  return Object.values(data.days).every(
    (d) => !Array.isArray((d as unknown as Record<string, unknown>).sessions)
  )
}

async function readData(): Promise<AnalyticsData> {
  try {
    const data = await getRedis().get<AnalyticsData>(KEY)
    if (!data) return { ...EMPTY, days: {} }
    if (!isNewShape(data)) {
      const fresh = { ...EMPTY, days: {} }
      await getRedis().set(KEY, fresh)
      return fresh
    }
    return data
  } catch {
    return { ...EMPTY, days: {} }
  }
}

async function writeData(data: AnalyticsData): Promise<void> {
  await getRedis().set(KEY, data)
}

export async function trackVisit(sessionId: string, pathname: string): Promise<void> {
  const data = await readData()
  const today = new Date().toISOString().split("T")[0]

  if (!data.days[today]) data.days[today] = { sessions: {} }

  const day = data.days[today]
  const visited = day.sessions[sessionId] ?? []

  if (visited.includes(pathname)) return

  const isNewSession = visited.length === 0
  day.sessions[sessionId] = [...visited, pathname]
  data.totalViews++
  if (isNewSession) data.totalUniqueUsers++

  await writeData(data)
}

export async function getAnalytics(): Promise<AnalyticsData> {
  return readData()
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

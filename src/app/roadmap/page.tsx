import { getRoadmapTracks } from "@/lib/roadmap"
import { RoadmapClient } from "./RoadmapClient"

export const dynamic = "force-dynamic"

export default async function RoadmapPage() {
  const tracks = await getRoadmapTracks()
  return <RoadmapClient tracks={tracks} />
}

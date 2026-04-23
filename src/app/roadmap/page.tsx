import { getRoadmapTracks } from "@/lib/roadmap"
import { RoadmapClient } from "./RoadmapClient"

export const dynamic = "force-dynamic"

export default function RoadmapPage() {
  const tracks = getRoadmapTracks()
  return <RoadmapClient tracks={tracks} />
}

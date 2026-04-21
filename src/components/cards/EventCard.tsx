import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  title: string
  date: string
  location: string
  type: string
}

export function EventCard({ title, date, location, type }: EventCardProps) {
  return (
    <div className="group relative flex flex-col items-start gap-4 rounded-lg border border-border/40 bg-card p-6 hover:border-border hover:-translate-y-2 transition-all duration-200 ease-out shadow-sm">
      <div className="flex items-center gap-2">
        <Badge variant={type === "Workshop" ? "default" : "outline"}>{type}</Badge>
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold tracking-tight text-lg">{title}</h3>
        <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {date}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {location}
          </span>
        </div>
      </div>
    </div>
  )
}

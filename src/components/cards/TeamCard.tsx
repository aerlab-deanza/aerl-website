"use client"

import * as Icons from "lucide-react"
import { LucideIcon } from "lucide-react"

interface TeamCardProps {
  name: string
  description: string
  icon: string
  focusArea?: string
  roadmapSupport?: string
}

export function TeamCard({ name, description, icon, focusArea, roadmapSupport }: TeamCardProps) {
  const iconMap = Icons as unknown as Record<string, LucideIcon>
  const IconComponent = iconMap[icon] ?? Icons.Users

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/40 bg-card p-6 shadow-sm hover:border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full group">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
        <IconComponent className="h-6 w-6" />
      </div>
      <h3 className="font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">{name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
      
      {(focusArea || roadmapSupport) && (
        <div className="mt-4 border-t pt-4 space-y-2 text-xs">
          {focusArea && (
            <div>
              <span className="font-semibold text-foreground">Focus: </span>
              <span className="text-muted-foreground">{focusArea}</span>
            </div>
          )}
          {roadmapSupport && (
            <div>
              <span className="font-semibold text-foreground">Roadmap role: </span>
              <span className="text-muted-foreground">{roadmapSupport}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

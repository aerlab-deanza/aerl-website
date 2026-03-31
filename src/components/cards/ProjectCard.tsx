import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ProjectStatus = "Active" | "Future Direction" | "Planning" | "In Development" | "Validation" | "Deployed";

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  status?: ProjectStatus;
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "Active") {
    return (
      <Badge className="shrink-0 text-[10px] uppercase font-bold tracking-wide bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/10">
        ● Active
      </Badge>
    )
  }
  if (status === "Future Direction") {
    return (
      <Badge variant="outline" className="shrink-0 text-[10px] uppercase font-bold tracking-wide text-muted-foreground border-border/40">
        Future Direction
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="shrink-0 text-[10px] uppercase font-bold tracking-wide">
      {status}
    </Badge>
  )
}

export function ProjectCard({ title, description, tags, link, status }: ProjectCardProps) {
  const isFuture = status === "Future Direction"
  const isDocumentationLink = link.startsWith("/documentation")
  const ctaLabel = isFuture
    ? "Learn more"
    : isDocumentationLink
      ? "Open documentation"
      : "View roadmap"

  return (
    <Card className={cn(
      "flex flex-col h-full bg-card border-border/40 hover:border-border hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group relative",
      isFuture && "opacity-70 hover:opacity-90"
    )}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className={cn(
            "line-clamp-2 text-foreground group-hover:text-primary transition-colors",
            isFuture && "text-muted-foreground group-hover:text-foreground"
          )}>{title}</CardTitle>
          {status && <StatusBadge status={status} />}
        </div>
        <CardDescription className="line-clamp-4">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-muted/50 group-hover:bg-muted transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={link} className="inline-flex items-center text-sm font-medium text-primary hover:underline group-hover:font-semibold transition-all">
          {ctaLabel} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardFooter>
    </Card>
  )
}

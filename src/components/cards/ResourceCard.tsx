import { FileText, Download } from "lucide-react"

interface ResourceCardProps {
  title: string
  description: string
  category: string
  link: string
}

export function ResourceCard({ title, description, category, link }: ResourceCardProps) {
  return (
    <a href={link} className="flex p-5 gap-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-muted/50 transition-colors group">
      <div className="text-muted-foreground group-hover:text-primary transition-colors mt-0.5">
        <FileText className="h-6 w-6" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium leading-none">{title}</p>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{category}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
      </div>
      <div className="flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors opacity-50 group-hover:opacity-100">
        <Download className="h-4 w-4" />
      </div>
    </a>
  )
}

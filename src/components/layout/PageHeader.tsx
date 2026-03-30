import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function PageHeader({ title, description, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-8 pt-6 md:pb-12 md:pt-10", className)} {...props}>
      <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
      {description && (
        <p className="max-w-[700px] text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

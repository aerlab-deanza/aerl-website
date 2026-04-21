import { cn } from "@/lib/utils"

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function PageHeader({ title, description, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-8 pt-[104px] md:pb-12 md:pt-[120px]", className)} {...props}>
      <p className="aerl-kicker">Applied Engineering Research Lab</p>
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">{title}</h1>
      {description && (
        <p className="max-w-[720px] text-lg leading-8 text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
